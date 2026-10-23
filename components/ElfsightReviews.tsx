"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// Elfsight renders inside an open shadow root, so page CSS can't reach it. We inject this
// stylesheet into that root instead. Selectors use Elfsight's stable `es-*` class names.
const THEME_CSS = `
.es-main-container { color: #f6ead8; font-family: Inter, system-ui, sans-serif; }

/* The section already has its own heading, rating card and review buttons. */
.es-widget-title-container, .es-header-component-top { display: none !important; }

.es-review-background-container {
  background: linear-gradient(135deg, rgb(28 18 12 / 0.85), rgb(12 9 7 / 0.75)) !important;
  border: 1px solid rgb(255 220 180 / 0.12) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06), 0 24px 60px -24px rgb(0 0 0 / 0.7) !important;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.es-review-background-container:hover {
  border-color: rgb(242 180 90 / 0.45) !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06), 0 0 44px -12px rgb(242 180 90 / 0.5) !important;
}

.es-review-author-name {
  color: #f6ead8 !important;
  font-family: Syne, system-ui, sans-serif !important;
  font-weight: 700 !important;
}
.es-review-info-date {
  color: rgb(246 234 216 / 0.5) !important;
  font-family: "JetBrains Mono", ui-monospace, monospace !important;
  font-size: 11px !important;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.es-review-content, .es-text-shortener { color: rgb(246 234 216 / 0.82) !important; }
.es-text-shortener-control {
  color: #f2b45a !important;
  font-family: "JetBrains Mono", ui-monospace, monospace !important;
  font-size: 11px !important;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.es-rating-item-filled, .es-rating-item-filled * { color: #f2b45a !important; fill: #f2b45a !important; }
.es-rating-item-unfilled, .es-rating-item-unfilled * { color: rgb(255 255 255 / 0.15) !important; fill: rgb(255 255 255 / 0.15) !important; }
.es-rating-item-filled svg { filter: drop-shadow(0 0 4px rgb(242 180 90 / 0.6)); }

.es-reviews-images-image-container, .es-reviews-images-image { border-radius: 14px !important; }
.es-avatar-container { box-shadow: 0 0 0 1px rgb(242 180 90 / 0.4); border-radius: 50%; }

.es-carousel-arrow-control {
  background: rgb(20 14 10 / 0.85) !important;
  color: #f2b45a !important;
  border: 1px solid rgb(242 180 90 / 0.4) !important;
  box-shadow: 0 0 20px -6px rgb(242 180 90 / 0.6) !important;
  backdrop-filter: blur(10px);
}
.es-carousel-arrow-control:hover { background: #f2b45a !important; color: #0c0907 !important; }
.es-carousel-arrow-control * { color: inherit !important; fill: currentColor !important; }

/* Dozens of dots for 60 reviews is noise; the arrows are enough. */
.es-bullets-control-container { display: none !important; }
.es-skeleton-loader { background: rgb(255 255 255 / 0.06) !important; }
`;

export function ElfsightReviews({ widgetId }: { widgetId: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [themed, setThemed] = useState(false);

  useEffect(() => {
    setThemed(false);
    // The shadow root appears once Elfsight's script has rendered; poll briefly until it does.
    const id = setInterval(() => {
      const root = hostRef.current?.querySelector(".es-embed-root")?.shadowRoot;
      if (!root) return;
      if (!root.getElementById("yc-theme")) {
        const style = document.createElement("style");
        style.id = "yc-theme";
        style.textContent = THEME_CSS;
        root.appendChild(style);
      }
      setThemed(true);
      clearInterval(id);
    }, 250);
    const stop = setTimeout(() => clearInterval(id), 30_000);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, [widgetId]);

  return (
    <>
      {/* Hidden until themed, so the default light widget never flashes. */}
      <div ref={hostRef} className={`mt-6 transition-opacity duration-700 ${themed ? "opacity-100" : "opacity-0"}`}>
        <div key={widgetId} className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy />
      </div>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </>
  );
}
