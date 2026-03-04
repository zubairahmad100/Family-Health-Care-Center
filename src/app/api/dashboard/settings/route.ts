import { apiError, apiSuccess } from "@/lib/apiResponse";
import { createClient } from "@/lib/supabase/server";
import { ClinicSettingsSchema } from "@/lib/validations";
import { NextRequest } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return apiError("Unauthorized", 401);

  const { data, error } = await supabase
    .from("clinic_settings")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (error) {
    console.error("Settings get error:", error);
    return apiError("Failed to load settings", 500);
  }
  return apiSuccess(data ?? null);
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return apiError("Unauthorized", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON", 400);
  }

  const parsed = ClinicSettingsSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 422);

  const { data: existing } = await supabase
    .from("clinic_settings")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  const id = existing?.id;
  if (!id) {
    const { data: inserted, error: insertError } = await supabase
      .from("clinic_settings")
      .insert({ ...parsed.data, email: user.email })
      .select("id")
      .single();
    if (insertError) {
      console.error("Settings insert error:", insertError);
      return apiError("Update failed", 500);
    }
    return apiSuccess(inserted);
  }

  const { error } = await supabase
    .from("clinic_settings")
    .update({
      ...parsed.data,
      email: user.email,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Settings update error:", error);
    return apiError("Update failed", 500);
  }
  return apiSuccess({ ok: true });
}
