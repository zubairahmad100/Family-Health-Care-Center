import { NextRequest } from "next/server";
import { SlotsQuerySchema } from "@/lib/validations";
import { apiError } from "@/lib/apiResponse";
import { rateLimit, getClientIp } from "@/lib/security/rateLimit";
import { generateTimeSlots } from "@/lib/utils/slots";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`slots:${ip}`, 60, 60 * 1000);
  if (!allowed) {
    return apiError("Too many requests", 429);
  }

  const { searchParams } = new URL(request.url);
  const parsed = SlotsQuerySchema.safeParse({ date: searchParams.get("date") });
  if (!parsed.success) {
    return apiError("Invalid or missing date", 400);
  }

  const dateStr = parsed.data.date;
  const allSlots = generateTimeSlots();
  const supabase = createServiceClient();

  const { data: bookedRows } = await supabase
    .from("time_slots")
    .select("slot_time")
    .eq("slot_date", dateStr)
    .eq("is_booked", true);

  const bookedSet = new Set(
    (bookedRows ?? []).map((r) => r.slot_time?.toString().slice(0, 5) ?? "")
  );

  const slots = allSlots.map((time) => ({
    time,
    available: !bookedSet.has(time),
  }));

  return new Response(JSON.stringify(slots), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=30",
    },
  });
}
