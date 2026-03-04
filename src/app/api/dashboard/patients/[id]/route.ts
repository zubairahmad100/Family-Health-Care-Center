import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getClinicIdForUser } from "@/lib/clinicSettings";
import { apiError, apiSuccess } from "@/lib/apiResponse";
import { PatientUpdateSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/security/rateLimit";

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
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`dashboard:${ip}`, 60, 60 * 1000);
  if (!allowed) return apiError("Too many requests", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON", 400);
  }

  const parsed = PatientUpdateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 422);

  let updateQuery = supabase.from("patients").update(parsed.data).eq("id", id);
  if (clinicId) updateQuery = updateQuery.eq("clinic_id", clinicId);
  const { error } = await updateQuery;

  if (error) {
    console.error("Patient update error:", error);
    return apiError("Update failed", 500);
  }
  return apiSuccess({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return apiError("Unauthorized", 401);

  const clinicId = await getClinicIdForUser(supabase);
  const { id } = await params;

  let deleteQuery = supabase.from("patients").delete().eq("id", id);
  if (clinicId) deleteQuery = deleteQuery.eq("clinic_id", clinicId);
  const { error } = await deleteQuery;

  if (error) {
    console.error("Patient delete error:", error);
    return apiError("Delete failed", 500);
  }
  return new Response(null, { status: 204 });
}
