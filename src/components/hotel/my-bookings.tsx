"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    ExternalLink,
    MapPin,
    MoreHorizontal,
    RefreshCw,
    Search,
    User,
    Users,
    XCircle,
} from "lucide-react";

type BookingStatus =
    | "confirmed"
    | "pending"
    | "completed"
    | "cancelled";

type PaymentStatus =
    | "paid"
    | "pending"
    | "refunded"
    | "pay-at-hotel";

type Booking = {
    id: string;
    confirmationNumber: string;
    roomId: string;
    roomName: string;
    category: string;
    image: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    guestName: string;
    guestEmail: string;
    bookingForSomeoneElse: boolean;
    total: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
};

const MOCK_BOOKINGS: Booking[] = [
    {
        id: "booking-001",
        confirmationNumber: "VEL-8K4P29",
        roomId: "premium-suite",
        roomName: "Premium Suite",
        category: "Suite",
        image:
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
        checkIn: "2026-10-10",
        checkOut: "2026-10-13",
        guests: 2,
        nights: 3,
        guestName: "John Smith",
        guestEmail: "john@example.com",
        bookingForSomeoneElse: false,
        total: 1056,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: "2026-09-18",
    },
    {
        id: "booking-002",
        confirmationNumber: "VEL-2M7Q51",
        roomId: "deluxe-king-room",
        roomName: "Deluxe King Room",
        category: "Deluxe",
        image:
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
        checkIn: "2026-11-04",
        checkOut: "2026-11-07",
        guests: 1,
        nights: 3,
        guestName: "Sarah Smith",
        guestEmail: "sarah@example.com",
        bookingForSomeoneElse: true,
        total: 610.5,
        status: "confirmed",
        paymentStatus: "pay-at-hotel",
        createdAt: "2026-09-19",
    },
    {
        id: "booking-003",
        confirmationNumber: "VEL-5N9R12",
        roomId: "grand-suite",
        roomName: "Grand Suite",
        category: "Suite",
        image:
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85",
        checkIn: "2026-07-15",
        checkOut: "2026-07-18",
        guests: 2,
        nights: 3,
        guestName: "John Smith",
        guestEmail: "john@example.com",
        bookingForSomeoneElse: false,
        total: 1485,
        status: "completed",
        paymentStatus: "paid",
        createdAt: "2026-07-02",
    },
    {
        id: "booking-004",
        confirmationNumber: "VEL-3C6T88",
        roomId: "classic-room",
        roomName: "Classic Room",
        category: "Standard",
        image:
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
        checkIn: "2026-06-02",
        checkOut: "2026-06-04",
        guests: 1,
        nights: 2,
        guestName: "John Smith",
        guestEmail: "john@example.com",
        bookingForSomeoneElse: false,
        total: 275,
        status: "cancelled",
        paymentStatus: "refunded",
        createdAt: "2026-05-20",
    },
];

type FilterTab = "upcoming" | "past" | "cancelled";

