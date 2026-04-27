import { NavMenu } from "@/components/NavMenu";
import { HeroSection } from "@/components/HeroSection";
import { MethodologySection } from "@/components/MethodologySection";
import { ResultsSection } from "@/components/ResultsSection";
import { TechSection } from "@/components/TechSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="relative w-full bg-bg text-white font-sans selection:bg-accent selection:text-black cursor-default">
      <NavMenu />
      <HeroSection />
      <MethodologySection />
      <ResultsSection />
      <TechSection />
      <FinalCTA />
    </main>
  );
}
