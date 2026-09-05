import { SiteHeader } from "@/components/sites/daita/daita-site/SiteHeader";
import { HeroSection } from "@/components/sites/daita/daita-site/HeroSection";
import { LatestNewsSection } from "@/components/sites/daita/daita-site/LatestNewsSection";
import { PlatformStackSection } from "@/components/sites/daita/daita-site/PlatformStackSection";
import { PlatformStackMobileSection } from "@/components/sites/daita/daita-site/PlatformStackMobileSection";
import { InfrastructureSection } from "@/components/sites/daita/daita-site/InfrastructureSection";
import { TrustedLogosSection } from "@/components/sites/daita/daita-site/TrustedLogosSection";
import { TestimonialsSection } from "@/components/sites/daita/daita-site/TestimonialsSection";
import { IndustrySolutionsSection } from "@/components/sites/daita/daita-site/IndustrySolutionsSection";
import { LatestStoriesSection } from "@/components/sites/daita/daita-site/LatestStoriesSection";
import { CtaSection } from "@/components/sites/daita/daita-site/CtaSection";
import { SiteFooter } from "@/components/sites/daita/daita-site/SiteFooter";
import { SectionSeparator } from "@/components/sites/daita/shared/layout";
import { Anchor } from "@/components/sites/daita/shared/Anchor";

/**
 * DAITA homepage.
 *
 * Twelve sections, in the order the rebrand brief defines them:
 *   header · hero · what's live today · what DAITA does (desktop + mobile) ·
 *   why DAITA · integrations · testimonial · who it's for · FAQ · CTA · footer
 *
 * `main` starts at page Y 0 and flows UNDER the fixed header — the hero film is meant
 * to show through it, so there is deliberately no top spacer here. Interior routes add
 * `pt-[73px]` instead, because they open with an ordinary section.
 *
 * The platform stack ships as two sibling sections that never appear together: the
 * desktop layout (>=992px) and the mobile carousel (<992px). Both live under a single
 * `#platform` anchor, since an id may only appear once per document.
 *
 * Anchor ids match the brief's link map: #why-daita, #who-its-for, #faq.
 */
export default function Home() {
  return (
    <div className="ns-scope relative">
      <SiteHeader />

      <main className="relative">
        <HeroSection />
        <SectionSeparator />

        <Anchor id="latest-news">
          <LatestNewsSection />
        </Anchor>
        <SectionSeparator />

        <Anchor id="platform">
          <PlatformStackSection />
          <SectionSeparator />
          <PlatformStackMobileSection />
        </Anchor>
        <SectionSeparator />

        <Anchor id="why-daita">
          <InfrastructureSection />
        </Anchor>
        <SectionSeparator />

        <Anchor id="integrations">
          <TrustedLogosSection />
        </Anchor>
        <SectionSeparator />

        {/* Renders nothing until Estee Exports sign-off lands — see TestimonialsSection. */}
        <Anchor id="testimonials">
          <TestimonialsSection />
        </Anchor>
        <SectionSeparator />

        <Anchor id="who-its-for">
          <IndustrySolutionsSection />
        </Anchor>
        <SectionSeparator />

        <Anchor id="faq">
          <LatestStoriesSection />
        </Anchor>
        <SectionSeparator />

        <Anchor id="get-started">
          <CtaSection />
        </Anchor>
      </main>

      <SiteFooter />
    </div>
  );
}
