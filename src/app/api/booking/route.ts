import { NextRequest } from "next/server";
import { BookingFormSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/apiResponse";
import { rateLimit, getClientIp } from "@/lib/security/rateLimit";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return apiError("Invalid content type", 400);
  }
  const ip = getClientIp(request);
  const { allowed, retryAfter } = rateLimit(`booking:${ip}`, 5, 60 * 60 * 1000);
  if (!allowed) {
    return apiError("Too many requests", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON", 400);
  }

  const raw = body as Record<string, unknown>;
  if (raw.website !== undefined && raw.website !== "" && raw.website !== null) {
    return apiSuccess({ ok: true }, 200);
  }

  const parsed = BookingFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    parsed.error.flatten().fieldErrors &&
      Object.entries(parsed.error.flatten().fieldErrors).forEach(([k, v]) => {
        fieldErrors[k] = (v ?? []) as string[];
      });
    return apiError("Validation failed", 422, fieldErrors);
  }

  const data = parsed.data;
  const supabase = createServiceClient();

  const clinicId =
    data.clinic_id ??
    process.env.CLINIC_ID ??
    "f155b321-4d36-43d3-948f-b2ece420338c";

  try {
    const dateStr = data.appointment_date;
    const timeStr = data.appointment_time;

    const { data: existingSlot } = await supabase
      .from("time_slots")
      .select("id, is_booked")
      .eq("slot_date", dateStr)
      .eq("slot_time", timeStr)
      .maybeSingle();

    if (existingSlot?.is_booked) {
      return apiError("That slot was just taken. Pick another.", 409);
    }

    let patientId: string;
    const { data: existingPatient } = await supabase
      .from("patients")
      .select("id")
      .eq("email", data.email)
      .eq("clinic_id", clinicId)
      .maybeSingle();

    if (existingPatient) {
      patientId = existingPatient.id;
      await supabase
        .from("patients")
        .update({
          full_name: data.full_name,
          phone: data.phone,
        })
        .eq("id", patientId);
    } else {
      const { data: newPatient, error: patientError } = await supabase
        .from("patients")
        .insert({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          clinic_id: clinicId,
        })
        .select("id")
        .single();
      if (patientError || !newPatient) {
        console.error("Patient insert error:", patientError);
        return apiError("Something went wrong. Please call us.", 500);
      }
      patientId = newPatient.id;
    }

    const { data: appointment, error: apptError } = await supabase
      .from("appointments")
      .insert({
        patient_id: patientId,
        service_type: data.service_type,
        appointment_date: dateStr,
        appointment_time: timeStr,
        status: "confirmed",
        notes: data.notes ?? null,
        clinic_id: clinicId,
      })
      .select("id")
      .single();

    if (apptError || !appointment) {
      console.error("Appointment insert error:", apptError);
      return apiError("Something went wrong. Please call us.", 500);
    }

    if (existingSlot) {
      await supabase
        .from("time_slots")
        .update({
          is_booked: true,
          appointment_id: appointment.id,
        })
        .eq("id", existingSlot.id);
    } else {
      await supabase.from("time_slots").insert({
        slot_date: dateStr,
        slot_time: timeStr,
        is_booked: true,
        appointment_id: appointment.id,
      });
    }

    return apiSuccess(
      {
        appointment_id: appointment.id,
        date: dateStr,
        time: timeStr,
        service: data.service_type,
      },
      201
    );
  } catch (err) {
    console.error("Booking error:", err);
    return apiError("Something went wrong. Please call us.", 500);
  }
}
