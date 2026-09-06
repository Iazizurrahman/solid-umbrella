import { MEDIA, type MediaImage } from "@/components/sites/daita/shared/brand";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * `.section_video-cards` — "Built where the work happens".
 *
 * Five `.video-card`s (3 + 2 at desktop, stacked at <=767px), unchanged from the
 * source layout. Each card's media box carries a photograph from `MEDIA.pillarImages`,
 * matched to the card by position: card `i` shows `MEDIA.pillarImages[i]`.
 *
 * These were looping background films in the source. The replacements are stills: the
 * five films were the previous owner's data-centre and construction footage, wrong for
 * garment software, and they cost roughly 30 MB per page load. The box, its aspect
 * ratio and `object-cover` are unchanged, so the layout is identical.
 *
 * The source kept `.video-card_desc` inside a collapsed `[data-expand]` wrapper
 * (height driven to 0 by Webflow's interaction script) so the homepage showed
 * title-only cards. Each DAITA card now carries a real supporting sentence that has
 * to be read, so the wrapper is no longer collapsed.
 *
 * CARD COUNT — the desktop grid is a plain `grid-cols-3`, so it takes any count
 * without a class change: 5 fills 3 + 2, 3 fills a single row, 6 would fill 3 + 3.
 * Below 768px the grid is replaced by a stacked flex column regardless of count.
 * `/platform` passes three cards, which take the first three films; a caller passing
 * more cards than there are films reuses the last one rather than rendering an empty
 * `<video>`.
 */

export interface InfrastructureCard {
  title: string;
  /** `.video-card_desc` copy — now painted, not collapsed. */
  description: string;
}

export const HOMEPAGE_HEADING = "Built where the work happens";
export const HOMEPAGE_SUBHEADING =
  "Why this works in a factory when most software doesn’t.";

/** The five homepage `.video-card` entries, in source order. */
export const HOMEPAGE_PILLARS: readonly InfrastructureCard[] = [
  {
    title: "Embedded, not exported",
    description:
      "The team relocated from cities around the world to Tiruppur to build alongside real merchandisers. Every feature came out of field feedback, not a roadmap meeting.",
  },
  {
    title: "T&A-native",
    description:
      "PO in, Time & Action out. The critical path is the object the system is built around, not a report generated from it.",
  },
  {
    title: "It does the work, not the watching",
    description:
      "The agent chases, extracts, drafts and writes back. A human approves. Dashboards show you a problem; DAITA handles it.",
  },
  {
    title: "Live in a week",
    description:
      "One unit, one afternoon. Connect the WhatsApp numbers and the open POs. No IT project, no migration, nothing changes for the floor.",
  },
  {
    title: "Your rules, your AI",
    description:
      "Write your production SOPs in plain English. DAITA follows them exactly, escalating and prioritising the way your team already works.",
  },
];

export interface InfrastructureSectionProps {
  heading?: string;
  subheading?: string;
  cards?: readonly InfrastructureCard[];
  /**
   * Card photographs, matched to cards by position. Defaults to the full set.
   * `/platform` renders this section twice, so the second instance passes a rotated
   * list — otherwise both would show the same three images on one page.
   */
  media?: readonly MediaImage[];
}

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function InfrastructureSection({
  heading = HOMEPAGE_HEADING,
  subheading = HOMEPAGE_SUBHEADING,
  cards = HOMEPAGE_PILLARS,
  media = MEDIA.pillarImages,
}: InfrastructureSectionProps = {}) {
  return (
    <section className="relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_video-cards */}
          <div className="flex flex-col gap-10 max-[767px]:gap-8">
            {/* .body-content */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-[767px]:max-w-none">
              {/* .body-content_copy */}
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                {/* .body-content_title-wrap */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
                    {heading}
                  </h2>
                </div>
                {/* .body-content_desc */}
                <div className="text-ns-content-secondary">
                  <div className="flex flex-col gap-6">
                    <p>{subheading}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* .video-cards_list-wrap */}
            {/* auto-rows-fr: with 5 cards in a 3-col grid the two rows size
                independently, so row 2 came out 32px shorter than row 1. Equal rows
                make every card in the section the same height, which is what the
                section reads as. */}
            <div className="grid auto-rows-fr grid-cols-3 gap-4 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-[0.625rem]">
              {cards.map((card, index) => {
                // Card `i` shows image `i`; a card past the end of the list reuses the
                // last one so an over-long `cards` prop can never render an empty box.
                const image = media[Math.min(index, media.length - 1)];

                return (
                  <div
                    key={card.title}
                    /*
                      `h-full`, not `aspect-[400/480]`. The fixed aspect sized the card
                      from its width and left the media box to absorb whatever the copy
                      did not use — so images came out 298-330px in the same row, and on
                      /our-story at 767 the copy exceeded the aspect entirely and the six
                      cards ran 278-410px. Stretching to the grid row instead makes the
                      cards equal by construction and the aspect now lives on the media
                      box, so the photographs match too.
                    */
                    className="flex h-full w-full min-w-0 flex-col justify-start gap-4 rounded-[8px] border border-ns-border-glass-primary bg-ns-bg-glass-primary p-4"
                  >
                    {/* .video-card_video — same box, a still instead of a film. The
                        6:5 ratio is what the old 400/480 card left for media once its
                        padding, gap and copy were taken out, so the images keep the
                        proportion they had. */}
                    <div className="relative z-[2] block aspect-[6/5] w-full shrink-0 overflow-hidden rounded-[6px] text-white">
                      {/* eslint-disable-next-line @next/next/no-img-element -- fills a
                          fixed-aspect box with object-cover; next/image's wrapper would
                          fight the absolute positioning the source box relies on. */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>

                    {/* .video-card_copy */}
                    <div>
                      <h3 className="text-[1.5rem] font-medium leading-[2rem] text-ns-content-primary">
                        {card.title}
                      </h3>
                      {/* .video-card_expand — uncollapsed: the description is real copy now */}
                      <div>
                        <div className="pt-2">
                          <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-secondary">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
