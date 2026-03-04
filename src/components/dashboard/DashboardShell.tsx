"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardTopBar from "./DashboardTopBar";

export default function DashboardShell({
  clinicName,
  userEmail,
  children,
}: {
  clinicName: string;
  userEmail: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        clinicName={clinicName}
        userEmail={userEmail}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-60">
        <DashboardTopBar setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
