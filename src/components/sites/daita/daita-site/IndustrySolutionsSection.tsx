"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MEDIA } from "@/components/sites/daita/shared/brand";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import { cn } from "@/lib/utils";
import type { IndustrySolution } from "@/types/daita";

export type { IndustrySolution };

export const HOMEPAGE_INDUSTRY_HEADING = "Who it’s for";

/**
 * Beachhead unresolved — factories-first vs buying-offices-first. Two equal tabs
 * is the neutral position; lead with the winner once decided.
 *
 * The two `.use-case_item` entries, in source order. Each card carries its own
 * artwork (`MEDIA.industryPrimary` / `MEDIA.industrySecondary`).
 */
export const HOMEPAGE_INDUSTRY_SOLUTIONS: readonly IndustrySolution[] = [
  {
    id: "garment-exporters",
    tabLabel: "Garment exporters",
    title: "Garment exporters",
    subtitle: "One timeline across every unit",
    description:
      "Export houses running multiple units and multiple buyers, where merchandisers coordinate every order over WhatsApp, email and Excel. DAITA sits on the channels the factory already runs, builds and maintains the T&A, and surfaces slippage while there’s still time to fix it.",
    image: MEDIA.industryPrimary,
    imageAlt: "",
    href: "/platform",
  },
  {
    id: "buying-offices",
    tabLabel: "Buying offices",
    title: "Buying offices",
    subtitle: "Visibility into what the supplier is actually doing",
    description:
      "Buying offices representing brands across several factories, where status arrives late and second-hand. DAITA structures what suppliers are already reporting, so the office sees the same numbers as the floor on the day they’re recorded.",
    /* Its own shot, distinct from the first card's. */
    image: MEDIA.industrySecondary,
    imageAlt: "",
    href: "/platform",
  },
];

export interface IndustrySolutionsSectionProps {
  heading?: string;
  items?: readonly IndustrySolution[];
}

/** `.section_padding` (base 7.5rem, 5.5rem at <=767px) — a real spacer div, not padding. */
function SectionPadding() {
  return <div aria-hidden="true" className="h-[7.5rem] max-[767px]:h-[5.5rem]" />;
}

/**
 * `.section` + `.section_use-case` — "Who it's for" on the blue gradient band.
 *
 * INTERACTION MODEL — there is no desktop tab switcher. The source page registers the
 * `data-tab-trigger` click handlers inside `gsap.matchMedia().add("(max-width: 767px)", …)`,
 * so tabs only exist at 767px and below:
 *
 *   - >=768px: `.use-case_tabs` is `display: none` and `.use-case_items` is a two-column
 *     grid, so both cards render side by side, always visible, with no JS involved. Every
 *     class driven by `activeId` below is prefixed `max-[767px]:`, which is what guarantees
 *     the desktop path is unaffected by React state.
 *   - <=767px: the triggers appear, `.use-case_items` becomes `display: block; position:
 *     relative`, and GSAP stacks the panels and cross-fades them with `autoAlpha` (opacity
 *     + visibility). Reproduced here by leaving the active panel in flow — so it still
 *     dictates the container height — and absolutely positioning the inactive one at
 *     `opacity: 0; visibility: hidden`, riding `.use-case_item`'s `transition: opacity .3s`.
 *
 * The first solution is active on the server, so the mobile layout degrades to the
 * garment-exporters card with JS disabled.
 *
 * ITEM COUNT — the desktop grid is `grid-cols-2`, left exactly as the source has it.
 * Two items fill one row; a THIRD item wraps to a second row as a single half-width
 * card with an empty column beside it. That is intentional and unchanged — no
 * count-driven class was introduced here. The mobile tab strip is a flex row, so it
 * takes 2 or 3 triggers without a class change.
 *
 * The gradient lives on the inner `.section_color` layer (z-index -3, inset 0), never on the
 * `<section>` itself, so `.section_lines` can sit between it and the content at z-index -1.
 */
