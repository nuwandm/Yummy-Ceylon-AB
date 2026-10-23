"use client";

import { useEffect, useState } from "react";

export const SEQUENCE_ID = "scroll-sequence";

/** Scroll position through the frame sequence as 0..1; content after it (e.g. the map) doesn't count. */
export function getScrollProgress() {
  const seq = document.getElementById(SEQUENCE_ID);
  const end = seq ? seq.offsetTop + seq.offsetHeight : document.documentElement.scrollHeight;
  const max = end - window.innerHeight;
  return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      setProgress(getScrollProgress());
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

  return progress;
}
