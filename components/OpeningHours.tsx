"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { site } from "./site";

// Current weekday (1 = Mon … 7 = Sun) and "HH:MM" in the restaurant's time zone.
function nowInRestaurant() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday")) + 1;
  return { day, time: `${get("hour")}:${get("minute")}` };
}

export function OpeningHours() {
  const { t } = useLanguage();
  // Computed after mount so server and client HTML match.
  const [now, setNow] = useState<{ day: number; time: string } | null>(null);

  useEffect(() => {
    const tick = () => setNow(nowInRestaurant());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const today = now && site.openingHours.find((h) => h.day === now.day);
  const isOpen = !!today && now!.time >= today.open && now!.time < today.close;

  return (
    <div
      className="glass relative overflow-hidden rounded-3xl p-6"
      // Darker than the default glass so the rows stay readable over bright lanterns.
      style={{ background: "linear-gradient(135deg, rgb(22 14 9 / 0.9), rgb(10 7 5 / 0.82))" }}
    >
      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-glow to-transparent" />
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">{t.hours.title}</p>
        {today && (
          <span
            className={`flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] uppercase ${
              isOpen ? "border-teal-glow/40 text-teal-glow" : "border-white/15 text-cream/60"
            }`}
          >
            <span className={`size-1.5 rounded-full ${isOpen ? "bg-teal-glow shadow-[0_0_8px_var(--color-teal-glow)]" : "bg-cream/40"}`} />
            {isOpen ? t.hours.openNow : t.hours.closedNow}
          </span>
        )}
      </div>

      <ul className="mt-5 space-y-1">
        {site.openingHours.map((h) => {
          const isToday = now?.day === h.day;
          return (
            <li
              key={h.day}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                isToday ? "bg-amber-glow/10 text-cream shadow-[inset_0_0_0_1px_rgb(242_180_90/0.35)]" : "text-cream/75"
              }`}
            >
              <span className={isToday ? "font-medium text-amber-glow" : ""}>{t.hours.days[h.day - 1]}</span>
              <span className="font-mono text-[13px] tabular-nums">
                {h.open} – {h.close}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-teal-glow/80">
        * {t.hours.lunchNote} {site.lunchHours}
      </p>
    </div>
  );
}
