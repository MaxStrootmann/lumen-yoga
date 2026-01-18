// scripts/download-instagram-feed.ts

import { writeFile } from "node:fs/promises";

async function main() {
  const url = "https://cdn.fouita.com/public/instagram-feed.js?11";

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download: ${res.status} ${res.statusText}`);
  }

  const code = await res.text();

  // Adjust path/filename as you like
  const outPath = "src/lib/instagram-feed.ts";

  // Optionally add a header comment so you know this is generated
  const header = `// Downloaded from ${url}\n// DO NOT EDIT MANUALLY\n\n`;
  await writeFile(outPath, header + code, "utf8");

  console.log(`Saved instagram feed script to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
