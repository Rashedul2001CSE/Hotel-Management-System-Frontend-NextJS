import Link from "next/link";
import {
  FaArrowDown,
  FaArrowUp,
  FaBed,
  FaBell,
  FaBroom,
  FaCalendarCheck,
  FaCalendarDays,
  FaChartLine,
  FaChevronRight,
  FaCircleCheck,
  FaCircleExclamation,
  FaClock,
  FaCreditCard,
  FaDoorOpen,
  FaFileInvoiceDollar,
  FaHotel,
  FaKey,
  FaMagnifyingGlass,
  FaMoneyBillTrendUp,
  FaPersonWalkingArrowRight,
  FaPersonWalkingArrowRight as FaArrival,
  FaPeopleGroup,
  FaPlus,
  FaScrewdriverWrench,
  FaStar,
  FaUserCheck,
  FaUserGroup,
} from "react-icons/fa6";

/*
 * Hotel Velora Admin Dashboard
 *
 * This page intentionally remains a Server Component.
 *
 * Later, replace the mock dashboardData object with data
 * fetched from your ASP.NET Core API.
 */

const dashboardData = {
  overview: {
    occupancy: 78.4,
    occupancyChange: 6.2,

    revenue: 184650,
    revenueChange: 12.8,

    adr: 142.5,
    adrChange: 4.6,

    revPar: 111.7,
    revParChange: 9.4,
  },

  operations: {
    arrivals: 18,
    departures: 14,
    inHouseGuests: 126,
    pendingReservations: 9,
  },

  rooms: {
    total: 120,
    occupied: 94,
    available: 14,
    cleaning: 7,
    maintenance: 3,
    blocked: 2,
  },

  revenueTrend: [
    { day: "Mon", value: 23500 },
    { day: "Tue", value: 28400 },
    { day: "Wed", value: 26700 },
    { day: "Thu", value: 31200 },
    { day: "Fri", value: 35800 },
    { day: "Sat", value: 42100 },
    { day: "Sun", value: 36950 },
  ],

  occupancyTrend: [
    { day: "Mon", value: 68 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 70 },
    { day: "Thu", value: 76 },
    { day: "Fri", value: 82 },
    { day: "Sat", value: 89 },
    { day: "Sun", value: 78 },
  ],

  arrivals: [
    {
      guest: "Sarah Johnson",
      room: "Deluxe King",
      roomNumber: "302",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      guest: "Michael Chen",
      room: "Executive Suite",
      roomNumber: "501",
      time: "12:00 PM",
      status: "Confirmed",
    },
    {
      guest: "Emma Wilson",
      room: "Premium Twin",
      roomNumber: "214",
      time: "01:30 PM",
      status: "VIP",
    },
    {
      guest: "Daniel Smith",
      room: "Deluxe King",
      roomNumber: "407",
      time: "03:00 PM",
      status: "Confirmed",
    },
  ],

  departures: [
    {
      guest: "Robert Brown",
      room: "208",
      time: "11:00 AM",
      status: "Ready",
    },
    {
      guest: "Olivia Martin",
      room: "415",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      guest: "James Anderson",
      room: "604",
      time: "12:00 PM",
      status: "Ready",
    },
  ],

  recentBookings: [
    {
      id: "VL-10482",
      guest: "Sophia Williams",
      room: "Deluxe King",
      dates: "Sep 20 – Sep 23",
      amount: 428,
      status: "Confirmed",
    },
    {
      id: "VL-10481",
      guest: "Noah Taylor",
      room: "Executive Suite",
      dates: "Sep 20 – Sep 25",
      amount: 875,
      status: "Checked-in",
    },
    {
      id: "VL-10480",
      guest: "Liam Davis",
      room: "Premium Twin",
      dates: "Sep 21 – Sep 24",
      amount: 515,
      status: "Confirmed",
    },
    {
      id: "VL-10479",
      guest: "Ava Wilson",
      room: "Deluxe King",
      dates: "Sep 22 – Sep 26",
      amount: 692,
      status: "Pending",
    },
    {
      id: "VL-10478",
      guest: "Ethan Moore",
      room: "Garden Suite",
      dates: "Sep 23 – Sep 27",
      amount: 940,
      status: "Confirmed",
    },
  ],

  housekeeping: {
    clean: 83,
    cleaning: 7,
    dirty: 6,
    inspected: 21,
    priority: 3,
  },

  maintenance: [
    {
      room: "Room 318",
      issue: "Air conditioning",
      priority: "High",
    },
    {
      room: "Room 512",
      issue: "Bathroom faucet",
      priority: "Medium",
    },
    {
      room: "Room 704",
      issue: "TV connection",
      priority: "Low",
    },
  ],

  reviews: {
    average: 4.8,
    total: 1284,
    newReviews: 12,
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function StatChange({
  value,
  positive = true,
}: {
  value: number;
  positive?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold",
        positive
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-red-500/10 text-red-700 dark:text-red-400",
      ].join(" ")}
    >
      {positive ? (
        <FaArrowUp className="size-2.5" />
      ) : (
        <FaArrowDown className="size-2.5" />
      )}
      {value}%
    </span>
  );
}

function DashboardCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`dashboard-card rounded-2xl border border-border/70 bg-card shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  title,
  description,
  href,
  hrefLabel = "View all",
}: {
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          {hrefLabel}
          <FaChevronRight className="size-2.5" />
        </Link>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Confirmed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    "Checked-in": "bg-primary/10 text-primary",
    Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    Ready: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    VIP: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${styles[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  change,
  subtitle,
  href,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: number;
  subtitle: string;
  href?: string;
}) {
  const content = (
    <div className="flex h-full flex-col justify-between gap-5 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4.5" />
          </div>

          <p className="truncate text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {title}
          </p>
        </div>

        {change !== undefined && <StatChange value={change} />}
      </div>

      <div>
        <p className="text-2xl font-bold tracking-tight sm:text-3xl">{value}</p>

        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  if (!href) {
    return (
      <DashboardCard className="transition-shadow hover:shadow-md">
        {content}
      </DashboardCard>
    );
  }

  return (
    <Link href={href} className="block h-full">
      <DashboardCard className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
        {content}
      </DashboardCard>
    </Link>
  );
}

function MiniBarChart({
  data,
  currency = false,
}: {
  data: { day: string; value: number }[];
  currency?: boolean;
}) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="mt-6">
      <div className="flex h-48 items-end gap-2 sm:gap-4">
        {data.map((item) => {
          const height = Math.max(8, (item.value / max) * 100);

          return (
            <div
              key={item.day}
              className="group flex h-full flex-1 flex-col justify-end"
            >
              <div className="relative flex flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-primary/70 transition-all duration-300 group-hover:bg-primary"
                  style={{
                    height: `${height}%`,
                  }}
                >
                  <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {currency ? formatCurrency(item.value) : `${item.value}%`}
                  </span>
                </div>
              </div>

              <span className="mt-2 text-center text-[10px] font-medium text-muted-foreground">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoomStatus({
  label,
  value,
  total,
  icon: Icon,
}: {
  label: string;
  value: number;
  total: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const percentage = (value / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-xs font-medium">{label}</span>

          <span className="text-xs font-semibold">{value}</span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const {
    overview,
    operations,
    rooms,
    revenueTrend,
    occupancyTrend,
    arrivals,
    departures,
    recentBookings,
    housekeeping,
    maintenance,
    reviews,
  } = dashboardData;

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        {/* =====================================================
            HEADER
            ===================================================== */}
        <header className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <FaHotel className="size-3.5 text-primary" />
              Hotel Velora
              <span>/</span>
              Administration
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Good morning, Admin
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening at Velora today.
            </p>

            <p className="mt-2 text-xs font-medium text-muted-foreground">
              {today}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/reservations/new"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              <FaPlus className="size-3" />
              New Reservation
            </Link>

            <Link
              href="/admin/reports"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-semibold transition hover:bg-accent"
            >
              <FaChartLine className="size-3" />
              Reports
            </Link>
          </div>
        </header>

        {/* =====================================================
            ALERTS
            ===================================================== */}
        <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/admin/housekeeping"
            className="group flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 transition hover:bg-amber-500/10"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <FaBroom className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">Housekeeping attention</p>

              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {housekeeping.priority} rooms require priority cleaning.
              </p>
            </div>

            <FaChevronRight className="size-3 text-muted-foreground transition group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/admin/maintenance"
            className="group flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-3 transition hover:bg-red-500/10"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
              <FaScrewdriverWrench className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">Maintenance alerts</p>

              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {rooms.maintenance} rooms are currently unavailable.
              </p>
            </div>

            <FaChevronRight className="size-3 text-muted-foreground transition group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/admin/reservations"
            className="group flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 transition hover:bg-primary/10"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FaCalendarCheck className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">Pending reservations</p>

              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {operations.pendingReservations} reservations need attention.
              </p>
            </div>

            <FaChevronRight className="size-3 text-muted-foreground transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* =====================================================
            KPI CARDS
            ===================================================== */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Occupancy"
            value={`${overview.occupancy}%`}
            icon={FaHotel}
            change={overview.occupancyChange}
            subtitle="Compared with previous period"
            href="/admin/reports/occupancy"
          />

          <StatCard
            title="Revenue"
            value={formatCurrency(overview.revenue)}
            icon={FaMoneyBillTrendUp}
            change={overview.revenueChange}
            subtitle="Room revenue this period"
            href="/admin/reports/revenue"
          />

          <StatCard
            title="ADR"
            value={formatCurrency(overview.adr)}
            icon={FaCreditCard}
            change={overview.adrChange}
            subtitle="Average daily rate"
            href="/admin/reports/revenue"
          />

          <StatCard
            title="RevPAR"
            value={formatCurrency(overview.revPar)}
            icon={FaChartLine}
            change={overview.revParChange}
            subtitle="Revenue per available room"
            href="/admin/reports/revenue"
          />
        </section>

        {/* =====================================================
            TODAY'S OPERATIONS
            ===================================================== */}
        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Link
            href="/admin/front-desk"
            className="dashboard-card group p-4 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FaArrival className="size-4" />
              </div>

              <FaChevronRight className="size-3 text-muted-foreground transition group-hover:translate-x-1" />
            </div>

            <p className="mt-4 text-2xl font-bold">{operations.arrivals}</p>

            <p className="mt-1 text-xs font-medium text-muted-foreground">
              Arrivals today
            </p>
          </Link>

          <Link
            href="/admin/front-desk"
            className="dashboard-card group p-4 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <FaPersonWalkingArrowRight className="size-4" />
              </div>

              <FaChevronRight className="size-3 text-muted-foreground transition group-hover:translate-x-1" />
            </div>

            <p className="mt-4 text-2xl font-bold">{operations.departures}</p>

            <p className="mt-1 text-xs font-medium text-muted-foreground">
              Departures today
            </p>
          </Link>

          <Link
            href="/admin/guests"
            className="dashboard-card group p-4 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                <FaPeopleGroup className="size-4" />
              </div>

              <FaChevronRight className="size-3 text-muted-foreground transition group-hover:translate-x-1" />
            </div>

            <p className="mt-4 text-2xl font-bold">
              {formatNumber(operations.inHouseGuests)}
            </p>

            <p className="mt-1 text-xs font-medium text-muted-foreground">
              Guests in-house
            </p>
          </Link>

          <Link
            href="/admin/reservations"
            className="dashboard-card group p-4 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                <FaClock className="size-4" />
              </div>

              <FaChevronRight className="size-3 text-muted-foreground transition group-hover:translate-x-1" />
            </div>

            <p className="mt-4 text-2xl font-bold">
              {operations.pendingReservations}
            </p>

            <p className="mt-1 text-xs font-medium text-muted-foreground">
              Pending reservations
            </p>
          </Link>
        </section>

        {/* =====================================================
            ANALYTICS
            ===================================================== */}
        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <DashboardCard className="p-5">
            <SectionHeader
              title="Revenue overview"
              description="Daily room revenue performance"
              href="/admin/reports/revenue"
            />

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {formatCurrency(overview.revenue)}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <StatChange value={overview.revenueChange} />

                  <span className="text-xs text-muted-foreground">
                    vs. previous period
                  </span>
                </div>
              </div>

              <div className="hidden size-11 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
                <FaChartLine className="size-5" />
              </div>
            </div>

            <MiniBarChart data={revenueTrend} currency />
          </DashboardCard>

          <DashboardCard className="p-5">
            <SectionHeader
              title="Occupancy overview"
              description="Room occupancy for the last 7 days"
              href="/admin/reports/occupancy"
            />

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {overview.occupancy}%
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <StatChange value={overview.occupancyChange} />

                  <span className="text-xs text-muted-foreground">
                    occupancy growth
                  </span>
                </div>
              </div>

              <div className="hidden size-11 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
                <FaHotel className="size-5" />
              </div>
            </div>

            <MiniBarChart data={occupancyTrend} />
          </DashboardCard>
        </section>

        {/* =====================================================
            ROOM STATUS + HOUSEKEEPING
            ===================================================== */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <DashboardCard className="p-5">
            <SectionHeader
              title="Room status"
              description={`${rooms.total} rooms across Hotel Velora`}
              href="/admin/rooms"
            />

            <div className="mt-6 space-y-5">
              <RoomStatus
                label="Occupied"
                value={rooms.occupied}
                total={rooms.total}
                icon={FaUserCheck}
              />

              <RoomStatus
                label="Available"
                value={rooms.available}
                total={rooms.total}
                icon={FaDoorOpen}
              />

              <RoomStatus
                label="Cleaning"
                value={rooms.cleaning}
                total={rooms.total}
                icon={FaBroom}
              />

              <RoomStatus
                label="Maintenance"
                value={rooms.maintenance}
                total={rooms.total}
                icon={FaScrewdriverWrench}
              />

              <RoomStatus
                label="Blocked"
                value={rooms.blocked}
                total={rooms.total}
                icon={FaKey}
              />
            </div>
          </DashboardCard>

          <DashboardCard className="p-5">
            <SectionHeader
              title="Housekeeping"
              description="Current housekeeping workload"
              href="/admin/housekeeping"
            />

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FaCircleCheck className="size-4" />
                  <span className="text-xs font-semibold">Clean</span>
                </div>

                <p className="mt-3 text-2xl font-bold">{housekeeping.clean}</p>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  Rooms ready
                </p>
              </div>

              <div className="rounded-xl bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <FaBroom className="size-4" />
                  <span className="text-xs font-semibold">Cleaning</span>
                </div>

                <p className="mt-3 text-2xl font-bold">
                  {housekeeping.cleaning}
                </p>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  Currently being cleaned
                </p>
              </div>

              <div className="rounded-xl bg-amber-500/5 p-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <FaClock className="size-4" />
                  <span className="text-xs font-semibold">Dirty</span>
                </div>

                <p className="mt-3 text-2xl font-bold">{housekeeping.dirty}</p>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  Awaiting service
                </p>
              </div>

              <div className="rounded-xl bg-purple-500/5 p-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <FaCircleCheck className="size-4" />
                  <span className="text-xs font-semibold">Inspected</span>
                </div>

                <p className="mt-3 text-2xl font-bold">
                  {housekeeping.inspected}
                </p>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  Ready for guests
                </p>
              </div>
            </div>

            <Link
              href="/admin/housekeeping"
              className="mt-5 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-xs font-semibold transition hover:bg-accent"
            >
              View housekeeping board
              <FaChevronRight className="size-3 text-muted-foreground" />
            </Link>
          </DashboardCard>
        </section>

        {/* =====================================================
            ARRIVALS + DEPARTURES
            ===================================================== */}
        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <DashboardCard className="overflow-hidden">
            <div className="p-5 pb-3">
              <SectionHeader
                title="Today's arrivals"
                description={`${operations.arrivals} guests expected`}
                href="/admin/front-desk"
              />
            </div>

            <div className="divide-y divide-border/60">
              {arrivals.map((arrival) => (
                <div
                  key={`${arrival.guest}-${arrival.roomNumber}`}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {arrival.guest
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      {arrival.guest}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      Room {arrival.roomNumber} · {arrival.room}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-semibold">{arrival.time}</p>

                    <div className="mt-1">
                      <StatusBadge status={arrival.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard className="overflow-hidden">
            <div className="p-5 pb-3">
              <SectionHeader
                title="Today's departures"
                description={`${operations.departures} guests expected`}
                href="/admin/front-desk"
              />
            </div>

            <div className="divide-y divide-border/60">
              {departures.map((departure) => (
                <div
                  key={`${departure.guest}-${departure.room}`}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600">
                    {departure.guest
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      {departure.guest}
                    </p>

                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Room {departure.room}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-semibold">
                      {departure.time}
                    </p>

                    <div className="mt-1">
                      <StatusBadge status={departure.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </section>

        {/* =====================================================
            RECENT BOOKINGS
            ===================================================== */}
        <DashboardCard className="mt-6 overflow-hidden">
          <div className="p-5 pb-3">
            <SectionHeader
              title="Recent bookings"
              description="Latest reservations made through Velora"
              href="/admin/reservations"
              hrefLabel="View reservations"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-y border-border/60 bg-muted/40">
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Booking
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Guest
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Room
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Stay
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/50">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="transition hover:bg-accent/40"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/reservations/${booking.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        {booking.id}
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-xs font-medium">
                        {booking.guest}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-xs text-muted-foreground">
                        {booking.room}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-xs text-muted-foreground">
                        {booking.dates}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold">
                        {formatCurrency(booking.amount)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* =====================================================
            MAINTENANCE + REVIEWS + QUICK ACTIONS
            ===================================================== */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Maintenance */}
          <DashboardCard className="p-5">
            <SectionHeader
              title="Maintenance"
              description="Open maintenance requests"
              href="/admin/maintenance"
            />

            <div className="mt-5 space-y-3">
              {maintenance.map((item) => (
                <Link
                  key={`${item.room}-${item.issue}`}
                  href="/admin/maintenance"
                  className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-accent"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
                    <FaScrewdriverWrench className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold">{item.room}</p>

                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      {item.issue}
                    </p>
                  </div>

                  <span
                    className={[
                      "text-[10px] font-semibold",
                      item.priority === "High"
                        ? "text-red-600"
                        : item.priority === "Medium"
                          ? "text-amber-600"
                          : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {item.priority}
                  </span>
                </Link>
              ))}
            </div>
          </DashboardCard>

          {/* Reviews */}
          <DashboardCard className="p-5">
            <SectionHeader
              title="Guest reviews"
              description="Guest satisfaction overview"
              href="/admin/reviews"
            />

            <div className="mt-5 flex items-center gap-5">
              <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary/10">
                <span className="text-2xl font-bold text-primary">
                  {reviews.average}
                </span>

                <div className="mt-1 flex gap-0.5 text-amber-500">
                  <FaStar className="size-2.5" />
                  <FaStar className="size-2.5" />
                  <FaStar className="size-2.5" />
                  <FaStar className="size-2.5" />
                  <FaStar className="size-2.5" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Excellent guest rating</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Based on {formatNumber(reviews.total)} reviews
                </p>

                <Link
                  href="/admin/reviews"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  {reviews.newReviews} new reviews
                  <FaChevronRight className="size-2.5" />
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <FaCircleCheck className="size-3.5 text-emerald-600" />

                <span className="text-xs font-semibold">
                  Guest satisfaction is healthy
                </span>
              </div>

              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                Keep monitoring new feedback and respond to guest reviews
                promptly.
              </p>
            </div>
          </DashboardCard>

          {/* Quick actions */}
          <DashboardCard className="p-5">
            <SectionHeader
              title="Quick actions"
              description="Frequently used admin tools"
            />

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link
                href="/admin/reservations/new"
                className="group rounded-xl border border-border/60 p-3 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <FaCalendarCheck className="size-4 text-primary" />

                <p className="mt-3 text-[11px] font-semibold">New booking</p>
              </Link>

              <Link
                href="/admin/guests"
                className="group rounded-xl border border-border/60 p-3 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <FaUserGroup className="size-4 text-primary" />

                <p className="mt-3 text-[11px] font-semibold">Guests</p>
              </Link>

              <Link
                href="/admin/rooms"
                className="group rounded-xl border border-border/60 p-3 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <FaBed className="size-4 text-primary" />

                <p className="mt-3 text-[11px] font-semibold">Manage rooms</p>
              </Link>

              <Link
                href="/admin/invoices"
                className="group rounded-xl border border-border/60 p-3 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <FaFileInvoiceDollar className="size-4 text-primary" />

                <p className="mt-3 text-[11px] font-semibold">Invoices</p>
              </Link>

              <Link
                href="/admin/housekeeping"
                className="group rounded-xl border border-border/60 p-3 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <FaBroom className="size-4 text-primary" />

                <p className="mt-3 text-[11px] font-semibold">Housekeeping</p>
              </Link>

              <Link
                href="/admin/reports"
                className="group rounded-xl border border-border/60 p-3 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <FaChartLine className="size-4 text-primary" />

                <p className="mt-3 text-[11px] font-semibold">Analytics</p>
              </Link>
            </div>
          </DashboardCard>
        </section>

        {/* =====================================================
            FOOTER STATUS
            ===================================================== */}
        <footer className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Hotel Velora system operational
          </div>

          <div className="flex items-center gap-4">
            <span>{rooms.total} total rooms</span>

            <span>{operations.inHouseGuests} guests in-house</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
