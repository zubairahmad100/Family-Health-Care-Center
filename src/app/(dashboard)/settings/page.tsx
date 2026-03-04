import { createClient } from "@/lib/supabase/server";
import SettingsTabs from "@/components/dashboard/SettingsTabs";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("clinic_settings")
    .select("*")
    .limit(1)
    .maybeSingle();
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-slate-900 mb-6">
        Settings
      </h1>
      <SettingsTabs initialSettings={settings ?? null} />
    </div>
  );
}
