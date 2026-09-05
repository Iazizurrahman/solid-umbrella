import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import type { PlatformLayer } from "@/types/daita";

/**
 * `.section_services-stack2` — "What DAITA does, on every order".
 *
 * Desktop only: the source section carries `hide-tablet hide-mobile`, so it is
 * painted at >=992px and a separate `PlatformStackMobileSection` covers below.
 *
 * INTERACTION MODEL — hover, nothing else. The left grid column previously held
 * a Rive canvas whose `LayerController` state machine was data-bound to the four
 * cards; that `.riv` file is gone, so the canvas, the `useRive` hook and the
 * whole hover-boolean/click-trigger binding have been removed. The cards keep
 * their exact `.services-stack2_item` treatment — base `opacity: .6`, active
 * `opacity: 1`, `all .2s cubic-bezier(.215,.61,.355,1)` — driven now by a plain
 * CSS `hover:` on each card rather than by an observed Rive boolean.
 *
 * The left column keeps the canvas's exact box and paints the section image in
 * it, so the two-column grid is untouched.
 *
 * LAYER COUNT — the right column is a flex column, so any number of cards simply
 * makes it taller; the left image is `h-full min-h-[1000px] object-cover`, so it
 * grows with the row and crops rather than distorts. No class change is needed
 * for 6 layers (or 2).
 */

/** `.services-stack2_rive-canvas` box, now filled by the section image. */
const STACK_IMAGE = "/images/daita/sand-3.jpg";

export interface StackLayer extends PlatformLayer {
  href: string;
  /** Bold lead-in plus its sentence. */
  bullets: Array<{ lead: string; text: string }>;
  /** Record data — rendered in the mono/data treatment. */
  visual: string[];
}

export interface PlatformStackCta {
  label: string;
  href: string;
}

export const HOMEPAGE_STACK_HEADING = "What DAITA does, on every order.";
export const HOMEPAGE_STACK_SUBHEADING =
  "From reading every floor message to matching it to a PO, chasing the update, and reconciling the paperwork.";
export const HOMEPAGE_STACK_CTA: PlatformStackCta = {
  label: "Explore the platform",
  href: "/platform",
};

export const HOMEPAGE_STACK_LAYERS: readonly StackLayer[] = [
  {
    id: "capture",
    href: "/platform",
    title: "Read every floor message",
    description:
      "The agent parses WhatsApp voice notes, photos and text in Tamil, Hindi and English, and writes each one to the PO it belongs to.",
    bullets: [
      {
        lead: "No new app for the floor.",
        text: "Supervisors keep sending messages the way they already do. Nothing changes for the line.",
      },
      {
        lead: "Confirmed before it's written.",
        text: "The agent reads the quantity back and waits for a yes before it touches the record.",
      },
      {
        lead: "Mixed script and voice.",
        text: "Voice notes, photos and typed text in any of the three languages.",
      },
    ],
    visual: [
      "WHATSAPP · LINE 7",
      "“4821 sewing 380 pcs done today, machine down 2 hrs”",
      "PO #4821 · Sewing · 380 pcs · 2 hrs downtime",
    ],
  },
  {
    id: "chase",
    href: "/platform",
    title: "Never chase a status again",
    description:
      "DAITA asks the line for the update before the merchandiser has to, then logs the reply against the milestone.",
    bullets: [
      {
        lead: "Nudges on schedule.",
        text: "Every milestone carries its own due time. The agent asks first.",
      },
      {
        lead: "Replies land as records.",
        text: "The answer is written to the milestone, not left in a thread.",
      },
      {
        lead: "Escalation when it's needed.",
        text: "A missed update moves up three tiers of management automatically.",
      },
    ],
    visual: [
      "#4821 · sewing update due 18:00",
      "Nudge sent 18:04",
      "Reply logged 18:21 · 380 pcs",
      "Milestone closed, no chasing",
    ],
  },
  {
    id: "slip",
    href: "/platform",
    title: "Catch slippage the same day",
    description:
      "Actual output is compared to plan every evening. When a line falls behind, cut, finish and ship dates reflow together.",
    bullets: [
      {
        lead: "Plan against actual, nightly.",
        text: "Not a weekly review. Every evening, every open PO.",
      },
      {
        lead: "Dates move together.",
        text: "A slip in sewing reflows finishing and shipping, so the ship date is a real date.",
      },
      {
        lead: "Surfaced while it's fixable.",
        text: "The flag arrives days before the ETD, not after it.",
      },
    ],
    visual: [
      "CUT · PLAN 3–4 APR",
      "SEW · ACTUAL",
      "FINISH · REFLOWED",
      "Sewing 3 days behind plan · finishing moved to 15 Apr, ship date held",
    ],
  },
  {
    id: "reconcile",
    href: "/platform",
    title: "Reconcile the paperwork",
    description:
      "POs, cut reports, packing lists and invoices are cross-checked as they arrive. Mismatched quantities are flagged, not discovered at audit.",
    bullets: [
      {
        lead: "Checked on arrival.",
        text: "Every document is matched against the PO the moment it lands.",
      },
      {
        lead: "Shortfalls surface early.",
        text: "Flagged to the merchandiser and the buying office before the invoice is raised.",
      },
      {
        lead: "Three-way approvals.",
        text: "Quality, quantity and yes/no can each sit with a different person, so no one signs off alone.",
      },
    ],
    visual: [
      "PO #4821 · 4,800 pcs ✓",
      "Cut report · 4,800 pcs ✓",
      "Packing list · 4,760 pcs — 40 short",
    ],
  },
];

