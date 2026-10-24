import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yummy Ceylon · Sri Lankan restaurant in Göteborg",
  description:
    "Sri Lankesiska och svenska delikatesser under samma tak. Lunchbuffé vardagar 11–14 · Sri Lankan & Swedish food in Göteborg.",
};

// Dark browser chrome on mobile, edge-to-edge under the notch (the header pads for the safe area).
export const viewport: Viewport = {
  themeColor: "#0c0907",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap"
        />
        <link rel="preload" as="image" href={asset("/frames/frame-001.webp")} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
