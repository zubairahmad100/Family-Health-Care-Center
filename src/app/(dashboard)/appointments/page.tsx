import AppointmentsView from "@/components/dashboard/AppointmentsView";
import { createClient } from "@/lib/supabase/server";
import { getClinicIdForUser } from "@/lib/clinicSettings";

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const clinicId = await getClinicIdForUser(supabase);
  let query = supabase
    .from("appointments")
    .select("id, appointment_date, appointment_time, service_type, status, patients(full_name, email)")
    .order("appointment_date", { ascending: false })
    .order("appointment_time", { ascending: false });
  if (clinicId) query = query.eq("clinic_id", clinicId);
  const { data } = await query;
  const raw = (data ?? []) as Array<{
    id: string;
    appointment_date: string;
    appointment_time: string;
    service_type: string;
    status: string;
    patients: { full_name: string; email: string } | { full_name: string; email: string }[] | null;
  }>;
  const appointments = raw.map((a) => ({
    ...a,
    patients: Array.isArray(a.patients) ? a.patients[0] ?? null : a.patients,
  }));
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-slate-900 mb-6">
        Appointments
      </h1>
      <AppointmentsView initialAppointments={appointments} />
    </div>
  );
}
