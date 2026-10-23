"use client";

import Link from "next/link";
import { useState } from "react";
import { formatAlbumDate, localized, type Album } from "@/lib/album-types";
import { asset } from "@/lib/asset";
import { Atmosphere } from "./Atmosphere";
import { Backdrop } from "./Backdrop";
import { Header } from "./Header";
import { useLanguage } from "./LanguageProvider";
import { Lightbox } from "./Lightbox";

export function AlbumView({ album }: { album: Album }) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const title = localized(album, "title", lang);
  const photos = album.photos.map((p) => ({ src: asset(p.image), alt: localized(p, "caption", lang) }));

  return (
    <>
      <Backdrop />
      <Atmosphere />
      <Header />

      <main className="px-4 pt-36 pb-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-cream/60 uppercase transition hover:text-amber-glow"
          >
            ← {t.gallery.back}
          </Link>

          <p className="mt-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">
            <span className="size-1.5 rounded-full bg-amber-glow [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
            {formatAlbumDate(album.date, lang)} · {album.photos.length} {t.gallery.photos}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream sm:text-6xl">{title}</h1>
          {localized(album, "description", lang) && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/70">{localized(album, "description", lang)}</p>
          )}

          {/* Masonry via CSS columns keeps each photo's own aspect ratio. */}
          <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((photo, i) => (
              <li key={photo.src + i} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 focus-visible:outline-2 focus-visible:outline-amber-glow"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="w-full transition duration-700 ease-out group-hover:scale-105 group-hover:saturate-125"
                  />
                  <span className="absolute inset-0 rounded-2xl opacity-0 shadow-[inset_0_0_0_1px_rgb(242_180_90/0.6),inset_0_0_40px_rgb(242_180_90/0.25)] transition-opacity group-hover:opacity-100" />
                  {photo.alt && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 text-left font-mono text-[10px] tracking-[0.2em] text-cream/90 uppercase opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      {photo.alt}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </>
  );
}
