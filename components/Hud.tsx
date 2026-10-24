"use client";

import { useEffect, useRef } from "react";
import { getScrollProgress } from "./useScrollProgress";

// Thin glowing scroll-progress line along the top edge. Written straight to the DOM in a rAF,
// so scrolling never triggers a React render.
export function Hud() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${getScrollProgress()})`;
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-px bg-white/5">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-ember via-amber-glow to-teal-glow shadow-[0_0_10px_rgb(242_180_90/0.8)]"
      />
    </div>
  );
}
