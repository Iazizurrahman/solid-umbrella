"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a media query without an effect.
 *
 * `useSyncExternalStore` is the right shape for this: the browser is the source of
 * truth, not React. Reading it in an effect would render one frame with the wrong
 * answer and trip the "no setState in an effect" rule.
 *
 * `serverValue` is what the server and the first client render agree on. Default
 * `false` means "assume the query does not match", which for a
 * `prefers-reduced-motion` check errs towards the animated build and for a
 * `min-width` check errs towards the small layout.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
