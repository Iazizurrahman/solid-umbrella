/**
 * The vertical dashed rules that run behind most sections.
 *
 * Source: `.section_lines` / `.section_lines_line`. The dash pattern lives in the
 * page's inline <style> embed, not the Webflow stylesheet:
 *   repeating-linear-gradient(to bottom,
 *     var(--border--primary) 0px, var(--border--primary) 4px,
 *     transparent 4px, transparent 8px)
 * with `opacity: .5` on the line, so the effective ink is 10% white.
 *
 * Five rules render at desktop; below 768px only the two `.is-mobile` ones do.
 * The wrapper is `position: absolute; inset: 0; z-index: -1`, so the section it
 * sits in must establish a stacking context (`position: relative; isolation: isolate`).
 */
export function SectionLines() {
  return (
    <div className="ns-section-lines" aria-hidden="true">
      <div className="ns-section-lines-line" />
      <div className="ns-section-lines-line" />
      <div className="ns-section-lines-line" />
      <div className="ns-section-lines-line is-mobile" />
      <div className="ns-section-lines-line is-mobile" />
    </div>
  );
}
