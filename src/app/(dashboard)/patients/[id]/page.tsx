import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getClinicIdForUser } from "@/lib/clinicSettings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format";
import { SERVICE_LABELS } from "@/lib/validations";
import type { AppointmentStatus } from "@/types";
import PatientEditCard from "@/components/dashboard/PatientEditCard";

const statusColors: Record<AppointmentStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-health-100 text-health-800",
  cancelled: "bg-slate-100 text-slate-500",
  completed: "bg-slate-100 text-slate-600",
};

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const clinicId = await getClinicIdForUser(supabase);
  let patientQuery = supabase
    .from("patients")
    .select("id, full_name, email, phone, created_at, clinic_id")
    .eq("id", id);
  if (clinicId) patientQuery = patientQuery.eq("clinic_id", clinicId);
  const { data: patient } = await patientQuery.single();
  if (!patient) {
    return (
      <div className="text-slate-500">
        Patient not found. <Link href="/patients" className="text-dental-600">Back to list</Link>
      </div>
    );
  }

  const patientData = patient as {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    created_at: string;
    clinic_id: string;
  };

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id, appointment_date, appointment_time, service_type, status")
    .eq("patient_id", id)
    .order("appointment_date", { ascending: false });

  const appts = (appointments ?? []) as Array<{
    id: string;
    appointment_date: string;
    appointment_time: string;
    service_type: string;
    status: AppointmentStatus;
  }>;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PatientEditCard
        patient={{
          id: patientData.id,
          full_name: patientData.full_name,
          email: patientData.email,
          phone: patientData.phone,
          created_at: patientData.created_at,
          clinic_id: patientData.clinic_id,
        }}
      />
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <h2 className="font-heading font-semibold text-lg">
            Appointment History
          </h2>
        </CardHeader>
        <CardContent>
          {appts.length === 0 ? (
            <p className="text-slate-500 text-sm">No appointments yet.</p>
          ) : (
            <div className="rounded-lg border border-slate-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Time</th>
                    <th className="text-left p-3 font-medium">Service</th>
                    <th className="text-left p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appts.map((a) => (
                    <tr key={a.id} className="border-b border-slate-50">
                      <td className="p-3">{formatDate(a.appointment_date)}</td>
                      <td className="p-3">
                        {(a.appointment_time as string).toString().slice(0, 5)}
                      </td>
                      <td className="p-3">
                        {SERVICE_LABELS[a.service_type] ?? a.service_type}
                      </td>
                      <td className="p-3">
                        <Badge className={statusColors[a.status]}>
                          {a.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
