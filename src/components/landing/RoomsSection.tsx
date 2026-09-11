"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const rooms = [
  { name: "Presidential Suite", price: 899, tags: ["Ocean View", "Balcony", "Jacuzzi"], description: "Experience the pinnacle of luxury in our Presidential Suite. Featuring panoramic ocean views, a private balcony, marble bathroom with jacuzzi, and personalized concierge service.", amenities: ["King Size Bed", "Private Balcony", "24/7 Concierge", "Marble Bathroom"] },
  { name: "Deluxe Ocean Suite", price: 599, tags: ["Ocean View", "Spa Bath"], description: "Indulge in oceanfront luxury with floor-to-ceiling windows, premium amenities, and a spa-inspired bathroom designed for ultimate relaxation.", amenities: ["Queen Size Bed", "Ocean View", "Mini Bar", "Spa Bathroom"] },
];

export function RoomsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(() => { if (emblaApi) setSelected(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (!emblaApi) return; emblaApi.on("select", onSelect); return () => { emblaApi.off("select", onSelect); }; }, [emblaApi, onSelect]);

  return (
    <section id="rooms" className="py-20">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center"><h2 className="mb-6 text-4xl font-bold gradient-text md:text-5xl">Signature Suites</h2><p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">Discover our most exclusive accommodations, each designed to provide an unforgettable experience</p></header>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}><div className="flex">
            {rooms.map((room) => <div key={room.name} className="min-w-0 flex-[0_0_100%] pl-1"><div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"><div className="relative"><div className="glass-morphism-strong neon-border-strong overflow-hidden rounded-3xl"><Image src="/TempPictures/hero-1.jpeg" alt={room.name} width={960} height={640} className="h-96 w-full object-cover transition-transform duration-700 hover:scale-110" /></div><div className="absolute left-4 top-4 flex flex-wrap gap-2">{room.tags.map(tag => <span key={tag} className="glass-morphism rounded-full px-3 py-1 text-sm font-medium text-white">{tag}</span>)}</div></div><div className="space-y-6"><div><h3 className="mb-4 text-3xl font-bold gradient-text md:text-4xl">{room.name}</h3><p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{room.description}</p></div><div className="grid grid-cols-2 gap-4">{room.amenities.map(a => <div key={a} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500"><Check className="h-4 w-4 text-white" /></span><span className="text-gray-600 dark:text-gray-300">{a}</span></div>)}</div><div className="flex items-center justify-between"><div><span className="text-3xl font-bold gradient-text">${room.price}</span><span className="text-gray-500 dark:text-gray-400">/night</span></div><button type="button" className="btn-futuristic">Book Now</button></div></div></div></div>)}
          </div></div>
          <button type="button" aria-label="Previous room" onClick={() => emblaApi?.scrollPrev()} className="carousel-control glass-morphism left-4"><ChevronLeft /></button><button type="button" aria-label="Next room" onClick={() => emblaApi?.scrollNext()} className="carousel-control glass-morphism right-4"><ChevronRight /></button>
          <div className="mt-8 flex justify-center gap-3">{rooms.map((room, index) => <button key={room.name} type="button" aria-label={`Go to ${room.name}`} onClick={() => emblaApi?.scrollTo(index)} className={`h-3 w-3 rounded-full transition-all ${selected === index ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`} />)}</div>
        </div>
      </div>
    </section>
  );
}
