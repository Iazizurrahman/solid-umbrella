import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/daita/daita-site/SiteHeader";
import { HeroSection } from "@/components/sites/daita/daita-site/HeroSection";
import { InfrastructureSection } from "@/components/sites/daita/daita-site/InfrastructureSection";
import { TimelineSection } from "@/components/sites/daita/daita-site/TimelineSection";
import { CtaSection } from "@/components/sites/daita/daita-site/CtaSection";
import { SiteFooter } from "@/components/sites/daita/daita-site/SiteFooter";
import { Container, SectionSeparator } from "@/components/sites/daita/shared/layout";
import { Anchor } from "@/components/sites/daita/shared/Anchor";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import { ASSETS, CONTACT, CTA } from "@/components/sites/daita/shared/brand";

/**
 * /our-story — how DAITA got built, told as seven numbered beats.
 *
 * Composed from the existing section components with DAITA content passed as props, so
 * spacing, type scale, colour and motion are identical to the homepage by construction.
 * No new tokens and no new visual patterns.
 *
 * The page opens with a hero, so `main` deliberately carries no `pt-[73px]`: the hero
 * runs under the fixed header exactly as the homepage's does.
 *
 * SEVEN BEATS, 6 + 1 — `InfrastructureSection` is a `grid-cols-3`, so six beats fill two
 * clean rows and a seventh would strand one card alone on a third row. Beat 07 is also
 * the only beat that carries a call to action ("See open roles"), which the card shape
 * has no slot for. It therefore gets its own closing block below, built from
 * InfrastructureSection's `.body-content` markup plus HeroSection's ghost `.button` —
 * both copied verbatim, so nothing new is introduced visually.
 */
export const metadata: Metadata = {
  title: "Our story — DAITA",
  description:
    "We moved to Tiruppur to build next to the people who use this every day.",
};

/*
 * Immersion figure disputed internally (six / seven / eight months appear across
 * sources). Seven months + fifty-plus factories follows the live site. Founder sign-off
 * needed before launch.
 */
const BEATS = [
  {
    title: "01 · Factories lose time to manual chaos",
    description:
      "Across garment manufacturing, merchandisers spend hours chasing suppliers, updating sheets and writing status emails. What should be quick decisions turn into endless follow-ups. Delays grow, data scatters, and teams work in firefighting mode instead of production flow.",
  },
  {
    title: "02 · Seeing the pattern up close",
    description:
      "Seven months, more than fifty factories, across India, Bangladesh, Turkey, Portugal and Vietnam. The same struggle everywhere — smart, hardworking people trapped in admin work. Automation could free them to focus on the decisions that actually move production forward.",
  },
  {
    title: "03 · Turning frustration into a system",
    description:
      "A second factory tour across India, mapping how back-office work really flows, then designing DAITA around those daily realities rather than around an idea of them.",
  },
  {
    title: "04 · The team",
    description:
      "Factory insight paired with AI, product and operations talent. One founder scaled Europe’s largest green-tech start-up. The other founded a tech venture at school, worked at Snapchat and Bloomberg and with governments on large-scale digital projects, then spent a year in garment factories. Our Chief Engineer, from Carnegie Mellon, led AI work at Qualcomm and Krutrim. Four engineers drive the technology forward.",
  },
  {
    title: "05 · Built in the heart of the industry",
    description:
      "The entire team relocated from cities around the world to Tiruppur, the centre of Indian garment manufacturing, to build alongside real merchandisers. DAITA now runs live factory operations. Every feature comes from field feedback, which is why the system holds under real production pressure.",
  },
  {
    title: "06 · A smarter global supply chain",
    description:
      "Our mission is to make back-office work as efficient as the production line. Starting in South Asia’s textile hubs, DAITA aims to bring clarity, speed and automation to every link of the global apparel supply chain.",
  },
] as const;

const JOIN_TITLE = "07 · Join us";
const JOIN_COPY =
  "We’re building the future of garment manufacturing — intelligent, fast, globally connected. Joining DAITA means working at the frontier of AI and industry transformation, not watching it happen. If that sounds like you, we’d like to hear from you.";

/** `.section_padding` — 7.5rem, 5.5rem at <=767px, as every section uses. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

/**
 * Beat 07 — InfrastructureSection's section shell and `.body-content` block copied
 * verbatim, with HeroSection's ghost `.button` in place of a card grid. Kept in the page
 * rather than promoted to a component because it is one-off copy, not a reusable section.
 */
function JoinUsBlock() {
  return (
    <section className="relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div>
          <div className="flex flex-col gap-10 max-[767px]:gap-8">
            {/* .body-content */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-[767px]:max-w-none">
              {/* .body-content_copy */}
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                {/* .body-content_title-wrap */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
                    {JOIN_TITLE}
                  </h2>
                </div>
                {/* .body-content_desc */}
                <div className="text-ns-content-secondary">
                  <div className="flex flex-col gap-6">
                    <p>{JOIN_COPY}</p>
                  </div>
                </div>
              </div>

              {/* `.button` ghost variant, verbatim from HeroSection's secondary CTA. */}
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block max-w-full"
              >
                <div
                  data-btn-hover="True"
                  className="flex items-center justify-center gap-1 rounded-none bg-transparent p-0 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-primary transition-all duration-200 hover:opacity-80"
                >
                  <span>See open roles</span>
                  <div>
                    {/* .button_icon — 1rem wide */}
                    <div className="flex w-4 items-center justify-center transition-all duration-200">
                      <ArrowRightIcon className="block w-full" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}

export default function OurStoryPage() {
  return (
    <div className="ns-scope relative">
      <SiteHeader />

      <main className="relative">
        <HeroSection
          eyebrow="Our story"
          title="We moved to Tiruppur."
          subtitle="Not to visit. To live there, and build next to the people who use this every day."
          primaryCta={CTA}
          secondaryCta={null}
          variant="image"
          media={{ src: ASSETS.floor, alt: "" }}
        />
        <SectionSeparator />

        <Anchor id="story">
          <InfrastructureSection
            heading="How we got here."
            subheading="From the problem we kept seeing on factory floors to the company we built next to them."
            cards={BEATS}
          />
        </Anchor>
        <SectionSeparator />

        <Anchor id="join-us">
          <JoinUsBlock />
        </Anchor>
        <SectionSeparator />

        <Anchor id="timeline">
          <TimelineSection />
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
