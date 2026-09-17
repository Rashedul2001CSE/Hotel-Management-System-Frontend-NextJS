// types/room.ts
export type RoomType = "single" | "double" | "suite" | "deluxe" | "penthouse";

export interface RoomAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Room {
  id: string;
  title: string;
  slug: string;
  type: RoomType;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  capacity: number;
  sizeSqFt: number;
  bedType: string;
  images: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    petsAllowed: boolean;
  };
  reviews: Review[];
}
