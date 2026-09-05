import { MEDIA, type MediaVideo } from "@/components/sites/daita/shared/brand";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * `.section_video-cards` — "Built where the work happens".
 *
 * Five `.video-card`s (3 + 2 at desktop, stacked at <=767px), unchanged from the
 * source layout. Each card's media box carries its own looping, muted, autoplaying
 * background film from `MEDIA.sectionVideos`, matched to the card by position: card
 * `i` plays `MEDIA.sectionVideos[i]`. WebM is listed before mp4 on purpose — Chrome
 * and Firefox take the smaller VP9 build and only Safari falls through to the mp4.
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
   * Background films, matched to cards by position. Defaults to the full set.
   * `/platform` renders this section twice, so the second instance passes a rotated
   * list — otherwise both would play the same three films on one page.
   */
  videos?: readonly MediaVideo[];
}

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function InfrastructureSection({
  heading = HOMEPAGE_HEADING,
  subheading = HOMEPAGE_SUBHEADING,
  cards = HOMEPAGE_PILLARS,
  videos = MEDIA.sectionVideos,
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
            <div className="grid grid-cols-3 gap-4 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-[0.625rem]">
              {cards.map((card, index) => {
                // Card `i` plays film `i`; a card past the end of the list reuses the
                // last film so an over-long `cards` prop can never render an empty box.
                const video =
                  videos[Math.min(index, videos.length - 1)];

                return (
                  <div
                    key={card.title}
                    className="flex aspect-[400/480] w-full min-w-0 flex-col justify-start gap-4 rounded-[8px] border border-ns-border-glass-primary bg-ns-bg-glass-primary p-4"
                  >
                    {/* .video-card_video.w-background-video */}
                    <div className="relative z-[2] block w-full flex-1 overflow-hidden rounded-[6px] text-white max-[991px]:min-h-0">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={video.poster}
                        className="absolute inset-[-100%] z-[-100] m-auto h-full w-full bg-cover bg-center object-cover"
                      >
                        <source src={video.webm} type="video/webm" />
                        <source src={video.mp4} type="video/mp4" />
                      </video>
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
