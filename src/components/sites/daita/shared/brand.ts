/**
 * DAITA brand constants — content only. No design tokens live here; colours, type scale,
 * spacing and motion all remain in globals.css exactly as built.
 *
 * Brand imagery is not yet in the repo. Per the rebrand brief, a missing asset keeps
 * pointing at its intended path rather than being substituted, so dropping the files into
 * `public/images/daita/` makes every slot resolve with no code change.
 */
export const BRAND_ASSETS = "/images/daita";

export const ASSETS = {
  /** 26s Tiruppur floor film — homepage hero background. */
  heroVideo: `${BRAND_ASSETS}/sand-2.mp4`,
  /** Tiruppur cutting floor, unstaged — hero fallback and section imagery. */
  floor: `${BRAND_ASSETS}/sand-3.jpg`,
  logo: `${BRAND_ASSETS}/logo.svg`,
  logoWhite: `${BRAND_ASSETS}/logo-white.svg`,
  favicon: `${BRAND_ASSETS}/favicon.png`,
  ogImage: `${BRAND_ASSETS}/og-image.png`,
} as const;

export const CONTACT = {
  email: "hello@daitalabs.com",
  /** Written with non-breaking spaces so the number never wraps mid-digit-group. */
  phone: "+91 979 1947 010",
  phoneHref: "tel:+919791947010",
  places: ["Tiruppur", "Bengaluru"],
  linkedin: "https://www.linkedin.com/company/daitalabs/",
} as const;

export const COPYRIGHT = "© 2026 DAITA Labs. All rights reserved.";

export const TAGLINE = "Production coordination for the garment supply chain.";

/** Primary call to action, used site-wide. */
export const CTA = {
  label: "Book a Demo",
  href: "/contact",
} as const;

export const SECONDARY_CTA = {
  label: "See how it works",
  href: "/platform",
} as const;

/**
 * Location note: the live site says Tiruppur only, one deck gives a Bengaluru address and
 * another claims London / Delaware / Tiruppur / Bengaluru. Tiruppur · Bengaluru is what
 * internal docs support and is what ships here. Confirm before launch.
 */