export function IndustrySolutionsSection({
  heading = HOMEPAGE_INDUSTRY_HEADING,
  items = HOMEPAGE_INDUSTRY_SOLUTIONS,
}: IndustrySolutionsSectionProps = {}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <section className="relative isolate">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_use-case */}
          <div className="flex flex-col gap-[4.5rem] max-[767px]:gap-10">
            {/* .body-content */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-[767px]:max-w-none">
              {/* .body-content_copy */}
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                {/* .body-content_title-wrap */}
                <div className="flex flex-col gap-6">
                  {/* .text-heading-h3 / .sm-text-heading-h3-mobile */}
                  <h2 className="text-[3rem] leading-[3.25rem] font-medium text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
                    {heading}
                  </h2>
                </div>
              </div>
            </div>

            {/* .use-case_tabs — display: none until <=767px, where the tabs actually exist */}
            <div className="hidden max-[767px]:block">
              {/* .use-case_tabs_triggers */}
              <div role="tablist" className="flex gap-2">
                {items.map((solution) => {
                  const isActive = solution.id === activeId;

                  return (
                    // .use-case_tabs_trigger — transparent, zero padding; the box is .tab-trigger
                    <button
                      key={solution.id}
                      type="button"
                      role="tab"
                      id={`use-case-tab-${solution.id}`}
                      aria-selected={isActive}
                      aria-controls={`use-case-panel-${solution.id}`}
                      onClick={() => setActiveId(solution.id)}
                      className="bg-transparent p-0"
                    >
                      {/* .tab-trigger */}
                      <div
                        className={cn(
                          "rounded-[4px] px-3 py-[0.625rem] transition-colors duration-200",
                          isActive ? "bg-ns-bg-glass-primary" : "bg-ns-bg-glass-secondary",
                        )}
                      >
                        {/* .text-label-sm-regular */}
                        <div className="text-[0.875rem] leading-[1.25rem] font-normal text-ns-content-primary">
                          {solution.tabLabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              {/* .use-case_items — two columns at desktop, a stacking context at <=767px */}
              <div className="grid grid-cols-2 gap-4 max-[767px]:relative max-[767px]:block">
                {items.map((solution) => {
                  const isActive = solution.id === activeId;

                  return (
                    // .use-case_item
                    <div
                      key={solution.id}
                      role="tabpanel"
                      id={`use-case-panel-${solution.id}`}
                      aria-labelledby={`use-case-tab-${solution.id}`}
                      className={cn(
                        "flex min-w-0 transition-opacity duration-300",
                        // Below 768px only: the inactive panel is lifted out of flow and
                        // faded to autoAlpha 0. Above it, both classes are inert.
                        !isActive &&
                          "max-[767px]:pointer-events-none max-[767px]:absolute max-[767px]:inset-x-0 max-[767px]:top-0 max-[767px]:invisible max-[767px]:opacity-0",
                      )}
                    >
                      {/* .usage-card */}
                      <div className="flex w-full flex-col items-start justify-between gap-[3.75rem] max-[767px]:gap-10">
                        {/* .usage-card_content */}
                        <div className="flex w-full flex-col gap-4">
                          {/* .usage-card_image — one <img> per card in the source is duplicated
                              as .is-desktop / .is-mobile purely to swap aspect-ratio; the src is
                              identical, so a single element with a responsive ratio is equivalent. */}
                          <Image
                            src={solution.image}
                            alt={solution.imageAlt}
                            width={608}
                            height={358}
                            className="aspect-[608/358] w-full rounded-[8px] object-cover max-[767px]:aspect-[327/185]"
                          />

                          {/* .usage-card_copy */}
                          <div className="flex flex-col gap-2 text-ns-content-primary max-[767px]:gap-4">
                            {/* .text-heading-h5 / .sm-text-heading-h4-mobile */}
                            <h3 className="text-[1.5rem] leading-[2rem] font-medium max-[767px]:text-[1.75rem]">
                              {solution.title}
                            </h3>
                            {/* .text-label-md-bold / .sm-text-label-sm-bold */}
                            <h4 className="text-[1rem] leading-[1.5rem] font-semibold max-[767px]:text-[0.875rem] max-[767px]:leading-[1.25rem]">
                              {solution.subtitle}
                            </h4>
                            {/* .text-body-sm / .sm-text-body-md */}
                            <p className="text-[0.875rem] leading-[1.25rem] max-[767px]:text-[1rem] max-[767px]:leading-[1.5rem]">
                              {solution.description}
                            </p>
                          </div>
                        </div>

                        <Link href={solution.href} className="inline-block max-w-full">
                          {/* .button — base (solid) variant: inverse background, inverse text */}
                          <div className="flex items-center justify-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 py-[0.375rem] text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-inverse transition-all duration-200 hover:opacity-80">
                            <span>Learn more</span>
                            <div>
                              {/* .button_icon */}
                              <div className="flex w-4 items-center justify-center transition-all duration-200">
                                <ArrowRightIcon />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />

      {/* .section_lines */}
      <SectionLines />

      {/* .section_color, variant "gradient" */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[3] h-full w-full bg-[linear-gradient(45deg,#0f41f3_16%,#289dd0)]"
      />
    </section>
  );
}
