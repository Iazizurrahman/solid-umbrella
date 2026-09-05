"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ASSETS, CTA, SECONDARY_CTA } from "@/components/sites/daita/shared/brand";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/sites/daita/shared/icons";
import { cn } from "@/lib/utils";
import type { PlatformLayer } from "@/types/daita";

/**
 * `.section.hide-desktop` > `[data-platform-slider-section].section_services-slider`
 * — the small-screen counterpart of the platform stack.
 *
 * At >=992px this renders nothing (`.ns-hide-desktop`) and the Rive-canvas
 * `PlatformStackSection` covers the same content; `.section_services-slider` is
 * itself `display: none` until the source's own `max-width: 991px` query, so the
 * two never overlap.
 *
 * Structure, verbatim from the source DOM and confirmed against the 375px
 * captures in docs/design-references/.../mobile-02-platform-stack-top.png and
 * mobile-03-platform-stack-detail.png:
 *   .services-slider_top-wrap        heading + copy + solid "Explore the platform"
 *                                    (no arrow icon — the source span is bare)
 *   [data-image-swiper]              one still per slide
 *   [data-swiper-pagination]         one progress-bar pill per slide, injected by
 *                                    Swiper (four on the homepage)
 *   [data-content-swiper]            one content panel per slide, synced to
 *                                    the image
 *
 * It is a CAROUSEL of capabilities; the accordion rows live one level deeper,
 * inside each panel — they are not the capabilities themselves.
 *
 * SLIDE COUNT — the content is passed in via `slides`, defaulting to the
 * homepage's four. The pagination is a `flex gap-1` row of `flex-1` pills, so a
 * longer deck simply divides the same track into narrower pills: at 390px the
 * 350px content width gives ~76px per pill at four and ~47px at six, both well
 * clear of hairline. The track, the panels and the accordion are all count-
 * agnostic, so no class changes with the count.
 *
 * Each content panel holds `[data-accordion="single"]` with its `rows`. The
 * source drives the two Swipers and the
 * accordion with Webflow/Swiper scripts; both are reimplemented here in React
 * with a CSS transition and no animation library:
 *   - slider: a translateX track, driven by the pagination bullets and by a
 *     horizontal touch swipe (this section only ever renders on touch widths).
 *   - accordion: `grid-template-rows: 0fr -> 1fr` on `[data-accordion-expand]`,
 *     which animates height without measuring it in JS. `single` means at most
 *     one row open per layer; the source's default state is all-collapsed
 *     (`.plus-toggle_icon.is-minus { display: none }` with no open item), so the
 *     accordion starts fully closed and a second click re-collapses a row.
 *
 * `.platform-slider_accordion_content` is `gap: .625rem; padding-top: .625rem`
 * with an empty CMS `<h4 class="text-label-md-bold">` as its first flex child.
 * The empty heading paints nothing but still contributes one gap, so the
 * paragraph sits 1.25rem below the trigger — reproduced here as `pt-5` rather
 * than by rendering an empty, unlabelled heading element.
 */

export interface StackSlideRow {
  /** `.platform-slider_accordion_trigger` heading. */
  label: string;
  body: string;
}

export interface StackSlideCta {
  label: string;
  href: string;
  /** `.button` default vs `.button.w-variant-102d8d7c…` (transparent, no padding). */
  variant: "solid" | "ghost";
}

export interface StackSlide extends PlatformLayer {
  /**
   * `.services-slider_image` — one 1340x1822 still per slide. There is no
   * per-capability DAITA artwork yet, so every slot points at the section
   * still; the wrapper, intrinsic ratio and classes are unchanged.
   */
  image: string;
  rows: StackSlideRow[];
  ctas: StackSlideCta[];
}

/** `.services-slider_top-wrap` solid button — label plus destination. */
export interface PlatformStackMobileCta {
  label: string;
  href: string;
}

/** Both CTAs are identical on every homepage slide — solid demo, ghost platform link. */
const STACK_CTAS: StackSlideCta[] = [
  { label: CTA.label, href: CTA.href, variant: "solid" },
  { label: "Learn more", href: SECONDARY_CTA.href, variant: "ghost" },
];

export const HOMEPAGE_STACK_MOBILE_HEADING =
  "What DAITA does, on every order.";
export const HOMEPAGE_STACK_MOBILE_SUBHEADING =
  "From reading every floor message to matching it to a PO, chasing the update, and reconciling the paperwork.";
export const HOMEPAGE_STACK_MOBILE_CTA: PlatformStackMobileCta = {
  label: "Explore the platform",
  href: SECONDARY_CTA.href,
};

