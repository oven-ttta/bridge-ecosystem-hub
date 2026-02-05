import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { MatchingSection } from "@/components/home/MatchingSection";
import { GrantsSection } from "@/components/home/GrantsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <MatchingSection />
      <GrantsSection />
      <EventsSection />
      <CTASection />
    </main>
  );
}
