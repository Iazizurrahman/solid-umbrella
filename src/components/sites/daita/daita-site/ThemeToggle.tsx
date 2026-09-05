"use client";

import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * Switches between the shipped dark palette and the Sand palette from
 * `docs/DAITA_Sand_Site.html`.
 *
 * The choice lives in `localStorage` under `daita-theme` and is applied to
 * `<html data-theme>` by the bootstrap script in `layout.tsx` before first paint, so
 * there is no flash on navigation. Dark is the default: no attribute means dark.
 *
 * State is read with `useSyncExternalStore` rather than an effect. The source of truth
 * is the DOM attribute, not React, and reading it in an effect would both flag the
 * "no setState in an effect" rule and render one frame with the wrong label.
 */

const STORAGE_KEY = "daita-theme";
const EVENT = "daita-theme-change";

export type ThemeId = "dark" | "sand";

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  // Another tab switching theme should move this one too.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const readTheme = (): ThemeId =>
  document.documentElement.dataset.theme === "sand" ? "sand" : "dark";

/** The server has no storage to read, and dark is the default. */
const serverTheme = (): ThemeId => "dark";

function applyTheme(next: ThemeId) {
  if (next === "sand") document.documentElement.dataset.theme = "sand";
  else delete document.documentElement.dataset.theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Private mode, or storage disabled. The toggle still works for this page view.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeToggle({ className }: { className?: string } = {}) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const next: ThemeId = theme === "sand" ? "dark" : "sand";

  const onClick = useCallback(() => applyTheme(next), [next]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={theme === "sand"}
      title={`Switch to the ${next === "sand" ? "Sand" : "dark"} theme`}
      className={cn(
        "flex h-8 items-center gap-2 rounded-[4px] border border-ns-border-primary bg-transparent px-3 font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-primary transition-colors duration-200 hover:border-ns-border-hover",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-border-hover",
        className,
      )}
    >
      <span className="sr-only">
        {`Theme: ${theme === "sand" ? "Sand" : "dark"}. Switch to ${next === "sand" ? "Sand" : "dark"}.`}
      </span>
      {/* Two dots, the active one filled — the same shape in both directions, so the
          control never changes width as the label swaps. */}
      <span aria-hidden="true" className="flex items-center gap-1">
        <span
          className={cn(
            "h-2 w-2 rounded-full border border-ns-border-hover",
            theme === "dark" && "bg-ns-content-primary",
          )}
        />
        <span
          className={cn(
            "h-2 w-2 rounded-full border border-ns-border-hover",
            theme === "sand" && "bg-ns-content-primary",
          )}
        />
      </span>
      <span aria-hidden="true">{theme === "sand" ? "Sand" : "Dark"}</span>
    </button>
  );
}
