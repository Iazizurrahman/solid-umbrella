"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ASSETS, CTA } from "@/components/sites/daita/shared/brand";
import {
  ChevronDownIcon,
  DashedRuleIcon,
} from "@/components/sites/daita/shared/icons";
import { Container } from "@/components/sites/daita/shared/layout";
import {
  HeaderButton,
  PlatformDropdown,
  ProductDropdown,
} from "@/components/sites/daita/daita-site/HeaderDropdowns";
import { MobileMenu } from "@/components/sites/daita/daita-site/MobileMenu";
import { ThemeToggle } from "@/components/sites/daita/daita-site/ThemeToggle";
import { cn } from "@/lib/utils";

/**
 * Distance over which `.header_background` scrubs from transparent to opaque.
 * Measured on the live site: scrollY 0 → 0, 200 → 0.9721, 500 → 1.
 * 200 / 0.9721 = 205.7, so the ramp is ~206px, clamped at 1 afterwards.
 */
const BG_SCRUB_DISTANCE = 206;

type DropdownKey = "platform" | "product";

const DROPDOWN_PANELS: Record<
  DropdownKey,
  (props: { open: boolean }) => React.JSX.Element
> = {
  platform: PlatformDropdown,
  product: ProductDropdown,
};

const NAV_TRIGGERS: { key: DropdownKey; label: string }[] = [
  { key: "platform", label: "Platform" },
  { key: "product", label: "Product" },
];

/** The two triggers that carry no panel, rendered as plain links. */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Our story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

/**
 * `header.header` — `position: fixed; inset: 0 0 auto; z-index: 999`, 73px tall
 * (a 72px bar plus the 1px dashed rule beneath it).
 *
 * The header and every descendant are fully transparent. The only painted
 * surface is `.header_background` (`[data-header-bg]`), an absolutely
 * positioned `--background--primary` (#0c0c0e) layer whose opacity is scrubbed
 * continuously by scroll position — see the effect below. At scrollY 0 the blue
 * hero video shows straight through; that is intended.
 */
