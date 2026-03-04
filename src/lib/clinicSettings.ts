import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { BusinessHours, ClinicSettings } from "@/types";

export async function getClinicSettings(): Promise<ClinicSettings | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("clinic_settings")
    .select("*")
    .limit(1)
    .maybeSingle();
  return (data as ClinicSettings | null) ?? null;
}

/** Returns the current user's clinic id (from clinic_settings.user_id). Use in dashboard pages. */
export async function getClinicIdForUser(
  supabase: SupabaseClient
): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("clinic_settings")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();
  return (data as { id: string } | null)?.id ?? null;
}

export function businessHoursToDisplay(
  hours: BusinessHours
): Array<{ day: string; label: string }> {
  const order = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  const labelMap: Record<string,string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };
  return order.map((day) => {
    const h = hours[day];
    if (!h || h.closed) {
      return { day, label: "Closed" };
    }
    return { day, label: `${h.open} - ${h.close}` };
  });
}

