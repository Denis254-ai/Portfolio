import { HeroSection } from "@/components/hero/HeroSection";
import { InfiniteMarquee } from "@/components/arsenal/InfiniteMarquee";
import { WorkSection } from "@/components/work/WorkSection";
import { ServiceCards } from "@/components/future/ServiceCards";
import { NarrativeFooter } from "@/components/future/NarrativeFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--violet-600)] selection:text-white">
      {/* Act I: The Hero */}
      <HeroSection />

      {/* Act II: The Arsenal */}
      <InfiniteMarquee />

      {/* Act III: The Work */}
      <WorkSection />

      {/* Act IV: The Value & Future */}
      <ServiceCards />
      <NarrativeFooter />
    </main>
  );
}
