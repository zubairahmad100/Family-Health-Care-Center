import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: settingsRes } = await supabase
    .from("clinic_settings")
    .select("clinic_name")
    .eq("user_id", user.id)
    .maybeSingle();

  const clinicName =
    (settingsRes as { clinic_name?: string } | null)?.clinic_name ?? "Clinic";

  return (
    <DashboardShell
      clinicName={clinicName}
      userEmail={user.email ?? ""}
    >
      {children}
    </DashboardShell>
  );
}
