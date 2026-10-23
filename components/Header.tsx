"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import { site, telHref } from "./site";

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/menu/", label: t.nav.menu },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/#reviews", label: t.nav.reviews },
    { href: "/#book", label: t.nav.book },
    { href: "/#find-us", label: t.nav.findUs },
  ];

  // Close the mobile menu with Esc.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full py-2 pr-2 pl-4 sm:gap-4 sm:pl-5">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
          {/* Logo mark: lantern ring with a glowing core. */}
          <span className="relative grid size-7 shrink-0 place-items-center rounded-full border border-amber-glow/50">
            <span className="size-2 rounded-full bg-amber-glow shadow-[0_0_12px_3px_rgb(242_180_90/0.7)]" />
          </span>
          <span className="truncate font-display text-[13px] font-bold tracking-[0.18em] text-cream uppercase sm:text-base sm:tracking-[0.28em]">
            Yummy <span className="text-amber-glow">Ceylon</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 font-mono text-[11px] tracking-[0.2em] text-cream/70 uppercase transition hover:bg-white/5 hover:text-amber-glow"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {site.phone && (
            <a
              href={telHref(site.phone)}
              className="hidden items-center gap-2 rounded-full border border-amber-glow/40 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-amber-glow uppercase transition hover:bg-amber-glow hover:text-charcoal sm:inline-flex"
            >
              ☎ {t.nav.call}
            </a>
          )}
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.open}
            className="grid size-9 place-items-center rounded-full border border-white/15 text-cream lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute top-1.5 left-0 h-px w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Main"
          className="glass mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl p-3 lg:hidden"
          style={{ background: "linear-gradient(135deg, rgb(22 14 9 / 0.94), rgb(10 7 5 / 0.9))" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-mono text-xs tracking-[0.2em] text-cream/85 uppercase transition hover:bg-white/5 hover:text-amber-glow"
            >
              {l.label}
            </Link>
          ))}
          {site.phone && (
            <a
              href={telHref(site.phone)}
              className="mt-2 rounded-full bg-amber-glow px-4 py-3 text-center font-mono text-xs font-medium tracking-[0.2em] text-charcoal uppercase"
            >
              ☎ {t.nav.call} · {site.phone}
            </a>
          )}
        </nav>
      )}
    </header>
  );
}

