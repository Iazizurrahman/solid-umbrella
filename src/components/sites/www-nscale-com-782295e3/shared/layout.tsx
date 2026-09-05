import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Mirrors Webflow's `.padding-global` + `.container-large` pair.
 * `.container-large` is max-width 77rem (1232px), centred; `.padding-global`
 * is 24px inline, dropping to 20px at <=767px.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="ns-padding-global">
      <div className={cn("ns-container", className)}>{children}</div>
    </div>
  );
}

/** `.section-separator` — a real 1px element between sections, not a border. */
export function SectionSeparator() {
  return <div className="ns-separator" aria-hidden="true" />;
}
