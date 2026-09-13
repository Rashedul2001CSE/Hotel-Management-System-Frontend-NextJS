"use client";

import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { Images } from "lucide-react";

const gallery = [
  ["rooms", "Luxury Suite", "Presidential Collection"],
  ["dining", "Rose Restaurant", "Michelin Star Dining"],
  ["amenities", "Infinity Pool", "Rooftop Paradise"],
  ["exterior", "Hotel Rose", "Architectural Marvel"],
  ["rooms", "Ocean View Room", "Deluxe Collection"],
  ["amenities", "Rose Spa", "Wellness Sanctuary"],
  ["dining", "Sky Lounge", "Rooftop Experience"],
  ["exterior", "Rose Gardens", "Botanical Paradise"],
] as const;

const filters = ["all", "rooms", "dining", "amenities", "exterior"] as const;

export function GallerySection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const items = useMemo(() => filter === "all" ? gallery : gallery.filter(([category]) => category === filter), [filter]);

  return (
    <Reveal className="py-20"><section>
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold gradient-text md:text-5xl">Visual Journey</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">Immerse yourself in the beauty and elegance of Hotel Rose through our curated gallery</p>
        </header>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {filters.map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} className={`gallery-filter glass-morphism neon-border hover-lift rounded-full px-6 py-3 font-medium capitalize ${filter === item ? "active" : "text-gray-600 dark:text-gray-300"}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map(([category, title, subtitle]) => (
            <article key={`${category}-${title}`} className="glass-morphism-strong neon-border hover-lift card-3d group overflow-hidden rounded-3xl">
              <div className="card-3d-inner relative">
                <img src="/TempPictures/hero-1.jpeg" alt={title} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-4 left-4 text-white"><h4 className="text-lg font-bold">{title}</h4><p className="text-sm opacity-90">{subtitle}</p></div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center"><button type="button" className="btn-outline hover-glow"><span className="flex items-center gap-3"><span>View Full Gallery</span><Images className="h-5 w-5" /></span></button></div>
      </div>
    </section></Reveal>
  );
}
