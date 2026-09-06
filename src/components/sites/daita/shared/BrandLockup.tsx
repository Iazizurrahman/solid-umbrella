/* eslint-disable @next/next/no-img-element -- the mark is a fixed-size PNG painted at
   20px or smaller in the header; next/image cannot improve on that and its wrapper
   would fight the flex row the lockup sits in. */
import { cn } from "@/lib/utils";
import { ASSETS } from "@/components/sites/daita/shared/brand";

/**
 * The DAITA lockup: the mark, then the wordmark set as live text.
 *
 * Matches daitalabs.com, which does the same thing — the published brand asset is the
 * mark alone, and the word "DAITA" beside it is type, not artwork. Inter 500, 16px,
 * -0.05em, vertically centred, with the gap scaled from the mark's height.
 *
 * TWO MARKS, ONE FOR EACH THEME. The published PNG has DARK ink (measured mean
 * rgb(40,43,44), luminance 0.165) despite being named "logo_white", so it is correct on
 * the Sand theme and nearly invisible on the dark one. `logo-white.png` is that same
 * artwork with its RGB channels inverted — no new mark was drawn, and the alpha channel
 * is untouched, so the silhouette is identical. Both are rendered and the stylesheet
 * hides the wrong one per theme, which keeps this working without JavaScript and with
 * no flash on the server render.
 */

export interface BrandLockupProps {
  /**
   * Mark height in px. The wordmark stays at its specified 16px regardless — it is a
   * type spec, not a proportion — so only pass sizes near 16-24 unless the wordmark is
   * hidden.
   */
  markHeight?: number;
  /** Hides the word and leaves the mark alone, for slots too tight for both. */
  markOnly?: boolean;
  className?: string;
}

/** Tailwind cannot see a computed class, so the sizes the site uses are listed. */
const MARK_SIZE: Record<number, string> = {
  16: "h-4",
  20: "h-5",
  24: "h-6",
  28: "h-7",
};

export function BrandLockup({
  markHeight = 20,
  markOnly = false,
  className,
}: BrandLockupProps = {}) {
  const size = MARK_SIZE[markHeight] ?? "h-5";

  return (
    <span className={cn("flex items-center gap-[0.4375rem]", className)}>
      <span className={cn("flex shrink-0 items-center justify-center", size)}>
        {/* White ink — hidden under the Sand theme. */}
        <img
          data-mark="on-dark"
          src={ASSETS.logoWhite}
          alt=""
          aria-hidden="true"
          className="h-full w-auto"
        />
        {/* Dark ink — hidden under the dark theme. */}
        <img
          data-mark="on-light"
          src={ASSETS.logo}
          alt=""
          aria-hidden="true"
          className="h-full w-auto"
        />
      </span>

      {markOnly ? null : (
        /*
          Inter 500 / 16px / -0.05em, from the live site. `leading-none` keeps the
          text box the height of the glyphs so `items-center` centres the word against
          the mark rather than against its line box.
        */
        <span className="font-[family-name:var(--font-inter),system-ui,sans-serif] text-[1rem] leading-none font-medium tracking-[-0.05em] text-ns-content-primary">
          DAITA
        </span>
      )}
    </span>
  );
}
