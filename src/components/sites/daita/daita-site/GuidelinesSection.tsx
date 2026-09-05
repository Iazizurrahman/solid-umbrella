import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * The worked examples that close "Your rules. Your AI." on /platform.
 *
 * No new visual language: the block is the `.section_padding` / `Container` /
 * `SectionLines` shell every sibling section uses, and each row is the exact
 * label-plus-record pairing already shipped elsewhere — the tiny uppercase
 * `.text-nav-label-tiny` treatment from the hero eyebrow for the milestone, and
 * the mono/data treatment from `PlatformStackSection`'s `visual` block for the
 * rule itself, inside that section's `bg-ns-bg-glass-secondary` panel.
 *
 * Content lives here rather than on the page, matching how every other section
 * component in this folder holds its own copy and exposes it as an override.
 */

export interface Guideline {
  /** Milestone the rule hangs off — SOURCING, CUTTING, SEWING, SHIPPING. */
  label: string;
  /** The SOP itself, as the customer would write it. */
  rule: string;
}

export const PLATFORM_GUIDELINES: readonly Guideline[] = [
  {
    label: "Sourcing",
    rule: "When a fabric lot lands short of the cut plan, raise it against the PO and request a substitute.",
  },
  {
    label: "Sourcing",
    rule: "For every trim order, follow up within 72 hours if no confirmation is received.",
  },
  {
    label: "Cutting",
    rule: "Never let a line start cutting before the lot is approved. Hold and notify the merchandiser.",
  },
  {
    label: "Sewing",
    rule: "Follow up when a daily output report is missing. Ask the line supervisor after 3 hours.",
  },
  {
    label: "Shipping",
    rule: "Monitor ETD against the booking and flag any slip to the brand the same day.",
  },
];

export interface GuidelinesSectionProps {
  guidelines?: readonly Guideline[];
}

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function GuidelinesSection({
  guidelines = PLATFORM_GUIDELINES,
}: GuidelinesSectionProps = {}) {
  return (
    <section className="relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div>
          {/* The record panel, verbatim from the stack card's `visual` block. */}
          <div className="flex flex-col gap-4 rounded-[6px] bg-ns-bg-glass-secondary p-4">
            {guidelines.map((guideline) => (
              <div key={guideline.rule} className="flex flex-col gap-2">
                {/* `.text-nav-label-tiny` — the hero eyebrow treatment. */}
                <p className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                  {guideline.label}
                </p>
                <div className="font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-tertiary">
                  {guideline.rule}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
