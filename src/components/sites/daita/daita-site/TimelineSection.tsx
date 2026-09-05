"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import { useMediaQuery } from "@/components/sites/daita/shared/useMediaQuery";

/**
 * "One order, five time zones" — the handoff trail for a single PO, scroll-pinned.
 *
 * NO NEW VISUAL PATTERN. Every class here is lifted from an existing section:
 *   · section shell, `.section_padding` spacers, `<SectionLines />` and the
 *     `.body-content` heading block are copied verbatim from InfrastructureSection.
 *   · the row container is PlatformStackSection's "record data" block —
 *     `rounded-[6px] bg-ns-bg-glass-secondary p-4` — which is where this site already
 *     paints machine data.
 *   · date + city use the `.text-nav-label-tiny` treatment (HeroSection's eyebrow).
 *   · the detail line uses the mono/data treatment (PlatformStackSection `.visual`).
 *   · the 200ms cubic-bezier(.215,.61,.355,1) transition is the platform stack's.
 *
 * THE PIN. The section is a tall wrapper holding a `position: sticky` panel. The panel
 * holds still for the length of the wrapper while the page scrolls past it, and the
 * scroll distance travelled picks which stop is active. Five stops over four viewport
 * heights of travel, so one stop per scroll step. No library: `position: sticky` plus a
 * rAF-throttled scroll read is the whole mechanism.
 *
 * TWO STATIC FALLBACKS, both rendering the full list with every stop lit:
 *   · `prefers-reduced-motion: reduce` — no pin, no progressive reveal, nothing moves.
 *   · below 768px — a pinned panel taller than a phone viewport cannot stick, and a
 *     five-viewport scroll hijack on a phone is hostile. The list simply stacks.
 * Both are decided by `useMediaQuery`, which reads the browser rather than guessing,
 * and both render exactly the same markup the animated build renders at its last step.
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
    detail: "PO #4821 issued — 4,800 pcs, 180 GSM crew tee, ex-factory 18 Apr",
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

/** Viewport heights of scroll travel per stop after the first. */
const VH_PER_STOP = 65;

const EASE = "transition-all duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)]";

export function TimelineSection({
  heading = ORDER_TRAIL_HEADING,
  subheading = ORDER_TRAIL_SUBHEADING,
  entries = ORDER_TRAIL,
}: TimelineSectionProps = {}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Server and first client render assume the small layout, which is the static one —
  // so the static markup is what hydrates, and the pin is added afterwards.
  const wideEnough = useMediaQuery("(min-width: 768px)");
  const pinned = wideEnough && !reduceMotion;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = wrapper.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const done = Math.min(Math.max(-rect.top, 0), travel) / travel;
      setProgress(done);
      setActive(Math.min(entries.length - 1, Math.floor(done * entries.length)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, entries.length]);

  // In either static fallback every stop is lit and the rail is full.
  const activeIndex = pinned ? active : entries.length - 1;
  const railFill = pinned ? progress : 1;

  return (
    <section className="relative isolate bg-ns-bg-primary">
      <div
        ref={wrapperRef}
        style={pinned ? { height: `${100 + (entries.length - 1) * VH_PER_STOP}vh` } : undefined}
        className="relative"
      >
        <div className={cn(pinned && "sticky top-0 flex min-h-screen flex-col justify-center")}>
          <SectionPadding />

          <Container>
            <div className="flex flex-col gap-10 max-[767px]:gap-8">
              {/* .body-content */}
              <div className="flex max-w-[37.75rem] flex-col gap-8 max-[767px]:max-w-none">
                <div className="flex max-w-[37.75rem] flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
                      {heading}
                    </h2>
                  </div>
                  <div className="text-ns-content-secondary">
                    <div className="flex flex-col gap-6">
                      <p>{subheading}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Record data, in the site's mono/data treatment. */}
              <ol
                role="list"
                className="relative m-0 flex list-none flex-col gap-4 rounded-[6px] bg-ns-bg-glass-secondary p-4"
              >
                {/*
                  The rail. It runs the full height of the list and holds its position
                  while the stops light up along it — the "line" the pin is built around.
                  Decorative: the same progression is in each row's `aria-current`.
                */}
                <div
                  aria-hidden="true"
                  className="absolute top-4 bottom-4 left-4 w-px bg-ns-border-secondary max-[767px]:hidden"
                >
                  <div
                    className={cn("w-px origin-top bg-ns-content-primary", EASE)}
                    style={{ height: `${Math.round(railFill * 100)}%` }}
                  />
                </div>

                {entries.map((entry, index) => {
                  const lit = index <= activeIndex;
                  const current = index === activeIndex;
                  return (
                    <li
                      key={`${entry.date}-${entry.place}`}
                      aria-current={current ? "step" : undefined}
                      className={cn(
                        "grid grid-cols-2 gap-4 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-[0.625rem] md:pl-8",
                        EASE,
                        lit ? "opacity-100" : "opacity-40",
                      )}
                    >
                      {/* The stop's dot, sitting on the rail. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-4 hidden h-[7px] w-[7px] -translate-x-[3px] translate-y-[3px] rounded-full border md:block",
                          EASE,
                          lit
                            ? "border-ns-content-primary bg-ns-content-primary"
                            : "border-ns-border-hover bg-ns-bg-primary",
                          current && "scale-150",
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        {/* `.text-nav-label-tiny` — 10px/12px, 600, uppercase, tertiary. */}
                        <div
                          className={cn(
                            "text-[0.625rem] leading-3 font-semibold uppercase",
                            EASE,
                            current ? "text-ns-content-primary" : "text-ns-content-tertiary",
                          )}
                        >
                          {entry.date}
                        </div>
                        <div
                          className={cn(
                            "text-[0.625rem] leading-3 font-semibold uppercase",
                            EASE,
                            current ? "text-ns-content-primary" : "text-ns-content-tertiary",
                          )}
                        >
                          {entry.place}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "min-w-0 font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em]",
                          EASE,
                          current ? "text-ns-content-secondary" : "text-ns-content-tertiary",
                        )}
                      >
                        {entry.detail}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Step counter — the only thing that tells a keyboard or screen-reader
                  user the pin is doing anything, and a useful cue for everyone else. */}
              <p
                aria-live={pinned ? "polite" : "off"}
                className="font-mono text-[0.625rem] leading-3 tracking-[0.06em] text-ns-content-tertiary uppercase"
              >
                {pinned
                  ? `Stop ${activeIndex + 1} of ${entries.length}`
                  : `${entries.length} stops`}
              </p>
            </div>
          </Container>

          <SectionPadding />
        </div>
      </div>

      <SectionLines />
    </section>
  );
}
