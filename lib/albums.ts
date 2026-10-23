// Build-time album loader. Today it reads content/albums/*.json; a CMS (git-based or headless)
// only needs to produce the same Album shape here — the pages don't change.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Album } from "./album-types";

const DIR = path.join(process.cwd(), "content", "albums");

export async function getAlbums(): Promise<Album[]> {
  let files: string[];
  try {
    files = (await readdir(DIR)).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const albums = await Promise.all(
    files.map(async (file) => {
      const data = JSON.parse(await readFile(path.join(DIR, file), "utf8")) as Omit<Album, "slug">;
      const photos = (data.photos ?? []).filter((p) => p?.image);
      return { ...data, slug: file.replace(/\.json$/, ""), photos, cover: data.cover || photos[0]?.image };
    }),
  );

  // Empty albums are hidden; newest event first.
  return albums.filter((a) => a.photos.length > 0).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAlbum(slug: string) {
  return (await getAlbums()).find((a) => a.slug === slug);
}
