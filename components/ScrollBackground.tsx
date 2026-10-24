"use client";

import { useEffect, useRef, useState } from "react";
import frames from "./frames.json";
import { useLanguage } from "./LanguageProvider";
import { BACKDROP_DIM } from "./Backdrop";
import { getScrollProgress, SEQUENCE_ID } from "./useScrollProgress";
import { asset } from "@/lib/asset";

const FRAME_COUNT = frames.count;
const frameSrc = (i: number) => asset(`/frames/frame-${String(i + 1).padStart(3, "0")}.webp`);

// How quickly the shown frame catches up with the scroll position (ms). Wheel scrolling jumps
// ~100px per notch; easing the *picture* (not the scroll) keeps native scrolling but glides.
const EASE_MS = 110;

// Load order: ends first, then progressively finer passes, so a coarse version of the whole
// walk-in is scrubbable within the first few requests and fills in as the rest arrive.
function loadOrder(n: number) {
  const order = [0, n - 1];
  const seen = new Set(order);
  for (let step = 32; step >= 1; step = Math.floor(step / 2)) {
    for (let i = 0; i < n; i += step) if (!seen.has(i)) (seen.add(i), order.push(i));
  }
  return order;
}

// Fixed full-screen canvas whose frame follows the page scroll position. Past the end of the
// sequence the last frame stays put and a dim layer fades in behind the content sections.
export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Transparent until the first draw, so the CSS poster underneath shows meanwhile.
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const ready: boolean[] = new Array(FRAME_COUNT).fill(false);
    let drawn = -1;
    let shown = -1; // eased, fractional frame position
    let lastTime = 0;
    let rafId = 0;
    let cancelled = false;

    // Draw the image like `object-fit: cover`.
    const draw = (index: number) => {
      const img = images[index];
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawn = index;
    };

    // Nearest decoded frame, so scrolling ahead of the preload never shows a blank or a jump back to 0.
    const nearestReady = (index: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (ready[index - d]) return index - d;
        if (ready[index + d]) return index + d;
      }
      return -1;
    };

    // 0 during the walk-in, ramping to 1 over the first ~60% of a screen scrolled past its end.
    const updateDim = () => {
      const seq = document.getElementById(SEQUENCE_ID);
      if (!seq || !dimRef.current) return;
      const beyond = window.scrollY - (seq.offsetTop + seq.offsetHeight - window.innerHeight);
      dimRef.current.style.opacity = String(Math.min(Math.max(beyond / (window.innerHeight * 0.6), 0), 1));
    };

    const tick = (now: number) => {
      rafId = 0;
      // Layout reads before the style write in updateDim(), so no forced reflow.
      const target = reduceMotion ? 0 : getScrollProgress() * (FRAME_COUNT - 1);
      updateDim();
      if (shown < 0 || reduceMotion) shown = target;
      else {
        // Frame-rate independent exponential easing.
        const dt = Math.min(now - (lastTime || now), 64);
        shown += (target - shown) * (1 - Math.exp(-dt / EASE_MS));
        if (Math.abs(target - shown) < 0.02) shown = target;
      }
      lastTime = now;

      const index = nearestReady(Math.round(shown));
      if (index >= 0 && index !== drawn) draw(index);
      if (shown !== target) rafId = requestAnimationFrame(tick);
      else lastTime = 0;
    };
    const requestTick = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    // The frames are 752px wide, so drawing at devicePixelRatio 2 only quadruples the work for
    // no visible gain. Ignore height-only changes (mobile URL bar showing/hiding): resizing a
    // canvas clears it, and CSS already stretches it to the large viewport height.
    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const widthChanged = w !== lastW;
      if (!widthChanged && h <= lastH) return requestTick();
      lastH = widthChanged ? h : Math.max(h, lastH);
      lastW = w;
      canvas.width = w;
      canvas.height = lastH;
      ctx.imageSmoothingQuality = "high";
      drawn = -1;
      requestTick();
    };

    let done = 0;
    for (const i of loadOrder(FRAME_COUNT)) {
      const img = new Image();
      img.src = frameSrc(i);
      images[i] = img;
      // decode() unpacks the image off the main thread before it's first drawn (no mid-scroll stutter).
      img
        .decode()
        .then(() => {
          ready[i] = true;
        })
        .catch(() => {})
        .finally(() => {
          if (cancelled) return;
          setLoaded(++done);
          requestTick();
        });
    }

    resize();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const pct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <>
      {/* The first frame doubles as a CSS poster, so something shows before JS and the frames load. */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 -z-10 h-lvh w-full bg-charcoal bg-cover bg-center"
        style={{ backgroundImage: `url(${frameSrc(0)})` }}
        aria-hidden="true"
      />
      {/* Gradient keeps overlay text readable over bright frames. */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.15) 55%, transparent), linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 30%, transparent 55%, rgba(0,0,0,0.6))",
        }}
      />
      <div ref={dimRef} className="pointer-events-none fixed inset-0 -z-10" style={{ background: BACKDROP_DIM, opacity: 0 }} />
      {pct < 100 && (
        <div className="fixed bottom-0 left-0 z-50 h-0.5 bg-amber-glow transition-[width] duration-300" style={{ width: `${pct}%` }}>
          <span className="sr-only">
            {t.loading} {pct}%
          </span>
        </div>
      )}
    </>
  );
}
