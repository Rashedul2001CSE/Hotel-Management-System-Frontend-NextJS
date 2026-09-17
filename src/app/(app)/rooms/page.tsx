// app/rooms/page.tsx
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useState, useTransition, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Users,
  Maximize2,
  Check,
  X,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import { MOCK_ROOMS, ALL_AMENITIES } from '@/lib/mock-rooms';
import { formatCurrency, cn } from '@/lib/utils';

function RoomsContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract query filters directly from searchParams
  const search = searchParams.get('search') || '';
  const typeParam = searchParams.get('type') || 'all';
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 1000;
  const capacityParam = Number(searchParams.get('capacity')) || 1;
  const selectedAmenities = useMemo(
    () => searchParams.getAll('amenity'),
    [searchParams]
  );
  const sortBy = searchParams.get('sort') || 'recommended';

  // Helper to instantly update URL search parameters
  const updateParams = (newParams: Record<string, string | string[] | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        current.delete(key);
      } else if (Array.isArray(value)) {
        current.delete(key);
        value.forEach((v) => current.append(key, v));
      } else {
        current.set(key, value);
      }
    });

    const searchStr = current.toString();
    const query = searchStr ? `?${searchStr}` : '';
    startTransition(() => {
      router.push(`${pathname}${query}`, { scroll: false });
    });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = selectedAmenities.includes(amenity);
    const updated = exists
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    updateParams({ amenity: updated });
  };

  const clearAllFiltersAndSearch = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const isFiltered =
    search !== '' ||
    typeParam !== 'all' ||
    maxPriceParam < 1000 ||
    capacityParam > 1 ||
    selectedAmenities.length > 0;

  // Filtered & Sorted Rooms Logic
  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter((room) => {
      if (search && !room.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeParam !== 'all' && room.type !== typeParam) return false;
      if (room.pricePerNight > maxPriceParam) return false;
      if (room.capacity < capacityParam) return false;
      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((a) => room.amenities.includes(a))
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [search, typeParam, maxPriceParam, capacityParam, selectedAmenities, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Find Your Perfect Stay
        </h1>
        <p className="mt-2 text-muted-foreground text-base">
          Browse luxury suites, executive rooms, and cozy penthouses tailored to your comfort.
        </p>
      </div>

      {/* Top Search Bar & Clear Button */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateParams({ search: e.target.value })}
              placeholder="Search by room name or feature..."
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {search && (
              <button
                onClick={() => updateParams({ search: null })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {isFiltered && (
            <button
              onClick={clearAllFiltersAndSearch}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs font-semibold text-destructive hover:bg-destructive/20 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear All
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex lg:hidden items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-card-foreground"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="bg-transparent focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <aside
          className={cn(
            'fixed inset-0 z-50 bg-background/90 backdrop-blur-md p-6 overflow-y-auto transition-transform lg:static lg:z-0 lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:block',
            isFilterOpen ? 'block' : 'hidden lg:block'
          )}
        >
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h2 className="text-lg font-bold">Filter Options</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-1 rounded-md hover:bg-accent">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-semibold text-base flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </span>
              {isFiltered && (
                <button
                  onClick={clearAllFiltersAndSearch}
                  className="text-xs text-destructive hover:underline font-medium flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Clear All
                </button>
              )}
            </div>

            {/* Room Type */}
            <div>
              <label className="mb-2 block text-sm font-medium">Room Category</label>
              <select
                value={typeParam}
                onChange={(e) => updateParams({ type: e.target.value })}
                className="w-full rounded-md border border-border bg-background p-2 text-sm focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Types</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
                <option value="penthouse">Penthouse</option>
                <option value="double">Double</option>
                <option value="single">Single</option>
              </select>
            </div>

            {/* Max Price Range */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Max Nightly Rate</span>
                <span className="text-muted-foreground">{formatCurrency(maxPriceParam)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={maxPriceParam}
                onChange={(e) => updateParams({ maxPrice: e.target.value })}
                className="w-full accent-primary"
              />
            </div>

            {/* Minimum Capacity */}
            <div>
              <label className="mb-2 block text-sm font-medium">Minimum Guests</label>
              <input
                type="number"
                min="1"
                max="10"
                value={capacityParam}
                onChange={(e) => updateParams({ capacity: e.target.value })}
                className="w-full rounded-md border border-border bg-background p-2 text-sm focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Amenities Checkboxes */}
            <div>
              <label className="mb-2 block text-sm font-medium">Amenities</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {ALL_AMENITIES.map((amenity) => {
                  const checked = selectedAmenities.includes(amenity);
                  return (
                    <label key={amenity} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded border-border text-primary focus:ring-ring h-4 w-4"
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Room Grid */}
        <main className="lg:col-span-3">
          {filteredRooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-lg font-medium text-foreground">No matching rooms found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try clearing your search terms or lowering your filter conditions.
              </p>
              <button
                onClick={clearAllFiltersAndSearch}
                className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="h-4 w-4" /> Reset Filters & Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AnimatePresence>
                {filteredRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                        <Image
                          src={room.images[0]}
                          alt={room.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {room.featured && (
                          <span className="absolute top-3 left-3 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary-foreground">
                            Featured
                          </span>
                        )}
                        <div className="absolute bottom-3 right-3 rounded-md bg-background/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-foreground flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span>{room.rating}</span>
                          <span className="text-muted-foreground">({room.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> Up to {room.capacity} Guests
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Maximize2 className="h-3.5 w-3.5" /> {room.sizeSqFt} sq ft
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {room.title}
                        </h2>

                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                          {room.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {room.amenities.slice(0, 3).map((amenity) => (
                            <span
                              key={amenity}
                              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                            >
                              <Check className="h-3 w-3 text-emerald-500" /> {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border px-5 py-4 mt-2">
                      <div>
                        <span className="text-lg font-bold text-foreground">
                          {formatCurrency(room.pricePerNight)}
                        </span>
                        <span className="text-xs text-muted-foreground"> / night</span>
                      </div>
                      <Link
                        href={`/rooms/${room.id}`}
                        className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center">Loading rooms...</div>}>
      <RoomsContent />
    </Suspense>
  );
}