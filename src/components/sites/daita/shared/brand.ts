/**
 * DAITA brand constants — content only. No design tokens live here; colours, type scale,
 * spacing and motion all remain in globals.css exactly as built.
 */

/* ---------------------------------------------------------------------------
 * BRAND IDENTITY
 *
 * DAITA's own marks. These files are not in the repo yet; a missing asset keeps
 * pointing at its intended path rather than being substituted, so dropping them into
 * `public/images/daita/` makes every slot resolve with no code change.
 *
 * Deliberately NOT repointed at the original site's assets: a logo, favicon and OG
 * image are brand identity, not interchangeable media. Serving the previous company's
 * wordmark would undo the rebrand.
 * ------------------------------------------------------------------------- */
export const BRAND_ASSETS = "/images/daita";

export const ASSETS = {
  logo: `${BRAND_ASSETS}/logo.svg`,
  logoWhite: `${BRAND_ASSETS}/logo-white.svg`,
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
 * control and served from their original directory.
 *
 * They are placeholders for DAITA's own footage: swap a value here and the slot
 * changes everywhere it is used. Only the paths live in this file — no component
 * hardcodes one.
 * ------------------------------------------------------------------------- */
const MEDIA_ROOT = "/sites/www-nscale-com-782295e3/root-8a5edab2";

/** One looping card video: two codecs plus a poster frame. */
export interface MediaVideo {
  webm: string;
  mp4: string;
  poster: string;
}

const sectionVideo = (hash: string, id: string): MediaVideo => ({
  webm: `${MEDIA_ROOT}/videos/666078e26595dfe9b1e8171f-${hash}_shutterstock_${id}_webm.webm`,
  mp4: `${MEDIA_ROOT}/videos/666078e26595dfe9b1e8171f-${hash}_shutterstock_${id}_mp4.mp4`,
  poster: `${MEDIA_ROOT}/images/666078e26595dfe9b1e8171f-${hash}_shutterstock_${id}_poster.0000000.jpg`,
});

export const MEDIA = {
  /**
   * Homepage hero film. WebM is listed first on purpose: Chrome and Firefox take the
   * 22MB VP9 build, and only Safari falls through to the 65MB HEVC one. Reversing the
   * order is a large, silent regression.
   */
  heroVideoWebm: `${MEDIA_ROOT}/videos/nscale-homepage-animation-web-v4-vp9-chrome.webm`,
  heroVideoMp4: `${MEDIA_ROOT}/videos/nscale-homepage-animation-web-v4-hevc-safari.mp4`,

  /** Five looping videos behind the pillar cards, in card order. */
  sectionVideos: [
    sectionVideo("697c82bba5edd1c94eb95717", "3787623545"),
    sectionVideo("697c82c7f061bb6a689dabf2", "3881822535"),
    sectionVideo("697c82d0be15ac9b55983e3a", "1103292547"),
    sectionVideo("697c82d87be2c49bd158e307", "3798669997"),
    sectionVideo("697c82e6de5fa540fed56a22", "1109864221"),
  ] as readonly MediaVideo[],

  /** Closing CTA background — the source swaps these two by breakpoint. */
  ctaBackgroundDesktop: `${MEDIA_ROOT}/images/69ef2ee669eaa4a13d803d32_section_cta-bg.avif`,
  ctaBackgroundMobile: `${MEDIA_ROOT}/images/69ef53b54feaaf14e5110977_section_cta-bg-mobile.avif`,

  /**
   * Rive artboard for the desktop platform stack.
   * artboard "Artboard", state machine "LayerController".
   * Its four layer keys are fixed by the file: cloud / infrastructure / dc / energy.
   */
  riveStack: `${MEDIA_ROOT}/rive/6a72243af8c76e6552945a54_6a71c8fd5f921f9d8e0f5fb4_nscale-stack_v2.riv`,

  /** Per-layer stills for the mobile stack carousel, in the same order as the Rive layers. */
  stackLayers: [
    `${MEDIA_ROOT}/images/6a722dbde41c53471bf40caa_stack-2.0-nscale-cloud-png.png`,
    `${MEDIA_ROOT}/images/6a722ddacc2f903fd22c5cd0_stack-2.0-nscale-metal-png.png`,
    `${MEDIA_ROOT}/images/6a722e3924f1f0e6fac27d9f_stack-2.0-nscale-data.png`,
    `${MEDIA_ROOT}/images/6a722e5e5485394b6d893f59_stack-2.0-nscale-power-energy-png.png`,
  ] as readonly string[],

  /** Two "who it's for" card images. */
  industryPrimary: `${MEDIA_ROOT}/images/69fcef17697690e9da6c548d_use-case_image-wrap.jpg`,
  industrySecondary: `${MEDIA_ROOT}/images/69fcf00177424da8a4dc51f7_image-19.jpg`,

  /** General-purpose section still, used where a slot needs one photograph. */
  sectionStill: `${MEDIA_ROOT}/images/69fcef17697690e9da6c548d_use-case_image-wrap.jpg`,
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
