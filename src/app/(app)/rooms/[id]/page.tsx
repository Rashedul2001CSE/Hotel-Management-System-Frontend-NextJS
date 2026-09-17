// app/rooms/[id]/page.tsx
'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import {
  Star,
  Users,
  Maximize2,
  BedDouble,
  Check,
  Calendar,
  ChevronLeft,
} from 'lucide-react';
import { getRoomById } from '@/lib/mock-rooms';
import { formatCurrency } from '@/lib/utils';
import { differenceInDays, parseISO } from 'date-fns';

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const room = use(getRoomById(id));
  const router = useRouter();

  const [checkIn, setCheckIn] = useState('2026-10-01');
  const [checkOut, setCheckOut] = useState('2026-10-05');
  const [guestsCount, setGuestsCount] = useState(2);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) {
    notFound();
  }

  const totalNights = Math.max(
    1,
    differenceInDays(parseISO(checkOut), parseISO(checkIn)) || 1
  );
  const basePrice = room.pricePerNight * totalNights;
  const serviceFee = Math.round(basePrice * 0.1);
  const grandTotal = basePrice + serviceFee;

  const handleProceedToCheckout = () => {
    const query = new URLSearchParams({
      roomId: room.id,
      checkIn,
      checkOut,
      guests: guestsCount.toString(),
    }).toString();

    router.push(`/checkout?${query}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <Link
        href="/rooms"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> Back to all rooms
      </Link>

      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-primary">
            {room.type} Room
          </span>
          <h1 className="text-2xl font-extrabold sm:text-3xl text-foreground mt-1">
            {room.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-amber-500/10 px-2.5 py-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{room.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({room.reviewsCount} guest reviews)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-10">
        <div className="relative aspect-16/10 w-full lg:col-span-2 overflow-hidden rounded-2xl bg-muted border border-border">
          <Image
            src={room.images[activeImageIndex]}
            alt={room.title}
            fill
            className="object-cover transition-all duration-300"
            priority
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {room.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-16/10 w-full overflow-hidden rounded-xl border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`${room.title} preview ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-3 gap-4 rounded-xl border border-border bg-card p-4 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Capacity</span>
              <span className="text-sm font-semibold text-foreground">{room.capacity} Guests</span>
            </div>
            <div className="flex flex-col items-center border-x border-border">
              <Maximize2 className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Area</span>
              <span className="text-sm font-semibold text-foreground">{room.sizeSqFt} sq ft</span>
            </div>
            <div className="flex flex-col items-center">
              <BedDouble className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Bedding</span>
              <span className="text-sm font-semibold text-foreground">{room.bedType}</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">About This Room</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{room.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Included Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-xs font-medium text-card-foreground"
                >
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Reservation Widget */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-md space-y-6">
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <div>
                <span className="text-2xl font-extrabold text-foreground">
                  {formatCurrency(room.pricePerNight)}
                </span>
                <span className="text-xs text-muted-foreground"> / night</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1 items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-md border border-border bg-background p-2 text-xs font-medium text-foreground focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1 items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-md border border-border bg-background p-2 text-xs font-medium text-foreground focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1 items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max={room.capacity}
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full rounded-md border border-border bg-background p-2 text-xs font-medium text-foreground focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>{formatCurrency(room.pricePerNight)} x {totalNights} nights</span>
                <span>{formatCurrency(basePrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Taxes & Service fees</span>
                <span>{formatCurrency(serviceFee)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                <span>Total Due</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}