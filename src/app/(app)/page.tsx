import { Hero } from "@/components/landing-page/Hero";
import "../../styles/landing.css"
import { SearchSection } from "@/components/landing-page/SearchSection";
import { RoomsSection } from "@/components/landing-page/RoomsSection";
import { AmenitiesSection } from "@/components/landing-page/AmenitiesSection";
import { TestimonialsSection } from "@/components/landing-page/TestimonialsSection";
import { GallerySection } from "@/components/landing-page/GallerySection";
import { NewsletterSection } from "@/components/landing-page/NewsletterSection";
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