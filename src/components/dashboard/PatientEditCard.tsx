"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils/format";
import { toast } from "sonner";
import type { Patient } from "@/types";

export default function PatientEditCard({ patient }: { patient: Patient }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    full_name: patient.full_name,
    email: patient.email,
    phone: patient.phone,
  });

  async function handleSave() {
    const res = await fetch(`/api/dashboard/patients/${patient.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success("Patient updated");
      setEditing(false);
    } else {
      toast.error("Update failed");
    }
  }

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 bg-dental-100">
            <AvatarFallback className="text-dental-700 text-lg">
              {patient.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            {editing ? (
              <Input
                value={form.full_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, full_name: e.target.value }))
                }
                className="mb-2"
              />
            ) : (
              <h2 className="font-heading font-semibold text-lg">
                {patient.full_name}
              </h2>
            )}
            <p className="text-slate-500 text-sm">Joined {formatDate(patient.created_at)}</p>
          </div>
        </div>
        {editing ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {editing ? (
          <>
            <div>
              <label className="text-xs text-slate-500">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Phone</label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-slate-600">{patient.email}</p>
            <p className="text-sm text-slate-600">{patient.phone}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
