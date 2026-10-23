"use client";

import { Atmosphere } from "@/components/Atmosphere";
import { Header } from "@/components/Header";
import { Hud } from "@/components/Hud";
import { useLanguage } from "@/components/LanguageProvider";
import { Scene } from "@/components/Scene";
import { ScrollBackground } from "@/components/ScrollBackground";
import { site } from "@/components/site";
import type { Album } from "@/lib/album-types";
import Link from "next/link";
import { BookingSection } from "@/components/BookingSection";
import { GallerySection } from "@/components/GallerySection";
import { MapSection } from "@/components/MapSection";
import { OpeningHours } from "@/components/OpeningHours";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SEQUENCE_ID } from "@/components/useScrollProgress";

export function HomePage({ albums }: { albums: Album[] }) {
  const { t } = useLanguage();

  const extras = [
    // 1 · scroll cue
    <div key="cue" className="mt-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-cream/55 uppercase">
      <span className="relative h-8 w-px overflow-hidden bg-white/15">
        <span className="absolute inset-0 bg-amber-glow [animation:scroll-line_2.2s_ease-in-out_infinite]" />
      </span>
      {t.scroll}
    </div>,
    // 2 · menu link
    <Link
      key="menu"
      href="/menu/"
      className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-glow/40 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-amber-glow uppercase transition hover:bg-amber-glow hover:text-charcoal"
    >
      {t.menuPage.viewMenu} →
    </Link>,
    // 3 · buffet prices
    <dl key="lunch" className="mt-6 grid grid-cols-2 gap-3">
      {[
        { label: t.lunch.adults, price: site.buffet.adult, drink: site.buffet.adultWithDrink },
        { label: t.lunch.kids, price: site.buffet.kid, drink: site.buffet.kidWithDrink },
      ].map((row) => (
        <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <dt className="font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase">{row.label}</dt>
          <dd className="mt-1 font-display text-3xl font-bold text-cream">
            {row.price}
            <span className="ml-1 text-sm font-medium text-cream/60">kr</span>
          </dd>
          <dd className="mt-1 text-xs text-teal-glow/80">
            {row.drink} kr {t.lunch.withDrink}
          </dd>
        </div>
      ))}
    </dl>,
    // 4 · contact details
    <div key="visit" className="mt-6 space-y-4">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
          <dt className="font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase">{t.visit.address}</dt>
          <dd className="mt-1">
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="text-cream hover:text-amber-glow">
              {site.address}
            </a>
          </dd>
        </div>
        {/* Hidden on desktop, where the Opening hours card sits beside this one. */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:hidden">
          <dt className="font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase">{t.visit.hours}</dt>
          <dd className="mt-1 text-cream">
            {t.visit.days} · {site.hours}
          </dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:col-span-2">
          <dt className="font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase">{t.visit.email}</dt>
          <dd className="mt-1">
            <a href={`mailto:${site.email}`} className="text-cream hover:text-amber-glow">
              {site.email}
            </a>
          </dd>
        </div>
      </dl>
      <div className="flex gap-2">
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-cream/75 uppercase transition hover:border-amber-glow hover:text-amber-glow"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>,
  ];

  return (
    <>
      <ScrollBackground />
      <Atmosphere />
      <Header />
      <Hud />

      {/* Cards sit low on the left so the storefront sign in the frames stays visible. */}
      <main>
        <div id={SEQUENCE_ID}>
          {t.scenes.map((scene, i) => (
            <Scene key={i} index={i} total={t.scenes.length} {...scene} aside={i === 3 && <OpeningHours />} compact={i === 3}>
              {extras[i]}
            </Scene>
          ))}
        </div>
        <GallerySection albums={albums} />
        <ReviewsSection />
        <BookingSection />
        <MapSection />
      </main>
    </>
  );
}
