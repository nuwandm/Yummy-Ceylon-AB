"use client";

import { useEffect, useRef, useState } from "react";
import frames from "./frames.json";
import { useLanguage } from "./LanguageProvider";
import { getScrollProgress } from "./useScrollProgress";
import { asset } from "@/lib/asset";

const FRAME_COUNT = frames.count;
const frameSrc = (i: number) => asset(`/frames/frame-${String(i + 1).padStart(3, "0")}.webp`);

// Fixed full-screen canvas whose frame follows the page scroll position.
export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: HTMLImageElement[] = [];
    let current = -1;
    let rafId = 0;

    // Draw the image like `object-fit: cover`.
    const draw = (index: number) => {
      const img = images[index];
      if (!img?.complete || !img.naturalWidth) return;
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      current = index;
    };

    const frameForScroll = () => {
      if (reduceMotion) return 0;
      return Math.round(getScrollProgress() * (FRAME_COUNT - 1));
    };

    // Fall back to the nearest loaded frame so scrolling ahead of the preload never shows a blank.
    const render = () => {
      rafId = 0;
      let index = frameForScroll();
      while (index > 0 && !images[index]?.complete) index--;
      if (index !== current) draw(index);
    };
    const requestRender = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      current = -1;
      requestRender();
    };

    let done = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        setLoaded(++done);
        requestRender();
      };
      images.push(img);
    }

    resize();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const pct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-screen w-screen" aria-hidden="true" />
      {/* Gradient keeps overlay text readable over bright frames. */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.15) 55%, transparent), linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 30%, transparent 55%, rgba(0,0,0,0.6))",
        }}
      />
      {pct < 100 && (
        <div className="fixed bottom-0 left-0 z-50 h-0.5 bg-amber-glow transition-all" style={{ width: `${pct}%` }}>
          <span className="sr-only">
            {t.loading} {pct}%
          </span>
        </div>
      )}
    </>
  );
}
