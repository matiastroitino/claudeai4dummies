import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatIsClaude from "@/components/WhatIsClaude";
import EcosystemTabs from "@/components/EcosystemTabs";
import ModuleGrid from "@/components/ModuleGrid";
import PricingSection from "@/components/PricingSection";
import FooterSection from "@/components/FooterSection";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhatIsClaude />
      <EcosystemTabs />
      <ModuleGrid />
      <PricingSection />
      <FooterSection />
    </main>
  );
}
