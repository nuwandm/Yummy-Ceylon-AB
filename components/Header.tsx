import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-5">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo mark: lantern ring with a glowing core. */}
          <span className="relative grid size-7 place-items-center rounded-full border border-amber-glow/50">
            <span className="size-2 rounded-full bg-amber-glow shadow-[0_0_12px_3px_rgb(242_180_90/0.7)]" />
          </span>
          <span className="font-display text-sm font-bold tracking-[0.28em] text-cream uppercase sm:text-base">
            Yummy <span className="text-amber-glow">Ceylon</span>
          </span>
        </Link>
        <LanguageToggle />
      </div>
    </header>
  );
}
