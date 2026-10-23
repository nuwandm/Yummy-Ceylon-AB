"use client";

import { useLanguage } from "./LanguageProvider";
import { site } from "./site";

const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=15&output=embed`;

export function MapSection() {
  const { t } = useLanguage();

  return (
    <section id="find-us" className="relative px-4 pt-16 pb-12 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">
          <span className="size-1.5 rounded-full bg-amber-glow [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
          {t.map.kicker}
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream sm:text-6xl">
          {t.map.title} <span className="text-glow font-serif text-[1.12em] font-semibold italic">{t.map.accent}</span>
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="glass relative overflow-hidden rounded-3xl p-1.5">
            <span className="absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-amber-glow to-transparent" />
            <iframe
              title={t.map.iframeTitle}
              src={embedUrl}
              className="h-[380px] w-full rounded-[1.25rem] border-0 sm:h-[460px]"
              // Dark, warm-tinted map to match the site.
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) sepia(0.25) contrast(0.95)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="glass flex flex-col gap-5 rounded-3xl p-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase">{t.visit.address}</p>
              <p className="mt-1 text-lg text-cream">{site.address}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase">{t.visit.hours}</p>
              <p className="mt-1 text-cream">
                {t.visit.days} · {site.hours}
              </p>
              <p className="mt-1 text-sm text-teal-glow/80">
                {t.map.lunch} · {site.lunchHours}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase">{t.visit.email}</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-cream hover:text-amber-glow">
                {site.email}
              </a>
            </div>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber-glow px-5 py-3 font-mono text-xs font-medium tracking-[0.2em] text-charcoal uppercase shadow-[0_0_24px_-4px_rgb(242_180_90/0.8)] transition hover:bg-cream"
            >
              {t.map.directions} →
            </a>
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[11px] tracking-[0.2em] text-cream/45 uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Yummy Ceylon AB</span>
          <div className="flex gap-5">
            {site.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-amber-glow">
                {s.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