export const HOMEPAGE_STACK_SLIDES: readonly StackSlide[] = [
  {
    id: "capture",
    title: "Read every floor message",
    description:
      "The agent parses WhatsApp voice notes, photos and text in Tamil, Hindi and English, and writes each one to the PO it belongs to.",
    image: ASSETS.floor,
    rows: [
      {
        label: "No new app for the floor",
        body: "Supervisors keep sending messages the way they already do. Nothing changes for the line.",
      },
      {
        label: "Confirmed before it's written",
        body: "The agent reads the quantity back and waits for a yes before it touches the record.",
      },
      {
        label: "Mixed script and voice",
        body: "Voice notes, photos and typed text in any of the three languages.",
      },
    ],
    ctas: STACK_CTAS,
  },
  {
    id: "chase",
    title: "Never chase a status again",
    description:
      "DAITA asks the line for the update before the merchandiser has to, then logs the reply against the milestone.",
    image: ASSETS.floor,
    rows: [
      {
        label: "Nudges on schedule",
        body: "Every milestone carries its own due time. The agent asks first.",
      },
      {
        label: "Replies land as records",
        body: "The answer is written to the milestone, not left in a thread.",
      },
      {
        label: "Escalation when it's needed",
        body: "A missed update moves up three tiers of management automatically.",
      },
    ],
    ctas: STACK_CTAS,
  },
  {
    id: "slip",
    title: "Catch slippage the same day",
    description:
      "Actual output is compared to plan every evening. When a line falls behind, cut, finish and ship dates reflow together.",
    image: ASSETS.floor,
    rows: [
      {
        label: "Plan against actual, nightly",
        body: "Not a weekly review. Every evening, every open PO.",
      },
      {
        label: "Dates move together",
        body: "A slip in sewing reflows finishing and shipping, so the ship date is a real date.",
      },
      {
        label: "Surfaced while it's fixable",
        body: "The flag arrives days before the ETD, not after it.",
      },
    ],
    ctas: STACK_CTAS,
  },
  {
    id: "reconcile",
    title: "Reconcile the paperwork",
    description:
      "POs, cut reports, packing lists and invoices are cross-checked as they arrive. Mismatched quantities are flagged, not discovered at audit.",
    image: ASSETS.floor,
    rows: [
      {
        label: "Checked on arrival",
        body: "Every document is matched against the PO the moment it lands.",
      },
      {
        label: "Shortfalls surface early",
        body: "Flagged to the merchandiser and the buying office before the invoice is raised.",
      },
      {
        label: "Three-way approvals",
        body: "Quality, quantity and yes/no can each sit with a different person, so no one signs off alone.",
      },
    ],
    ctas: STACK_CTAS,
  },
];

/** `.section_padding` (default "large" variant) — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

/** `.button` — solid uses `--background--inverse`; ghost is the 102d8d7c variant. */
function StackButton({ cta }: { cta: StackSlideCta }) {
  return (
    <a href={cta.href} className="inline-block max-w-full">
      <div
        data-btn-hover="True"
        className={cn(
          "flex items-center justify-center gap-1 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] transition-all duration-200 hover:opacity-80",
          cta.variant === "solid"
            ? "rounded-[4px] bg-ns-bg-inverse px-4 py-[0.375rem] text-ns-content-inverse"
            : "rounded-none bg-transparent p-0 text-ns-content-primary",
        )}
      >
        <span>{cta.label}</span>
        <div>
          {/* .button_icon — 1rem wide */}
          <div className="flex w-4 items-center justify-center transition-all duration-200">
            <ArrowRightIcon className="block w-full" />
          </div>
        </div>
      </div>
    </a>
  );
}

