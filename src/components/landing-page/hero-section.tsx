"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, CalendarDays, Users, ArrowRight } from "lucide-react";
import { format } from "date-fns";

import { rooms } from "@/lib/hotel-mock-data";

export function HeroSection() {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("2");

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        params.set("guests", guests);

        document
            .getElementById("rooms")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="relative min-h-[780px] overflow-hidden lg:min-h-[850px]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90')",
                }}
            />

            <div className="absolute inset-0 bg-black/45 dark:bg-black/55" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

            <div className="relative mx-auto flex min-h-[780px] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 sm:px-8 lg:min-h-[850px] lg:px-10 lg:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl text-white"
                >
                    <div className="mb-5 flex items-center gap-3 text-sm font-medium tracking-[0.2em] uppercase text-white/80">
                        <span className="h-px w-10 bg-white/70" />
                        A refined stay awaits
                    </div>

                    <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
                        Stay somewhere
                        <span className="block italic text-white/80">beautiful.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                        Thoughtfully designed rooms, unforgettable experiences, and
                        effortless hospitality—all in one place.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-10"
                >
                    <div className="rounded-3xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:bg-neutral-950/90 sm:p-4">
                        <div className="grid gap-2 lg:grid-cols-[1fr_1fr_0.8fr_auto]">
                            <BookingField
                                icon={<CalendarDays className="size-5" />}
                                label="Check in"
                                value={checkIn}
                                type="date"
                                onChange={setCheckIn}
                            />

                            <BookingField
                                icon={<CalendarDays className="size-5" />}
                                label="Check out"
                                value={checkOut}
                                type="date"
                                onChange={setCheckOut}
                            />

                            <BookingField
                                icon={<Users className="size-5" />}
                                label="Guests"
                                value={guests}
                                type="number"
                                onChange={setGuests}
                            />

                            <button
                                onClick={handleSearch}
                                className="group flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-foreground px-7 text-background transition-all hover:scale-[1.01] hover:opacity-90"
                            >
                                <Search className="size-5" />
                                <span className="font-medium">Find a room</span>
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                        <span>✓ Best available rates</span>
                        <span>✓ Secure booking</span>
                        <span>✓ Flexible options</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function BookingField({
    icon,
    label,
    value,
    type,
    onChange,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    type: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="flex min-h-16 cursor-text items-center gap-3 rounded-2xl px-4 transition-colors hover:bg-muted/70">
            <span className="text-muted-foreground">{icon}</span>

            <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-xs font-medium text-muted-foreground">
                    {label}
                </span>

                <input
                    type={type}
                    value={value}
                    min={type === "number" ? 1 : undefined}
                    max={type === "number" ? 10 : undefined}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full border-0 bg-transparent p-0 text-sm font-medium outline-none"
                    aria-label={label}
                />
            </span>
        </label>
    );
}