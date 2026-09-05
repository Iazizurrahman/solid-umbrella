import { SiteHeader } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/SiteHeader";
import { HeroSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/HeroSection";
import { LatestNewsSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/LatestNewsSection";
import { PlatformStackSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/PlatformStackSection";
import { PlatformStackMobileSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/PlatformStackMobileSection";
import { InfrastructureSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/InfrastructureSection";
import { TrustedLogosSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/TrustedLogosSection";
import { TestimonialsSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/TestimonialsSection";
import { IndustrySolutionsSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/IndustrySolutionsSection";
import { LatestStoriesSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/LatestStoriesSection";
import { CtaSection } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/CtaSection";
import { SiteFooter } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/SiteFooter";
import { SectionSeparator } from "@/components/sites/www-nscale-com-782295e3/shared/layout";

/**
 * nscale.com homepage clone.
 *
 * Page shell mirrors the source's `body > .page-wrapper` structure:
 *   header.header   — position: fixed, inset 0 0 auto, z-index 999 (transparent at scroll 0)
 *   main.main-wrapper
 *   div.footer
 *
 * `main` starts at page Y 0 and flows UNDER the fixed header — the hero video is meant to
 * show through it, so there is deliberately no top spacer here.
 *
 * Sections are separated by real 1px `.section-separator` elements, not borders. The order
 * and the separator placement below match the source DOM exactly.
 *
 * The platform stack ships as two sibling sections that never appear together:
 * the Rive canvas version (>=992px) and the Swiper + accordion version (<992px).
 */
export default function Home() {
  return (
    <div className="ns-scope relative">
      <SiteHeader />

      <main className="relative">
        <HeroSection />
        <SectionSeparator />

        <LatestNewsSection />
        <SectionSeparator />

        <PlatformStackSection />
        <SectionSeparator />

        <PlatformStackMobileSection />
        <SectionSeparator />

        <InfrastructureSection />
        <SectionSeparator />

        <TrustedLogosSection />
        <SectionSeparator />

        <TestimonialsSection />
        <SectionSeparator />

        <IndustrySolutionsSection />
        <SectionSeparator />

        <LatestStoriesSection />
        <SectionSeparator />

        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
