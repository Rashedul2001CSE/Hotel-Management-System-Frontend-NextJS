"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Car,
  Clock3,
  MapPin,
  Plane,
} from "lucide-react";

export function LocationSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.5rem] border bg-muted/40">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[430px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1400&q=85')",
                }}
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-black/30 p-5 text-white backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <MapPin className="size-5" />

                  <div>
                    <p className="text-sm font-semibold">
                      Velora Hotels
                    </p>
                    <p className="mt-1 text-xs text-white/70">
                      18 Rose Avenue, Downtown
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center p-8 sm:p-12 lg:p-16"
            >
              <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                Perfectly placed
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Close to everything.
                <span className="block italic">Away from ordinary.</span>
              </h2>

              <p className="mt-6 leading-7 text-muted-foreground">
                Located in the heart of the city, Velora gives you easy access
                to culture, dining, shopping, and the places worth discovering.
              </p>

              <div className="mt-8 space-y-5">
                <LocationItem
                  icon={<Plane />}
                  title="Airport"
                  value="25 minutes"
                />

                <LocationItem
                  icon={<Car />}
                  title="City Center"
                  value="5 minutes"
                />

                <LocationItem
                  icon={<Clock3 />}
                  title="24/7 Guest Service"
                  value="Always available"
                />
              </div>

              <button className="mt-10 flex w-fit items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background">
                Explore location
                <ArrowUpRight className="size-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-10 items-center justify-center rounded-xl bg-background shadow-sm">
        <span className="text-primary [&>svg]:size-4">{icon}</span>
      </div>

      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}