"use client";

import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

import { testimonials } from "@/lib/hotel-mock-data";

export function TestimonialsSection() {
    return (
        <section className="bg-foreground py-24 text-background sm:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="text-center">
                    <p className="text-sm font-semibold tracking-[0.18em] uppercase opacity-60">
                        Guestbook
                    </p>

                    <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">
                        The best part of a hotel is how it makes you feel.
                    </h2>
                </div>

                <div className="mt-14 grid gap-5 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.article
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="rounded-[2rem] border border-background/10 bg-background/5 p-7"
                        >
                            <Quote className="size-8 opacity-40" />

                            <div className="mt-8 flex gap-1">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="size-4 fill-current" />
                                ))}
                            </div>

                            <p className="mt-5 text-lg leading-8 opacity-80">
                                “{testimonial.text}”
                            </p>

                            <div className="mt-8 border-t border-background/10 pt-5">
                                <p className="font-medium">{testimonial.name}</p>
                                <p className="mt-1 text-sm opacity-50">
                                    {testimonial.location}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}