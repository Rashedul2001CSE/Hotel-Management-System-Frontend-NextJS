"use client";

import { Plus } from "lucide-react";

import { faqs } from "@/lib/hotel-mock-data";

export function FaqSection() {
  return (
    <section className="border-t py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
            Good to know
          </p>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            Frequently asked questions.
          </h2>

          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
            Everything you need to know before your stay.
          </p>
        </div>

        <div className="divide-y rounded-3xl border px-6">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-medium marker:hidden">
                {faq.question}

                <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" />
              </summary>

              <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}