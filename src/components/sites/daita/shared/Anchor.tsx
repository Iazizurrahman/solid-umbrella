import type { ReactNode } from "react";

/**
 * Anchor target for in-page navigation.
 *
 * A plain block wrapper — it paints nothing and adds no box, so it cannot shift the
 * layout of the section it wraps. Its only job is to carry the `id` and to offset the
 * scroll landing point by the height of the fixed header (73px), so an anchored section
 * is not hidden underneath it.
 *
 * Sections are wrapped rather than given `id` props because the section components are
 * shared across routes and an `id` must be unique per document — the wrapper keeps that
 * decision at the page level, where it belongs.
 */
export function Anchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-[73px]">
      {children}
    </div>
  );
}
