// app/checkout/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, use, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    User,
    Mail,
    Phone,
    CreditCard,
    Lock,
    CheckCircle2,
    Calendar,
    Users,
    ChevronLeft,
    FileText,
    UserCheck,
} from 'lucide-react';
import { getRoomById } from '@/lib/mock-rooms';
import { formatCurrency } from '@/lib/utils';
import { differenceInDays, parseISO } from 'date-fns';

// Default mock guest profile (Simulating logged-in user data)
const INITIAL_ACCOUNT_GUEST = {
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 019-2834',
    identityId: 'PASSPORT-A9823411',
    specialRequests: 'High floor away from the elevator if possible.',
};

function CheckoutContent() {
    const searchParams = useSearchParams();

    const roomId = searchParams.get('roomId') || 'room-101';
    const checkIn = searchParams.get('checkIn') || '2026-10-01';
    const checkOut = searchParams.get('checkOut') || '2026-10-05';
    const guests = Number(searchParams.get('guests')) || 2;

    const room = use(getRoomById(roomId)) || use(getRoomById('room-101'))!;

    // Guest Form State
    const [isBookingForSomeoneElse, setIsBookingForSomeoneElse] = useState(false);
    const [guestDetails, setGuestDetails] = useState(INITIAL_ACCOUNT_GUEST);

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '•••• •••• •••• 4242',
        expiry: '12/28',
        cvv: '123',
        cardName: 'Alex Vance',
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const totalNights = Math.max(
        1,
        differenceInDays(parseISO(checkOut), parseISO(checkIn)) || 1
    );
    const basePrice = room.pricePerNight * totalNights;
    const serviceFee = Math.round(basePrice * 0.1);
    const grandTotal = basePrice + serviceFee;

    const handleGuestInputChange = (field: string, value: string) => {
        setGuestDetails((prev) => ({ ...prev, [field]: value }));
    };

    const handleBookingForSelf = () => {
        setIsBookingForSomeoneElse(false);
        setGuestDetails(INITIAL_ACCOUNT_GUEST);
    };

    const handleBookingForOthers = () => {
        setIsBookingForSomeoneElse(true);
        setGuestDetails({
            fullName: '',
            email: '',
            phone: '',
            identityId: '',
            specialRequests: '',
        });
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setIsConfirmed(true);
        }, 1500);
    };

    if (isConfirmed) {
        return (
            <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
                <div className="rounded-2xl border border-border bg-card p-8 shadow-lg space-y-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-foreground">Reservation Confirmed!</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Confirmation receipt has been sent to <strong>{guestDetails.email}</strong>.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/40 p-4 text-left space-y-2 text-xs">
                        <div className="flex justify-between border-b border-border pb-2">
                            <span className="text-muted-foreground">Booking Reference</span>
                            <span className="font-mono font-bold text-foreground">#AH-2026-9812</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Primary Guest</span>
                            <span className="font-semibold text-foreground">{guestDetails.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">ID / Passport Verification</span>
                            <span className="font-mono text-foreground">{guestDetails.identityId || 'Verified'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Room</span>
                            <span className="text-foreground">{room.title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Dates</span>
                            <span className="text-foreground">{checkIn} to {checkOut} ({totalNights} nights)</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 text-sm font-bold">
                            <span>Amount Paid</span>
                            <span className="text-primary">{formatCurrency(grandTotal)}</span>
                        </div>
                    </div>

                    <Link
                        href="/rooms"
                        className="inline-block w-full rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                        Return to Explore Rooms
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 max-w-6xl">
            <Link
                href={`/rooms/${room.id}`}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ChevronLeft className="h-4 w-4" /> Back to room details
            </Link>

            <h1 className="text-2xl font-extrabold text-foreground mb-6">Review & Complete Booking</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column - Form Steps */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Step 1: Guest Identity & Details */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-2">
                            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                                <UserCheck className="h-5 w-5 text-primary" /> Guest Information
                            </h2>

                            {/* Selection Toggle: For Self vs Other */}
                            <div className="flex rounded-lg bg-muted p-1 text-xs font-medium">
                                <button
                                    type="button"
                                    onClick={handleBookingForSelf}
                                    className={`rounded-md px-3 py-1.5 transition-colors ${!isBookingForSomeoneElse
                                            ? 'bg-background font-semibold text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Booking for myself
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBookingForOthers}
                                    className={`rounded-md px-3 py-1.5 transition-colors ${isBookingForSomeoneElse
                                            ? 'bg-background font-semibold text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Booking for someone else
                                </button>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Full Name (Primary Guest)
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={guestDetails.fullName}
                                        onChange={(e) => handleGuestInputChange('fullName', e.target.value)}
                                        required
                                        placeholder="Enter guest's full name"
                                        className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={guestDetails.email}
                                        onChange={(e) => handleGuestInputChange('email', e.target.value)}
                                        required
                                        placeholder="guest@example.com"
                                        className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="tel"
                                        value={guestDetails.phone}
                                        onChange={(e) => handleGuestInputChange('phone', e.target.value)}
                                        required
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    National ID / Passport Number
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={guestDetails.identityId}
                                        onChange={(e) => handleGuestInputChange('identityId', e.target.value)}
                                        required
                                        placeholder="ID or Passport Number"
                                        className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Special Requests (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    value={guestDetails.specialRequests}
                                    onChange={(e) => handleGuestInputChange('specialRequests', e.target.value)}
                                    placeholder="Quiet room, late check-in, dietary restrictions..."
                                    className="w-full rounded-md border border-border bg-background p-2.5 text-xs text-foreground focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Step 2: Payment Section */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                        <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-4">
                            <CreditCard className="h-5 w-5 text-primary" /> Payment Options
                        </h2>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 rounded-xl border p-3 text-xs font-semibold flex items-center justify-center gap-2 ${paymentMethod === 'card'
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border text-muted-foreground'
                                    }`}
                            >
                                <CreditCard className="h-4 w-4" /> Credit / Debit Card
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('paypal')}
                                className={`flex-1 rounded-xl border p-3 text-xs font-semibold flex items-center justify-center gap-2 ${paymentMethod === 'paypal'
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border text-muted-foreground'
                                    }`}
                            >
                                PayPal
                            </button>
                        </div>

                        {paymentMethod === 'card' && (
                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        value={cardDetails.cardName}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                                        required
                                        className="w-full rounded-md border border-border bg-background p-2 text-xs text-foreground"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        value={cardDetails.cardNumber}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                        required
                                        className="w-full rounded-md border border-border bg-background p-2 text-xs text-foreground font-mono"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            value={cardDetails.expiry}
                                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                            placeholder="MM/YY"
                                            required
                                            className="w-full rounded-md border border-border bg-background p-2 text-xs text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                                            CVV / CVC
                                        </label>
                                        <input
                                            type="password"
                                            maxLength={4}
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                            required
                                            className="w-full rounded-md border border-border bg-background p-2 text-xs text-foreground"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full rounded-xl bg-primary py-3.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                                >
                                    <Lock className="h-4 w-4" />
                                    {isProcessing ? 'Processing Payment...' : `Pay ${formatCurrency(grandTotal)} & Confirm`}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Summary Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                        <h3 className="text-sm font-bold text-foreground border-b border-border pb-3">
                            Reservation Summary
                        </h3>

                        <div className="flex gap-3">
                            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                                <Image src={room.images[0]} alt={room.title} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-foreground line-clamp-1">{room.title}</h4>
                                <p className="text-[11px] text-muted-foreground capitalize">{room.type} Room</p>
                                <p className="text-[11px] text-amber-500 font-semibold mt-1">★ {room.rating} Rating</p>
                            </div>
                        </div>

                        <div className="space-y-2 border-t border-border pt-4 text-xs">
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" /> Check-in
                                </span>
                                <span className="font-medium text-foreground">{checkIn}</span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" /> Check-out
                                </span>
                                <span className="font-medium text-foreground">{checkOut}</span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5" /> Guests
                                </span>
                                <span className="font-medium text-foreground">{guests} Person(s)</span>
                            </div>
                        </div>

                        <div className="space-y-2 border-t border-border pt-4 text-xs">
                            <div className="flex justify-between text-muted-foreground">
                                <span>{formatCurrency(room.pricePerNight)} x {totalNights} nights</span>
                                <span>{formatCurrency(basePrice)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Taxes & Fees</span>
                                <span>{formatCurrency(serviceFee)}</span>
                            </div>
                            <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                                <span>Total Amount</span>
                                <span className="text-primary">{formatCurrency(grandTotal)}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="container mx-auto p-8 text-center">Loading checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}