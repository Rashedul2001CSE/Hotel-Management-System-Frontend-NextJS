"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/admin-sidebar.css"
import {
  BedDouble,
  Bell,
  BookOpen,
  Building2,
  CalendarCheck,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  FileText,
  Gauge,
  Gift,
  KeyRound,
  LogOut,
  MessageSquare,
  Percent,
  ReceiptText,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  Wrench,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";

const groups = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: Gauge,
      },
    ],
  },

  {
    label: "Front Office",
    items: [
      {
        label: "Reservations",
        href: "/admin/reservations",
        icon: CalendarCheck,
      },
      {
        label: "Check-in / Check-out",
        href: "/admin/front-desk",
        icon: KeyRound,
      },
      {
        label: "Guests",
        href: "/admin/guests",
        icon: Users,
      },
      {
        label: "Guest Requests",
        href: "/admin/guest-requests",
        icon: MessageSquare,
      },
    ],
  },

  {
    label: "Rooms & Property",
    items: [
      {
        label: "Rooms",
        href: "/admin/rooms",
        icon: BedDouble,
      },
      {
        label: "Room Types",
        href: "/admin/room-types",
        icon: Building2,
      },
      {
        label: "Housekeeping",
        href: "/admin/housekeeping",
        icon: Sparkles,
      },
      {
        label: "Maintenance",
        href: "/admin/maintenance",
        icon: Wrench,
      },
    ],
  },

  {
    label: "Sales & Revenue",
    items: [
      {
        label: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
      },
      {
        label: "Invoices",
        href: "/admin/invoices",
        icon: ReceiptText,
      },
      {
        label: "Transactions",
        href: "/admin/transactions",
        icon: CircleDollarSign,
      },
      {
        label: "Offers & Discounts",
        href: "/admin/offers",
        icon: Percent,
      },
      {
        label: "Packages",
        href: "/admin/packages",
        icon: Gift,
      },
    ],
  },

  {
    label: "Management",
    items: [
      {
        label: "Staff",
        href: "/admin/staff",
        icon: UserCog,
      },
      {
        label: "Departments",
        href: "/admin/departments",
        icon: ClipboardCheck,
      },
      {
        label: "Reviews",
        href: "/admin/reviews",
        icon: MessageSquare,
      },
      {
        label: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
    ],
  },

  {
    label: "Reports",
    items: [
      {
        label: "Reports & Analytics",
        href: "/admin/reports",
        icon: FileBarChart,
      },
      {
        label: "Occupancy",
        href: "/admin/reports/occupancy",
        icon: Gauge,
      },
      {
        label: "Revenue Reports",
        href: "/admin/reports/revenue",
        icon: CircleDollarSign,
      },
      {
        label: "Booking Reports",
        href: "/admin/reports/bookings",
        icon: BookOpen,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        label: "Users & Roles",
        href: "/admin/users",
        icon: ShieldCheck,
      },
      {
        label: "Audit Logs",
        href: "/admin/audit-logs",
        icon: FileText,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside
      className={[
        "admin-sidebar",
        isOpen ? "admin-sidebar--open" : "",
      ].join(" ")}
      aria-label="Hotel administration navigation"
    >
      {/* Logo */}
      <div className="admin-sidebar__brand-row">
        <Link
          href="/"
          className="admin-sidebar__brand group"
          aria-label="Velora Hotels home"
        >
          <div className="admin-sidebar__logo">
            <span className="hotel-display text-lg font-semibold">V</span>
          </div>

          <div className="admin-sidebar__brand-text">
            <span className="hotel-display text-xl font-semibold tracking-tight text-foreground">
              Velora
            </span>

            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Hotels & Suites
            </span>
          </div>
        </Link>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="admin-sidebar__close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar__nav">
        {groups.map((group) => (
          <div
            key={group.label}
            className="admin-sidebar__group"
          >
            <p className="admin-sidebar__group-label">
              {group.label}
            </p>

            <div className="admin-sidebar__items">
              {group.items.map(
                ({ label, href, icon: Icon }) => {
                  const active =
                    pathname === href ||
                    pathname.startsWith(`${href}/`);

                  return (
                    <Link
                      key={href}
                      href={href}
                      title={label}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "admin-sidebar__item",
                        active
                          ? "admin-sidebar__item--active"
                          : "",
                      ].join(" ")}
                      onClick={onClose}
                    >
                      <Icon className="admin-sidebar__icon" />

                      <span className="admin-sidebar__item-label">
                        {label}
                      </span>

                      <ChevronRight
                        className={[
                          "admin-sidebar__chevron",
                          active
                            ? "admin-sidebar__chevron--visible"
                            : "",
                        ].join(" ")}
                      />
                    </Link>
                  );
                },
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__hotel-status">
          <div className="admin-sidebar__status-icon">
            <Building2 className="size-4" />
          </div>

          <div className="admin-sidebar__status-content">
            <p className="text-xs font-medium">
              Velora Hotels
            </p>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Administration
            </p>

            <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              System online
            </span>
          </div>
        </div>

        <Button
          onClick={logout}
          variant="ghost"
          title="Sign out"
          className="admin-sidebar__logout"
        >
          <LogOut className="size-4.5 shrink-0" />

          <span className="admin-sidebar__logout-label">
            Sign out
          </span>
        </Button>
      </div>
    </aside>
  );
}