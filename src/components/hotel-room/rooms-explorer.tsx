"use client";

import Image from "next/image";
import Link from "next/link";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    FiCalendar,
    FiCheck,
    FiChevronDown,
    FiChevronUp,
    FiFilter,
    FiGrid,
    FiList,
    FiMapPin,
    FiSearch,
    FiShare2,
    FiSliders,
    FiUsers,
    FiX,
    FiArrowRight,
    FiHeart,
} from "react-icons/fi";

type RoomCategory =
    | "All"
    | "Standard"
    | "Deluxe"
    | "Suite"
    | "Family";

type SortOption =
    | "recommended"
    | "price-low"
    | "price-high"
    | "capacity"
    | "name";

type Room = {
    id: string;
    name: string;
    category: Exclude<RoomCategory, "All">;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    guests: number;
    beds: string;
    size: string;
    image: string;
    amenities: string[];
    featured?: boolean;
};

const ROOMS: Room[] = [
    {
        id: "velora-deluxe-king",
        name: "Deluxe King Room",
        category: "Deluxe",
        description:
            "A calm and contemporary retreat with a luxurious king bed and thoughtful details.",
        price: 185,
        rating: 4.9,
        reviews: 128,
        guests: 2,
        beds: "1 King Bed",
        size: "42 m²",
        image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "King Bed",
            "Free Wi-Fi",
            "Breakfast",
            "City View",
            "Smart TV",
            "Mini Bar",
        ],
        featured: true,
    },
    {
        id: "velora-premium-suite",
        name: "Premium Suite",
        category: "Suite",
        description:
            "An elegant suite featuring a separate living area, premium furnishings, and panoramic views.",
        price: 320,
        rating: 4.95,
        reviews: 94,
        guests: 3,
        beds: "1 King Bed",
        size: "68 m²",
        image:
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "King Bed",
            "Living Room",
            "Free Wi-Fi",
            "Breakfast",
            "Panoramic View",
            "Mini Bar",
            "Bathtub",
        ],
        featured: true,
    },
    {
        id: "velora-classic-room",
        name: "Classic Room",
        category: "Standard",
        description:
            "A beautifully appointed room offering everything you need for a comfortable stay.",
        price: 125,
        rating: 4.7,
        reviews: 176,
        guests: 2,
        beds: "1 Queen Bed",
        size: "30 m²",
        image:
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "Queen Bed",
            "Free Wi-Fi",
            "Breakfast",
            "Smart TV",
            "Work Desk",
        ],
    },
    {
        id: "velora-executive-suite",
        name: "Executive Suite",
        category: "Suite",
        description:
            "A spacious executive retreat designed for business travelers and extended stays.",
        price: 275,
        rating: 4.88,
        reviews: 81,
        guests: 3,
        beds: "1 King Bed",
        size: "60 m²",
        image:
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "King Bed",
            "Work Area",
            "Free Wi-Fi",
            "Breakfast",
            "Lounge Area",
            "Mini Bar",
        ],
    },
    {
        id: "velora-family-residence",
        name: "Family Residence",
        category: "Family",
        description:
            "Generous space and flexible sleeping arrangements for comfortable family stays.",
        price: 290,
        rating: 4.86,
        reviews: 67,
        guests: 5,
        beds: "1 King + 2 Single",
        size: "72 m²",
        image:
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "King Bed",
            "2 Single Beds",
            "Free Wi-Fi",
            "Breakfast",
            "Kitchenette",
            "Living Area",
        ],
    },
    {
        id: "velora-deluxe-twin",
        name: "Deluxe Twin Room",
        category: "Deluxe",
        description:
            "A refined room with two comfortable beds, ideal for friends or colleagues travelling together.",
        price: 175,
        rating: 4.8,
        reviews: 113,
        guests: 2,
        beds: "2 Twin Beds",
        size: "40 m²",
        image:
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "2 Twin Beds",
            "Free Wi-Fi",
            "Breakfast",
            "City View",
            "Smart TV",
        ],
    },
    {
        id: "velora-grand-suite",
        name: "Grand Suite",
        category: "Suite",
        description:
            "Our signature accommodation with expansive living spaces and elevated in-room amenities.",
        price: 450,
        rating: 4.98,
        reviews: 52,
        guests: 4,
        beds: "1 King Bed",
        size: "105 m²",
        image:
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "King Bed",
            "Separate Living Room",
            "Breakfast",
            "Butler Service",
            "Panoramic View",
            "Bathtub",
            "Mini Bar",
        ],
        featured: true,
    },
    {
        id: "velora-family-deluxe",
        name: "Family Deluxe Room",
        category: "Family",
        description:
            "A warm and spacious room designed to make family holidays effortless and comfortable.",
        price: 230,
        rating: 4.82,
        reviews: 88,
        guests: 4,
        beds: "1 King + 1 Sofa Bed",
        size: "55 m²",
        image:
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
        amenities: [
            "King Bed",
            "Sofa Bed",
            "Free Wi-Fi",
            "Breakfast",
            "Smart TV",
            "Mini Bar",
        ],
    },
];

