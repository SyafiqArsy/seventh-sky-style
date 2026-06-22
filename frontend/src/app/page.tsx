import { Navbar } from "@/components/common/navbar";
import { HeroSection } from "@/features/home/hero-section";
import { GallerySection } from "@/components/common/gallery-section";
import { HowItWorks } from "@/components/common/how-it-works";
import { CTASection } from "@/components/common/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GallerySection />
      <HowItWorks />
      <CTASection />
    </>
  );
}