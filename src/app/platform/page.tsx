import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/daita/daita-site/SiteHeader";
import { HeroSection } from "@/components/sites/daita/daita-site/HeroSection";
import { InfrastructureSection } from "@/components/sites/daita/daita-site/InfrastructureSection";
import { PlatformStackSection } from "@/components/sites/daita/daita-site/PlatformStackSection";
import { PlatformStackMobileSection } from "@/components/sites/daita/daita-site/PlatformStackMobileSection";
import { GuidelinesSection } from "@/components/sites/daita/daita-site/GuidelinesSection";
import { LatestNewsSection } from "@/components/sites/daita/daita-site/LatestNewsSection";
import { TrustedLogosSection } from "@/components/sites/daita/daita-site/TrustedLogosSection";
import { CtaSection } from "@/components/sites/daita/daita-site/CtaSection";
import { SiteFooter } from "@/components/sites/daita/daita-site/SiteFooter";
import { SectionSeparator } from "@/components/sites/daita/shared/layout";
import { Anchor } from "@/components/sites/daita/shared/Anchor";
import { CTA, MEDIA } from "@/components/sites/daita/shared/brand";
import type { StackLayer } from "@/components/sites/daita/daita-site/PlatformStackSection";
import type { StackSlide } from "@/components/sites/daita/daita-site/PlatformStackMobileSection";
import type { InfrastructureCard } from "@/components/sites/daita/daita-site/InfrastructureSection";
import type { CapabilityCard } from "@/components/sites/daita/daita-site/LatestNewsSection";

/**
 * /platform — how DAITA works, and the screens it ships.
 *
 * Composed entirely from the homepage's section components with DAITA content passed
 * as props, so spacing, type scale and motion are identical by construction; no new
 * tokens and no new visual patterns are introduced. The one addition, GuidelinesSection,
 * is built from classes that already appear in those siblings.
 *
 * Like the homepage this route opens with the full-bleed hero, so `main` deliberately
 * carries no `pt-[73px]`: the hero has the 73px header offset built in and is meant to
 * run underneath the fixed, transparent header. Interior routes that open with an
 * ordinary section add the spacer instead.
 *
 * The hero uses the `"image"` variant — the Tiruppur film is reserved for the homepage.
 */

/** 2.2 — the three layers, one row of `grid-cols-3`. */
const HOW_IT_WORKS: readonly InfrastructureCard[] = [
  {
    title: "Capture",
    description:
      "The agent joins the WhatsApp groups and mail threads your factories already run. Voice notes, photos and cutting reports are read where they are sent, with no new app for the floor to learn.",
  },
  {
    title: "Structure",
    description:
      "Every update is written to the PO, style and milestone it belongs to. Quantities, dates and defect counts become records instead of messages.",
  },
  {
    title: "Coordinate",
    description:
      "Plan and actual are compared each evening, missing updates are chased, and packing lists are reconciled against the PO. Slippage surfaces days before the ship date.",
  },
];

