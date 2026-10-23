// Prefixes a /public file path with the deploy sub-path (e.g. "/yummy-ceylon" on GitHub Pages).
// next/link adds basePath itself; plain <img>, <link> and canvas loads need this.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => (path.startsWith("/") ? `${BASE_PATH}${path}` : path);
