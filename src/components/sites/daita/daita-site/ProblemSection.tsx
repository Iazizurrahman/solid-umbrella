import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * "The chain breaks in the messages" — the problem, stated before the product.
 *
 * NO NEW VISUAL PATTERN. Everything here is lifted from sections either side of it:
 *   · the `<section>` shell, the `.section_padding` spacers and `<SectionLines />` come
 *     from `InfrastructureSection`.
 *   · the `.body-content` heading block — 3rem/3.25rem, 2rem/2.625rem at <=767px, with
 *     the body paragraph under it — is the same block `LatestNewsSection` opens with.
 *   · the cards are `.blog-card` verbatim: `rounded-[8px]`, `border-ns-border-secondary`,
 *     `bg-ns-bg-primary`, a 200ms border-hover, `p-6` dropping to `p-4` at <=767px.
 *
 * FOUR CARDS, TWO COLUMNS. `LatestNewsSection` runs four across; four of these across
 * would give each statement a 280px measure and break every one onto four lines. Two
 * columns is the `IndustrySolutionsSection` grid, already in the system, and gives each
 * statement one or two lines.
 *
 * NO STATISTICS, by instruction and by the rebrand brief's §0: not a count of groups,
 * not a percentage, not a number of days. Each point is a description of the work, which
 * is the only kind of claim available without a source.
 */

const HEADING = "The chain breaks in the messages.";

const BODY =
  "A cut plan changes on WhatsApp. A fabric lot arrives 400 m short. A buyer moves an " +
  "ETD by four days. None of it reaches the system the same day, so merchandisers " +
  "rebuild the plan from screenshots, phone calls and yesterday’s spreadsheet.";

const POINTS: readonly string[] = [
  "Dozens of WhatsApp groups, one per order and sometimes one per stage",
  "The same status typed into three different spreadsheets",
  "A buyer report assembled by hand at the end of the week",
  "Finding out an order is late only when it is too late to fix",
];

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function ProblemSection() {
  return (
    <section className="relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div className="flex flex-col gap-10 max-[767px]:gap-8">
          {/* .body-content */}
          <div className="flex max-w-[37.75rem] flex-col gap-6">
            <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
              {HEADING}
            </h2>
            <div className="text-ns-content-secondary">
              <p>{BODY}</p>
            </div>
          </div>

          {/* .blog-card grid, two across */}
          <ul
            role="list"
            className="m-0 grid list-none grid-cols-2 gap-4 p-0 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-[0.625rem]"
          >
            {POINTS.map((point) => (
              <li key={point} className="flex">
                <div className="flex h-full w-full max-w-full flex-col gap-4 rounded-[8px] border border-ns-border-secondary bg-ns-bg-primary p-6 transition-all duration-200 hover:border-ns-border-primary max-[767px]:p-4">
                  {/* text-balance, not the base layer's `pretty`: these are short display
                      statements, and "…too late to fix" stranded "fix" on its own line at
                      four of the five widths. Balancing a two-line statement cannot change
                      its line count. */}
                  <p className="text-[1.5rem] leading-[2rem] font-medium text-balance text-ns-content-primary max-[767px]:text-[1.25rem] max-[767px]:leading-[1.75rem]">
                    {point}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
