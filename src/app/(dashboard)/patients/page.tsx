import { createClient } from "@/lib/supabase/server";
import { getClinicIdForUser } from "@/lib/clinicSettings";
import PatientsTable from "@/components/dashboard/PatientsTable";
import type { Patient } from "@/types";

export default async function PatientsPage() {
  const supabase = await createClient();
  const clinicId = await getClinicIdForUser(supabase);
  let query = supabase
    .from("patients")
    .select("id, full_name, email, phone, created_at, clinic_id")
    .order("created_at", { ascending: false });
  if (clinicId) query = query.eq("clinic_id", clinicId);
  const { data } = await query;
  const patients = (data ?? []) as Patient[];
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-slate-900 mb-6">
        Patients
      </h1>
      <PatientsTable initialPatients={patients} />
    </div>
  );
}
