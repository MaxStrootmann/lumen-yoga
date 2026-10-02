// Maakt van de originele foto's in images/originals/ kleine AVIF- en WebP-varianten
// in public/images/ en schrijft de lijst met maten naar src/lib/responsive-images.ts.
// Draai opnieuw na het toevoegen of vervangen van een foto: node scripts/optimize-images.mjs
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SOURCE_DIR = join(ROOT, "images/originals");
const OUTPUT_DIR = join(ROOT, "public/images");
const MANIFEST = join(ROOT, "src/lib/responsive-images.ts");
const WIDTHS = [640, 960, 1280, 1920];

await mkdir(OUTPUT_DIR, { recursive: true });

const manifest = {};
for (const file of (await readdir(SOURCE_DIR)).sort()) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const slug = basename(file, extname(file));
  const source = sharp(join(SOURCE_DIR, file)).rotate();
  const { width, height } = await source.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(Math.min(width, WIDTHS.at(-1)));

  for (const w of [...new Set(widths)]) {
    const resized = source.clone().resize({ width: w });
    await resized.clone().avif({ quality: 55, effort: 6 }).toFile(join(OUTPUT_DIR, `${slug}-${w}.avif`));
    await resized.clone().webp({ quality: 74 }).toFile(join(OUTPUT_DIR, `${slug}-${w}.webp`));
  }
  manifest[`/images/${slug}`] = { width, height, widths: [...new Set(widths)] };
  console.log(slug, width, height, [...new Set(widths)].join(","));
}

await writeFile(
  MANIFEST,
  `// Gegenereerd door scripts/optimize-images.mjs; niet met de hand aanpassen.\n` +
    `export const RESPONSIVE_IMAGES: Record<string, { width: number; height: number; widths: number[] }> = ${JSON.stringify(manifest, null, 2)};\n`,
);
