import { createClient } from "@/lib/supabase/server";
import { getClinicIdForUser } from "@/lib/clinicSettings";
import BookingRequestsList from "@/components/dashboard/BookingRequestsList";

export default async function BookingRequestsPage() {
  const supabase = await createClient();
  const clinicId = await getClinicIdForUser(supabase);
  let query = supabase
    .from("appointments")
    .select("id, appointment_date, appointment_time, service_type, notes, created_at, patients(full_name, email, phone)")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  if (clinicId) query = query.eq("clinic_id", clinicId);
  const { data } = await query;
  const raw = (data ?? []) as Array<{
    id: string;
    appointment_date: string;
    appointment_time: string;
    service_type: string;
    notes: string | null;
    created_at: string;
    patients: { full_name: string; email: string; phone: string } | { full_name: string; email: string; phone: string }[] | null;
  }>;
  const pending = raw.map((a) => ({
    ...a,
    patients: Array.isArray(a.patients) ? a.patients[0] ?? null : a.patients,
  }));
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        Booking Requests
        <span className="text-lg font-normal text-slate-500">({pending.length})</span>
      </h1>
      <BookingRequestsList initialPending={pending} />
    </div>
  );
}
