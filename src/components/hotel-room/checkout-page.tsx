"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    ChevronDown,
    CreditCard,
    Info,
    LockKeyhole,
    Mail,
    Phone,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ROOMS = [
    {
        id: "deluxe-king-room",
        name: "Deluxe King Room",
        category: "Deluxe",
        price: 185,
        maxGuests: 2,
        size: "420 sq ft",
        beds: "1 King Bed",
        image:
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85",
    },
    {
        id: "premium-suite",
        name: "Premium Suite",
        category: "Suite",
        price: 320,
        maxGuests: 3,
        size: "680 sq ft",
        beds: "1 King Bed + Sofa",
        image:
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=85",
    },
    {
        id: "classic-room",
        name: "Classic Room",
        category: "Standard",
        price: 125,
        maxGuests: 2,
        size: "320 sq ft",
        beds: "1 Queen Bed",
        image:
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85",
    },
    {
        id: "executive-suite",
        name: "Executive Suite",
        category: "Suite",
        price: 275,
        maxGuests: 3,
        size: "610 sq ft",
        beds: "1 King Bed + Sofa",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    },
    {
        id: "family-residence",
        name: "Family Residence",
        category: "Family",
        price: 290,
        maxGuests: 5,
        size: "760 sq ft",
        beds: "1 King + 2 Twin Beds",
        image:
            "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1000&q=85",
    },
    {
        id: "deluxe-twin-room",
        name: "Deluxe Twin Room",
        category: "Deluxe",
        price: 175,
        maxGuests: 2,
        size: "410 sq ft",
        beds: "2 Twin Beds",
        image:
            "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1000&q=85",
    },
    {
        id: "grand-suite",
        name: "Grand Suite",
        category: "Suite",
        price: 450,
        maxGuests: 4,
        size: "980 sq ft",
        beds: "1 King Bed + Sofa",
        image:
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=85",
    },
    {
        id: "family-deluxe-room",
        name: "Family Deluxe Room",
        category: "Family",
        price: 230,
        maxGuests: 4,
        size: "560 sq ft",
        beds: "1 King + 2 Twin Beds",
        image:
            "https://images.unsplash.com/photo-1578898887932-dce23a5959cc?auto=format&fit=crop&w=1000&q=85",
    },
];

type Props = {
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
};

