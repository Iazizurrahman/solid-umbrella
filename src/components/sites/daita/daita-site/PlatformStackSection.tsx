"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  type UseRiveParameters,
} from "@rive-app/react-canvas";

import { MEDIA } from "@/components/sites/daita/shared/brand";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import { cn } from "@/lib/utils";
import type { PlatformLayer } from "@/types/daita";

/**
 * `.section_services-stack2` — "What DAITA does, on every order".
 *
 * Desktop only: the source section carries `hide-tablet hide-mobile`, so it is
 * painted at >=992px and a separate `PlatformStackMobileSection` covers below.
 *
 * INTERACTION MODEL — hover, not scroll and not click. A Rive canvas
 * (`Artboard` / `LayerController` state machine, `autoBind: true`) sits in the
 * left grid column and the cards sit in the right one. The binding runs both
 * ways through `rive.viewModelInstance`:
 *
 *   - card `mouseenter`  ->  set `<key>_hovered` true, the other keys false
 *   - `<key>_hovered` observed  ->  the matching card gets `.is-active`
 *   - `<key>_clicked` observed  ->  navigate to that card's href
 *
 * so hovering a card drives the artwork and hovering the artwork highlights the
 * card. The artboard's four layer keys are fixed by the `.riv` file — `cloud`,
 * `infrastructure`, `dc` (NOT `data-centers`) and `energy` — and have nothing to
 * do with DAITA's card ids, so cards are bound to them BY POSITION:
 * card 0 -> cloud, 1 -> infrastructure, 2 -> dc, 3 -> energy.
 *
 * The canvas is a pure enhancement: `viewModelInstance` is null until the file
 * loads, every access is guarded, and if the `.riv` never arrives the cards
 * still render, still highlight on hover, and are still ordinary links.
 *
 * LAYER COUNT — the right column is a flex column, so any number of cards simply
 * makes it taller. `/platform` passes six; the artboard only has four layers, so
 * cards 5 and 6 get no key: they never touch the canvas and fall back to the
 * `hover:opacity-100` that is on every card anyway. Hovering one clears the
 * artwork's highlight (all four booleans false, its resting state) rather than
 * leaving an unrelated layer lit. Fewer than four cards is equally fine — the
 * spare keys are simply never bound.
 */

/**
 * Fixed by the artboard, in layer order. The card at index N drives the key at
 * index N; there is deliberately no lookup by card id.
 */
const RIVE_LAYER_KEYS = ["cloud", "infrastructure", "dc", "energy"] as const;

/**
 * Kept at module scope so the object identity is stable — `useRive` captures the
 * params on first render.
 */
const RIVE_PARAMS: UseRiveParameters = {
  src: MEDIA.riveStack,
  artboard: "Artboard",
  stateMachines: "LayerController",
  autoBind: true,
  autoplay: true,
  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
};

/**
 * The source sizes the canvas itself (140% wide, 1000px min-height) and calls
 * `resizeDrawingSurfaceToCanvas()` by hand, so the hook's container-fitting is
 * off here.
 */
