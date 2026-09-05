"use client";

import { useEffect } from "react";
import { ArrowUpRightIcon } from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { HeaderButton } from "@/components/sites/www-nscale-com-782295e3/root-8a5edab2/HeaderDropdowns";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/types/nscale";

interface MobileLink extends NavDropdownItem {
  external?: boolean;
}

interface MobileGroup {
  title: string;
  links: MobileLink[];
}

/**
 * `.mobile-menu_group` x4 — verbatim from the source DOM. Note that the mobile
 * lists are NOT the same as the desktop dropdowns: Data Centers drops the
 * partner-only entries, Services links into the `/service-overview` slider
 * rather than the per-service pages, and Media Kit points at `#`.
 */
const GROUPS: MobileGroup[] = [
  {
    title: "DATA CENTERS",
    links: [
      { label: "Glomfjord", href: "/ai-infrastructure#dc-glomfjord" },
      { label: "Narvik", href: "/ai-infrastructure#dc-narvik" },
      { label: "Loughton", href: "/ai-infrastructure#dc-loughton" },
      { label: "Texas", href: "/ai-infrastructure#dc-texas" },
      { label: "Sines", href: "/ai-infrastructure#dc-sines" },
      { label: "Keflavik", href: "/ai-infrastructure#dc-keflavik" },
      { label: "West Virginia", href: "/ai-infrastructure#dc-monarch" },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { label: "AI Services", href: "/service-overview?slide=0#section-stack-slider" },
      { label: "Platform Services", href: "/service-overview?slide=1#section-stack-slider" },
      { label: "Infrastructure Services", href: "/service-overview?slide=2#section-stack-slider" },
      { label: "Fleet Operations", href: "/service-overview?slide=3#section-stack-slider" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Newsroom", href: "/newsroom" },
      { label: "Blog", href: "/blog" },
      {
        label: "Docs",
        href: "https://docs.nscale.com/docs/getting-started/overview?_gl=1*wew6g*_gcl_au*MjA0OTA3MjQxNy4xNzczMjU1MzIz*FPAU*MjA0OTA3MjQxNy4xNzczMjU1MzIz",
        external: true,
      },
      { label: "Media Kit", href: "#" },
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

        {/* .mobile-menu_cta-wrap */}
        <div className="flex flex-col border-t border-[#ffffff14] px-8 py-4 backdrop-blur-[80px]">
          <a href="/contact">
            <HeaderButton label="Contact" variant="glass" />
          </a>
        </div>
      </div>
    </div>
  );
}
