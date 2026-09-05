"use client";

import { CTA, SECONDARY_CTA } from "@/components/sites/daita/shared/brand";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/types/daita";

/* ---------------------------------------------------------------------------
   Shared button — `.button` and the three Webflow variants the header uses.

   Lives here rather than in a fourth file because `SiteHeader.tsx` already
   imports this module (so there is no import cycle) and all three header files
   render the same glass button.

   [base] .button { gap:.25rem; radius:4px; padding:.375rem 1rem; font-family:
     Dmmono; font-size:1rem; line-height:1.25rem; letter-spacing:.02em;
     transition: all .2s }
   glass       (w-variant-5057a24d…) — 1px --border--glass-primary, bg
     --background--glass-primary, backdrop-blur(20px); hover swaps to
     --background--glass-secondary and cancels the base `opacity:.8`.
   ghost       (w-variant-102d8d7c…) — transparent, radius 0, padding 0.
   ghost-small (w-variant-1aebf52f…) — ghost at .75rem/1rem with a .75rem icon.
   --------------------------------------------------------------------------- */

type ButtonVariant = "glass" | "ghost" | "ghost-small";

export function HeaderButton({
  label,
  variant,
  className,
}: {
  label: string;
  variant: ButtonVariant;
  className?: string;
}) {
  return (
    <div
      data-btn-hover="True"
      className={cn(
        "flex items-center justify-center gap-1 text-center font-mono text-base leading-5 tracking-[0.02em] transition-all duration-200",
        variant === "glass" &&
          "rounded-[4px] border border-ns-border-glass-primary bg-ns-bg-glass-primary px-4 py-1.5 text-ns-content-primary backdrop-blur-[20px] hover:bg-ns-bg-glass-secondary",
        variant === "ghost" &&
          "rounded-none bg-transparent p-0 text-ns-content-primary hover:opacity-80",
        variant === "ghost-small" &&
          "rounded-none bg-transparent p-0 text-xs leading-4 text-ns-content-primary hover:opacity-80",
        className,
      )}
    >
      <span>{label}</span>
      <div>
        {/* .button_icon — 1rem wide, .75rem on the ghost-small variant */}
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            variant === "ghost-small" ? "w-3" : "w-4",
          )}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Panel shell — `.header_nav_dropdown`

   The panels are DOM children of `.header_nav_item`, which is `display:flex`
   with NO `position`, so `position:absolute` resolves against the nearest
   positioned ancestor: `.header_wrap` (`position: relative`). That is what makes
   the wide panel able to say `left:50%; translate(-50%)` and span the whole
   content column. `top: calc(100% - 10px)` is therefore measured from the
   bottom of `.header_wrap` (72px) → y = 62px, i.e. the panel starts 10px
   *inside* the bar so the hover bridge always overlaps it.

   Source state is `visibility: hidden`, flipped by the site's GSAP timeline.
   `invisible` also removes the closed panel's links from the tab order.
   --------------------------------------------------------------------------- */

const PANEL_BASE =
  "flex rounded-[10px] border border-ns-border-primary border-r-ns-border-secondary shadow-[0_20px_20px_#0000000d] transition-[opacity,translate] duration-200";

function panelState(open: boolean) {
  return open
    ? "visible opacity-100 translate-y-0"
    : "invisible opacity-0 translate-y-[-4px]";
}

/* ===========================================================================
   The wide mega-menu — `.header_nav_dropdown.is-services`

   Both DAITA menus (Platform, Product) are multi-column, so both render through
   this one shell. The grid stays `grid-cols-5` — a heading column plus up to
   four content columns — regardless of how many columns a menu supplies; a menu
   with three columns simply leaves the last cell empty rather than reflowing.
   =========================================================================== */

interface MegaColumn {
  /** `data-menu-service` — the tint the source script paints on hover. */
  tint: string;
  title: string;
  href: string;
  items: NavDropdownItem[];
}

/** The four column tints, consumed in order by whichever menu is rendering. */
const COLUMN_TINTS = [
  "rgba(0, 1, 59, 0.8)",
  "rgba(11, 3, 19, 0.8)",
  "rgba(16, 9, 2, 0.8)",
  "rgba(15, 23, 20, 0.8)",
] as const;

