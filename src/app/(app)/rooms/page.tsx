import type { Metadata } from "next";
import RoomsExplorer from "@/components/hotel-room/rooms-explorer";

export const metadata: Metadata = {
  title: "Rooms & Suites | Velora Hotels",
  description:
    "Explore rooms and suites at Velora Hotels. Search, filter, and find the perfect stay based on your guests, budget, room type, and amenities.",
  keywords: [
    "Velora Hotels rooms",
    "hotel rooms",
    "hotel suites",
    "hotel booking",
    "luxury hotel rooms",
    "hotel accommodation",
  ],
  openGraph: {
    title: "Rooms & Suites | Velora Hotels",
    description:
      "Explore and find your perfect room at Velora Hotels.",
    type: "website",
  },
};

export default function RoomsPage() {
  return <RoomsExplorer />;
}