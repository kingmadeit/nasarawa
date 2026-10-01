"use client";

import { useEffect, useState } from "react";

export const LOADER_DURATION_MS = 1600;

const WORDMARK = "Nasarawa";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => {
        setPercent(100);
        setVisible(false);
      });
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();
    let frame: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const next = Math.min(100, Math.round((elapsed / LOADER_DURATION_MS) * 100));
      setPercent(next);
      if (elapsed < LOADER_DURATION_MS) {
        frame = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const visibleLetterCount = Math.round((percent / 100) * WORDMARK.length);

  return (
    <div
      aria-hidden="true"
      data-loader
      data-visible={visible}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-dark-green"
    >
      <span className="font-accent text-2xl text-cream">
        {WORDMARK.slice(0, visibleLetterCount)}
      </span>
      <span className="font-sans text-sm tabular-nums text-cream/70">
        {percent}%
      </span>
    </div>
  );
}
