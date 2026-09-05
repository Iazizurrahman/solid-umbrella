import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/daita/daita-site/SiteHeader";
import { HeroSection } from "@/components/sites/daita/daita-site/HeroSection";
import { ContactSection } from "@/components/sites/daita/daita-site/ContactSection";
import { LatestNewsSection } from "@/components/sites/daita/daita-site/LatestNewsSection";
import { SiteFooter } from "@/components/sites/daita/daita-site/SiteFooter";
import { SectionSeparator } from "@/components/sites/daita/shared/layout";
import { Anchor } from "@/components/sites/daita/shared/Anchor";
import { ASSETS, CTA } from "@/components/sites/daita/shared/brand";

/**
 * /contact — the enquiry page, and the destination for every "Book a Demo" on the site.
 *
 * Composed from the existing section components with DAITA content passed as props, so
 * spacing, type scale, colour and motion are identical to the homepage by construction.
 * No new tokens and no new visual patterns.
 *
 * The page opens with a hero, so `main` deliberately carries no `pt-[73px]`: the hero
 * runs under the fixed header exactly as the homepage's does.
 *
 * The page closes on "What happens next" rather than the usual `CtaSection` — the form
 * above already is the call to action, and repeating "Book a Demo" underneath it would
 * send the visitor back up the page.
 *
 * The enquiry form currently posts to `mailto:` as a stopgap; see the block comment in
 * ContactSection for what has to replace it before launch.
 */
export const metadata: Metadata = {
  title: "Contact — DAITA",
  description:
    "Send us one live order. We’ll run DAITA against it for a week and show you where the updates stop.",
};

const NEXT_STEPS = [
  {
    title: "We talk",
    description: "15 minutes to understand how your orders move today.",
  },
  {
    title: "One unit, one week",
    description:
      "We connect a single unit’s WhatsApp numbers and open POs.",
  },
  {
    title: "You see the gaps",
    description:
      "We report back against your own POs and show you where updates stop.",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="ns-scope relative">
      <SiteHeader />

      <main className="relative">
        <HeroSection
          eyebrow="Contact"
          title="Send us one live order."
          subtitle="We’ll run DAITA against it for a week and show you where the updates stop. If the record doesn’t hold up, you keep the data and we stop."
          // The brief specifies "Book a Demo -> /contact", but this IS /contact, so that
          // would be a dead self-link. Same label, pointed at the form further down.
          primaryCta={{ label: CTA.label, href: "/contact#get-started" }}
          secondaryCta={null}
          variant="image"
          media={{ src: ASSETS.floor, alt: "" }}
        />
        <SectionSeparator />

        <Anchor id="get-started">
          <ContactSection />
        </Anchor>
        <SectionSeparator />

        <Anchor id="what-happens-next">
          <LatestNewsSection heading="What happens next" cards={NEXT_STEPS} />
        </Anchor>
      </main>

      <SiteFooter />
    </div>
  );
}