const RIVE_OPTIONS = { shouldResizeCanvasToContainer: false };

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
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // `rive` is only populated once the file has loaded, so a non-null value
  // means `viewModelInstance` is available — it is still guarded below.
  const { rive, setCanvasRef } = useRive(RIVE_PARAMS, RIVE_OPTIONS);

  // onLoad + every window resize: match the drawing surface to the CSS box.
  useEffect(() => {
    if (!rive) return;

    const resize = () => {
      try {
        rive.resizeDrawingSurfaceToCanvas();
      } catch {
        // The instance can be torn down mid-flight; nothing to recover.
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [rive]);

  // The reverse half of the binding: observe `<key>_hovered` so hovering the
  // artwork highlights the card, and `<key>_clicked` so clicking it navigates.
  // Keys with no card behind them (fewer than four layers) are skipped.
  useEffect(() => {
    const viewModel = rive?.viewModelInstance;
    if (!viewModel) return;

    const teardown: Array<() => void> = [];

    RIVE_LAYER_KEYS.forEach((key, index) => {
      const layer = layers[index];
      if (!layer) return;

      const hovered = viewModel.boolean(`${key}_hovered`);
      if (hovered) {
        // Rive hands the boolean's value to the callback; the runtime types it
        // as its generic event payload, so widen rather than lie about it.
        const onHovered = (value: unknown) => {
          if (value === true) {
            setActiveIndex(index);
          } else {
            setActiveIndex((current) => (current === index ? null : current));
          }
        };
        hovered.on(onHovered);
        teardown.push(() => hovered.off(onHovered));
      }

      const clicked = viewModel.trigger(`${key}_clicked`);
      if (clicked) {
        const onClicked = () => router.push(layer.href);
        clicked.on(onClicked);
        teardown.push(() => clicked.off(onClicked));
      }
    });

    return () => {
      for (const off of teardown) {
        try {
          off();
        } catch {
          // Property handles die with the instance; unsubscribing is best-effort.
        }
      }
    };
  }, [rive, router, layers]);

  // The forward half: a card's mouseenter drives the artwork. `setActiveIndex`
  // runs first so the highlight is correct even with no canvas. A card past the
  // artboard's four layers matches no key, so every boolean goes false and the
  // artwork returns to its resting state.
  const handleEnter = useCallback(
    (index: number) => {
      setActiveIndex(index);

      const viewModel = rive?.viewModelInstance;
      if (!viewModel) return;

      RIVE_LAYER_KEYS.forEach((key, keyIndex) => {
        const hovered = viewModel.boolean(`${key}_hovered`);
        if (hovered) hovered.value = keyIndex === index;
      });
    },
    [rive],
  );

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
              {/* .services-stack2_rive-canvas — deliberately overflows its column */}
              <canvas
                ref={setCanvasRef}
                aria-hidden="true"
                className="ml-[-15%] block h-full min-h-[1000px] w-[140%]"
              />

              {/* .services-stack2_items-wrap */}
              <div className="relative z-[1] flex w-full flex-col items-stretch justify-center gap-6 pl-4">
                {layers.map((layer, index) => (
                  <a
                    key={layer.id}
                    href={layer.href}
                    data-layer={layer.id}
                    data-rive-layer={RIVE_LAYER_KEYS[index]}
                    onMouseEnter={() => handleEnter(index)}
                    className={cn(
                      // .services-stack2_item
                      "flex w-full flex-col gap-4 rounded-[6px] border border-ns-border-secondary bg-ns-bg-secondary p-6 text-ns-content-primary opacity-60 transition-all duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)]",
                      // CSS fallback so the highlight still works with no canvas
                      "hover:opacity-100",
                      // .is-active, driven by the Rive `<key>_hovered` observer
                      activeIndex === index && "opacity-100",
                    )}
                  >
                    <h3 className="text-[2rem] font-medium leading-[2.625rem]">
                      {layer.title}
                    </h3>
                    <p className="text-[1.125rem] leading-[1.625rem]">
                      {layer.description}
                    </p>

                    {/*
                      Detail panel — collapsed unless this card is the active one.
                      Same `activeIndex` that drives the Rive layer highlight, so the
                      expand and the artwork are one state: hovering a card lights its
                      layer and opens its detail together, and only ever one at a time.

                      Timing is the card's own recorded transition
                      (`all .2s cubic-bezier(.215,.61,.355,1)` on `.services-stack2_item`).
                      The 0fr -> 1fr grid technique is the one the source's own mobile
                      accordion uses, so no fixed pixel height is invented.

                      `-mb-4` while collapsed cancels the card's `gap-4` above a
                      zero-height child, so a collapsed card measures exactly
                      heading + summary.
                    */}
                    <div
                      data-expand=""
                      aria-hidden={activeIndex !== index}
                      className={cn(
                        "grid overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)]",
                        activeIndex === index
                          ? "grid-rows-[1fr] opacity-100"
                          : "-mb-4 grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="flex flex-col gap-4">
                          <ul
                            role="list"
                            className="m-0 flex list-none flex-col gap-4 p-0"
                          >
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
                        </div>
                      </div>
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