export default function MyBookings() {
    const [activeTab, setActiveTab] =
        useState<FilterTab>("upcoming");

    const [search, setSearch] = useState("");

    const [menuBooking, setMenuBooking] = useState<string | null>(
        null
    );

    const [cancelBooking, setCancelBooking] =
        useState<Booking | null>(null);

    const filteredBookings = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return MOCK_BOOKINGS.filter((booking) => {
            const matchesSearch =
                !normalizedSearch ||
                booking.roomName.toLowerCase().includes(normalizedSearch) ||
                booking.confirmationNumber
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                booking.guestName.toLowerCase().includes(normalizedSearch);

            if (!matchesSearch) return false;

            if (activeTab === "upcoming") {
                return (
                    booking.status === "confirmed" ||
                    booking.status === "pending"
                );
            }

            if (activeTab === "past") {
                return booking.status === "completed";
            }

            return booking.status === "cancelled";
        });
    }, [activeTab, search]);

    const counts = useMemo(() => {
        return {
            upcoming: MOCK_BOOKINGS.filter(
                (booking) =>
                    booking.status === "confirmed" ||
                    booking.status === "pending"
            ).length,

            past: MOCK_BOOKINGS.filter(
                (booking) => booking.status === "completed"
            ).length,

            cancelled: MOCK_BOOKINGS.filter(
                (booking) => booking.status === "cancelled"
            ).length,
        };
    }, []);

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(`${date}T00:00:00`));
    };

    const getStatus = (status: BookingStatus) => {
        switch (status) {
            case "confirmed":
                return {
                    label: "Confirmed",
                    className:
                        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                    icon: CheckCircle2,
                };

            case "pending":
                return {
                    label: "Pending",
                    className:
                        "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                    icon: Clock3,
                };

            case "completed":
                return {
                    label: "Completed",
                    className:
                        "bg-secondary text-secondary-foreground",
                    icon: CheckCircle2,
                };

            case "cancelled":
                return {
                    label: "Cancelled",
                    className:
                        "bg-destructive/10 text-destructive",
                    icon: XCircle,
                };
        }
    };

    const getPaymentLabel = (status: PaymentStatus) => {
        switch (status) {
            case "paid":
                return "Paid";

            case "pending":
                return "Payment pending";

            case "refunded":
                return "Refunded";

            case "pay-at-hotel":
                return "Pay at hotel";
        }
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <section className="border-b border-border">
                <div className="hotel-container py-10 sm:py-14">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                Your stays
                            </p>

                            <h1 className="hotel-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                                My bookings
                            </h1>

                            <p className="mt-3 max-w-2xl text-muted-foreground">
                                View your reservations, manage upcoming stays, and
                                keep track of your previous visits to Velora Hotels.
                            </p>
                        </div>

                        <Link
                            href="/rooms"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            Find a room
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="hotel-container py-8 sm:py-10">
                {/* Search */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-sm">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search bookings..."
                            className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8 overflow-x-auto border-b border-border">
                    <div className="flex min-w-max gap-6">
                        <BookingTab
                            label="Upcoming"
                            count={counts.upcoming}
                            active={activeTab === "upcoming"}
                            onClick={() => setActiveTab("upcoming")}
                        />

                        <BookingTab
                            label="Past"
                            count={counts.past}
                            active={activeTab === "past"}
                            onClick={() => setActiveTab("past")}
                        />

                        <BookingTab
                            label="Cancelled"
                            count={counts.cancelled}
                            active={activeTab === "cancelled"}
                            onClick={() => setActiveTab("cancelled")}
                        />
                    </div>
                </div>

                {/* Booking list */}
                {filteredBookings.length > 0 ? (
                    <div className="grid gap-5">
                        {filteredBookings.map((booking) => {
                            const status = getStatus(booking.status);
                            const StatusIcon = status.icon;

                            return (
                                <article
                                    key={booking.id}
                                    className="overflow-visible rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-md"
                                >
                                    <div className="grid lg:grid-cols-[280px_1fr]">
                                        {/* Image */}
                                        <div className="relative min-h-56 overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                                            <Image
                                                src={booking.image}
                                                alt={booking.roomName}
                                                fill
                                                className="object-cover"
                                                sizes="280px"
                                            />

                                            <div className="absolute left-4 top-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${status.className}`}
                                                >
                                                    <StatusIcon className="size-3.5" />
                                                    {status.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 sm:p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        {booking.category}
                                                    </p>

                                                    <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                                                        {booking.roomName}
                                                    </h2>

                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        Confirmation #{booking.confirmationNumber}
                                                    </p>
                                                </div>

                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setMenuBooking(
                                                                menuBooking === booking.id
                                                                    ? null
                                                                    : booking.id
                                                            )
                                                        }
                                                        className="flex size-9 items-center justify-center rounded-full hover:bg-secondary"
                                                        aria-label="Booking actions"
                                                    >
                                                        <MoreHorizontal className="size-5" />
                                                    </button>

                                                    {menuBooking === booking.id && (
                                                        <div className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-border bg-popover p-1 shadow-lg">
                                                            <Link
                                                                href={`/bookings/${booking.id}`}
                                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary"
                                                                onClick={() =>
                                                                    setMenuBooking(null)
                                                                }
                                                            >
                                                                <ExternalLink className="size-4" />
                                                                View booking
                                                            </Link>

                                                            {booking.status === "confirmed" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setCancelBooking(booking);
                                                                        setMenuBooking(null);
                                                                    }}
                                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/5"
                                                                >
                                                                    <XCircle className="size-4" />
                                                                    Cancel booking
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Stay info */}
                                            <div className="mt-6 grid gap-5 sm:grid-cols-3">
                                                <div className="flex gap-3">
                                                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Stay
                                                        </p>

                                                        <p className="mt-1 text-sm font-medium">
                                                            {formatDate(booking.checkIn)}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            to {formatDate(booking.checkOut)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Guests
                                                        </p>

                                                        <p className="mt-1 text-sm font-medium">
                                                            {booking.guests}{" "}
                                                            {booking.guests === 1
                                                                ? "guest"
                                                                : "guests"}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {booking.nights}{" "}
                                                            {booking.nights === 1
                                                                ? "night"
                                                                : "nights"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Staying guest
                                                        </p>

                                                        <p className="mt-1 text-sm font-medium">
                                                            {booking.guestName}
                                                        </p>

                                                        {booking.bookingForSomeoneElse && (
                                                            <p className="text-xs text-muted-foreground">
                                                                Booked for someone else
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom */}
                                            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Total
                                                    </p>

                                                    <p className="text-xl font-semibold">
                                                        ${booking.total.toFixed(2)}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        {getPaymentLabel(
                                                            booking.paymentStatus
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col gap-2 sm:flex-row">
                                                    {booking.status === "completed" && (
                                                        <Link
                                                            href={`/rooms/${booking.roomId}`}
                                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-secondary"
                                                        >
                                                            <RefreshCw className="size-4" />
                                                            Book again
                                                        </Link>
                                                    )}

                                                    {booking.status === "confirmed" && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setCancelBooking(booking)
                                                            }
                                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-destructive/30 px-4 text-sm font-medium text-destructive transition hover:bg-destructive/5"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}

                                                    <Link
                                                        href={`/bookings/${booking.id}`}
                                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                                                    >
                                                        View booking
                                                        <ChevronRight className="size-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <EmptyBookingsState
                        tab={activeTab}
                        hasSearch={Boolean(search.trim())}
                        onClearSearch={() => setSearch("")}
                    />
                )}
            </div>

            {/* Cancel confirmation */}
            {cancelBooking && (
                <CancelBookingDialog
                    booking={cancelBooking}
                    onClose={() => setCancelBooking(null)}
                />
            )}
        </main>
    );
}

function BookingTab({
    label,
    count,
    active,
    onClick,
}: {
    label: string;
    count: number;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative flex h-12 items-center gap-2 text-sm font-medium transition ${active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
        >
            {label}

            <span
                className={`rounded-full px-2 py-0.5 text-xs ${active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
            >
                {count}
            </span>

            {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
            )}
        </button>
    );
}

function EmptyBookingsState({
    tab,
    hasSearch,
    onClearSearch,
}: {
    tab: FilterTab;
    hasSearch: boolean;
    onClearSearch: () => void;
}) {
    const title = hasSearch
        ? "No matching bookings"
        : tab === "upcoming"
            ? "No upcoming stays"
            : tab === "past"
                ? "No past stays"
                : "No cancelled bookings";

    const description = hasSearch
        ? "Try searching with a different room name, guest name, or confirmation number."
        : tab === "upcoming"
            ? "When you make a reservation, your upcoming stays will appear here."
            : tab === "past"
                ? "Your completed Velora Hotels stays will appear here."
                : "Cancelled reservations will appear here.";

    return (
        <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary">
                <CalendarDays className="size-6" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
                {title}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                {hasSearch ? (
                    <button
                        type="button"
                        onClick={onClearSearch}
                        className="inline-flex h-10 items-center justify-center rounded-xl border border-border px-4 text-sm font-medium hover:bg-secondary"
                    >
                        Clear search
                    </button>
                ) : (
                    <Link
                        href="/rooms"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
                    >
                        Find a room
                        <ArrowRight className="size-4" />
                    </Link>
                )}
            </div>
        </div>
    );
}

function CancelBookingDialog({
    booking,
    onClose,
}: {
    booking: Booking;
    onClose: () => void;
}) {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        setLoading(true);

        /*
         * Later this becomes:
         *
         * await fetch(
         *   `${API_URL}/api/bookings/${booking.id}/cancel`,
         *   {
         *     method: "POST",
         *     credentials: "include",
         *   }
         * );
         *
         * Then refresh the booking list.
         */

        await new Promise((resolve) =>
            setTimeout(resolve, 700)
        );

        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl">
                <h2 className="text-xl font-semibold">
                    Cancel this reservation?
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    You&#39;re about to cancel your reservation for{" "}
                    <strong className="text-foreground">
                        {booking.roomName}
                    </strong>{" "}
                    with confirmation number{" "}
                    <strong className="text-foreground">
                        {booking.confirmationNumber}
                    </strong>
                    .
                </p>

                <div className="mt-5 rounded-2xl bg-secondary/60 p-4 text-sm">
                    <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">
                            Check-in
                        </span>
                        <span className="font-medium">
                            {new Intl.DateTimeFormat("en-US", {
                                dateStyle: "medium",
                            }).format(
                                new Date(`${booking.checkIn}T00:00:00`)
                            )}
                        </span>
                    </div>

                    <div className="mt-2 flex justify-between gap-4">
                        <span className="text-muted-foreground">
                            Total
                        </span>
                        <span className="font-medium">
                            ${booking.total.toFixed(2)}
                        </span>
                    </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    Any refund will be determined by the applicable
                    cancellation policy.
                </p>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="h-10 rounded-xl border border-border px-4 text-sm font-medium hover:bg-secondary disabled:opacity-50"
                    >
                        Keep reservation
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="h-10 rounded-xl bg-destructive px-4 text-sm font-semibold text-white disabled:opacity-50"
                    >
                        {loading ? "Cancelling..." : "Cancel reservation"}
                    </button>
                </div>
            </div>
        </div>
    );
}