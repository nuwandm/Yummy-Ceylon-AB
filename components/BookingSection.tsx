"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { site, telHref } from "./site";

type RequestType = "table" | "catering" | "event";
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-cream placeholder:text-cream/35 outline-none transition focus:border-amber-glow/60 focus:shadow-[0_0_0_3px_rgb(242_180_90/0.15)]";
const label = "mb-1.5 block font-mono text-[10px] tracking-[0.25em] text-cream/55 uppercase";

// Booking / catering / private-event enquiry. Static site, so it either posts to Web3Forms
// (when site.web3formsKey is set) or opens the visitor's email app with everything filled in.
export function BookingSection() {
  const { t } = useLanguage();
  const [type, setType] = useState<RequestType>("table");
  const [status, setStatus] = useState<Status>("idle");
  const delivery = site.delivery.filter((d) => d.url);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const subject = `${t.book.types[type]} – ${data.name}${data.date ? ` – ${data.date}` : ""}`;
    const lines = [
      `${t.book.types[type]}`,
      `${t.book.name}: ${data.name}`,
      `${t.book.email}: ${data.email}`,
      data.phone && `${t.book.phone}: ${data.phone}`,
      data.date && `${t.book.date}: ${data.date} ${data.time ?? ""}`.trim(),
      data.guests && `${t.book.guests}: ${data.guests}`,
      data.message && `\n${data.message}`,
    ].filter(Boolean);

    if (!site.web3formsKey) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `Yummy Ceylon · ${subject}`,
          from_name: data.name,
          replyto: data.email,
          message: lines.join("\n"),
        }),
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
      if (json.success) e.currentTarget?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="book" className="relative bg-charcoal px-4 pt-16 pb-16 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">
          <span className="size-1.5 rounded-full bg-amber-glow [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
          {t.book.kicker}
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream sm:text-6xl">
          {t.book.title} <span className="text-glow font-serif text-[1.12em] font-semibold italic">{t.book.accent}</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/70">{t.book.intro}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-glow to-transparent" />

            <div role="radiogroup" className="flex flex-wrap gap-2">
              {(Object.keys(t.book.types) as RequestType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={type === key}
                  onClick={() => setType(key)}
                  className={`rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition ${
                    type === key
                      ? "bg-amber-glow text-charcoal shadow-[0_0_18px_-2px_rgb(242_180_90/0.8)]"
                      : "border border-white/15 text-cream/70 hover:text-cream"
                  }`}
                >
                  {t.book.types[key]}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="b-name" className={label}>{t.book.name} *</label>
                <input id="b-name" name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="b-email" className={label}>{t.book.email} *</label>
                <input id="b-email" name="email" type="email" required autoComplete="email" className={field} />
              </div>
              <div>
                <label htmlFor="b-phone" className={label}>{t.book.phone}</label>
                <input id="b-phone" name="phone" type="tel" autoComplete="tel" className={field} />
              </div>
              <div>
                <label htmlFor="b-guests" className={label}>{t.book.guests}</label>
                <input id="b-guests" name="guests" type="number" min={1} max={200} inputMode="numeric" className={field} />
              </div>
              <div>
                <label htmlFor="b-date" className={label}>{t.book.date}</label>
                <input id="b-date" name="date" type="date" className={`${field} [color-scheme:dark]`} />
              </div>
              <div>
                <label htmlFor="b-time" className={label}>{t.book.time}</label>
                <input id="b-time" name="time" type="time" min="11:00" max="19:00" className={`${field} [color-scheme:dark]`} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="b-message" className={label}>{t.book.message}</label>
                <textarea id="b-message" name="message" rows={4} placeholder={t.book.messagePlaceholder} className={field} />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-amber-glow px-6 py-3 font-mono text-xs font-medium tracking-[0.2em] text-charcoal uppercase shadow-[0_0_24px_-4px_rgb(242_180_90/0.8)] transition hover:bg-cream disabled:opacity-60"
              >
                {status === "sending" ? t.book.sending : `${t.book.submit} →`}
              </button>
              <p role="status" className="text-sm">
                {status === "sent" && <span className="text-teal-glow">{t.book.success}</span>}
                {status === "mailto" && <span className="text-teal-glow">{t.book.mailtoSuccess}</span>}
                {status === "error" && (
                  <span className="text-ember">
                    {t.book.error}{" "}
                    <a href={`mailto:${site.email}`} className="underline">
                      {site.email}
                    </a>
                  </span>
                )}
              </p>
            </div>
          </form>

          <div className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-6">
              <p className="font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">{t.book.callTitle}</p>
              {site.phone && (
                <>
                  <p className="mt-3 text-sm text-cream/65">{t.book.callText}</p>
                  <a href={telHref(site.phone)} className="mt-1 block font-display text-2xl font-bold text-cream hover:text-amber-glow">
                    {site.phone}
                  </a>
                </>
              )}
              <p className="mt-3 text-sm text-cream/65">{t.book.emailText}</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-lg text-cream hover:text-amber-glow">
                {site.email}
              </a>
            </div>

            {(site.takeaway || delivery.length > 0) && (
              <div className="glass rounded-3xl p-6">
                <p className="font-mono text-[11px] tracking-[0.3em] text-amber-glow uppercase">{t.book.takeawayTitle}</p>
                {site.takeaway && <p className="mt-3 text-sm leading-relaxed text-cream/70">{t.book.takeawayText}</p>}
                {delivery.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {delivery.map((d) => (
                      <a
                        key={d.label}
                        href={d.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-amber-glow/40 px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-amber-glow uppercase transition hover:bg-amber-glow hover:text-charcoal"
                      >
                        {t.book.orderOn} {d.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
