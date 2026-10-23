// Builds placeholder album photos from the walk-in frames into public/albums/<slug>/.
// Only for demo content — real albums are added through content/albums/*.json (later via the CMS).
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const W = 752, H = 416;
const left = { left: 0, top: 0, width: 420, height: H };
const right = { left: W - 420, top: 0, width: 420, height: H };
const low = { left: 0, top: 150, width: W, height: H - 150 };
const square = { left: 168, top: 0, width: H, height: H };

// [frame, crop?]
const albums = {
  "opening-night": [[1], [12], [25, left], [40], [55, square], [70, right], [85]],
  "avurudu-2026": [[181], [181, low], [150, right], [165, square], [120], [135, left], [100, right], [175]],
  "christmas-2025": [[130], [130, square], [140, low], [95, left], [110], [181, right]],
};

for (const [slug, shots] of Object.entries(albums)) {
  const dir = `public/albums/${slug}`;
  await mkdir(dir, { recursive: true });
  let n = 0;
  for (const [frame, crop] of shots) {
    let img = sharp(`screens/ezgif-frame-${String(frame).padStart(3, "0")}.png`);
    if (crop) img = img.extract(crop);
    await img.webp({ quality: 82 }).toFile(`${dir}/${String(++n).padStart(2, "0")}.webp`);
  }
  console.log(`${slug}: ${n} photos`);
}