/** 2.3 — the six product screens. Prose in `bullets`, record data in `visual`. */
const PRODUCT_SCREENS: readonly StackLayer[] = [
  {
    id: "tna-engine",
    href: "/contact",
    title: "TNA Engine",
    description:
      "The order × stage grid. Planned, actual and delta side by side, for every open PO.",
    bullets: [
      {
        lead: "Planned, actual, delta.",
        text: "Each order against each stage, read in one place instead of three reports.",
      },
      {
        lead: "Filter, group, save.",
        text: "Group by unit and keep the custom views your merchandisers work from.",
      },
      {
        lead: "Colour-coded, and honest about gaps.",
        text: "Projected, done and overdue at a glance, with a No POC flag where nobody owns a stage yet.",
      },
    ],
    visual: [
      "PO #4821 · CUTTING · PLAN 3 APR · ACTUAL 5 APR",
      "PO #4907 · SEWING · PLAN 11 APR · OVERDUE",
      "PO #5033 · FINISHING · PLAN 22 APR · NO POC",
    ],
  },
  {
    id: "buyer-orders",
    href: "/contact",
    title: "Buyer Orders",
    description:
      "One order, three tabs, and a record of everything that has moved on it.",
    bullets: [
      {
        lead: "Overview.",
        text: "The stage-by-stage plan for a single order.",
      },
      {
        lead: "Communications and Documents.",
        text: "Every chaser sent and update received, with tech packs and quality photos filed against the order.",
      },
      {
        lead: "Change History.",
        text: "What moved, when, and why it moved.",
      },
    ],
    visual: [
      "PO #4821 · OVERVIEW · COMMUNICATIONS · DOCUMENTS",
      "Tech pack v3 · filed 2 Apr",
      "Ship date 28 Apr → 30 Apr · changed 12 Apr",
    ],
  },
  {
    id: "pending-actions",
    href: "/contact",
    title: "Pending Actions",
    description:
      "The merchandiser’s approval inbox. Every WhatsApp update arrives as a task: what happened, and what to do.",
    bullets: [
      {
        lead: "An inbox, not a dashboard.",
        text: "Each update lands as something to approve, correct or send on.",
      },
      {
        lead: "Split by source.",
        text: "Buyer orders, supplier orders and system actions each keep their own queue.",
      },
      {
        lead: "Risk on every task.",
        text: "An indicator on each row says what to open first.",
      },
    ],
    visual: [
      "PO #4821 · sewing 380 pcs reported · approve",
      "PO #4907 · trim confirmation missing · high risk",
      "SYSTEM · packing list received 14 Apr · review",
    ],
  },
  {
    id: "process-in-charges",
    href: "/contact",
    title: "Process In-Charges",
    description:
      "Every point of contact, the stages they own, and what is still waiting on them.",
    bullets: [
      {
        lead: "Ownership, written down.",
        text: "Each stage carries a name rather than a department.",
      },
      {
        lead: "Outstanding work per person.",
        text: "The updates still open against them, and their longest outstanding delay.",
      },
      {
        lead: "Where a bottleneck becomes a name.",
        text: "The hold-up stops being a stage and starts being a conversation.",
      },
    ],
    visual: [
      "R. KUMAR · CUTTING · oldest open update 9 Apr",
      "S. DEVI · SEWING · oldest open update 12 Apr",
      "A. NATARAJAN · FINISHING · all updates current",
    ],
  },
  {
    id: "my-team",
    href: "/contact",
    title: "My Team",
    description:
      "The company-wide view: production broken down by stage and by unit.",
    bullets: [
      {
        lead: "Beyond a single order.",
        text: "Leadership sees where the business is stuck, not just where one PO is.",
      },
      {
        lead: "By stage and by unit.",
        text: "The same breakdown for every site, side by side.",
      },
      {
        lead: "One set of numbers.",
        text: "The floor and the boardroom read the same record.",
      },
    ],
    visual: [
      "UNIT 1 · CUTTING · SEWING · FINISHING · on plan",
      "UNIT 2 · SEWING behind plan since 12 Apr",
      "UNIT 3 · FINISHING · on plan",
    ],
  },
  {
    id: "chat-with-your-data",
    href: "/contact",
    title: "Chat with your data",
    description:
      "Ask questions of your own order data directly, instead of digging through filters and views.",
    bullets: [
      {
        lead: "Plain questions.",
        text: "Ask the way you would ask a merchandiser, and get the orders back.",
      },
      {
        lead: "Answers from the record.",
        text: "Every reply is drawn from the POs, stages and updates already in the system.",
      },
    ],
    visual: [
      "“Which POs ship after 25 Apr with no cutting update?”",
      "PO #4907 · ship 27 Apr",
      "PO #5033 · ship 2 May",
    ],
  },
];

const PRODUCT_HEADING = "The product";
const PRODUCT_SUBHEADING = "Six screens your merchandisers live in.";

/**
 * The same six screens in the <992px carousel's shape, derived rather than
 * retyped so the two breakpoints can never drift: the desktop card's `bullets`
 * become the mobile accordion rows ({lead, text} -> {label, body}) and the whole
 * card link becomes the slide's ghost CTA. Slides reuse the restored per-layer
 * stills by position; the artboard ships four, so screens 5-6 fall back to the last
 * one rather than 404ing. The
 * `visual` record lines have no slot in the mobile panel and are desktop-only.
 */
