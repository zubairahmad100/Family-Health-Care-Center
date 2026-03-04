import { NextRequest } from "next/server";
import OpenAI from "openai";
import { ChatMessageSchema } from "@/lib/validations";
import { apiError } from "@/lib/apiResponse";
import { rateLimit, getClientIp } from "@/lib/security/rateLimit";
import { getClinicSettings, businessHoursToDisplay } from "@/lib/clinicSettings";
import { faqsData, teamMembers } from "@/lib/special-smiles-content";
import { SERVICES } from "@/lib/services-data";

const BASE_SYSTEM_PROMPT = `You are a friendly assistant for a single dental clinic.

Rules:
- Only answer questions directly related to this clinic, its services, pricing, insurance, working hours, location, or dental treatments we provide.
- If a question is not about the clinic or dental care, reply: "I can only help with questions about this dental clinic."
- Keep every answer very short (2–3 compact sentences) and to the point.
- Do not use markdown.
- When it makes sense to book online (user asks to book, reschedule, or shows clear intent to book), end your reply with the token [BOOK_NOW_BUTTON].
- When you want the user to call the clinic, always include the token [CALL_BUTTON:PHONE_NUMBER] at the end, where PHONE_NUMBER is the clinic phone number in international format without spaces (for example +15551234567).
- The UI will turn [BOOK_NOW_BUTTON] into a “Book now” button that scrolls to the booking section, and [CALL_BUTTON:PHONE_NUMBER] into a clickable phone button, so keep these tokens exactly as specified.
- Do NOT say that you are booking an appointment yourself. The user books by clicking the “Book now” button and submitting the booking form; you only guide them and then add [BOOK_NOW_BUTTON].`;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`chat:${ip}`, 20, 60 * 60 * 1000);
  if (!allowed) {
    return apiError("Too many requests", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON", 400);
  }

  const parsed = ChatMessageSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Invalid message", 422);
  }

  const { message, history } = parsed.data;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return apiError("Chat unavailable. Please call us directly.", 500);
  }

  // Load live clinic settings so the assistant has accurate hours and contact details
  const clinicSettings = await getClinicSettings();
  const phone = clinicSettings?.phone?.replace(/\s+/g, "") || "+15550000000";

  let hoursText = "Working hours are not configured yet. Please ask the user to check the booking section for current availability.";
  if (clinicSettings?.business_hours) {
    const display = businessHoursToDisplay(clinicSettings.business_hours);
    hoursText =
      "Clinic working hours:\n" +
      display
        .map((h) => `${h.label === "Closed" ? `${h.day.charAt(0).toUpperCase()}${h.day.slice(1)}: Closed` : `${h.day.charAt(0).toUpperCase()}${h.day.slice(1)}: ${h.label}`}`)
        .join("\n");
  }

  const clinicInfoParts = [
    clinicSettings?.clinic_name ? `Clinic name: ${clinicSettings.clinic_name}.` : null,
    clinicSettings?.address ? `Address: ${clinicSettings.address}.` : null,
    clinicSettings?.email ? `Email: ${clinicSettings.email}.` : null,
    `Phone: ${phone}.`,
  ].filter(Boolean);

  const teamContext = teamMembers.map(t => `- ${t.name}, ${t.title}: ${t.bio}`).join("\n");
  const servicesContext = SERVICES.map((s: any) => `- ${s.title}: ${s.shortDescription}`).join("\n");
  const faqsContext = faqsData.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  const SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

Here is the current clinic information you MUST use in your answers:
${clinicInfoParts.join(" ")}

${hoursText}

### Team Members
${teamContext}

### Services Offered
${servicesContext}

### Frequently Asked Questions
${faqsContext}

Always use [CALL_BUTTON:${phone}] when you want the user to call the clinic.`;

  try {
    const openai = new OpenAI({ apiKey });
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "content_block_delta", delta: { text } })}\n\n`
                )
              );
            }
          }
        } catch (e) {
          console.error("Chat stream error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return apiError("Chat unavailable. Please call us directly.", 500);
  }
}
