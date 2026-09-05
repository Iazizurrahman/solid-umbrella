import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * "One order, five time zones" — the handoff trail for a single PO.
 *
 * NO NEW VISUAL PATTERN. Every class here is lifted from an existing section:
 *   · section shell, `.section_padding` spacers, `<SectionLines />` and the
 *     `.body-content` heading block are copied verbatim from InfrastructureSection.
 *   · the row container is PlatformStackSection's "record data" block —
 *     `rounded-[6px] bg-ns-bg-glass-secondary p-4` — which is where this site already
 *     paints machine data.
 *   · date + city use the `.text-nav-label-tiny` treatment (HeroSection's eyebrow).
 *   · the detail line uses the mono/data treatment (PlatformStackSection `.visual`).
 *
 * ROW GRID — each row is `grid grid-cols-2 gap-4` (from IndustrySolutionsSection) whose
 * left cell is a second `grid grid-cols-2 gap-4`. That yields date 25% / city 25% /
 * detail 50% with columns that line up down the whole list, without introducing a
 * column-span class the codebase has never used.
 *
 * Below 768px the outer grid becomes the same stacked flex column InfrastructureSection
 * uses for its card grid, so the detail line drops under its date/city pair.
 */

export interface TimelineEntry {
  /** e.g. "02 APR" — rendered in the tiny-uppercase treatment. */
  date: string;
  /** e.g. "NEW YORK" — rendered in the tiny-uppercase treatment. */
  place: string;
  /** What actually happened, in the mono/data treatment. */
  detail: string;
}

export const ORDER_TRAIL_HEADING = "One order, five time zones.";
export const ORDER_TRAIL_SUBHEADING =
  "Every handoff is a place where the update stops moving.";

export const ORDER_TRAIL: readonly TimelineEntry[] = [
  {
    date: "02 APR",
    place: "New York",
    detail:
      "PO #4821 issued — 4,800 pcs, 180 GSM crew tee, ex-factory 18 Apr",
  },
  {
    date: "04 APR",
    place: "London",
    detail:
      "Buying office confirms. Trims split across two vendors, nothing written back to the brand",
  },
  {
    date: "07 APR",
    place: "Tiruppur",
    detail:
      "Fabric lot short 400 m. Cutting holds two days, the update stays on one WhatsApp thread",
  },
  {
    date: "11 APR",
    place: "Dhaka",
    detail:
      "Line moved, ETD +4 days. Second source picks up 1,200 pcs at a different rate",
  },
  {
    date: "28 APR",
    place: "Rotterdam",
    detail:
      "ETA slips, air freight quoted. The brand hears it six days after the floor already knew",
  },
];

export interface TimelineSectionProps {
  heading?: string;
  subheading?: string;
  entries?: readonly TimelineEntry[];
}

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function TimelineSection({
  heading = ORDER_TRAIL_HEADING,
  subheading = ORDER_TRAIL_SUBHEADING,
  entries = ORDER_TRAIL,
}: TimelineSectionProps = {}) {
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

            {/* Record data, in the site's mono/data treatment. */}
            <ul
              role="list"
              className="m-0 flex list-none flex-col gap-4 rounded-[6px] bg-ns-bg-glass-secondary p-4"
            >
              {entries.map((entry) => (
                <li
                  key={`${entry.date}-${entry.place}`}
                  className="grid grid-cols-2 gap-4 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-[0.625rem]"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* `.text-nav-label-tiny` — 10px/12px, 600, uppercase, tertiary. */}
                    <div className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                      {entry.date}
                    </div>
                    <div className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                      {entry.place}
                    </div>
                  </div>

                  <div className="min-w-0 font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-tertiary">
                    {entry.detail}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
