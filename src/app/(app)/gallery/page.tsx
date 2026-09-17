// app/gallery/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  X,
  ChevronRight,
  Maximize2,
  Filter,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'views' | 'amenities' | 'dining';
  imageUrl: string;
  caption: string;
  aspectRatio: string;
}

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'views', label: 'Views & Scenery' },
  { id: 'amenities', label: 'Facilities & Spa' },
  { id: 'dining', label: 'Dining & Bar' },
] as const;

const MOCK_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Oceanfront Luxury Suite',
    category: 'rooms',
    imageUrl:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Spacious oceanview suite featuring floor-to-ceiling windows.',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'gal-2',
    title: 'Rooftop Infinity Pool',
    category: 'views',
    imageUrl:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Panoramic horizon view from the heated rooftop pool.',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 'gal-3',
    title: 'Gourmet Breakfast Spread',
    category: 'dining',
    imageUrl:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
    caption: 'Freshly prepared daily morning buffet at the main restaurant.',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'gal-4',
    title: 'Hydrotherapy Spa Tub',
    category: 'amenities',
    imageUrl:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    caption: 'Relaxing wellness spa center with full hydrotherapy access.',
    aspectRatio: 'aspect-[1/1]',
  },
  {
    id: 'gal-5',
    title: 'Penthouse Living Lounge',
    category: 'rooms',
    imageUrl:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern luxury setting inside the Sky Penthouse lounge.',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    id: 'gal-6',
    title: 'Sunset Coastal Terrace',
    category: 'views',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Unmatched evening sunset views right over the coastline.',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'gal-7',
    title: 'Cocktail Lounge & Bar',
    category: 'dining',
    imageUrl:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Signature mixology drinks at the seaside evening bar.',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 'gal-8',
    title: 'State-of-the-art Fitness Center',
    category: 'amenities',
    imageUrl:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fully equipped 24/7 fitness center available for all guests.',
    aspectRatio: 'aspect-[4/3]',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = MOCK_GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev as number) - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      {/* Top Header */}
      <div className="mb-8 text-center">
        <span className="flex items-center justify-center gap-1 text-xs uppercase font-bold tracking-widest text-primary mb-2">
          <Sparkles className="h-3.5 w-3.5" /> Visual Experience
        </span>
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          Photo Gallery
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          Take a look inside our suites, relaxing amenities, fine dining areas, and oceanfront views.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-semibold transition-all',
              selectedCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-card-foreground border border-border hover:bg-accent'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all"
            >
              <div className={cn('relative w-full overflow-hidden bg-muted', item.aspectRatio)}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold line-clamp-1">{item.title}</h3>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-white/80">
                    <Maximize2 className="h-3 w-3" /> Click to enlarge
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-50 rounded-full bg-card/40 p-2 text-white hover:bg-card transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous Control */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-50 rounded-full bg-card/40 p-3 text-white hover:bg-card transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Control */}
            <button
              onClick={handleNext}
              className="absolute right-4 z-50 rounded-full bg-card/40 p-3 text-white hover:bg-card transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Active Image Box */}
            <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted border border-border">
                <Image
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 text-center text-white space-y-1">
                <h2 className="text-lg font-bold">
                  {filteredItems[lightboxIndex].title}
                </h2>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  {filteredItems[lightboxIndex].caption}
                </p>
                <span className="inline-block text-[10px] text-white/50 pt-1">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}