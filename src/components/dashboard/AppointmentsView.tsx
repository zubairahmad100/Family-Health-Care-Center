"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils/format";
import { SERVICE_LABELS } from "@/lib/validations";
import { format } from "date-fns";
import { useMemo, useState } from "react";

type Appt = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  status: string;
  patients: { full_name: string; email: string } | null;
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-health-100 text-health-800",
  cancelled: "bg-slate-100 text-slate-500",
  completed: "bg-slate-100 text-slate-600",
};

export default function AppointmentsView({
  initialAppointments,
}: {
  initialAppointments: Appt[];
}) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (dateFilter !== "all" && a.appointment_date !== dateFilter) return false;
      return true;
    });
  }, [appointments, statusFilter, dateFilter]);

  return (
    <div>
      <div className="mb-4 flex gap-3 flex-wrap">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[220px] justify-start text-left font-normal"
            >
              {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate ?? undefined}
              onSelect={(d) => {
                if (!d) {
                  setSelectedDate(null);
                  setDateFilter("all");
                  return;
                }
                setSelectedDate(d);
                const asIso = format(d, "yyyy-MM-dd");
                setDateFilter(asIso);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="text-sm">
                  {formatDate(a.appointment_date)}
                </TableCell>
                <TableCell className="text-sm">
                  {(a.appointment_time as string).toString().slice(0, 5)}
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {a.patients?.full_name ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {SERVICE_LABELS[a.service_type] ?? a.service_type}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[a.status] ?? ""}>
                    {a.status}
                  </Badge>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
