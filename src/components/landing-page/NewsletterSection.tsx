"use client";

import { Reveal } from "./Reveal";
import { CalendarDays, Phone, Send, Star } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(`Thanks! ${email} has been subscribed.`);
    setEmail("");
  };

  return (
    <Reveal className="py-20"><section>
      <div className="container mx-auto px-4">
        <div className="glass-morphism-strong neon-border-strong relative overflow-hidden rounded-3xl p-12 text-center md:p-20">
          <div className="absolute inset-0 opacity-10"><div className="absolute left-10 top-10 h-32 w-32 rounded-full border-2 border-blue-500 animate-pulse" /><div className="absolute bottom-10 right-10 h-24 w-24 rounded-full border-2 border-purple-500 animate-pulse [animation-delay:1s]" /><div className="absolute left-1/4 top-1/2 h-16 w-16 rounded-full border-2 border-cyan-500 animate-pulse [animation-delay:2s]" /><div className="absolute right-1/4 top-1/4 h-20 w-20 rounded-full border-2 border-pink-500 animate-pulse [animation-delay:3s]" /></div>
          <div className="relative z-10">
            <h2 className="mb-8 text-4xl font-bold gradient-text-rainbow md:text-5xl lg:text-6xl">Ready for Your Dream Getaway?</h2>
            <p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:text-2xl">Join thousands of satisfied guests who have experienced the magic of Hotel Rose. Subscribe to our newsletter for exclusive offers, insider tips, and early access to special events.</p>
            <form onSubmit={submit} className="mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center gap-6 md:flex-row">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="field w-full rounded-full px-8 py-4 text-lg md:flex-1" />
              <button type="submit" className="btn-futuristic px-10 py-4 text-lg"><span className="flex items-center gap-3">Subscribe Now<Send className="h-6 w-6" /></span></button>
            </form>
            {message && <p role="status" className="mb-8 text-sm text-gray-600 dark:text-gray-300">{message}</p>}

            <div className="mb-12 flex flex-col items-center justify-center gap-8 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {Array.from({ length: 4 }, (_, i) => <div key={i} className="glass-morphism h-12 w-12 overflow-hidden rounded-full border-2 border-white"><img src="/TempPictures/hero-1.jpeg" alt="" className="h-full w-full object-cover" /></div>)}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white">+5K</div>
                </div>
                <div className="text-left"><p className="font-bold text-gray-700 dark:text-gray-300">5,000+ Happy Guests</p><p className="text-sm text-gray-500 dark:text-gray-400">Join our community</p></div>
              </div>
              <div className="flex items-center gap-2">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}<span className="font-bold text-gray-700 dark:text-gray-300">4.9/5</span><span className="text-gray-500 dark:text-gray-400">(2,847 reviews)</span></div>
            </div>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <button type="button" className="btn-futuristic px-12 py-4 text-lg"><span className="flex items-center gap-3"><CalendarDays className="h-6 w-6" />Book Your Stay</span></button>
              <button type="button" className="btn-outline px-12 py-4 text-lg"><span className="flex items-center gap-3"><Phone className="h-6 w-6" />Contact Us</span></button>
            </div>
          </div>
        </div>
      </div>
    </section></Reveal>
  );
}
