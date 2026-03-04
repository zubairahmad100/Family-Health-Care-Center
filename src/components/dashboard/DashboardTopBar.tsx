"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardTopBar({
  setMobileOpen,
}: {
  setMobileOpen: (v: boolean) => void;
}) {
  return (
    <header className="h-14 border-b border-slate-100 bg-white flex items-center px-4 lg:pl-[calc(15rem+1rem)]">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </Button>
    </header>
  );
}