/** `[data-accordion="single"].services-slider_accordion` */
function LayerAccordion({ rows }: { rows: StackSlideRow[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div data-accordion="single" className="flex flex-col gap-4">
      {rows.map((row, index) => {
        const isOpen = open === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={row.label} data-accordion-item="">
            {/* .platform-slider_accordion_trigger */}
            <button
              type="button"
              id={triggerId}
              data-accordion-trigger=""
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 border-b border-ns-content-primary bg-transparent py-2 text-left"
            >
              <h5 className="text-[1.5rem] font-medium leading-[2rem] text-ns-content-primary max-[767px]:text-[1rem] max-[767px]:font-bold max-[767px]:leading-[1.25rem]">
                {row.label}
              </h5>
              {/* .platform-slider_accordion_plus > .plus-toggle */}
              <div className="w-4 flex-none">
                <div className="flex items-center justify-center text-ns-content-primary">
                  {isOpen ? (
                    <MinusIcon className="block w-full" />
                  ) : (
                    <PlusIcon className="block w-full" />
                  )}
                </div>
              </div>
            </button>

            {/* .platform-slider_accordion_expand */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              data-accordion-expand=""
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                {/* .platform-slider_accordion_content */}
                <div className="flex flex-col gap-[0.625rem] pt-5">
                  <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-secondary">
                    {row.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export interface PlatformStackMobileSectionProps {
  heading?: string;
  subheading?: string;
  cta?: PlatformStackMobileCta;
  slides?: readonly StackSlide[];
}

export function PlatformStackMobileSection({
  heading = HOMEPAGE_STACK_MOBILE_HEADING,
  subheading = HOMEPAGE_STACK_MOBILE_SUBHEADING,
  cta = HOMEPAGE_STACK_MOBILE_CTA,
  slides = HOMEPAGE_STACK_SLIDES,
}: PlatformStackMobileSectionProps = {}) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < 40) return;
    setActive((current) =>
      Math.min(slides.length - 1, Math.max(0, current + (delta < 0 ? 1 : -1))),
    );
  }

  const track = { transform: `translate3d(-${active * 100}%, 0, 0)` };

  return (
    <section className="ns-hide-desktop relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_services-slider */}
          <div
            data-platform-slider-section=""
            className="flex flex-col gap-8 overflow-hidden"
          >
            {/* .services-slider_top-wrap */}
            <div className="flex flex-col items-start justify-start gap-8">
              {/* .services-slider_title-wrap */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[2rem] font-medium leading-[2.625rem] text-ns-content-primary">
                  {heading}
                </h2>
                <p className="text-[1rem] leading-[1.5rem] text-ns-content-secondary">
                  {subheading}
                </p>
              </div>
              <a href={cta.href} className="inline-block max-w-full">
                <div
                  data-btn-hover="True"
                  className="flex items-center justify-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 py-[0.375rem] text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-inverse transition-all duration-200 hover:opacity-80"
                >
                  <span>{cta.label}</span>
                </div>
              </a>
            </div>

            {/* [data-image-swiper].services-slider_images-slider */}
            <div
              data-image-swiper=""
              className="w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={track}
              >
                {slides.map((layer, index) => (
                  <div
                    key={layer.id}
                    role="group"
                    aria-hidden={index !== active}
                    className="w-full flex-none"
                  >
                    <Image
                      src={layer.image}
                      alt=""
                      width={1340}
                      height={1822}
                      sizes="100vw"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* [data-swiper-pagination].services-slider_pagination
                `gap: .25rem` from the stylesheet, plus Swiper's 4px horizontal
                bullet margin. The bullets are not Swiper's default 8px dots —
                measured off the 375px capture they are progress-bar pills:
                four equal 72.75px tracks 4px tall with a 2px radius, spanning
                the full 335px content width (20..355), active #fff and inactive
                rgb(61,61,62) = white at 20% over #0c0c0e. `flex-1` keeps that
                full-width division for any slide count. */}
            <div data-swiper-pagination="" className="flex gap-1">
              {slides.map((layer, index) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={layer.title}
                  aria-current={index === active}
                  className={cn(
                    "mx-1 h-1 flex-1 rounded-full transition-colors duration-200",
                    index === active
                      ? "bg-ns-content-primary"
                      : "bg-[rgba(255,255,255,0.2)]",
                  )}
                />
              ))}
            </div>

            {/* [data-content-swiper].services-slider_content-slider */}
            <div
              data-content-swiper=""
              className="mt-2 w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex items-start transition-transform duration-500 ease-out"
                style={track}
              >
                {slides.map((layer, index) => (
                  <div
                    key={layer.id}
                    className="w-full flex-none"
                    /* Off-screen panels keep their focusable buttons out of the
                       tab order and out of the accessibility tree. */
                    inert={index !== active}
                  >
                    {/* .services-slider_content_wrap */}
                    <div
                      data-layer={layer.id}
                      className="flex flex-col gap-8"
                    >
                      {/* .services-slider_content_title-wrap */}
                      <div className="flex flex-col gap-6">
                        <h3 className="text-[2rem] font-medium leading-[2.625rem] text-ns-content-primary">
                          {layer.title}
                        </h3>
                        <p className="text-[1rem] leading-[1.5rem] text-ns-content-secondary">
                          {layer.description}
                        </p>
                      </div>

                      <LayerAccordion rows={layer.rows} />

                      {/* .services-slider_cta-wrap */}
                      <div className="flex items-center justify-start gap-6">
                        {layer.ctas.map((cta) => (
                          <StackButton key={cta.label} cta={cta} />
                        ))}
                      </div>
                    </div>
                  </div>
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
