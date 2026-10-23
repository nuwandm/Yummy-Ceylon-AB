"use client";

import { useScrollProgress } from "./useScrollProgress";

// Thin glowing scroll-progress line along the top edge.
export function Hud() {
  const progress = useScrollProgress();

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-px bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-ember via-amber-glow to-teal-glow shadow-[0_0_10px_rgb(242_180_90/0.8)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
