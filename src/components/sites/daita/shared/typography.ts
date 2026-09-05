/**
 * Type helpers shared across sections.
 */

/**
 * Family stack for any line that mixes Latin with Tamil or Devanagari.
 *
 * DM Sans and DM Mono carry no Tamil or Devanagari glyphs at all — every codepoint in
 * "தமிழ் · हिन्दी" is absent from both cmaps — so those runs would fall through to
 * whatever the operating system happens to have. Listing DM Sans first and the two Noto
 * faces after it lets per-glyph fallback keep Latin in the site face and pull only the
 * Indic runs from Noto.
 *
 * The two Noto faces are loaded in `src/app/layout.tsx` and are applied nowhere else.
 */
export const MULTILINGUAL =
  "font-[family-name:var(--font-dm-sans),var(--font-noto-tamil),var(--font-noto-devanagari)]";
