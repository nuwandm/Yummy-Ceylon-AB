"use client";

import { useCallback, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

type LightboxProps = {
  photos: { src: string; alt: string }[];
  index: number | null;
  onChange: (index: number | null) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

// Full-screen photo viewer with prev/next, arrow keys and Esc.
export function Lightbox({ photos, index, onChange }: LightboxProps) {
  const { t } = useLanguage();
  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (dir: number) => index !== null && onChange((index + dir + photos.length) % photos.length),
    [index, onChange, photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={close}
    >
      <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[78vh] w-auto rounded-2xl border border-white/10 shadow-[0_0_80px_-20px_rgb(242_180_90/0.5)]"
        />
        <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-xs tracking-[0.2em] text-cream/75 uppercase">
          <span>
            <span className="text-amber-glow">
              {pad(index + 1)}/{pad(photos.length)}
            </span>
            {photo.alt && <> · {photo.alt}</>}
          </span>
          <span className="flex shrink-0 gap-2">
            {[
              { label: t.gallery.prev, icon: "←", dir: -1 },
              { label: t.gallery.next, icon: "→", dir: 1 },
            ].map((b) => (
              <button
                key={b.dir}
                type="button"
                aria-label={b.label}
                onClick={() => step(b.dir)}
                className="grid size-10 place-items-center rounded-full border border-white/20 text-cream transition hover:border-amber-glow hover:text-amber-glow"
              >
                {b.icon}
              </button>
            ))}
            <button
              type="button"
              aria-label={t.gallery.close}
              onClick={close}
              className="grid size-10 place-items-center rounded-full bg-amber-glow text-charcoal transition hover:bg-cream"
            >
              ✕
            </button>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
