import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

export interface CapabilityCard {
  title: string;
  description: string;
}

export const HOMEPAGE_NEWS_HEADING = "What’s live today";

/**
 * The four `.blog-card` entries rendered by the Webflow CMS list, in source order.
 * They now carry shipped DAITA capability rather than press releases, so each is a
 * title plus a supporting line — no artwork and no outbound link.
 */
export const HOMEPAGE_CAPABILITY_CARDS: readonly CapabilityCard[] = [
  {
    title: "Two-way ERP integration",
    description:
      "Order data writes back into the factory’s own system of record",
  },
  {
    title: "Platform for buying offices",
    description: "Now in commercial use",
  },
  {
    title: "Automatic escalation",
    description: "When a deadline slips, across three tiers of management",
  },
  {
    title: "Tamil, Hindi and English",
    description: "Voice notes, photos and mixed script, read where they’re sent",
  },
];

export interface LatestNewsSectionProps {
  heading?: string;
  cards?: readonly CapabilityCard[];
}

/**
 * "What’s live today" — `.section_featured-blog`: an h2 followed by a four-across
 * row of `.blog-card` items. Cards still stretch to equal height off the grid, and
 * with the CTA row gone the title/description pair sits at the top of the card.
 *
 * CARD COUNT — the desktop row is a fixed `grid-cols-4`, which would leave a fourth
 * empty column with only three cards, so the column count follows the card count for
 * that one case: exactly 3 cards render `grid-cols-3` (a value already used by
 * InfrastructureSection), every other count keeps the original `grid-cols-4`. The
 * four-card homepage/our-story rows therefore emit the identical class string as
 * before. Below 768px the grid is replaced by the swipe row regardless of count.
 */
export function LatestNewsSection({
  heading = HOMEPAGE_NEWS_HEADING,
  cards = HOMEPAGE_CAPABILITY_CARDS,
}: LatestNewsSectionProps = {}) {
  const columnsClass = cards.length === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <section className="relative isolate overflow-hidden">
      {/* .section_padding (base variant: 7.5rem / 5.5rem) */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      <Container>
        <div>
          {/* .section_featured-blog */}
          <div className="flex flex-col gap-10">
            {/* .body-content > .body-content_copy > .body-content_title-wrap */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-md:max-w-none">
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] leading-[3.25rem] font-medium text-ns-content-primary max-md:text-[2rem] max-md:leading-[2.625rem]">
                    {heading}
                  </h2>
                </div>
              </div>
            </div>

            {/* .featured-blog_collection */}
            <div className="max-md:w-full">
              {/* .swiper-wrapper.is-featured-blog */}
              <ul
                role="list"
                className={`grid ${columnsClass} gap-4 max-md:grid-flow-col max-md:auto-cols-[85%] max-md:grid-cols-none max-md:snap-x max-md:snap-mandatory max-md:gap-0 max-md:overflow-x-auto`}
              >
                {cards.map((card) => (
                  <li key={card.title} className="flex max-md:snap-start">
                    {/* .blog-card */}
                    <div className="flex h-full w-full max-w-full flex-col gap-4 rounded-[8px] border border-ns-border-secondary bg-ns-bg-primary transition-all duration-200 hover:border-ns-border-primary max-md:gap-3">
                      {/* .blog-card_content-wrap */}
                      <div className="flex flex-1 flex-col items-start justify-between gap-8 p-6 max-md:gap-6 max-md:p-4">
                        <div className="flex flex-col gap-4">
                          <h3 className="text-[1.5rem] leading-[2rem] font-medium text-ns-content-primary">
                            {card.title}
                          </h3>
                          <p className="text-ns-content-secondary">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* .section_padding */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      {/* .section_lines */}
      <SectionLines />

      {/* .section_color */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-ns-bg-primary" />
    </section>
  );
}
