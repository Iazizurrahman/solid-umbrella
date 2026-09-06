/**
 * DAITA brand constants — content only. No design tokens live here; colours, type scale,
 * spacing and motion all remain in globals.css exactly as built.
 */

/* ---------------------------------------------------------------------------
 * BRAND IDENTITY
 *
 * DAITA's own marks. Anything still missing keeps pointing at its intended path rather
 * than being substituted, so dropping the file into `public/images/daita/` makes that
 * slot resolve with no code change.
 *
 * Deliberately NOT repointed at the original site's assets: a logo, favicon and OG
 * image are brand identity, not interchangeable media. Serving the previous company's
 * wordmark would undo the rebrand.
 * ------------------------------------------------------------------------- */
export const BRAND_ASSETS = "/images/daita";

export const ASSETS = {
  /**
   * PNG, not SVG. daitalabs.com serves the mark as a 1900x1652 palette PNG with
   * transparency ("D[AI]TA logo_white" in the Framer source); no vector version is
   * published. Both names currently resolve to that same white mark — the site ships
   * only the one variant.
   *
   * Note this is the mark alone. The live header pairs it with the word "DAITA" set as
   * live text: Inter 500, 16px, letter-spacing -0.05em.
   */
  logo: `${BRAND_ASSETS}/logo.png`,
  logoWhite: `${BRAND_ASSETS}/logo-white.png`,
  favicon: `${BRAND_ASSETS}/favicon.png`,
  ogImage: `${BRAND_ASSETS}/og-image.png`,
  /** Tiruppur cutting floor. Still missing; see MEDIA for what the slots actually use. */
  floor: `${BRAND_ASSETS}/sand-3.jpg`,
  /** 26s Tiruppur floor film. Still missing; see MEDIA.heroVideo*. */
  heroVideo: `${BRAND_ASSETS}/sand-2.mp4`,
} as const;

/* ---------------------------------------------------------------------------
 * MEDIA
 *
 * Every photographic / video / animation slot on the site points here. These are the
 * original production assets that shipped with the build, restored from source
 * control, renamed and flattened under /sites/daita/.
 *
 * They are placeholders for DAITA's own footage: swap a value here and the slot
 * changes everywhere it is used. Only the paths live in this file — no component
 * hardcodes one.
 * ------------------------------------------------------------------------- */
const MEDIA_ROOT = "/sites/daita";

/** One looping card video: two codecs plus a poster frame. */
export interface MediaVideo {
  webm: string;
  mp4: string;
  poster: string;
}

/**
 * A still with its own alt text. Used wherever a card slot carries a photograph rather
 * than a film — which, since the imagery pass, is every pillar card.
 */
export interface MediaImage {
  src: string;
  /** Real alt text: these photographs carry meaning, they are not decoration. */
  alt: string;
}

/**
 * DAITA's own photography, sourced under the Pexels licence (free for commercial use,
 * no attribution required). Every file is credited in `docs/IMAGE_CREDITS.md` with its
 * source page, photographer and licence.
 *
 * These replaced the previous owner's data-centre, telecom and construction footage,
 * which was wrong subject matter for garment software and cost roughly 30 MB of video
 * per page load.
 */
const STOCK = `${BRAND_ASSETS}/stock`;

export const MEDIA = {
  /**
   * Homepage hero film. WebM is listed first on purpose: Chrome and Firefox take the
   * 22MB VP9 build, and only Safari falls through to the 65MB HEVC one. Reversing the
   * order is a large, silent regression.
   */
  heroVideoWebm: `${MEDIA_ROOT}/videos/hero-animation-vp9-chrome.webm`,
  heroVideoMp4: `${MEDIA_ROOT}/videos/hero-animation-hevc-safari.mp4`,

  /**
   * Five stills behind the pillar cards, in card order. Films previously; the
   * replacements are photographs, which is why `InfrastructureSection` now takes
   * `media` rather than `videos`.
   */
  pillarImages: [
    {
      src: `${STOCK}/pillar-1-team.jpg`,
      alt: "Workers sorting and packing garments together on a factory floor",
    },
    {
      src: `${STOCK}/pillar-2-records.jpg`,
      alt: "A worker recording production details on the floor of a textile plant",
    },
    {
      src: `${STOCK}/pillar-3-desk.jpg`,
      alt: "A merchandiser at a desk on the floor of a garment factory, surrounded by machinery",
    },
    {
      src: `${STOCK}/pillar-4-handover.jpg`,
      alt: "Two machinists working side by side at sewing machines in a garment workshop",
    },
    {
      src: `${STOCK}/pillar-5-supervisor.jpg`,
      alt: "Three workers in uniform at a finishing station in a textile factory",
    },
  ] as readonly MediaImage[],

  /** Closing CTA background — the source swaps these two by breakpoint. */
  ctaBackgroundDesktop: `${STOCK}/cta-bg-desktop.jpg`,
  ctaBackgroundMobile: `${STOCK}/cta-bg-mobile.jpg`,

  /**
   * Rive artboard for the desktop platform stack.
   * artboard "Artboard", state machine "LayerController".
   * Its four layer keys are fixed by the file: cloud / infrastructure / dc / energy.
   */
  riveStack: `${MEDIA_ROOT}/rive/platform-stack.riv`,

  /** Per-layer stills for the mobile stack carousel, in the same order as the Rive layers. */
  stackLayers: [
    `${MEDIA_ROOT}/images/stack-layer-cloud.png`,
    `${MEDIA_ROOT}/images/stack-layer-metal.png`,
    `${MEDIA_ROOT}/images/stack-layer-data.png`,
    `${MEDIA_ROOT}/images/stack-layer-power-energy.png`,
  ] as readonly string[],

  /** Two "who it's for" card images. */
  industryPrimary: `${STOCK}/industry-production-line.jpg`,
  industrySecondary: `${STOCK}/industry-samples-desk.jpg`,

  /**
   * General-purpose section still, used where a slot needs one photograph — the hero's
   * `"image"` variant on /platform, /our-story and /contact. Previously this was the
   * same file as `industryPrimary`, so one photograph did double duty across four
   * routes; it is now its own image.
   */
  sectionStill: `${STOCK}/hero-still.jpg`,
} as const;

/* ------------------------------------------------------------------------- */

export const CONTACT = {
  email: "hello@daitalabs.com",
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
