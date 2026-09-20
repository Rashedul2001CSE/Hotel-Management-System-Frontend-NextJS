"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { experiences } from "@/lib/hotel-mock-data";

export function ExperiencesSection() {
  return (
    <section className="bg-muted/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              More than a room
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Make your stay
              <span className="italic"> memorable.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            From sunrise breakfasts to quiet evenings by the water, discover
            experiences designed to make ordinary days feel extraordinary.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[0.82] overflow-hidden rounded-[2rem]"
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <h3 className="font-serif text-2xl">
                      {experience.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {experience.description}
                    </p>
                  </div>

                  <button
                    aria-label={`Explore ${experience.title}`}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition-colors group-hover:bg-white group-hover:text-black"
                  >
                    <ArrowUpRight className="size-5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}