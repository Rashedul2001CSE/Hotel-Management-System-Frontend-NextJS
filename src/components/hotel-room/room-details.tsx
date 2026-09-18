"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  Expand,
  Home,
  MapPin,
  Share2,
  Star,
  Users,
  Wifi,
  X,
} from "lucide-react";

type Room = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  maxGuests: number;
  size: string;
  beds: string;
  description: string;
  images: string[];
  amenities: string[];
};

type Props = {
  room: Room;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: number;
};

export default function RoomDetails({
  room,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: Props) {
  const router = useRouter();

  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(
    Math.min(Math.max(initialGuests || 1, 1), room.maxGuests)
  );

  const nextImage = () => {
    setActiveImage((current) => (current + 1) % room.images.length);
  };

  const previousImage = () => {
    setActiveImage(
      (current) => (current - 1 + room.images.length) % room.images.length
    );
  };

  const handleBook = () => {
    const params = new URLSearchParams();

    params.set("room", room.id);

    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);

    params.set("guests", String(guests));

    router.push(`/checkout?${params.toString()}`);
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: `${room.name} | Velora Hotels`,
        text: `Take a look at ${room.name} at Velora Hotels.`,
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="hotel-container py-6">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to rooms
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="hotel-container py-6 sm:py-8">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl text-left"
          >
            <Image
              src={room.images[activeImage]}
              alt={room.name}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

            <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
              <Expand className="size-3.5" />
              View gallery
            </span>
          </button>

          <div className="hidden grid-cols-2 gap-3 lg:grid">
            {room.images.slice(1, 5).map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => {
                  setActiveImage(index + 1);
                  setLightbox(true);
                }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Image
                  src={image}
                  alt={`${room.name} ${index + 2}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="hotel-container pb-16 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                {room.category}
              </span>

              <div className="flex items-center gap-1 text-sm">
                <Star className="size-4 fill-current" />
                <strong>{room.rating}</strong>
                <span className="text-muted-foreground">
                  ({room.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="hotel-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  {room.name}
                </h1>

                <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Home className="size-4" />
                    {room.size}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <BedDouble className="size-4" />
                    {room.beds}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Users className="size-4" />
                    Up to {room.maxGuests} guests
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition hover:bg-secondary"
                aria-label="Share room"
              >
                <Share2 className="size-4" />
              </button>
            </div>

            <div className="my-10 h-px bg-border" />

            <div>
              <h2 className="text-xl font-semibold">About this room</h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                {room.description}
              </p>
            </div>

            <div className="my-10 h-px bg-border" />

            <div>
              <h2 className="text-xl font-semibold">Room amenities</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-secondary">
                      <Check className="size-4 text-primary" />
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="my-10 h-px bg-border" />

            <div>
              <h2 className="text-xl font-semibold">Your stay includes</h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <Wifi className="size-5" />
                  <p className="mt-3 font-medium">High-speed Wi-Fi</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complimentary throughout the hotel.
                  </p>
                </div>

                <div>
                  <Coffee className="size-5" />
                  <p className="mt-3 font-medium">Dining options</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Thoughtful dining experiences nearby.
                  </p>
                </div>

                <div>
                  <Clock3 className="size-5" />
                  <p className="mt-3 font-medium">24/7 support</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our team is available whenever you need us.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking card */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-3xl font-semibold">
                    ${room.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / night
                  </span>
                </div>

                <span className="text-sm text-muted-foreground">
                  {room.maxGuests} max guests
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                <label className="text-sm font-medium">
                  Check-in
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                  />
                </label>

                <label className="text-sm font-medium">
                  Check-out
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || undefined}
                    onChange={(event) => setCheckOut(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
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

              <button
                type="button"
                onClick={handleBook}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Continue to checkout
                <ArrowRight className="size-4" />
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                You will review your reservation before confirming.
              </p>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-secondary/60 p-4 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <div>
                <p className="font-medium">Velora Hotels</p>
                <p className="mt-1 text-muted-foreground">
                  Premium hospitality in the heart of the city.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-5 top-5 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X className="size-5" />
          </button>

          <button
            type="button"
            onClick={previousImage}
            className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>

          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image
              src={room.images[activeImage]}
              alt={room.name}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-md">
            {activeImage + 1} / {room.images.length}
          </div>
        </div>
      )}
    </main>
  );
}