const CATEGORIES: RoomCategory[] = [
    "All",
    "Standard",
    "Deluxe",
    "Suite",
    "Family",
];

const SORT_OPTIONS: {
    value: SortOption;
    label: string;
}[] = [
        {
            value: "recommended",
            label: "Recommended",
        },
        {
            value: "price-low",
            label: "Price: Low to High",
        },
        {
            value: "price-high",
            label: "Price: High to Low",
        },
        {
            value: "capacity",
            label: "Guest Capacity",
        },
        {
            value: "name",
            label: "Name",
        },
    ];

const AMENITIES = [
    "Free Wi-Fi",
    "Breakfast",
    "King Bed",
    "City View",
    "Bathtub",
    "Mini Bar",
    "Living Area",
];

function parseNumber(
    value: string | null,
    fallback: number
) {
    if (!value) return fallback;

    const number = Number(value);

    return Number.isFinite(number) ? number : fallback;
}

function createQueryString(
    params: URLSearchParams
) {
    const query = params.toString();

    return query ? `?${query}` : "";
}

export default function RoomsExplorer() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /* ---------------------------------------------------------------------- */
    /* URL state                                                              */
    /* ---------------------------------------------------------------------- */

    const search = searchParams.get("search") || "";

    const category =
        (searchParams.get("category") as RoomCategory) || "All";

    const guests = parseNumber(
        searchParams.get("guests"),
        2
    );

    const minPrice = parseNumber(
        searchParams.get("minPrice"),
        0
    );

    const maxPrice = parseNumber(
        searchParams.get("maxPrice"),
        500
    );

    const sort =
        (searchParams.get("sort") as SortOption) ||
        "recommended";

    const checkIn = searchParams.get("checkIn") || "";

    const checkOut = searchParams.get("checkOut") || "";

    const selectedAmenities = searchParams.getAll("amenity");

    /* ---------------------------------------------------------------------- */
    /* Local UI state                                                         */
    /* ---------------------------------------------------------------------- */

    const [searchInput, setSearchInput] = useState(search);

    const [minPriceInput, setMinPriceInput] =
        useState(String(minPrice));

    const [maxPriceInput, setMaxPriceInput] =
        useState(String(maxPrice));

    const [mobileFiltersOpen, setMobileFiltersOpen] =
        useState(false);

    const [advancedOpen, setAdvancedOpen] =
        useState(false);

    const [view, setView] =
        useState<"grid" | "list">("grid");

    const [shareMessage, setShareMessage] =
        useState("");

    /* ---------------------------------------------------------------------- */
    /* Sync local search fields with URL                                      */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchInput(search);
    }, [search]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMinPriceInput(String(minPrice));
    }, [minPrice]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMaxPriceInput(String(maxPrice));
    }, [maxPrice]);

    /* ---------------------------------------------------------------------- */
    /* URL updater                                                            */
    /* ---------------------------------------------------------------------- */

    const updateParams = useCallback(
        (
            updates: Record<string, string | string[] | null>
        ) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(updates).forEach(
                ([key, value]) => {
                    params.delete(key);

                    if (Array.isArray(value)) {
                        value.forEach((item) => {
                            params.append(key, item);
                        });

                        return;
                    }

                    if (value !== null && value !== "") {
                        params.set(key, value);
                    }
                }
            );

            router.push(
                `${pathname}${createQueryString(params)}`,
                {
                    scroll: false,
                }
            );
        },
        [pathname, router, searchParams]
    );

    /* ---------------------------------------------------------------------- */
    /* Search                                                                 */
    /* ---------------------------------------------------------------------- */

    const applySearch = () => {
        updateParams({
            search: searchInput.trim() || null,
        });
    };

    const handleSearchKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            applySearch();
        }
    };

    /* ---------------------------------------------------------------------- */
    /* Filtering                                                              */
    /* ---------------------------------------------------------------------- */

    const toggleAmenity = (amenity: string) => {
        const current = new Set(selectedAmenities);

        if (current.has(amenity)) {
            current.delete(amenity);
        } else {
            current.add(amenity);
        }

        updateParams({
            amenity: Array.from(current),
        });
    };

    const clearFilters = () => {
        router.push(pathname, {
            scroll: false,
        });

        setSearchInput("");
        setMinPriceInput("0");
        setMaxPriceInput("500");
    };

    /* ---------------------------------------------------------------------- */
    /* Filter rooms                                                           */
    /* ---------------------------------------------------------------------- */

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const filteredRooms = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        const result = ROOMS.filter((room) => {
            const matchesSearch =
                !normalizedSearch ||
                room.name
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                room.category
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                room.description
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                room.amenities.some((amenity) =>
                    amenity
                        .toLowerCase()
                        .includes(normalizedSearch)
                );

            const matchesCategory =
                category === "All" ||
                room.category === category;

            const matchesGuests =
                room.guests >= guests;

            const matchesPrice =
                room.price >= minPrice &&
                room.price <= maxPrice;

            const matchesAmenities =
                selectedAmenities.length === 0 ||
                selectedAmenities.every((selected) =>
                    room.amenities.includes(selected)
                );

            return (
                matchesSearch &&
                matchesCategory &&
                matchesGuests &&
                matchesPrice &&
                matchesAmenities
            );
        });

        switch (sort) {
            case "price-low":
                return result.sort(
                    (a, b) => a.price - b.price
                );

            case "price-high":
                return result.sort(
                    (a, b) => b.price - a.price
                );

            case "capacity":
                return result.sort(
                    (a, b) => b.guests - a.guests
                );

            case "name":
                return result.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

            default:
                return result.sort(
                    (a, b) =>
                        Number(b.featured) -
                        Number(a.featured)
                );
        }
    }, [
        search,
        category,
        guests,
        minPrice,
        maxPrice,
        sort,
        // eslint-disable-next-line react-hooks/preserve-manual-memoization
        selectedAmenities,
    ]);

    /* ---------------------------------------------------------------------- */
    /* Share                                                                  */
    /* ---------------------------------------------------------------------- */

    const shareSearch = async () => {
        const url = window.location.href;

        try {
            if (
                navigator.share &&
                window.innerWidth < 768
            ) {
                await navigator.share({
                    title: "Velora Hotels Rooms",
                    text: "Check out these rooms at Velora Hotels.",
                    url,
                });

                return;
            }

            await navigator.clipboard.writeText(url);

            setShareMessage("Search link copied!");

            window.setTimeout(() => {
                setShareMessage("");
            }, 2500);
        } catch {
            setShareMessage("Unable to share this search.");

            window.setTimeout(() => {
                setShareMessage("");
            }, 2500);
        }
    };

    /* ---------------------------------------------------------------------- */
    /* Room card                                                              */
    /* ---------------------------------------------------------------------- */

    const RoomCard = ({
        room,
    }: {
        room: Room;
    }) => {
        const bookingParams = new URLSearchParams();

        bookingParams.set("room", room.id);

        if (checkIn) {
            bookingParams.set("checkIn", checkIn);
        }

        if (checkOut) {
            bookingParams.set("checkOut", checkOut);
        }

        bookingParams.set("guests", String(guests));

        return (
            <article
                className={`
          group overflow-hidden rounded-2xl border border-border
          bg-card shadow-sm transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl
          ${view === "list"
                        ? "md:grid md:grid-cols-[280px_1fr]"
                        : ""
                    }
        `}
            >
                {/* Image */}
                <div
                    className={`
            relative overflow-hidden
            ${view === "list"
                            ? "h-64 md:h-full"
                            : "h-64 sm:h-72"
                        }
          `}
                >
                    <Image
                        src={room.image}
                        alt={`${room.name} at Velora Hotels`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes={
                            view === "list"
                                ? "(max-width: 768px) 100vw, 280px"
                                : "(max-width: 768px) 100vw, 50vw"
                        }
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    {room.featured && (
                        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                            Featured
                        </div>
                    )}

                    <button
                        type="button"
                        aria-label={`Save ${room.name}`}
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-background hover:text-primary"
                    >
                        <FiHeart className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 sm:p-6">

                    <div className="flex items-start justify-between gap-4">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                                {room.category}
                            </p>

                            <h2 className="hotel-display mt-1 text-2xl font-semibold tracking-tight">
                                {room.name}
                            </h2>
                        </div>

                        <div className="shrink-0 text-right">
                            <p className="text-xl font-semibold">
                                ${room.price}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                / night
                            </p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2 text-sm">
                        <span className="font-semibold">
                            {room.rating}
                        </span>

                        <span className="text-amber-500">
                            ★★★★★
                        </span>

                        <span className="text-muted-foreground">
                            ({room.reviews} reviews)
                        </span>
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {room.description}
                    </p>

                    {/* Room info */}
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-y border-border py-4 text-xs text-muted-foreground">

                        <span className="flex items-center gap-1.5">
                            <FiUsers className="h-4 w-4 text-primary" />
                            Up to {room.guests} guests
                        </span>

                        <span className="flex items-center gap-1.5">
                            <FiGrid className="h-4 w-4 text-primary" />
                            {room.size}
                        </span>

                        <span>
                            {room.beds}
                        </span>

                    </div>

                    {/* Amenities */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {room.amenities
                            .slice(0, 4)
                            .map((amenity) => (
                                <span
                                    key={amenity}
                                    className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                                >
                                    {amenity}
                                </span>
                            ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">

                        <Link
                            href={`/rooms/${room.id}`}
                            className="flex flex-1 items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
                        >
                            View Details
                        </Link>

                        <Link
                            href={`/booking?${bookingParams.toString()}`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            Book Now
                            <FiArrowRight className="h-4 w-4" />
                        </Link>

                    </div>
                </div>
            </article>
        );
    };

    return (
        <main className="min-h-screen bg-background">

            {/* ================================================================ */}
            {/* Hero                                                             */}
            {/* ================================================================ */}

            <section className="border-b border-border bg-muted/30">
                <div className="hotel-container py-14 sm:py-20">

                    <div className="max-w-3xl">

                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                            <span className="h-px w-8 bg-primary" />
                            Velora Hotels
                        </div>

                        <h1 className="hotel-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                            Find your perfect
                            <span className="block italic font-normal">
                                room.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            Explore our collection of thoughtfully designed rooms
                            and suites. Search by your preferences and find a stay
                            that feels right for you.
                        </p>

                    </div>

                    {/* Search panel */}
                    <div className="mt-10 rounded-2xl border border-border bg-background p-3 shadow-lg sm:p-4">

                        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">

                            {/* Search */}
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    type="search"
                                    value={searchInput}
                                    onChange={(event) =>
                                        setSearchInput(event.target.value)
                                    }
                                    onKeyDown={handleSearchKeyDown}
                                    placeholder="Search rooms..."
                                    className="h-12 w-full rounded-xl border border-border bg-muted/30 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>

                            {/* Check in */}
                            <label className="relative">
                                <FiCalendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(event) =>
                                        updateParams({
                                            checkIn:
                                                event.target.value || null,
                                        })
                                    }
                                    className="h-12 w-full rounded-xl border border-border bg-muted/30 pl-11 pr-3 text-sm outline-none transition focus:border-primary"
                                    aria-label="Check in"
                                />
                            </label>

                            {/* Check out */}
                            <label className="relative">
                                <FiCalendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(event) =>
                                        updateParams({
                                            checkOut:
                                                event.target.value || null,
                                        })
                                    }
                                    className="h-12 w-full rounded-xl border border-border bg-muted/30 pl-11 pr-3 text-sm outline-none transition focus:border-primary"
                                    aria-label="Check out"
                                />
                            </label>

                            {/* Guests */}
                            <label className="relative">
                                <FiUsers className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <select
                                    value={guests}
                                    onChange={(event) =>
                                        updateParams({
                                            guests: event.target.value,
                                        })
                                    }
                                    className="h-12 w-full appearance-none rounded-xl border border-border bg-muted/30 pl-11 pr-8 text-sm outline-none transition focus:border-primary"
                                    aria-label="Number of guests"
                                >
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                    <option value="5">5 Guests</option>
                                </select>

                                <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </label>

                            <button
                                type="button"
                                onClick={applySearch}
                                className="h-12 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                            >
                                Search
                            </button>

                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* Explorer                                                          */}
            {/* ================================================================ */}

            <section className="hotel-section">
                <div className="hotel-container">

                    {/* Mobile filter button */}
                    <div className="mb-5 flex items-center justify-between lg:hidden">

                        <button
                            type="button"
                            onClick={() =>
                                setMobileFiltersOpen(true)
                            }
                            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium"
                        >
                            <FiSliders className="h-4 w-4" />
                            Filters
                        </button>

                        <span className="text-sm text-muted-foreground">
                            {filteredRooms.length} rooms
                        </span>

                    </div>

                    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

                        {/* ========================================================== */}
                        {/* Desktop Sidebar                                             */}
                        {/* ========================================================== */}

                        <aside className="hidden lg:block">

                            <div className="sticky top-24 space-y-7">

                                {/* Category */}
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        Room Type
                                    </h3>

                                    <div className="mt-4 space-y-1">

                                        {CATEGORIES.map(
                                            (roomCategory) => {
                                                const active =
                                                    category === roomCategory;

                                                return (
                                                    <button
                                                        key={roomCategory}
                                                        type="button"
                                                        onClick={() =>
                                                            updateParams({
                                                                category:
                                                                    roomCategory ===
                                                                        "All"
                                                                        ? null
                                                                        : roomCategory,
                                                            })
                                                        }
                                                        className={`
                              flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition
                              ${active
                                                                ? "bg-primary/10 font-semibold text-primary"
                                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                            }
                            `}
                                                    >
                                                        <span>
                                                            {roomCategory}
                                                        </span>

                                                        {active && (
                                                            <FiCheck className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>
                                </div>

                                {/* Price */}
                                <div className="border-t border-border pt-6">

                                    <h3 className="text-sm font-semibold">
                                        Price per night
                                    </h3>

                                    <div className="mt-4 grid grid-cols-2 gap-2">

                                        <input
                                            type="number"
                                            min={0}
                                            value={minPriceInput}
                                            onChange={(event) =>
                                                setMinPriceInput(
                                                    event.target.value
                                                )
                                            }
                                            onBlur={() =>
                                                updateParams({
                                                    minPrice:
                                                        minPriceInput || "0",
                                                })
                                            }
                                            placeholder="Min"
                                            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                                        />

                                        <input
                                            type="number"
                                            min={0}
                                            value={maxPriceInput}
                                            onChange={(event) =>
                                                setMaxPriceInput(
                                                    event.target.value
                                                )
                                            }
                                            onBlur={() =>
                                                updateParams({
                                                    maxPrice:
                                                        maxPriceInput || "500",
                                                })
                                            }
                                            placeholder="Max"
                                            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                                        />

                                    </div>

                                    <p className="mt-2 text-xs text-muted-foreground">
                                        ${minPrice} — ${maxPrice} per night
                                    </p>

                                </div>

                                {/* Amenities */}
                                <div className="border-t border-border pt-6">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAdvancedOpen(
                                                !advancedOpen
                                            )
                                        }
                                        className="flex w-full items-center justify-between text-sm font-semibold"
                                    >
                                        Amenities

                                        {advancedOpen ? (
                                            <FiChevronUp className="h-4 w-4" />
                                        ) : (
                                            <FiChevronDown className="h-4 w-4" />
                                        )}
                                    </button>

                                    {advancedOpen && (
                                        <div className="mt-4 space-y-3">

                                            {AMENITIES.map((amenity) => {
                                                const checked =
                                                    selectedAmenities.includes(
                                                        amenity
                                                    );

                                                return (
                                                    <label
                                                        key={amenity}
                                                        className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={checked}
                                                            onChange={() =>
                                                                toggleAmenity(
                                                                    amenity
                                                                )
                                                            }
                                                            className="h-4 w-4 rounded border-border accent-[var(--primary)]"
                                                        />

                                                        {amenity}
                                                    </label>
                                                );
                                            })}

                                        </div>
                                    )}

                                </div>

                                {/* Clear */}
                                {(search ||
                                    category !== "All" ||
                                    minPrice > 0 ||
                                    maxPrice < 500 ||
                                    selectedAmenities.length > 0) && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="flex items-center gap-2 text-sm font-medium text-destructive hover:underline"
                                        >
                                            <FiX className="h-4 w-4" />
                                            Clear all filters
                                        </button>
                                    )}

                            </div>
                        </aside>

                        {/* ========================================================== */}
                        {/* Results                                                      */}
                        {/* ========================================================== */}

                        <div className="min-w-0">

                            {/* Toolbar */}
                            <div className="mb-7 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <p className="text-sm font-semibold">
                                        {filteredRooms.length}{" "}
                                        {filteredRooms.length === 1
                                            ? "room"
                                            : "rooms"}{" "}
                                        available
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {checkIn && checkOut
                                            ? `${checkIn} → ${checkOut}`
                                            : "Flexible dates"}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">

                                    {/* Share */}
                                    <button
                                        type="button"
                                        onClick={shareSearch}
                                        className="relative flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:border-primary hover:text-primary"
                                    >
                                        <FiShare2 className="h-4 w-4" />
                                        <span className="hidden sm:inline">
                                            Share
                                        </span>

                                        {shareMessage && (
                                            <span className="absolute right-0 top-12 z-10 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-xs text-background shadow-lg">
                                                {shareMessage}
                                            </span>
                                        )}
                                    </button>

                                    {/* Sort */}
                                    <div className="relative">

                                        <select
                                            value={sort}
                                            onChange={(event) =>
                                                updateParams({
                                                    sort: event.target.value,
                                                })
                                            }
                                            className="h-10 appearance-none rounded-lg border border-border bg-background px-3 pr-9 text-sm font-medium outline-none focus:border-primary"
                                        >
                                            {SORT_OPTIONS.map(
                                                (option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    </div>

                                    {/* View */}
                                    <div className="hidden items-center rounded-lg border border-border p-1 sm:flex">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setView("grid")
                                            }
                                            aria-label="Grid view"
                                            className={`rounded-md p-2 ${view === "grid"
                                                    ? "bg-muted text-foreground"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            <FiGrid className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setView("list")
                                            }
                                            aria-label="List view"
                                            className={`rounded-md p-2 ${view === "list"
                                                    ? "bg-muted text-foreground"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            <FiList className="h-4 w-4" />
                                        </button>

                                    </div>

                                </div>
                            </div>

                            {/* Results */}
                            {filteredRooms.length > 0 ? (
                                <div
                                    className={
                                        view === "grid"
                                            ? "grid gap-5 md:grid-cols-2"
                                            : "space-y-5"
                                    }
                                >
                                    {filteredRooms.map((room) => (
                                        <RoomCard
                                            key={room.id}
                                            room={room}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-border px-6 py-20 text-center">

                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                                        <FiSearch className="h-6 w-6 text-muted-foreground" />
                                    </div>

                                    <h2 className="hotel-display mt-5 text-2xl font-semibold">
                                        No rooms found
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                        We could not find a room matching your current
                                        search and filters. Try changing your dates,
                                        guest count, price range, or room type.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                                    >
                                        Clear Filters
                                    </button>

                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* Mobile Filter Drawer                                              */}
            {/* ================================================================ */}

            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">

                    <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() =>
                            setMobileFiltersOpen(false)
                        }
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <aside className="absolute bottom-0 left-0 right-0 max-h-[90dvh] overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl">

                        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-border" />

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-lg font-semibold">
                                    Filters
                                </h2>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Refine your room search
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileFiltersOpen(false)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
                            >
                                <FiX className="h-4 w-4" />
                            </button>

                        </div>

                        {/* Category */}
                        <div className="mt-7">

                            <h3 className="text-sm font-semibold">
                                Room Type
                            </h3>

                            <div className="mt-3 grid grid-cols-2 gap-2">

                                {CATEGORIES.map(
                                    (roomCategory) => {
                                        const active =
                                            category === roomCategory;

                                        return (
                                            <button
                                                key={roomCategory}
                                                type="button"
                                                onClick={() =>
                                                    updateParams({
                                                        category:
                                                            roomCategory ===
                                                                "All"
                                                                ? null
                                                                : roomCategory,
                                                    })
                                                }
                                                className={`
                          rounded-xl border px-3 py-3 text-sm font-medium
                          ${active
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border"
                                                    }
                        `}
                                            >
                                                {roomCategory}
                                            </button>
                                        );
                                    }
                                )}

                            </div>
                        </div>

                        {/* Price */}
                        <div className="mt-7">

                            <h3 className="text-sm font-semibold">
                                Price per night
                            </h3>

                            <div className="mt-3 grid grid-cols-2 gap-3">

                                <input
                                    type="number"
                                    min={0}
                                    value={minPriceInput}
                                    onChange={(event) =>
                                        setMinPriceInput(
                                            event.target.value
                                        )
                                    }
                                    onBlur={() =>
                                        updateParams({
                                            minPrice:
                                                minPriceInput || "0",
                                        })
                                    }
                                    placeholder="Minimum"
                                    className="h-11 rounded-xl border border-border px-3 text-sm outline-none focus:border-primary"
                                />

                                <input
                                    type="number"
                                    min={0}
                                    value={maxPriceInput}
                                    onChange={(event) =>
                                        setMaxPriceInput(
                                            event.target.value
                                        )
                                    }
                                    onBlur={() =>
                                        updateParams({
                                            maxPrice:
                                                maxPriceInput || "500",
                                        })
                                    }
                                    placeholder="Maximum"
                                    className="h-11 rounded-xl border border-border px-3 text-sm outline-none focus:border-primary"
                                />

                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="mt-7">

                            <h3 className="text-sm font-semibold">
                                Amenities
                            </h3>

                            <div className="mt-3 grid grid-cols-2 gap-3">

                                {AMENITIES.map((amenity) => {

                                    const checked =
                                        selectedAmenities.includes(
                                            amenity
                                        );

                                    return (
                                        <label
                                            key={amenity}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() =>
                                                    toggleAmenity(
                                                        amenity
                                                    )
                                                }
                                                className="h-4 w-4 accent-[var(--primary)]"
                                            />

                                            {amenity}
                                        </label>
                                    );
                                })}

                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold"
                            >
                                Clear
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileFiltersOpen(false)
                                }
                                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                            >
                                Show {filteredRooms.length} Rooms
                            </button>

                        </div>

                    </aside>
                </div>
            )}
        </main>
    );
}