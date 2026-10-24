"use client";

import { useLanguage } from "./LanguageProvider";
import type { Lang } from "./translations";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "sv", label: "SV" },
];

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex rounded-full border border-white/10 bg-black/30 p-1 font-mono text-xs">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={`min-w-9 rounded-full px-2.5 py-2 tracking-widest sm:min-w-10 sm:px-3 transition-colors duration-300 ${
            lang === o.value
              ? "bg-amber-glow text-charcoal shadow-[0_0_18px_-2px_rgb(242_180_90/0.8)]"
              : "text-cream/60 hover:text-cream"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
