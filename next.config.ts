import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  /**
   * Hides the Next.js DevTools indicator — the black circular "N" button that sits
   * fixed at bottom-left during `next dev` (its default position) and shows the build
   * status and issue count.
   *
   * It is injected by the dev overlay only and has never been part of a production
   * build, so this changes nothing about what ships; it just stops it appearing over
   * the design while reviewing pages locally.
   */
  devIndicators: false,
};

export default nextConfig;
