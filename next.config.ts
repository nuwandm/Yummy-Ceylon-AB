import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Sub-path when hosted at e.g. https://<user>.github.io/<repo>/ — set by the deploy workflow.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
  // Emit /gallery/<slug>/index.html so album pages work on any static host.
  trailingSlash: true,
  // Lets the dev server be opened from other devices on the LAN (e.g. a phone).
  allowedDevOrigins: ["192.168.1.100", "192.168.1.*"],
};

export default nextConfig;
