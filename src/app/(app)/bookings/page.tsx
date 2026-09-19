import type { Metadata } from "next";
import MyBookings from "@/components/hotel/my-bookings";

export const metadata: Metadata = {
  title: "My Bookings | Velora Hotels",
  description:
    "View and manage your reservations at Velora Hotels.",
};

export default function BookingsPage() {
  return <MyBookings />;
}