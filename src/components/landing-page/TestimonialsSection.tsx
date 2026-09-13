"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  { quote: "An absolutely magical experience! The attention to detail, luxurious amenities, and breathtaking views made our anniversary unforgettable. The staff went above and beyond to make us feel special.", name: "Sarah Mitchell", location: "New York, USA" },
  { quote: "The business facilities are world-class, and the spa is simply divine. Perfect for combining work and relaxation. I'll definitely be returning for future business trips.", name: "James Rodriguez", location: "London, UK" },
  { quote: "Our family vacation was perfect! The kids loved the pool, we enjoyed the fine dining, and the concierge helped us discover amazing local attractions. Truly a five-star experience.", name: "Maria Lopez", location: "Barcelona, Spain" },
];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 10000, stopOnInteraction: false })]);
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(() => { if (emblaApi) setSelected(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (!emblaApi) return; emblaApi.on("select", onSelect); return () => { emblaApi.off("select", onSelect); }; }, [emblaApi, onSelect]);

  return <section className="py-20"><div className="container mx-auto px-4"><header className="mb-16 text-center"><h2 className="mb-6 text-4xl font-bold gradient-text md:text-5xl">Guest Experiences</h2><p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">Discover what our guests say about their unforgettable stays at Hotel Rose</p></header><div className="relative mx-auto max-w-4xl"><div className="overflow-hidden" ref={emblaRef}><div className="flex">{testimonials.map(t => <div key={t.name} className="min-w-0 flex-[0_0_100%]"><article className="glass-morphism-strong neon-border-strong rounded-3xl p-8 text-center md:p-12"><div className="mb-8"><div className="mb-6 flex justify-center gap-1">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}</div><blockquote className="mb-8 text-2xl font-light italic text-gray-700 dark:text-gray-300 md:text-3xl">“{t.quote}”</blockquote></div><div className="flex items-center justify-center gap-4"><div className="glass-morphism neon-border h-16 w-16 overflow-hidden rounded-full"><Image src="/TempPictures/hero-1.jpeg" alt="" width={128} height={128} className="h-full w-full object-cover" /></div><div className="text-left"><h4 className="text-lg font-bold gradient-text">{t.name}</h4><p className="text-gray-500 dark:text-gray-400">{t.location}</p></div></div></article></div>)}</div></div><button type="button" aria-label="Previous testimonial" onClick={() => emblaApi?.scrollPrev()} className="carousel-control glass-morphism left-4"><ChevronLeft /></button><button type="button" aria-label="Next testimonial" onClick={() => emblaApi?.scrollNext()} className="carousel-control glass-morphism right-4"><ChevronRight /></button><div className="mt-8 flex justify-center gap-3">{testimonials.map((t, i) => <button key={t.name} type="button" aria-label={`Go to ${t.name}'s testimonial`} onClick={() => emblaApi?.scrollTo(i)} className={`h-3 w-3 rounded-full ${selected === i ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`} />)}</div></div></div></section>;
}
