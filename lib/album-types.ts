import type { Lang } from "@/components/translations";

// Shape of content/albums/<slug>.json. Kept flat (title_en / title_sv …) so a git-based CMS
// can edit it with plain form fields.
export type AlbumPhoto = {
  image: string;
  caption_en?: string;
  caption_sv?: string;
};

export type Album = {
  slug: string;
  date: string; // YYYY-MM-DD
  title_en: string;
  title_sv: string;
  description_en?: string;
  description_sv?: string;
  cover?: string;
  photos: AlbumPhoto[];
};

/** Picks the field for the active language, falling back to the other one if it's empty. */
export function localized<T extends object>(obj: T, field: string, lang: Lang): string {
  const record = obj as Record<string, unknown>;
  const other: Lang = lang === "en" ? "sv" : "en";
  return String(record[`${field}_${lang}`] || record[`${field}_${other}`] || "");
}

export function formatAlbumDate(date: string, lang: Lang) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(lang === "sv" ? "sv-SE" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
