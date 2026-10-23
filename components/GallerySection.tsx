"use client";

import Link from "next/link";
import { formatAlbumDate, localized, type Album } from "@/lib/album-types";
import { asset } from "@/lib/asset";
import { useLanguage } from "./LanguageProvider";

// Event albums: one card per event, each linking to its own page with all photos.
export function GallerySection({ albums }: { albums: Album[] }) {
  const { t, lang } = useLanguage();

  return (
    <section id="gallery" className="relative px-4 pt-40 pb-16 sm:px-12">
      {/* Fades the frames out into the solid backdrop used by the rest of the page. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-charcoal/90 via-30% to-charcoal" />

      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">
          <span className="size-1.5 rounded-full bg-amber-glow [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
          {t.gallery.kicker}
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream sm:text-6xl">
          {t.gallery.title} <span className="text-glow font-serif text-[1.12em] font-semibold italic">{t.gallery.accent}</span>
        </h2>

        {albums.length === 0 ? (
          <p className="mt-10 text-cream/60">{t.gallery.empty}</p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, i) => {
              const title = localized(album, "title", lang);
              return (
                <li key={album.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
                  <Link
                    href={`/gallery/${album.slug}/`}
                    // Static export names dynamic-route prefetch files differently than the router requests them,
                    // so prefetching only produces 404s; the album still loads instantly on click.
                    prefetch={false}
                    className="group relative flex h-full min-h-72 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 focus-visible:outline-2 focus-visible:outline-amber-glow"
                  >
                    <img
                      src={album.cover && asset(album.cover)}
                      alt={title}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:saturate-125"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <span className="absolute inset-0 rounded-3xl opacity-0 shadow-[inset_0_0_0_1px_rgb(242_180_90/0.6),inset_0_0_50px_rgb(242_180_90/0.25)] transition-opacity group-hover:opacity-100" />

                    <span className="absolute top-4 right-4 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-cream/90 uppercase backdrop-blur">
                      {album.photos.length} {t.gallery.photos}
                    </span>

                    <span className="relative p-6">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-amber-glow uppercase">
                        {formatAlbumDate(album.date, lang)}
                      </span>
                      <span className={`mt-2 block font-display font-bold text-cream ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                        {title}
                      </span>
                      {i === 0 && (
                        <span className="mt-2 line-clamp-2 block max-w-lg text-cream/70">{localized(album, "description", lang)}</span>
                      )}
                      <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-cream/80 uppercase transition group-hover:text-amber-glow">
                        {t.gallery.view} <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
