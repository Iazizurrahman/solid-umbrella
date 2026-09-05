import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/**
 * DM Sans is self-hosted as the variable cut carrying an optical-size (opsz) axis, which
 * tightens glyphs as size rises. The Google Fonts build exposes only the weight axis and
 * renders ~11% wider at display sizes, which changes every heading's line count — so the
 * real .ttf files are served locally instead. Do not swap these for next/font/google.
 */
const dmSans = localFont({
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  src: [
    {
      path: "../../public/fonts/DMSans-Variable.ttf",
      weight: "100 1000",
      style: "normal",
    },
  ],
});

const dmMono = localFont({
  variable: "--font-dm-mono",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  src: [
    { path: "../../public/fonts/DMMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/DMMono-Medium.ttf", weight: "500", style: "normal" },
  ],
});

/**
 * Neither DM Sans nor DM Mono carries a single Tamil or Devanagari glyph — every
 * codepoint in "தமிழ் · हिन्दी" is absent from both cmaps, so the browser would fall
 * through to whatever the OS happens to have. These two Noto faces exist only to
 * cover that one caption line; they are never applied to the body stack, and the
 * subsets are pinned so no Latin duplicate ships.
 *
 * Latin still comes from DM Sans: the caption's family list puts --font-dm-sans
 * first, and per-glyph fallback picks up Noto only for the Indic runs.
 */
const notoTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  display: "swap",
});

/**
 * The Sand theme's three faces. They are loaded unconditionally because the theme is a
 * runtime toggle with no server round trip — a visitor who picked Sand last time gets it
 * before first paint, so the faces have to already be in the document.
 *
 * Under `[data-theme="sand"]` the stylesheet re-points `--font-dm-sans` and
 * `--font-dm-mono` at these, which switches every component that uses the `font-sans`
 * or `font-mono` utility without touching a single component. Cormorant is applied to
 * headings only, by a theme-scoped rule.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/**
 * Applies the stored theme before first paint. Without it a visitor on Sand gets a
 * flash of the dark palette on every navigation, because the choice lives in
 * localStorage and the pages are statically rendered.
 */
const THEME_BOOTSTRAP = `try{var t=localStorage.getItem("daita-theme");if(t==="sand"){document.documentElement.dataset.theme="sand"}}catch(e){}`;

/**
 * Brand assets live under /images/daita/ and are not yet in the repo. Per the rebrand
 * brief, missing assets keep pointing at their intended path rather than being
 * substituted — drop the files in and these resolve with no code change.
 */
const BRAND = "/images/daita";

const TITLE = "DAITA — AI Textile Supply Chain Coordinator";
const DESCRIPTION =
  "DAITA reads every WhatsApp update, PO and cutting report across your factories, " +
  "then keeps brands, buying offices and production on the same number. " +
  "From purchase order to delivery, automated.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.daitalabs.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${BRAND}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${BRAND}/og-image.png`],
  },
  icons: {
    icon: [{ url: `${BRAND}/favicon.png`, type: "image/png" }],
    apple: [{ url: `${BRAND}/favicon.png` }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[
        dmSans.variable,
        dmMono.variable,
        notoTamil.variable,
        notoDevanagari.variable,
        cormorant.variable,
        plexSans.variable,
        plexMono.variable,
        "h-full antialiased",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
