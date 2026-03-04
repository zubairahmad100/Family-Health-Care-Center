import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getClinicIdForUser } from "@/lib/clinicSettings";
import { SERVICE_LABELS } from "@/lib/validations";
import type { AppointmentStatus } from "@/types";
import { format, startOfMonth, endOfMonth } from "date-fns";
import {
  CalendarCheck,
  CalendarDays,
  CalendarX,
  ExternalLink,
  Users
} from "lucide-react";
import Link from "next/link";

const statusColors: Record<AppointmentStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-health-100 text-health-800",
  cancelled: "bg-slate-100 text-slate-500",
  completed: "bg-slate-100 text-slate-600",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const clinicId = await getClinicIdForUser(supabase);
  const today = format(new Date(), "yyyy-MM-dd");
  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const monthEnd = format(endOfMonth(new Date()), "yyyy-MM-dd");

  const [
    todayApptsRes,
    pendingApptsRes,
    patientsRes,
    monthlyRes,
  ] = await Promise.all([
    (() => {
      let q = supabase
        .from("appointments")
        .select("id, patient_id, appointment_time, status, service_type, patients(full_name)")
        .eq("appointment_date", today)
        .order("appointment_time");
      if (clinicId) q = q.eq("clinic_id", clinicId);
      return q;
    })(),
    (() => {
      let q = supabase
        .from("appointments")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending");
      if (clinicId) q = q.eq("clinic_id", clinicId);
      return q;
    })(),
    (() => {
      let q = supabase.from("patients").select("id", { count: "exact", head: true });
      if (clinicId) q = q.eq("clinic_id", clinicId);
      return q;
    })(),
    (() => {
      let q = supabase
        .from("appointments")
        .select("id", { count: "exact", head: true })
        .gte("appointment_date", monthStart)
        .lte("appointment_date", monthEnd);
      if (clinicId) q = q.eq("clinic_id", clinicId);
      return q;
    })(),
  ]);

  const todayApptsRaw = (todayApptsRes.data ?? []) as Array<{
    id: string;
    patient_id: string;
    appointment_time: string;
    status: AppointmentStatus;
    service_type: string;
    patients: { full_name: string } | { full_name: string }[] | null;
  }>;
  const todayAppts = todayApptsRaw.map((a) => ({
    ...a,
    patients: Array.isArray(a.patients) ? a.patients[0] ?? null : a.patients,
  }));
  const totalPatients = patientsRes?.count ?? 0;
  const monthlyCount = monthlyRes?.count ?? 0;

  const stats = [
    {
      label: "Today's Appointments",
      value: todayAppts.length,
      icon: CalendarDays,
      color: "dental",
      trend: null,
    },
    {
      label: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: "amber",
      trend: null,
    },
    {
      label: "This Month",
      value: monthlyCount,
      icon: CalendarCheck,
      color: "purple",
      trend: null,
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-slate-900 mb-6">
        Overview
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="p-6 bg-white border-0 shadow-sm rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{s.label}</span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color === "dental"
                  ? "bg-dental-50 text-dental-600"
                  : s.color === "health"
                    ? "bg-health-50 text-health-600"
                    : s.color === "amber"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-purple-50 text-purple-600"
                  }`}
              >
                <s.icon size={18} />
              </div>
            </div>
            <p className="text-3xl font-heading font-bold text-slate-900 mt-4">
              {s.value}
            </p>
            {s.trend && (
              <p className="text-xs text-health-600 mt-2">{s.trend}</p>
            )}
          </Card>
        ))}
      </div>

      <Card className="mt-8 rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="font-heading font-semibold text-lg">
            Today&apos;s Schedule
          </h2>
          <span className="text-slate-400 text-sm">
            {format(new Date(), "MMMM d, yyyy")}
          </span>
        </CardHeader>
        <CardContent>
          {todayAppts.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-slate-400">
              <CalendarX size={40} className="mb-3 opacity-50" />
              <p>No appointments today</p>
              <Button variant="link" size="sm" className="mt-2 text-dental-600" asChild>
                <Link href="/appointments">View all →</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {todayAppts.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 py-3 px-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="bg-dental-50 text-dental-700 text-xs font-medium px-2 py-1 rounded-md">
                    {(apt.appointment_time as string).toString().slice(0, 5)}
                  </span>
                  <span className="font-medium text-sm">
                    {(apt.patients as { full_name: string } | null)?.full_name ?? "—"}
                  </span>
                  <span className="text-slate-400 text-sm ml-2">
                    {SERVICE_LABELS[apt.service_type] ?? apt.service_type}
                  </span>
                  <Badge
                    className={`ml-auto ${statusColors[apt.status] ?? ""}`}
                  >
                    {apt.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link href={`/patients/${apt.patient_id}`} aria-label="View">
                        <ExternalLink size={14} />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
