// Converts screens/*.png to public/frames/*.webp, dropping consecutive duplicate frames.
import { createHash } from "node:crypto";
import { readdir, readFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "screens";
const OUT = "public/frames";

const files = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

let prevHash = null;
let count = 0;
for (const file of files) {
  const buf = await readFile(path.join(SRC, file));
  const hash = createHash("md5").update(buf).digest("hex");
  if (hash === prevHash) continue;
  prevHash = hash;
  count++;
  const name = `frame-${String(count).padStart(3, "0")}.webp`;
  await sharp(buf).webp({ quality: 78 }).toFile(path.join(OUT, name));
}

// Frame count is read by the app at build time.
await writeFile("components/frames.json", JSON.stringify({ count }, null, 2) + "\n");
console.log(`${files.length} source frames -> ${count} unique webp frames in ${OUT}`);
