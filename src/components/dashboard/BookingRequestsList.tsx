"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Phone, Mail, Check, X, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICE_LABELS } from "@/lib/validations";
import { formatDate } from "@/lib/utils/format";
import { toast } from "sonner";

type PendingItem = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  notes: string | null;
  created_at: string;
  patients: { full_name: string; email: string; phone: string } | null;
};

export default function BookingRequestsList({
  initialPending,
}: {
  initialPending: PendingItem[];
}) {
  const [list, setList] = useState(initialPending);

  async function confirm(id: string) {
    setList((prev) => prev.filter((p) => p.id !== id));
    const res = await fetch(`/api/dashboard/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "confirmed" }),
    });
    if (res.ok) toast.success("Appointment confirmed");
    else {
      setList(initialPending);
      toast.error("Failed");
    }
  }

  async function decline(id: string) {
    setList((prev) => prev.filter((p) => p.id !== id));
    const res = await fetch(`/api/dashboard/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    if (res.ok) toast.success("Appointment declined");
    else {
      setList(initialPending);
      toast.error("Failed");
    }
  }

  if (list.length === 0) {
    return (
      <Card className="p-16 text-center bg-white border-0 shadow-sm rounded-2xl">
        <CheckCircle size={48} className="mx-auto text-health-500 mb-4" />
        <p className="font-semibold text-slate-900">All caught up!</p>
        <p className="text-slate-400 text-sm">No pending requests.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <AnimatePresence>
        {list.map((item) => (
          <motion.div
            key={item.id}
            layout
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          >
            <Card className="p-5 bg-white border-0 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-slate-900">
                  {item.patients?.full_name ?? "—"}
                </p>
                <span className="text-xs text-slate-400">
                  {formatDate(item.created_at)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 items-center text-sm text-slate-500 mb-2">
                <Badge variant="secondary">{SERVICE_LABELS[item.service_type] ?? item.service_type}</Badge>
                <span className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {formatDate(item.appointment_date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {(item.appointment_time as string).toString().slice(0, 5)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone size={14} />
                {item.patients?.phone ?? "—"}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <Mail size={14} />
                {item.patients?.email ?? "—"}
              </div>
              {item.notes && (
                <p className="italic text-slate-400 text-sm border-l-2 border-slate-200 pl-3 mt-2">
                  {item.notes}
                </p>
              )}
              <div className="flex gap-2 pt-3 border-t border-slate-50 mt-3">
                <Button
                  size="sm"
                  className="flex-1 bg-health-600 hover:bg-health-700"
                  onClick={() => confirm(item.id)}
                >
                  <Check size={14} className="mr-1" />
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => decline(item.id)}
                >
                  <X size={14} className="mr-1" />
                  Decline
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
