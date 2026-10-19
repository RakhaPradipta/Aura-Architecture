#!/usr/bin/env node

/**
 * Build-time image optimization script.
 *
 * Scans /public/images for source images (jpg, jpeg, png),
 * generates WebP variants and responsive size variants using sharp.
 *
 * Usage:
 *   node scripts/optimize-images.mjs          # optimize all images
 *   node scripts/optimize-images.mjs --dry     # preview without writing
 *
 * Output structure (alongside originals):
 *   hero.jpg              → hero.webp, hero-640.webp, hero-768.webp, ...
 *   aditya-prasetyo.jpg   → aditya-prasetyo.webp, aditya-prasetyo-640.webp, ...
 */

import { readdir, stat, mkdir } from "node:fs/promises";
import { join, extname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

// ─── Config ──────────────────────────────────────────────────────

const IMAGES_DIR = join(fileURLToPath(new URL(".", import.meta.url)), "../public/images");

/** Responsive widths to generate (px). Images smaller than a width are skipped. */
const WIDTHS = [640, 768, 1024, 1280, 1536, 1920];

/** WebP quality (0–100). 80 is a good balance of quality and size. */
const WEBP_QUALITY = 80;

/** Source extensions to process. */
const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png"]);

/** Skip these files/dirs. */
const SKIP = new Set([".gitkeep", "README.md", "optimized"]);

const isDryRun = process.argv.includes("--dry");

// ─── Helpers ─────────────────────────────────────────────────────

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP.has(entry.name)) continue;
      files.push(...(await walkDir(fullPath)));
    } else if (SOURCE_EXTS.has(extname(entry.name).toLowerCase())) {
      if (SKIP.has(entry.name)) continue;
      files.push(fullPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
  const sharp = (await import("sharp")).default;

  console.log(`\n📸 Image Optimization${isDryRun ? " (dry run)" : ""}`);
  console.log(`   Source: ${relative(process.cwd(), IMAGES_DIR)}\n`);

  const files = await walkDir(IMAGES_DIR);

  if (files.length === 0) {
    console.log("   No source images found. Add images to public/images/ and re-run.\n");
    process.exit(0);
  }

  let totalFiles = 0;
  let totalSaved = 0;

  for (const filePath of files) {
    const relPath = relative(IMAGES_DIR, filePath);
    const dir = join(IMAGES_DIR, relPath, "..");
    const ext = extname(filePath).toLowerCase();
    const name = basename(filePath, ext);

    const metadata = await sharp(filePath).metadata();
    const srcWidth = metadata.width;
    const srcSize = (await stat(filePath)).size;

    process.stdout.write(`   ${relPath} (${srcWidth}w, ${formatBytes(srcSize)})`);

    if (isDryRun) {
      console.log(" → skipped (dry run)");
      continue;
    }

    // 1. Full-size WebP (same dimensions as source)
    const fullWebpPath = join(dir, `${name}.webp`);
    await sharp(filePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(fullWebpPath);

    const fullWebpSize = (await stat(fullWebpPath)).size;
    totalFiles++;
    totalSaved += srcSize - fullWebpSize;

    // 2. Responsive variants (only if source is wider than the target)
    const responsiveWidths = WIDTHS.filter((w) => w < srcWidth);

    for (const width of responsiveWidths) {
      const variantPath = join(dir, `${name}-${width}.webp`);
      await sharp(filePath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(variantPath);

      totalFiles++;
    }

    const saving = ((1 - fullWebpSize / srcSize) * 100).toFixed(0);
    console.log(
      ` → ${responsiveWidths.length + 1} WebP variants (${saving}% smaller)`
    );
  }

  console.log(`\n   ✅ Generated ${totalFiles} WebP files`);
  if (totalSaved > 0) {
    console.log(`   💾 Estimated savings: ${formatBytes(Math.abs(totalSaved))}\n`);
  }
}

main().catch((err) => {
  console.error("❌ Optimization failed:", err.message);
  process.exit(1);
});
