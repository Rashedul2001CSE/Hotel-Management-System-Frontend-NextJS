import { Hero } from "@/components/landing/Hero";
import "../styles/landing.css"
import { SearchSection } from "@/components/landing/SearchSection";
import { RoomsSection } from "@/components/landing/RoomsSection";
import { AmenitiesSection } from "@/components/landing/AmenitiesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
export default function Page() {
  return (
    <main className="min-h-screen container mx-auto px-4">
      <Hero />
      <SearchSection />
      <RoomsSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <GallerySection />
      <NewsletterSection />
    </main>
  );
}