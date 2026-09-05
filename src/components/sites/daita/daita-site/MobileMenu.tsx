"use client";

import { useEffect } from "react";
import { ThemeToggle } from "@/components/sites/daita/daita-site/ThemeToggle";
import { CONTACT, CTA } from "@/components/sites/daita/shared/brand";
import { ArrowUpRightIcon } from "@/components/sites/daita/shared/icons";
import { HeaderButton } from "@/components/sites/daita/daita-site/HeaderDropdowns";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/types/daita";

interface MobileLink extends NavDropdownItem {
  external?: boolean;
}

interface MobileGroup {
  title: string;
  links: MobileLink[];
}

/**
 * `.mobile-menu_group` — the drawer mirrors the desktop nav one group per
 * trigger, listing each mega-menu's column titles the way the source drawer
 * listed its dropdown columns rather than every leaf link.
 */
const GROUPS: MobileGroup[] = [
  {
    title: "PLATFORM",
    links: [
      { label: "Capture", href: "/platform" },
      { label: "Structure", href: "/platform" },
      { label: "Coordinate", href: "/platform" },
    ],
  },
  {
    title: "PRODUCT",
    links: [
      { label: "Tracking", href: "/platform" },
      { label: "Actions", href: "/platform" },
      { label: "Insight", href: "/platform" },
      { label: "Integrations", href: "/platform" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "Our story", href: "/our-story" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: CONTACT.linkedin, external: true },
    ],
  },
];

/**
 * `[data-mobile-menu]` / `.mobile-menu` — the <=991px overlay.
 *
 * `position: fixed; inset: 0; z-index: -1` inside the header's stacking
 * context, so it paints *behind* `.header_main`; the `.header-spacer` at the
 * top reserves the bar's measured height (`--ns-header-height`, published by
 * `SiteHeader`) so nothing hides under the logo row.
 *
 * `Escape` is handled by `SiteHeader` (it also owns the desktop dropdowns);
 * body scroll locking lives here because it is this component's side effect.
 */
/** The id the header's hamburger points `aria-controls` at. */
export const MOBILE_MENU_ID = "mobile-menu";

export function MobileMenu({ open }: { open: boolean }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div
      id={MOBILE_MENU_ID}
      data-mobile-menu=""
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[-1] hidden bg-ns-bg-glass-deep-blue backdrop-blur-[80px]",
        open && "max-[991px]:block",
      )}
    >
      {/* .mobile-menu_wrap */}
      <div className="flex h-full flex-col">
        {/* .header-spacer — height: var(--header-height) */}
        <div className="h-[var(--ns-header-height,50px)] shrink-0" />

        {/* .mobile-menu_nav */}
        <nav className="flex flex-1 flex-col gap-8 overflow-auto px-8 pt-6 pb-8">
          {GROUPS.map((group) => (
            // .mobile-menu_group
            <div key={group.title} className="flex flex-col gap-4">
              {/* .mobile-menu_group-title */}
              <div>
                <h3 className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                  {group.title}
                </h3>
              </div>
              {/* .mobile-menu_links-wrap */}
              <div className="flex flex-col gap-3 text-ns-content-primary">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="flex items-center justify-start gap-2 text-[1.125rem] leading-8 font-semibold text-white no-underline"
                  >
                    <div className="text-lg leading-6 font-semibold">
                      {link.label}
                    </div>
                    {link.external ? (
                      <div className="flex w-4 items-center justify-center">
                        <ArrowUpRightIcon />
                      </div>
                    ) : null}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* .mobile-menu_cta-wrap — the theme toggle is hidden from the header bar
            below 992, so this is where it lives at mobile widths. */}
        <div className="flex flex-col gap-4 border-t border-ns-content-primary/8 px-8 py-4 backdrop-blur-[80px]">
          <a href={CTA.href}>
            <HeaderButton label={CTA.label} variant="glass" />
          </a>
          <ThemeToggle className="self-start" />
        </div>
      </div>
    </div>
  );
}
