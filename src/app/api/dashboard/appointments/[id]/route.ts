import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getClinicIdForUser } from "@/lib/clinicSettings";
import { apiError, apiSuccess } from "@/lib/apiResponse";
import { AppointmentUpdateSchema } from "@/lib/validations";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return apiError("Unauthorized", 401);

  const clinicId = await getClinicIdForUser(supabase);
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON", 400);
  }

  const parsed = AppointmentUpdateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 422);

  const data = parsed.data;

  if (data.status === "cancelled") {
    const service = createServiceClient();
    await service
      .from("time_slots")
      .update({ is_booked: false, appointment_id: null })
      .eq("appointment_id", id);
  }

  const updatePayload: Record<string, unknown> = { status: data.status };
  if (data.notes !== undefined) updatePayload.notes = data.notes;
  if (data.appointment_date !== undefined)
    updatePayload.appointment_date = data.appointment_date;
  if (data.appointment_time !== undefined)
    updatePayload.appointment_time = data.appointment_time;

  let updateQuery = supabase
    .from("appointments")
    .update(updatePayload)
    .eq("id", id);
  if (clinicId) updateQuery = updateQuery.eq("clinic_id", clinicId);
  const { error } = await updateQuery;

  if (error) {
    console.error("Appointment update error:", error);
    return apiError("Update failed", 500);
  }
  return apiSuccess({ ok: true });
}
