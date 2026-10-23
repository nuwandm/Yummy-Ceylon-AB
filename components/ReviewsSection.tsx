"use client";

import { ElfsightReviews } from "./ElfsightReviews";
import { useLanguage } from "./LanguageProvider";
import { reviews } from "./reviews";
import { site } from "./site";

function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  const star = (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
      />
    </svg>
  );
  // Grey row underneath, amber row clipped to the rating on top.
  return (
    <span className="relative inline-flex" role="img" aria-label={`${rating} / 5`}>
      <span className="flex text-white/15">{Array.from({ length: 5 }, (_, i) => <span key={i}>{star}</span>)}</span>
      <span
        className="absolute inset-0 flex overflow-hidden text-amber-glow drop-shadow-[0_0_6px_rgb(242_180_90/0.7)]"
        style={{ width: `${(rating / 5) * 100}%` }}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="shrink-0">
            {star}
          </span>
        ))}
      </span>
    </span>
  );
}

const GoogleMark = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9h-4v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7h-4a12 12 0 0 0 0 10.8l4-3.1z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
  </svg>
);

export function ReviewsSection() {
  const { t, lang } = useLanguage();
  const { rating, count, reviewsUrl } = site.google;
  const elfsightId = site.elfsight[lang] || site.elfsight[lang === "en" ? "sv" : "en"];
  const ratingText = rating.toLocaleString(lang === "sv" ? "sv-SE" : "en-GB", { minimumFractionDigits: 1 });

  return (
    <section id="reviews" className="relative px-4 pt-16 pb-16 sm:px-12">

      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">
          <span className="size-1.5 rounded-full bg-amber-glow [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
          {t.reviews.kicker}
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream sm:text-6xl">
          {t.reviews.title} <span className="text-glow font-serif text-[1.12em] font-semibold italic">{t.reviews.accent}</span>
        </h2>

        <div className="glass relative mt-10 flex flex-col gap-8 overflow-hidden rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-glow to-transparent" />
          <div className="flex items-center gap-6">
            <span className="font-display text-7xl leading-none font-extrabold text-cream sm:text-8xl">{ratingText}</span>
            <div className="space-y-2">
              <Stars rating={rating} size={22} />
              <p className="flex items-center gap-2 text-sm text-cream/70">
                <GoogleMark />
                {count} {t.reviews.count}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-amber-glow/40 px-5 py-3 font-mono text-xs tracking-[0.2em] text-amber-glow uppercase transition hover:bg-amber-glow hover:text-charcoal"
            >
              {t.reviews.read} →
            </a>
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-amber-glow px-5 py-3 font-mono text-xs font-medium tracking-[0.2em] text-charcoal uppercase shadow-[0_0_24px_-4px_rgb(242_180_90/0.8)] transition hover:bg-cream"
            >
              {t.reviews.write} ★
            </a>
          </div>
        </div>

        {elfsightId ? (
          // Live Google reviews via Elfsight, restyled to the site theme.
          <ElfsightReviews widgetId={elfsightId} />
        ) : (
          reviews.length > 0 && (
            <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <li key={i} className="glass flex flex-col gap-4 rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <Stars rating={r.rating} size={16} />
                    <GoogleMark />
                  </div>
                  <blockquote className="flex-1 font-serif text-xl leading-snug text-cream/90 italic">“{r.text}”</blockquote>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-cream/55 uppercase">
                    {r.author}
                    {r.date && <span className="text-cream/35"> · {r.date}</span>}
                  </p>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </section>
  );
}
