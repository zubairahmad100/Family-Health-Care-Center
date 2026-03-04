"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  Stethoscope,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/patients", icon: Users, label: "Patients" },
  { href: "/appointments", icon: CalendarDays, label: "Appointments" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({
  clinicName,
  userEmail,
  mobileOpen,
  setMobileOpen,
}: {
  clinicName: string;
  userEmail: string;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  const NavContent = ({ inSheet = false }: { inSheet?: boolean }) => (
    <>
      <div className={inSheet ? "p-4 border-b border-slate-100" : "p-4 border-b border-slate-100"}>
        <div className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-dental-700 shrink-0" />
          <span className="text-sm font-semibold truncate">{clinicName}</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => inSheet && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-dental-50 text-dental-700 font-medium"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-100 flex items-center gap-2">
        <Avatar className="h-8 w-8 bg-dental-100">
          <AvatarFallback className="text-dental-700 text-xs">
            {userEmail.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-slate-500 truncate flex-1">{userEmail}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleSignOut}
          aria-label="Sign out"
        >
          <LogOut size={14} />
        </Button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex fixed w-60 h-full bg-white border-r border-slate-100 flex-col z-30">
        <NavContent />
      </aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <div className="flex flex-col h-full">
            <NavContent inSheet />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