export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* --- The scroll scrub -----------------------------------------------------
     A passive scroll listener coalesced into one rAF per frame writes
     `--ns-header-bg-opacity` on the <header>; the background layer consumes it
     through an inline `opacity: var(...)`. Keeping the write off React state
     means no re-render per frame, and keeping it in a custom property means the
     value survives every re-render the dropdown/mobile state does cause.

     Deliberately NOT a class toggle with a CSS transition: the original is a
     continuous scrub and a stepped fade is obvious against the hero. */
  useEffect(() => {
    let frame = 0;

    const apply = () => {
      frame = 0;
      headerRef.current?.style.setProperty(
        "--ns-header-bg-opacity",
        String(Math.min(1, window.scrollY / BG_SCRUB_DISTANCE)),
      );
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(apply);
    };

    apply(); // seed for a reload part-way down the page
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* --- `data-header-height` -------------------------------------------------
     The source publishes the measured bar height as `--header-height`; the
     mobile menu's `.header-spacer` is sized from it. 72px desktop, ~50px at
     <=991px where `.header_wrap` padding drops to .5rem. */
  useEffect(() => {
    const main = mainRef.current;
    const header = headerRef.current;
    if (!main || !header) return;
    const publish = () =>
      header.style.setProperty("--ns-header-height", `${main.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  /* --- Escape closes whichever surface is open ----------------------------- */
  useEffect(() => {
    if (openDropdown === null && !mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenDropdown(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openDropdown, mobileOpen]);

  /* Focus leaving the item+panel group closes it — the keyboard equivalent of
     the pointer leaving. The panel is a DOM child of the item, so `contains`
     covers both. */
  const onGroupBlur = useCallback(
    (key: DropdownKey) => (event: React.FocusEvent<HTMLDivElement>) => {
      if (event.currentTarget.contains(event.relatedTarget)) return;
      setOpenDropdown((current) => (current === key ? null : current));
    },
    [],
  );

  return (
    <header
      ref={headerRef}
      data-header-height=""
      data-header-scroll=""
      className="fixed inset-x-0 top-0 z-[999] max-[991px]:border-b max-[991px]:border-ns-border-secondary"
    >
      {/* .header_main */}
      <div ref={mainRef} className="relative">
        <Container>
          {/* .header_wrap — also the offset parent for the two wide panels */}
          <div className="relative flex items-center justify-between py-[1.0625rem] max-[991px]:py-2">
            {/* .header_logo-wrap */}
            <div className="flex items-center justify-start gap-14">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
                  Every header href is a plain <a> on purpose: most of these
                  routes do not exist in the clone and next/link would prefetch
                  404s. The logo is kept consistent with the rest. */}
              <a href="/" aria-current="page" aria-label="DAITA home">
                {/* .header_logo.is-desktop — 20px, 16px <=991, hidden <=767.
                    `h-full w-auto` reproduces the `height="100%"` the inline
                    SVG carried, so the wrapper still sets the bar height. The
                    brand mark is a fixed-size SVG, so it stays a plain <img>
                    rather than going through the next/image loader. */}
                <div className="flex h-5 items-center justify-center text-ns-content-primary max-[991px]:h-4 max-[767px]:hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ASSETS.logoWhite} alt="DAITA" className="h-full w-auto" />
                </div>
                {/* .header_logo.is-mobile — the compact mark, only <=767 */}
                <div className="hidden h-5 items-center justify-center text-ns-content-primary max-[767px]:flex max-[767px]:h-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ASSETS.logo} alt="DAITA" className="h-full w-auto" />
                </div>
              </a>

              {/* .header_nav — hidden at <=991 */}
              <nav className="flex items-stretch justify-start gap-3 max-[991px]:hidden">
                {NAV_TRIGGERS.map(({ key, label }) => {
                  const Panel = DROPDOWN_PANELS[key];
                  const open = openDropdown === key;
                  return (
                    <div
                      key={key}
                      data-menu-link="trigger"
                      onMouseEnter={() => setOpenDropdown(key)}
                      onMouseLeave={() =>
                        setOpenDropdown((current) =>
                          current === key ? null : current,
                        )
                      }
                      onFocus={() => setOpenDropdown(key)}
                      onBlur={onGroupBlur(key)}
                      // Both panels are wide, so neither is positioned here:
                      // they resolve against `.header_wrap`, not their own item.
                      className="flex rounded-[6px] border border-transparent transition-all duration-200 hover:border-ns-border-glass-primary hover:bg-ns-bg-glass-primary"
                    >
                      {/* .header_nav_link */}
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={() =>
                          setOpenDropdown((current) =>
                            current === key ? null : key,
                          )
                        }
                        className="relative flex items-center justify-center gap-2 overflow-visible bg-transparent px-3 py-2 text-ns-content-primary"
                      >
                        {/* .text-mono-xs — 14px/16px; the class name is a
                            Webflow misnomer, it sets no font-family, so this
                            renders in DM Sans like the live site. */}
                        <div className="text-sm leading-4">{label}</div>
                        {/* .header_nav_chevron */}
                        <div
                          className={cn(
                            "flex w-5 items-center justify-center transition-transform duration-200",
                            open && "rotate-180",
                          )}
                        >
                          <ChevronDownIcon />
                        </div>
                        {/* .header_nav_dropdown-bridge — invisible hover bridge
                            spanning trigger-bottom to panel-top. Without it the
                            panel closes as the pointer travels down. */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-0 top-full bottom-0 z-[4] h-full",
                            open ? "flex" : "hidden",
                          )}
                        />
                      </button>
                      <Panel open={open} />
                    </div>
                  );
                })}

                {/* Our story / Contact — plain links, no dropdown */}
                {NAV_LINKS.map(({ label, href }) => (
                  <div
                    key={label}
                    data-menu-link="trigger"
                    className="flex rounded-[6px] border border-transparent transition-all duration-200 hover:border-ns-border-glass-primary hover:bg-ns-bg-glass-primary"
                  >
                    <a
                      href={href}
                      className="relative flex items-center justify-center gap-2 bg-transparent px-3 py-2 text-ns-content-primary no-underline"
                    >
                      <div className="text-sm leading-4">{label}</div>
                    </a>
                  </div>
                ))}
              </nav>
            </div>

            {/* .header_nav_cta-wrap */}
            <div className="flex items-center gap-4 max-[991px]:justify-start">
              {/* Hidden below 992 so the mobile bar keeps the CTA and the hamburger at
                  their recorded positions; the mobile menu carries its own copy. */}
              <ThemeToggle className="max-[991px]:hidden" />

              <a href={CTA.href}>
                <HeaderButton label={CTA.label} variant="glass" />
              </a>

              {/* .header_nav_hamburger — 16px square, three 1px rules */}
              <button
                type="button"
                data-mobile-hamburger=""
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((current) => !current)}
                className="relative hidden h-4 w-4 items-center justify-center bg-transparent p-0 max-[991px]:flex"
              >
                <span className="absolute h-px w-full -translate-y-1.5 bg-ns-content-primary" />
                <span className="absolute h-px w-full bg-ns-content-primary" />
                <span className="absolute h-px w-full translate-y-1.5 bg-ns-content-primary" />
              </button>
            </div>
          </div>
        </Container>

        {/* .header_background — THE painted bar. `opacity` reads the custom
            property the scroll effect writes; the literal string never changes
            so React re-renders cannot clobber it. */}
        <div
          data-header-bg=""
          aria-hidden="true"
          style={{ opacity: "var(--ns-header-bg-opacity, 0)" }}
          className="absolute inset-0 z-[-1] bg-ns-bg-primary"
        />
      </div>

      {/* .header_dashed-border — the 1px rule at y=72, hidden at <=991 */}
      <div
        data-header-border=""
        aria-hidden="true"
        className="relative z-[-1] flex h-px w-full items-center justify-center max-[991px]:hidden"
      >
        <DashedRuleIcon />
      </div>

      <MobileMenu open={mobileOpen} />
    </header>
  );
}