const PRODUCT_SLIDES: readonly StackSlide[] = PRODUCT_SCREENS.map(
  (screen, i): StackSlide => ({
    id: screen.id,
    title: screen.title,
    description: screen.description,
    image:
      MEDIA.stackLayers[i] ?? MEDIA.stackLayers[MEDIA.stackLayers.length - 1],
    rows: screen.bullets.map((bullet) => ({
      label: bullet.lead,
      body: bullet.text,
    })),
    ctas: [
      { label: CTA.label, href: CTA.href, variant: "solid" },
      { label: "Learn more", href: screen.href, variant: "ghost" },
    ],
  }),
);

/** 2.4 — the three things that make the rule engine work. */
const RULES_POINTS: readonly InfrastructureCard[] = [
  {
    title: "Plain English",
    description:
      "No code, no config files. Write rules the way you would brief a new merchandiser.",
  },
  {
    title: "Organised by workflow",
    description:
      "Sourcing, cutting, sewing, shipping. Each milestone carries its own guidelines.",
  },
  {
    title: "Always followed",
    description:
      "Every message, document and action is checked against your rules automatically.",
  },
];

/** 2.5 — rollout, as three `.blog-card`s. */
const ROLLOUT: readonly CapabilityCard[] = [
  {
    title: "Day 1 · Connect",
    description:
      "One unit, one afternoon. WhatsApp numbers, open POs, ERP export. Nothing changes for the floor.",
  },
  {
    title: "Week 1 · First flags",
    description:
      "Live milestones on every open PO, and the first slippage caught the day it happens. Brand updates sent automatically.",
  },
  {
    title: "Season 1 · Full coordination",
    description:
      "Every unit on one timeline, with leadership reading the same numbers as the floor.",
  },
];

export const metadata: Metadata = {
  title: "Platform — DAITA",
  description:
    "How DAITA turns the messages your factories already send into one production record, from PO to delivery.",
};

export default function PlatformPage() {
  return (
    <div className="ns-scope relative">
      <SiteHeader />

      <main className="relative">
        <HeroSection
          eyebrow="Platform"
          title="One record, from PO to delivery."
          subtitle="DAITA sits on the channels your factories already run, structures what is being said, and keeps every party on the same number."
          primaryCta={CTA}
          secondaryCta={null}
          variant="image"
          media={{ src: MEDIA.sectionStill, alt: "" }}
        />
        <SectionSeparator />

        <Anchor id="infrastructure">
          <InfrastructureSection
            heading="How it works"
            subheading="From the floor’s own messages to a record every party can read."
            cards={HOW_IT_WORKS}
          />
        </Anchor>
        <SectionSeparator />

        {/* Desktop stack and its <992px carousel counterpart, paired exactly as
            the homepage pairs them — each hides itself at the other's widths. */}
        <Anchor id="product">
          <PlatformStackSection
            heading={PRODUCT_HEADING}
            subheading={PRODUCT_SUBHEADING}
            cta={CTA}
            layers={PRODUCT_SCREENS}
          />
          <SectionSeparator />
          <PlatformStackMobileSection
            heading={PRODUCT_HEADING}
            subheading={PRODUCT_SUBHEADING}
            cta={CTA}
            slides={PRODUCT_SLIDES}
          />
        </Anchor>
        <SectionSeparator />

        {/* Three points, then the worked SOPs — one idea, two blocks, as the
            homepage pairs its desktop and mobile stack sections. */}
        <Anchor id="guidelines">
          <InfrastructureSection
            heading="Your rules. Your AI."
            subheading="Write your production SOPs in plain English. DAITA follows them exactly, escalating, responding and prioritising the way your team already works."
            cards={RULES_POINTS}
            // This page renders the section twice. Films are matched to cards by
            // position, so without an offset both blocks would play the same three.
            videos={MEDIA.sectionVideos.slice(2)}
          />
          <SectionSeparator />
          <GuidelinesSection />
        </Anchor>
        <SectionSeparator />

        <LatestNewsSection
          heading="Live in a week. Paid back in a season."
          cards={ROLLOUT}
        />
        <SectionSeparator />

        <Anchor id="integrations">
          <TrustedLogosSection />
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