export default function CheckoutPage({
    roomId,
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests: initialGuests,
}: Props) {
    const router = useRouter()
    const room = ROOMS.find((item) => item.id === roomId);

    const [checkIn, setCheckIn] = useState(initialCheckIn);
    const [checkOut, setCheckOut] = useState(initialCheckOut);

    const [guests, setGuests] = useState(
        Math.min(Math.max(initialGuests || 1, 1), room?.maxGuests ?? 1)
    );

    const [bookingForSomeoneElse, setBookingForSomeoneElse] =
        useState(false);

    const [guest, setGuest] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [specialRequests, setSpecialRequests] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("card");

    const [acceptTerms, setAcceptTerms] = useState(false);

    const [error, setError] = useState("");

    const nights = useMemo(() => {
        if (!checkIn || !checkOut) return 1;

        const start = new Date(`${checkIn}T00:00:00`);
        const end = new Date(`${checkOut}T00:00:00`);

        const difference = end.getTime() - start.getTime();

        if (difference <= 0) return 1;

        return Math.ceil(difference / (1000 * 60 * 60 * 24));
    }, [checkIn, checkOut]);

    const roomSubtotal = room ? room.price * nights : 0;

    // Example hotel tax/service calculation.
    // Replace these rates with your actual backend/business rules.
    const taxes = roomSubtotal * 0.1;
    const total = roomSubtotal + taxes;

    const formatDate = (value: string) => {
        if (!value) return "Select date";

        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
        }).format(new Date(`${value}T00:00:00`));
    };

    const updateGuest = (
        field: keyof typeof guest,
        value: string
    ) => {
        setGuest((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        if (!room) {
            setError("The selected room could not be found.");
            return;
        }

        if (!checkIn || !checkOut) {
            setError("Please select your check-in and check-out dates.");
            return;
        }

        if (new Date(`${checkOut}T00:00:00`) <= new Date(`${checkIn}T00:00:00`)) {
            setError("Check-out must be after check-in.");
            return;
        }

        if (
            !guest.firstName.trim() ||
            !guest.lastName.trim() ||
            !guest.email.trim() ||
            !guest.phone.trim()
        ) {
            setError("Please complete the guest information.");
            return;
        }

        if (!acceptTerms) {
            setError("Please accept the reservation terms to continue.");
            return;
        }

        /*
         * IMPORTANT:
         * This is where the real API call should eventually happen.
         *
         * Example:
         *
         * await fetch(`${API_URL}/api/bookings`, {
         *   method: "POST",
         *   credentials: "include",
         *   headers: {
         *     "Content-Type": "application/json",
         *   },
         *   body: JSON.stringify({
         *     roomId: room.id,
         *     checkIn,
         *     checkOut,
         *     guests,
         *     bookingForSomeoneElse,
         *     guest,
         *     specialRequests,
         *     arrivalTime,
         *     paymentMethod,
         *   }),
         * });
         *
         * Then redirect to:
         * /booking/confirmation/[bookingId]
         */

        const booking = {
            roomId: room.id,
            roomName: room.name,
            checkIn,
            checkOut,
            guests,
            nights,
            bookingForSomeoneElse,
            guest,
            specialRequests,
            arrivalTime,
            paymentMethod,
            total,
        };

        sessionStorage.setItem(
            "velora_pending_booking",
            JSON.stringify(booking)
        );

        router.push("/booking/confirmation") ; 
    };

    if (!room) {
        return (
            <main className="flex min-h-screen items-center justify-center px-6">
                <div className="max-w-md text-center">
                    <h1 className="hotel-display text-4xl font-semibold">
                        Room not found
                    </h1>

                    <p className="mt-4 text-muted-foreground">
                        We could not find the room you selected.
                    </p>

                    <Link
                        href="/rooms"
                        className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Browse rooms
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Top bar */}
            <header className="border-b border-border bg-background/95">
                <div className="hotel-container flex h-16 items-center justify-between">
                    <Link
                        href="/rooms"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Back to room
                    </Link>

                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <LockKeyhole className="size-4" />
                        Secure reservation
                    </div>
                </div>
            </header>

            <div className="hotel-container py-8 sm:py-12">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Complete your stay
                    </p>

                    <h1 className="hotel-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Reservation checkout
                    </h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Review your stay and provide the details of the person who will
                        be staying at Velora Hotels.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
                        {/* Form */}
                        <div className="space-y-6">
                            {/* Stay details */}
                            <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                                        <CalendarDays className="size-4" />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Your stay
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Choose the dates and number of guests.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                    <label className="text-sm font-medium">
                                        Check-in
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(event) =>
                                                setCheckIn(event.target.value)
                                            }
                                            className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </label>

                                    <label className="text-sm font-medium">
                                        Check-out
                                        <input
                                            type="date"
                                            min={checkIn || undefined}
                                            value={checkOut}
                                            onChange={(event) =>
                                                setCheckOut(event.target.value)
                                            }
                                            className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </label>

                                    <label className="text-sm font-medium">
                                        Guests
                                        <select
                                            value={guests}
                                            onChange={(event) =>
                                                setGuests(Number(event.target.value))
                                            }
                                            className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            {Array.from(
                                                { length: room.maxGuests },
                                                (_, index) => index + 1
                                            ).map((count) => (
                                                <option key={count} value={count}>
                                                    {count} {count === 1 ? "guest" : "guests"}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </section>

                            {/* Guest */}
                            <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                                        <User className="size-4" />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Guest information
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Who will be staying in the room?
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-border p-4">
                                    <label className="flex cursor-pointer items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={bookingForSomeoneElse}
                                            onChange={(event) =>
                                                setBookingForSomeoneElse(event.target.checked)
                                            }
                                            className="mt-1 size-4 accent-[var(--primary)]"
                                        />

                                        <span>
                                            <span className="block text-sm font-semibold">
                                                I’m booking for someone else
                                            </span>

                                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                                The person staying at the hotel will be different
                                                from the person making the reservation.
                                            </span>
                                        </span>
                                    </label>
                                </div>

                                {bookingForSomeoneElse && (
                                    <div className="mt-5 flex gap-3 rounded-2xl bg-secondary/60 p-4 text-sm">
                                        <Info className="mt-0.5 size-4 shrink-0" />

                                        <p className="leading-6 text-muted-foreground">
                                            The reservation will remain associated with your
                                            account, while the information below identifies the
                                            actual guest staying at the hotel.
                                        </p>
                                    </div>
                                )}

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    <label className="text-sm font-medium">
                                        First name
                                        <input
                                            type="text"
                                            value={guest.firstName}
                                            onChange={(event) =>
                                                updateGuest("firstName", event.target.value)
                                            }
                                            placeholder="First name"
                                            autoComplete="given-name"
                                            className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                        />
                                    </label>

                                    <label className="text-sm font-medium">
                                        Last name
                                        <input
                                            type="text"
                                            value={guest.lastName}
                                            onChange={(event) =>
                                                updateGuest("lastName", event.target.value)
                                            }
                                            placeholder="Last name"
                                            autoComplete="family-name"
                                            className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                        />
                                    </label>

                                    <label className="text-sm font-medium">
                                        Email address
                                        <div className="relative mt-2">
                                            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <input
                                                type="email"
                                                value={guest.email}
                                                onChange={(event) =>
                                                    updateGuest("email", event.target.value)
                                                }
                                                placeholder="guest@example.com"
                                                autoComplete="email"
                                                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </label>

                                    <label className="text-sm font-medium">
                                        Phone number
                                        <div className="relative mt-2">
                                            <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <input
                                                type="tel"
                                                value={guest.phone}
                                                onChange={(event) =>
                                                    updateGuest("phone", event.target.value)
                                                }
                                                placeholder="+880 1XXXXXXXXX"
                                                autoComplete="tel"
                                                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </section>

                            {/* Arrival */}
                            <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
                                <h2 className="text-lg font-semibold">
                                    Arrival & requests
                                </h2>

                                <div className="mt-6 grid gap-5">
                                    <label className="text-sm font-medium">
                                        Estimated arrival time
                                        <div className="relative mt-2">
                                            <select
                                                value={arrivalTime}
                                                onChange={(event) =>
                                                    setArrivalTime(event.target.value)
                                                }
                                                className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
                                            >
                                                <option value="">Select arrival time</option>
                                                <option value="12:00 - 14:00">
                                                    12:00 PM – 2:00 PM
                                                </option>
                                                <option value="14:00 - 16:00">
                                                    2:00 PM – 4:00 PM
                                                </option>
                                                <option value="16:00 - 18:00">
                                                    4:00 PM – 6:00 PM
                                                </option>
                                                <option value="18:00 - 20:00">
                                                    6:00 PM – 8:00 PM
                                                </option>
                                                <option value="20:00 - 22:00">
                                                    8:00 PM – 10:00 PM
                                                </option>
                                                <option value="22:00+">
                                                    After 10:00 PM
                                                </option>
                                            </select>

                                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        </div>
                                    </label>

                                    <label className="text-sm font-medium">
                                        Special requests
                                        <textarea
                                            value={specialRequests}
                                            onChange={(event) =>
                                                setSpecialRequests(event.target.value)
                                            }
                                            rows={4}
                                            placeholder="Anything you'd like us to prepare for your stay?"
                                            className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                        />
                                    </label>
                                </div>
                            </section>

                            {/* Payment */}
                            <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                                        <CreditCard className="size-4" />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Payment
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Select how you would like to complete your
                                            reservation.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3">
                                    <label
                                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${paymentMethod === "card"
                                                ? "border-primary bg-primary/5"
                                                : "border-border"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === "card"}
                                            onChange={(event) =>
                                                setPaymentMethod(event.target.value)
                                            }
                                        />

                                        <CreditCard className="size-5" />

                                        <div>
                                            <p className="text-sm font-semibold">
                                                Credit or debit card
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Secure online payment
                                            </p>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${paymentMethod === "hotel"
                                                ? "border-primary bg-primary/5"
                                                : "border-border"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="hotel"
                                            checked={paymentMethod === "hotel"}
                                            onChange={(event) =>
                                                setPaymentMethod(event.target.value)
                                            }
                                        />

                                        <ShieldCheck className="size-5" />

                                        <div>
                                            <p className="text-sm font-semibold">
                                                Pay at hotel
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Payment handled according to hotel policy
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                <div className="mt-5 flex gap-3 rounded-2xl bg-secondary/60 p-4 text-xs leading-5 text-muted-foreground">
                                    <LockKeyhole className="mt-0.5 size-4 shrink-0" />
                                    Payment details should be processed by your secure
                                    payment provider. Do not store raw card information in
                                    your hotel database.
                                </div>
                            </section>

                            {/* Terms */}
                            <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
                                <label className="flex cursor-pointer items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(event) =>
                                            setAcceptTerms(event.target.checked)
                                        }
                                        className="mt-1 size-4"
                                    />

                                    <span className="text-sm leading-6 text-muted-foreground">
                                        I agree to the reservation terms, cancellation policy,
                                        and hotel policies.
                                    </span>
                                </label>

                                {error && (
                                    <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                                        {error}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Summary */}
                        <aside className="lg:sticky lg:top-24">
                            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                                <div className="relative aspect-[16/10]">
                                    <Image
                                        src={room.image}
                                        alt={room.name}
                                        fill
                                        className="object-cover"
                                        sizes="380px"
                                    />
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                {room.category}
                                            </p>

                                            <h2 className="mt-1 text-xl font-semibold">
                                                {room.name}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="mt-5 space-y-3 border-b border-border pb-5 text-sm">
                                        <div className="flex justify-between gap-4">
                                            <span className="text-muted-foreground">
                                                Check-in
                                            </span>

                                            <span className="font-medium">
                                                {formatDate(checkIn)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="text-muted-foreground">
                                                Check-out
                                            </span>

                                            <span className="font-medium">
                                                {formatDate(checkOut)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="text-muted-foreground">
                                                Guests
                                            </span>

                                            <span className="font-medium">
                                                {guests} {guests === 1 ? "guest" : "guests"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 space-y-3 text-sm">
                                        <div className="flex justify-between gap-4">
                                            <span className="text-muted-foreground">
                                                ${room.price} × {nights}{" "}
                                                {nights === 1 ? "night" : "nights"}
                                            </span>

                                            <span>${roomSubtotal.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="text-muted-foreground">
                                                Taxes & fees
                                            </span>

                                            <span>${taxes.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Total
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Includes taxes & fees
                                            </p>
                                        </div>

                                        <p className="text-2xl font-semibold">
                                            ${total.toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:opacity-90"
                                    >
                                        Confirm reservation
                                        <ArrowRight className="size-4" />
                                    </button>

                                    <div className="mt-4 flex justify-center gap-2 text-xs text-muted-foreground">
                                        <LockKeyhole className="size-3.5" />
                                        Secure reservation
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 rounded-2xl border border-border p-4">
                                <div className="flex gap-3">
                                    <Users className="mt-0.5 size-4 shrink-0" />

                                    <div>
                                        <p className="text-sm font-medium">
                                            Booking for someone else?
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                            That is completely fine. The reservation holder and
                                            staying guest can be different people.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </form>
            </div>
        </main>
    );
}