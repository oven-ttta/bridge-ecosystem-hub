import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { MatchingSection } from "@/components/home/MatchingSection";
import { GrantsSection } from "@/components/home/GrantsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MatchingSection />
        <GrantsSection />
        <EventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