function MegaPanel({
  heading,
  columns,
  cta,
  open,
}: {
  heading: string;
  columns: MegaColumn[];
  cta: { label: string; href: string };
  open: boolean;
}) {
  return (
    <div
      data-dropdown=""
      className={cn(
        PANEL_BASE,
        panelState(open),
        "absolute top-[calc(100%-10px)] left-1/2 w-[1034px] max-w-full -translate-x-1/2 flex-col gap-1 p-1 backdrop-blur-[120px]",
      )}
    >
      {/* .header_nav_services — 5 equal columns; only the right border is
          --border--primary (#ffffff33), the other three are #ffffff1a. */}
      <div
        data-menu-services-block=""
        className="grid grid-cols-5 gap-4 rounded-[8px] border border-ns-border-secondary border-r-ns-border-primary bg-ns-bg-glass-dark p-4"
      >
        {/* .header_nav_services_all-col — the heading column. The source pairs
            the heading with a ghost-small link; this menu has a single link and
            it lives in the footer row, so the slot renders empty. */}
        <div className="flex flex-col items-start justify-start gap-6 border-r border-ns-border-glass-primary py-2 pr-12 pl-2">
          <h3 className="text-lg leading-6 font-semibold">{heading}</h3>
        </div>

        {columns.map((column) => (
          <div
            key={column.title}
            data-menu-service={column.tint}
            className="relative flex flex-col gap-5 overflow-hidden rounded-[8px] border border-transparent pt-2 text-white no-underline transition-colors duration-200 hover:border-ns-bg-glass-primary hover:bg-ns-bg-glass-secondary"
          >
            <div className="flex flex-col gap-3">
              <div className="px-2">
                <h3 className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                  {column.title}
                </h3>
              </div>
              <ul role="list" className="mb-0 flex list-none flex-col gap-1 p-[2px]">
                {column.items.map((item) => (
                  // .header_nav_services_list-item — z-2 so it stays clickable
                  // above the z-1 whole-column cover link below.
                  <li key={item.label} className="relative z-[2]">
                    <a
                      href={item.href}
                      className="flex flex-col gap-1 rounded-[4px] border border-transparent p-2 text-ns-content-primary transition-colors duration-200 hover:border-ns-border-glass-primary hover:bg-ns-bg-glass-primary"
                    >
                      <h4 className="text-base leading-4 font-normal">
                        {item.label}
                      </h4>
                      {/* Title-only items leave the description slot empty
                          rather than inventing a second line. */}
                      {item.description ? (
                        <div className="text-xs leading-4 text-ns-content-tertiary">
                          {item.description}
                        </div>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* .header_nav_services_link — bare cover link, a sibling (not a
                parent) of the list links, so nothing is nested. */}
            <a
              href={column.href}
              aria-label={column.title}
              className="absolute inset-0 z-[1]"
            />
          </div>
        ))}
      </div>

      {/* .header_nav_services_cta — the source pairs a sentence with the
          button; only the button carries content here. */}
      <div className="flex items-center justify-between px-4 py-2">
        <a href={cta.href}>
          <HeaderButton label={cta.label} variant="glass" />
        </a>
      </div>
    </div>
  );
}

/* ===========================================================================
   1. Platform — how DAITA works, three columns
   =========================================================================== */

const PLATFORM_COLUMNS: MegaColumn[] = [
  {
    tint: COLUMN_TINTS[0],
    title: "Capture",
    href: "/platform",
    items: [
      { label: "Read every floor message", href: "/platform" },
      { label: "WhatsApp, email, voice notes", href: "/platform" },
      { label: "Tamil · Hindi · English", href: "/platform" },
    ],
  },
  {
    tint: COLUMN_TINTS[1],
    title: "Structure",
    href: "/platform",
    items: [
      { label: "Matched to PO and milestone", href: "/platform" },
      { label: "Quantities, dates, defect counts", href: "/platform" },
      { label: "One production timeline", href: "/platform" },
    ],
  },
  {
    tint: COLUMN_TINTS[2],
    title: "Coordinate",
    href: "/platform",
    items: [
      { label: "Plan vs actual, daily", href: "/platform" },
      { label: "Automatic chasing", href: "/platform" },
      { label: "Paperwork reconciliation", href: "/platform" },
    ],
  },
];

export function PlatformDropdown({ open }: { open: boolean }) {
  return (
    <MegaPanel
      open={open}
      heading="How DAITA works"
      columns={PLATFORM_COLUMNS}
      cta={SECONDARY_CTA}
    />
  );
}

/* ===========================================================================
   2. Product — the platform itself, four columns
   =========================================================================== */

const PRODUCT_COLUMNS: MegaColumn[] = [
  {
    tint: COLUMN_TINTS[0],
    title: "Tracking",
    href: "/platform",
    items: [
      {
        label: "TNA Engine",
        description: "the order × stage grid",
        href: "/platform",
      },
      {
        label: "Buyer Orders",
        description: "one order, full history",
        href: "/platform",
      },
      {
        label: "Change History",
        description: "what moved and when",
        href: "/platform",
      },
    ],
  },
  {
    tint: COLUMN_TINTS[1],
    title: "Actions",
    href: "/platform",
    items: [
      {
        label: "Pending Actions",
        description: "the approval inbox",
        href: "/platform",
      },
      {
        label: "Process In-Charges",
        description: "who owns what",
        href: "/platform",
      },
      {
        label: "Guidelines",
        description: "your SOPs in plain English",
        href: "/platform",
      },
    ],
  },
  {
    tint: COLUMN_TINTS[2],
    title: "Insight",
    href: "/platform",
    items: [
      {
        label: "My Team",
        description: "company-wide roll-up",
        href: "/platform",
      },
      {
        label: "Chat with your data",
        description: "ask, don't dig",
        href: "/platform",
      },
      {
        label: "Reconciliation",
        description: "PO vs cut vs packing list",
        href: "/platform",
      },
    ],
  },
  {
    tint: COLUMN_TINTS[3],
    title: "Integrations",
    href: "/platform",
    items: [
      { label: "WhatsApp Business", href: "/platform" },
      { label: "ERP sync, two-way", href: "/platform" },
      { label: "Documents and email", href: "/platform" },
    ],
  },
];

export function ProductDropdown({ open }: { open: boolean }) {
  return (
    <MegaPanel
      open={open}
      heading="Explore the platform"
      columns={PRODUCT_COLUMNS}
      cta={{ label: "Start a pilot", href: CTA.href }}
    />
  );
}
