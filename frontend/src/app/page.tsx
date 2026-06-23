import Navbar from "@/components/common/navbar";
import { HeroSection } from "@/features/home/hero-section";
import { LatestRecommendationCard } from "@/features/home/latest-recommendation-card";
import { GallerySection } from "@/components/common/gallery-section";
import { HowItWorks } from "@/components/common/how-it-works";
import { CTASection } from "@/components/common/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <div className="container mx-auto max-w-5xl px-6 py-10">
        <LatestRecommendationCard />
      </div>

      <GallerySection />

      <HowItWorks />

      <CTASection />
    </>
  );
}