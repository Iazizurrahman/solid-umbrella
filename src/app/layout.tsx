import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * nscale.com self-hosts its fonts; it does NOT use the Google Fonts build.
 *
 * The face it ships is `DMSans-VariableFont_opsz,wght.ttf` — a variable font carrying an
 * **optical-size (opsz) axis**, which tightens glyphs as size increases. `next/font/google`'s
 * DM_Sans exposes only the weight axis, so its 48px rendering is materially wider:
 *
 *   "A complete AI cloud platform" @48px/500
 *     source `Dmsans`      → 595.4px   (fits one line, as the real site does)
 *     Google DM Sans       → 662.5px   (+11%, wraps to two lines)
 *
 * That 11% error would compound across every heading on the page, so the original .ttf files
 * are downloaded and served locally instead. `font-display: swap` and the `Arial, sans-serif`
 * fallback both mirror the source @font-face declarations.
 */
const dmSans = localFont({
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  src: [
    {
      path: "../../public/sites/www-nscale-com-782295e3/root-8a5edab2/fonts/DMSans-Variable.ttf",
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
    {
      path: "../../public/sites/www-nscale-com-782295e3/root-8a5edab2/fonts/DMMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/sites/www-nscale-com-782295e3/root-8a5edab2/fonts/DMMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
});

const SEO = "/sites/www-nscale-com-782295e3/root-8a5edab2/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nscale.com"),
  title: "The engine of superintelligence | Nscale",
  description:
    "Nscale full-stack AI cloud platform and services are designed for scale, resilience, and speed.",
  openGraph: {
    type: "website",
    title: "The engine of superintelligence | Nscale",
    description:
      "Nscale full-stack AI cloud platform and services are designed for scale, resilience, and speed.",
    images: [`${SEO}/nscale-og.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "The engine of superintelligence | Nscale",
    description:
      "Nscale full-stack AI cloud platform and services are designed for scale, resilience, and speed.",
    images: [`${SEO}/nscale-og.png`],
  },
  icons: {
    icon: [
      { url: `${SEO}/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${SEO}/favicon-48.png`, sizes: "48x48", type: "image/png" },
      { url: `${SEO}/favicon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${SEO}/favicon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: `${SEO}/apple-touch-icon-180.png`, sizes: "180x180" }],
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
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