export interface PlatformStackSectionProps {
  heading?: string;
  subheading?: string;
  cta?: PlatformStackCta;
  layers?: readonly StackLayer[];
}

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function PlatformStackSection({
  heading = HOMEPAGE_STACK_HEADING,
  subheading = HOMEPAGE_STACK_SUBHEADING,
  cta = HOMEPAGE_STACK_CTA,
  layers = HOMEPAGE_STACK_LAYERS,
}: PlatformStackSectionProps = {}) {
  return (
    <section className="ns-hide-tablet ns-hide-mobile relative isolate bg-ns-bg-secondary">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_services-stack2 */}
          <div className="flex flex-col items-center justify-start gap-4">
            {/* .body-content.is-center */}
            <div className="flex max-w-[37.75rem] flex-col items-center justify-start gap-8 text-center max-[767px]:max-w-none">
              {/* .body-content_copy */}
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                {/* .body-content_title-wrap — "reversed" variant: column-reverse, .25rem gap */}
                <div className="flex flex-col-reverse gap-1">
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

              {/* .body-content_buttons */}
              <div className="flex items-center justify-start gap-6 max-[767px]:flex-col max-[767px]:items-stretch">
                <a href={cta.href} className="inline-block max-w-full">
                  {/* .button — solid variant */}
                  <div className="flex items-center justify-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 py-1.5 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-inverse transition-all duration-200 hover:opacity-80">
                    <span>{cta.label}</span>
                    <div>
                      {/* .button_icon */}
                      <div className="flex w-4 items-center justify-center transition-all duration-200">
                        <ArrowRightIcon />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* .services-stack2_wrap */}
            <div className="grid w-full grid-cols-2 gap-0">
              {/* The old `.services-stack2_rive-canvas` box, kept verbatim so the
                  grid column is unchanged — deliberately overflows its column. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative
                  section artwork dropped straight into the former canvas box. */}
              <img
                src={STACK_IMAGE}
                alt=""
                loading="lazy"
                className="ml-[-15%] block h-full min-h-[1000px] w-[140%] object-cover"
              />

              {/* .services-stack2_items-wrap */}
              <div className="relative z-[1] flex w-full flex-col items-stretch justify-center gap-6 pl-4">
                {layers.map((layer) => (
                  <a
                    key={layer.id}
                    href={layer.href}
                    data-layer={layer.id}
                    // .services-stack2_item — base .6, .is-active 1, now pure CSS hover
                    className="flex w-full flex-col gap-4 rounded-[6px] border border-ns-border-secondary bg-ns-bg-secondary p-6 text-ns-content-primary opacity-60 transition-all duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] hover:opacity-100"
                  >
                    <h3 className="text-[2rem] font-medium leading-[2.625rem]">
                      {layer.title}
                    </h3>
                    <p className="text-[1.125rem] leading-[1.625rem]">
                      {layer.description}
                    </p>

                    <ul role="list" className="m-0 flex list-none flex-col gap-4 p-0">
                      {layer.bullets.map((bullet) => (
                        <li
                          key={bullet.lead}
                          className="text-[1rem] leading-[1.5rem] text-ns-content-secondary"
                        >
                          <span className="font-semibold text-ns-content-primary">
                            {bullet.lead}
                          </span>{" "}
                          {bullet.text}
                        </li>
                      ))}
                    </ul>

                    {/* Record data, in the site's mono/data treatment. */}
                    <div className="flex flex-col gap-2 rounded-[6px] bg-ns-bg-glass-secondary p-4">
                      {layer.visual.map((line) => (
                        <div
                          key={line}
                          className="font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-tertiary"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
