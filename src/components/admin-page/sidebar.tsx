"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BedDouble,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  FileBarChart,
  Home,
  LogOut,
  Settings,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";

const groups = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", href: "/admin/dashboard", icon: Home },
      { label: "Reservations", href: "/admin/reservations", icon: BookOpen },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Rooms", href: "/admin/rooms", icon: BedDouble },
      { label: "Guests", href: "/admin/guests", icon: Users },
      { label: "Staff", href: "/admin/staff", icon: ClipboardCheck },
      { label: "Housekeeping", href: "/admin/housekeeping", icon: Sparkles },
      { label: "Maintenance", href: "/admin/maintenance", icon: Wrench },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Reports", href: "/admin/reports", icon: FileBarChart },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const { logout } = useAuth();
  const pathname = usePathname();
  return (
    <aside
      className={`hidden h-screen shrink-0 border-r border-border/60 bg-sidebar lg:flex lg:flex-col ${collapsed ? "w-20" : "w-64"} transition-[width] duration-300`}
    >
      <Link
        href="/"
        className="group flex shrink-0 items-center gap-2.5 px-3 py-4"
        aria-label="Velora Hotels home"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
          <span className="hotel-display text-lg font-semibold">
            V
          </span>
        </div>

        <div className="flex flex-col leading-none">
          <span className="hotel-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Velora
          </span>

          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Hotels & Suites
          </span>
        </div>
      </Link>
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        {groups.map((group) => (
          <div key={group.label} className="mb-7">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    title={collapsed ? label : undefined}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${active ? "bg-primary text-primary-foreground shadow-md shadow-primary/15" : "text-muted-foreground hover:bg-accent hover:text-foreground"} ${collapsed ? "justify-center" : ""}`}
                  >
                    <Icon className="size-4.5" />
                    <span className={collapsed ? "sr-only" : ""}>{label}</span>
                    {!collapsed && active && (
                      <ChevronRight className="ml-auto size-4" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-border/60 p-3">
        {!collapsed && (
          <div className="mb-3 rounded-xl bg-accent/60 p-3">
            <p className="text-xs font-medium">Velora, San Francisco</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Connected to mock API
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Live
              fallback
            </span>
          </div>
        )}
        <Button onClick={logout}
          variant="ghost"
          className={`w-full justify-start gap-3 text-muted-foreground ${collapsed ? "justify-center px-0" : ""}`}
        >
          <LogOut data-icon="inline-start" />
          {!collapsed && "Sign out"}
        </Button>
      </div>
    </aside>
  );
}
