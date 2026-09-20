"use client";

import { ArrowRight } from "lucide-react";

export function HotelCta() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-20 text-primary-foreground sm:px-12 sm:py-24 lg:px-20">
        <div className="absolute -right-32 -top-32 size-96 rounded-full border border-current/10" />
        <div className="absolute -bottom-40 -left-20 size-96 rounded-full border border-current/10" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase opacity-70">
            Your next escape
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
            Your room is waiting.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 opacity-75">
            Choose your dates, find your perfect room, and let us take care of
            the rest.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("rooms")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:scale-[1.02]"
          >
            Explore rooms
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}