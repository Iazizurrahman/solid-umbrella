import type { ReactNode } from "react";
import { SiteHeader } from "@/components/sites/daita/daita-site/SiteHeader";
import { HeroSection, type HeroSectionProps } from "@/components/sites/daita/daita-site/HeroSection";
import { ProblemSection } from "@/components/sites/daita/daita-site/ProblemSection";
import { LatestNewsSection } from "@/components/sites/daita/daita-site/LatestNewsSection";
import { PlatformStackSection } from "@/components/sites/daita/daita-site/PlatformStackSection";
import { PlatformStackMobileSection } from "@/components/sites/daita/daita-site/PlatformStackMobileSection";
import { InfrastructureSection } from "@/components/sites/daita/daita-site/InfrastructureSection";
import { TimelineSection } from "@/components/sites/daita/daita-site/TimelineSection";
import { TrustedLogosSection } from "@/components/sites/daita/daita-site/TrustedLogosSection";
import { TestimonialsSection } from "@/components/sites/daita/daita-site/TestimonialsSection";
import { IndustrySolutionsSection } from "@/components/sites/daita/daita-site/IndustrySolutionsSection";
import { LatestStoriesSection } from "@/components/sites/daita/daita-site/LatestStoriesSection";
import { CtaSection } from "@/components/sites/daita/daita-site/CtaSection";
import { SiteFooter } from "@/components/sites/daita/daita-site/SiteFooter";
import { SectionSeparator } from "@/components/sites/daita/shared/layout";
import { Anchor } from "@/components/sites/daita/shared/Anchor";

/**
 * The homepage, composed once and rendered by four routes: `/` and the three hero
 * variant routes.
 *
 * Everything below the hero is fixed here rather than duplicated per route, so the
 * variant test can only ever differ in the hero. If a section is added to the homepage
 * it appears on all three variants automatically, which is the only way the comparison
 * stays honest.
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
export interface HomeCompositionProps {
  /** Hero overrides. Omitted entirely by `/`, which takes the shipped copy. */
  hero?: HeroSectionProps;
  /** Fixed-position extras — the variant switcher, and nothing else so far. */
  children?: ReactNode;
}

export function HomeComposition({ hero, children }: HomeCompositionProps = {}) {
  return (
    <div className="ns-scope relative">
      <SiteHeader />

      <main className="relative">
        <HeroSection {...hero} />
        <SectionSeparator />

        {/* The problem, before anything is claimed about the product. */}
        <Anchor id="the-problem">
          <ProblemSection />
        </Anchor>
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

        {/* Moved here from /our-story: the trail reads as the problem statement the
            pillars then answer, so it belongs between the stack and "why DAITA". */}
        <Anchor id="order-trail">
          <TimelineSection />
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

      {children}
    </div>
  );
}
