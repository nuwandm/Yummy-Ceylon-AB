"use client";

import Link from "next/link";
import { Atmosphere } from "./Atmosphere";
import { Backdrop } from "./Backdrop";
import { Header } from "./Header";
import { useLanguage } from "./LanguageProvider";
import { menu } from "./menu";
import { site } from "./site";

export function MenuView() {
  const { t, lang } = useLanguage();
  const { buffet } = site;

  return (
    <>
      <Backdrop />
      <Atmosphere />
      <Header />

      <main className="px-4 pt-36 pb-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">
            <span className="size-1.5 rounded-full bg-amber-glow [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
            {t.menuPage.kicker}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream sm:text-6xl">
            {t.menuPage.title} <span className="text-glow font-serif text-[1.12em] font-semibold italic">{t.menuPage.accent}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/70">{t.menuPage.intro}</p>

          {/* Category jump links, pinned under the header while scrolling. */}
          <nav className="sticky top-24 z-30 mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2">
              {[{ id: "buffet", title: { en: t.menuPage.buffetTitle, sv: t.menuPage.buffetTitle } }, ...menu].map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="glass block rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em] whitespace-nowrap text-cream/80 uppercase transition hover:text-amber-glow"
                  >
                    {c.title[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Buffet */}
          <section id="buffet" className="glass relative mt-10 overflow-hidden rounded-3xl p-6 sm:p-8">
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-glow to-transparent" />
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="font-display text-3xl font-bold text-cream">{t.menuPage.buffetTitle}</h2>
                <p className="mt-2 font-mono text-xs tracking-[0.2em] text-teal-glow/80 uppercase">
                  {t.menuPage.buffetDays} · {site.lunchHours}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-3 md:w-[420px]">
                {[
                  { label: t.lunch.adults, price: buffet.adult, drink: buffet.adultWithDrink },
                  { label: t.lunch.kids, price: buffet.kid, drink: buffet.kidWithDrink },
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
              </dl>
            </div>
          </section>

          {menu.map((category) => (
            <section key={category.id} id={category.id} className="mt-16">
              <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">{category.title[lang]}</h2>
              {category.intro && <p className="mt-2 max-w-2xl text-cream/65">{category.intro[lang]}</p>}
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {category.dishes.map((dish) => (
                  <li
                    key={dish.name.en}
                    className="glass group relative overflow-hidden rounded-2xl p-5 transition hover:shadow-[inset_0_0_0_1px_rgb(242_180_90/0.45),0_0_40px_-14px_rgb(242_180_90/0.5)]"
                  >
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-lg font-bold text-cream">{dish.name[lang]}</h3>
                      {/* Dotted leader to the price, like a printed menu. */}
                      <span className="flex-1 border-b border-dotted border-white/15" />
                      {dish.price !== undefined && (
                        <span className="font-mono text-sm text-amber-glow tabular-nums">{dish.price} kr</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-cream/65">{dish.description[lang]}</p>
                    {dish.vegetarian && (
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-teal-glow/35 px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] text-teal-glow uppercase">
                        🌿 {t.menuPage.vegetarian}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="glass mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="space-y-2 text-sm text-cream/75">
              <p>⚠ {t.menuPage.allergens}</p>
              {menu.some((c) => c.dishes.some((d) => d.price === undefined)) && <p className="text-cream/55">{t.menuPage.priceNote}</p>}
            </div>
            <Link
              href="/#book"
              className="shrink-0 rounded-full bg-amber-glow px-6 py-3 font-mono text-xs font-medium tracking-[0.2em] text-charcoal uppercase shadow-[0_0_24px_-4px_rgb(242_180_90/0.8)] transition hover:bg-cream"
            >
              {t.menuPage.cta} →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
