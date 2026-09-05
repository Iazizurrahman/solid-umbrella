import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The fixed switcher for the hero variant test.
 *
 * Rendered only by `/hero-a`, `/hero-b` and `/hero-c` — never by `/` or any production
 * route — so it cannot leak into the live site by being mounted in a layout. The three
 * routes are `noindex, nofollow` and are excluded from the sitemap and disallowed in
 * robots.txt, but the switcher is the thing a person would notice, so it says out loud
 * what it is.
 */

export type HeroVariantId = "a" | "b" | "c";

interface Variant {
  id: HeroVariantId;
  href: string;
  /** What is being tested, for the title attribute and the screen-reader name. */
  note: string;
}

export const HERO_VARIANTS: readonly Variant[] = [
  { id: "a", href: "/hero-a", note: "Coordinator — the shipped hero" },
  { id: "b", href: "/hero-b", note: "Instrumented floor, unlit order desk" },
  { id: "c", href: "/hero-c", note: "Coordinating garment production" },
];

export function HeroVariantSwitcher({ current }: { current: HeroVariantId }) {
  return (
    <nav
      aria-label="Hero variant test"
      className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-[8px] border border-ns-border-primary bg-ns-bg-glass-dark px-3 py-2 backdrop-blur-md max-[479px]:right-4 max-[479px]:bottom-4"
    >
      <span className="font-mono text-[0.625rem] leading-3 tracking-[0.08em] text-ns-content-tertiary uppercase">
        Hero test
      </span>
      <ul role="list" className="flex items-center gap-1">
        {HERO_VARIANTS.map((variant) => {
          const active = variant.id === current;
          return (
            <li key={variant.id} className="flex">
              <Link
                href={variant.href}
                title={variant.note}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-[4px] border font-mono text-[0.75rem] leading-3 uppercase transition-colors duration-200",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-border-hover",
                  active
                    ? "border-ns-border-hover bg-ns-bg-inverse text-ns-content-inverse"
                    : "border-ns-border-secondary text-ns-content-secondary hover:border-ns-border-hover hover:text-ns-content-primary",
                )}
              >
                <span className="sr-only">{`Variant ${variant.id.toUpperCase()}: ${variant.note}`}</span>
                <span aria-hidden="true">{variant.id.toUpperCase()}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
