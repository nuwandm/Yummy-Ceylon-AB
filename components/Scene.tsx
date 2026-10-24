"use client";

import { useEffect, useRef, useState } from "react";

type SceneProps = {
  index: number;
  total: number;
  kicker: string;
  title: string;
  accent: string;
  text: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  /** Narrower card, so more of the background frame shows. */
  compact?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

// One scroll "chapter": a glass card that pins low-left and fades in while its section is centred.
export function Scene({ index, total, kicker, title, accent, text, children, aside, compact }: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(index === 0);
  // Pin the card as low as it fits, so it never runs off the bottom of short screens.
  const [top, setTop] = useState<string>("52vh");
  const Heading = index === 0 ? "h1" : "h2";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const place = () => {
      const vh = window.innerHeight;
      const ideal = vh * 0.52;
      const fit = vh - card.offsetHeight - vh * 0.06;
      setTop(`${Math.max(Math.min(ideal, fit), 88)}px`);
    };
    // Re-place on width changes and card size changes only: on phones the URL bar showing/hiding
    // changes the height constantly, and re-pinning then makes the card jump mid-scroll.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      place();
    };
    const ro = new ResizeObserver(place);
    ro.observe(card);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "-35% 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="min-h-[160vh] px-4 pb-[20vh] sm:px-12" style={{ paddingTop: top }}>
      <div
        ref={cardRef}
        style={{ top }}
        // Opacity + translate only: both run on the compositor, unlike an animated blur.
        className={`sticky flex items-end justify-between gap-8 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div
          className={`glass relative w-full overflow-hidden rounded-3xl p-6 ${compact ? "max-w-[26rem] sm:p-7" : "max-w-xl sm:p-8"}`}
        >
          <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-glow to-transparent" />
          <span className="absolute top-4 right-5 font-mono text-[10px] tracking-[0.3em] text-teal-glow/60">
            {pad(index + 1)}/{pad(total)}
          </span>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">
            <span className="size-1.5 rounded-full bg-amber-glow [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
            {kicker}
          </p>
          <Heading
            className={`mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream ${compact ? "sm:text-5xl" : "sm:text-6xl"}`}
          >
            {title}{" "}
            <span className="text-glow font-serif text-[1.12em] font-semibold italic">{accent}</span>
          </Heading>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg">{text}</p>
          {children}
        </div>
        {/* Optional right-hand card (desktop only), e.g. opening hours. */}
        {aside && <div className="hidden w-[340px] shrink-0 self-start lg:block">{aside}</div>}
      </div>
    </section>
  );
}
