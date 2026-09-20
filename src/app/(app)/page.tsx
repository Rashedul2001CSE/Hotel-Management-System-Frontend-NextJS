import type { Metadata } from "next";

import { HeroSection } from "@/components/landing-page/hero-section";
import { FeaturedRooms } from "@/components/landing-page/featured-room";
import { ExperiencesSection } from "@/components/landing-page/experience-section";
import { OffersSection } from "@/components/landing-page/offer-section";
import { TestimonialsSection } from "@/components/landing-page/testimonial-section";
import { HotelGallery } from "@/components/landing-page/hotel-gallery";
import { LocationSection } from "@/components/landing-page/location-section";
import { FaqSection } from "@/components/landing-page/faq-section";
import { HotelCta } from "@/components/landing-page/hotel-cta";

export const metadata: Metadata = {
  title: "Velora Hotels | Refined Stays, Thoughtfully Designed",
  description:
    "Discover refined rooms, memorable experiences, exceptional dining, and effortless stays at Velora Hotels.",
  keywords: [
    "Velora Hotels",
    "luxury hotel",
    "hotel booking",
    "hotel rooms",
    "premium hotel",
    "hotel stay",
  ],
  openGraph: {
    title: "Velora Hotels | Refined Stays",
    description:
      "A refined hotel experience designed around comfort, elegance, and unforgettable moments.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />

      <FeaturedRooms />

      <ExperiencesSection />

      <OffersSection />

      <TestimonialsSection />

      <HotelGallery />

      <LocationSection />

      <FaqSection />

      <HotelCta />
    </main>
  );
}