"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/nscale";

const IMAGE_BASE = "/sites/www-nscale-com-782295e3/root-8a5edab2/images";

/**
 * The three `.swiper-slide` entries of the testimonials carousel, in source DOM
 * order. Avatar filenames keep the Webflow asset hash of the original `<img src>`
 * (`Rectangle 6056`, `Rectangle 6056-1`, `Rectangle 6056-2`).
 */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Øyvind Eriksen",
    role: "President & CEO, Aker ASA",
    avatar: `${IMAGE_BASE}/69f860c23a351bb8e2ce5ec9_697c721791dd082c64c01395_rectangle-6056.jpeg`,
    quote:
      "AI is reshaping the global economy and redefining the value of renewable energy. With Nscale, we’re backing infrastructure that’s sovereign, scalable, and purpose-built to accelerate this transformation.",
  },
  {
    name: "Larry Aschebrook",
    role: "Founder & Managing Partner, G Squared",
    avatar: `${IMAGE_BASE}/69f860c2759ced98143c16e6_697c72607572fae4e478d745_rectangle-6056-1.jpeg`,
    quote:
      "Over just a few months, Nscale has moved with focus and velocity – turning ambitious plans into production capacity and becoming meaningfully relevant, fast.",
  },
  {
    name: "Kanishka Narayan",
    role: "UK AI Minister",
    avatar: `${IMAGE_BASE}/69f860bea17d90ae57d43fb4_697c727a0880fe352ea87717_rectangle-6056-2.jpeg`,
    quote:
      "By attracting global expertise and investment, [Nscale] is building the essential infrastructure for the UK to compete internationally, drive growth, and create jobs across the country.",
  },
];

/** Swiper's configured `speed`, in ms. */
const SCROLL_DURATION = 500;

/** Swiper eases its wrapper translate out; this is the closest scroll equivalent. */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * "Testimonials" — `.section_testimonials`.
 *
 * The source runs Swiper with `{ slidesPerView: 1.1, spaceBetween: 16, speed: 500,
 * breakpoints: { 768: { slidesPerView: 3, spaceBetween: 40 } }, modules: [Navigation] }`
 * — no autoplay, no pagination. That is reproduced here with a scroll-snap track
 * instead of the library: below 768px a slide is `(100% - 0.1 * 16px) / 1.1` wide so
 * the next card peeks; from 768px up three cards are `(100% - 2 * 40px) / 3` and fill
 * the row exactly, so nothing overflows.
 *
 * `.testimonials_swiper-nav` is `display: none` in the source stylesheet at *every*
 * width, so the prev/next buttons are present in the DOM (as on the live page) but
 * never painted — the measured 764px section height only adds up with a zero-height
 * nav. Navigation on mobile therefore happens by swiping the track.
 */
export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncNav = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 1);
    setCanScrollNext(track.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncNav();
    track.addEventListener("scroll", syncNav, { passive: true });
    window.addEventListener("resize", syncNav);

    return () => {
      track.removeEventListener("scroll", syncNav);
      window.removeEventListener("resize", syncNav);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [syncNav]);

  /** Scrolls exactly one slide (slide width + gap) in `speed` ms. */
  const scrollBySlide = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(
      track.querySelectorAll<HTMLElement>("[data-swiper-slide]"),
    );
    const first = slides[0];
    const second = slides[1];
    const step =
      first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;

    const max = track.scrollWidth - track.clientWidth;
    const from = track.scrollLeft;
    const to = Math.min(Math.max(from + direction * step, 0), max);
    if (to === from) return;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / SCROLL_DURATION, 1);
      track.scrollLeft = from + (to - from) * easeOutCubic(progress);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, []);

  return (
    /* .section (overflow variant) */
    <section className="relative isolate overflow-hidden">
      {/* .section_padding */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      <Container>
        <div>
          {/* .section_testimonials */}
          <div className="flex flex-col items-start justify-start gap-[4.5rem] max-md:gap-8">
            {/* .body-content > .body-content_copy > .body-content_title-wrap */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-md:max-w-none">
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] leading-[3.25rem] font-medium text-ns-content-primary max-md:text-[2rem] max-md:leading-[2.625rem]">
                    Testimonials
                  </h2>
                </div>
              </div>
            </div>

            {/* .testimonials_swiper — the Swiper container, here a snap track */}
            <div
              ref={trackRef}
              data-swiper-target=""
              className="w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* .swiper-wrapper */}
              <div role="list" className="flex items-stretch gap-4 md:gap-10">
                {TESTIMONIALS.map((person) => (
                  /* .swiper-slide */
                  <div
                    key={person.name}
                    role="listitem"
                    data-swiper-slide=""
                    className="w-[calc((100%-1.6px)/1.1)] flex-none snap-start md:w-[calc((100%-80px)/3)]"
                  >
                    {/* .testimonials_card */}
                    <div className="flex h-full min-h-[25rem] flex-col justify-between gap-20 rounded-[8px] border border-ns-border-secondary bg-ns-bg-glass-deep-blue p-6 max-md:gap-15 max-md:p-4">
                      {/* .testimonials_card_top */}
                      <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start max-md:gap-2.5">
                        {/* .testimonials_card_person */}
                        <div className="flex flex-col items-start justify-start gap-4">
                          {/* .testimonials_card_photo */}
                          <Image
                            src={person.avatar}
                            alt=""
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-full border border-ns-border-secondary object-cover"
                          />
                          {/* .testimonials_card_name-wrap */}
                          <div className="flex flex-col gap-1">
                            <h3 className="text-[1rem] leading-[1.25rem] font-bold">
                              {person.name}
                            </h3>
                            {/* .testimonias_card_position */}
                            <div className="opacity-30">
                              <div className="text-[0.875rem] leading-[1.25rem]">
                                {person.role}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* .testimonials_card_bottom */}
                      <div className="flex gap-4 text-ns-content-primary max-md:flex-col max-md:gap-2.5">
                        <div className="text-[1rem] leading-[1.5rem]">
                          {person.quote}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* .testimonials_swiper-nav — `display: none` at every width in the
                source stylesheet, but kept in the DOM to match the live markup. */}
            <div className="hidden">
              {/* .swiper-nav */}
              <div className="flex rounded-[8px] border border-ns-border-primary p-0">
                <button
                  type="button"
                  data-swiper-prev=""
                  aria-label="Previous testimonial"
                  onClick={() => scrollBySlide(-1)}
                  disabled={!canScrollPrev}
                  className={cn(
                    "flex items-center justify-center bg-transparent py-1 pr-0.5 pl-1 transition-opacity",
                    !canScrollPrev && "pointer-events-none opacity-35",
                  )}
                >
                  {/* .swiper-nav_icon */}
                  <div className="flex w-4 items-center justify-center">
                    <ArrowLeftIcon />
                  </div>
                </button>
                <button
                  type="button"
                  data-swiper-next=""
                  aria-label="Next testimonial"
                  onClick={() => scrollBySlide(1)}
                  disabled={!canScrollNext}
                  className={cn(
                    "flex items-center justify-center bg-transparent py-1 pr-1 pl-0.5 transition-opacity",
                    !canScrollNext && "pointer-events-none opacity-35",
                  )}
                >
                  {/* .swiper-nav_icon */}
                  <div className="flex w-4 items-center justify-center">
                    <ArrowRightIcon />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* .section_padding */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      {/* .section_lines */}
      <SectionLines />

      {/* .section_color (secondary variant) */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-ns-bg-secondary" />
    </section>
  );
}
