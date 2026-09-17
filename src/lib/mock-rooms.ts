// lib/mock-rooms.ts

import { Room } from "@/types/room";

export const ALL_AMENITIES = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Ocean View",
  "Private Balcony",
  "King Bed",
  "Mini Bar",
  "Jacuzzi",
  "Room Service",
  "Work Desk",
  "Smart TV",
  "Coffee Maker",
  "Safe Box",
];

export const MOCK_ROOMS: Room[] = [

  {
    id: "room-101",
    title: "Oceanfront Luxury Suite",
    slug: "oceanfront-luxury-suite",
    type: "suite",
    pricePerNight: 350,
    rating: 4.9,
    reviewsCount: 42,
    capacity: 2,
    sizeSqFt: 650,
    bedType: "1 King Bed",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Immerse yourself in coastal elegance with floor-to-ceiling windows offering panoramic ocean vistas. Features a marble bathroom, private balcony, and plush king bed.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Ocean View",
      "Private Balcony",
      "King Bed",
      "Jacuzzi",
      "Mini Bar",
      "Smart TV",
    ],
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      petsAllowed: false,
    },
    reviews: [
      {
        id: "rev-1",
        author: "Eleanor Vance",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-08-12",
        comment:
          "Unbelievable sunset views right from the balcony. Cleanliness and hospitality were top notch!",
      },
      {
        id: "rev-2",
        author: "Marcus Sterling",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 4.8,
        date: "2026-07-29",
        comment:
          "Extremely comfortable bed and high quality room service. Will definitely come back.",
      },
    ],
  },
  {
    id: "room-102",
    title: "Executive Deluxe King Room",
    slug: "executive-deluxe-king-room",
    type: "deluxe",
    pricePerNight: 220,
    rating: 4.7,
    reviewsCount: 28,
    capacity: 2,
    sizeSqFt: 480,
    bedType: "1 King Bed",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Designed for modern travelers and business professionals. Features an ergonomic work area, high-speed Wi-Fi, and premium soundproofing.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Work Desk",
      "Smart TV",
      "Coffee Maker",
      "Safe Box",
      "Room Service",
    ],
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      petsAllowed: true,
    },
    reviews: [
      {
        id: "rev-3",
        author: "Sophia Chen",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
        rating: 4.7,
        date: "2026-09-02",
        comment:
          "Great work environment and super fast internet for remote work meetings.",
      },
    ],
  },
  {
    id: "room-103",
    title: "Skyline Penthouse Sanctuary",
    slug: "skyline-penthouse-sanctuary",
    type: "penthouse",
    pricePerNight: 750,
    rating: 5.0,
    reviewsCount: 19,
    capacity: 6,
    sizeSqFt: 1400,
    bedType: "3 King Beds",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "The crown jewel of our property. Includes exclusive rooftop terrace access, private hot tub, personalized butler service, and sprawling city views.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Ocean View",
      "Private Balcony",
      "King Bed",
      "Jacuzzi",
      "Mini Bar",
      "Room Service",
      "Smart TV",
      "Safe Box",
    ],
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Strict: Non-refundable within 7 days of arrival",
      petsAllowed: false,
    },
    reviews: [
      {
        id: "rev-4",
        author: "Liam O’Connor",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-08-30",
        comment:
          "An unparalleled luxury experience. The rooftop view at night is standard-setting.",
      },
    ],
  },
  {
    id: "room-104",
    title: "Cozy Double Queen Room",
    slug: "cozy-double-queen-room",
    type: "double",
    pricePerNight: 180,
    rating: 4.5,
    reviewsCount: 35,
    capacity: 4,
    sizeSqFt: 400,
    bedType: "2 Queen Beds",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Ideal for families or group travelers. Offers two cozy queen beds with premium linen, smart TV entertainment, and spacious vanity area.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Coffee Maker",
      "Safe Box",
    ],
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      petsAllowed: true,
    },
    reviews: [],
  },
];

export async function getRooms(): Promise<Room[]> {
  return MOCK_ROOMS;
}

export async function getRoomById(id: string): Promise<Room | undefined> {
  return MOCK_ROOMS.find((room) => room.id === id || room.slug === id);
}
