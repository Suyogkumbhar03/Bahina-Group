/**
 * Hospitality Image Builder Script
 * Uses sharp to generate optimized WebP variants from source images in public/hospitality/images/
 * Generates responsive sizes: 640w, 1024w, 1600w, 2400w
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const SOURCE_DIR = "./public/hospitality/images";
const TARGET_WIDTHS = [640, 1024, 1600, 2400];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
  if (filePath.includes("-640w") || filePath.includes("-1024w") || filePath.includes("-1600w") || filePath.includes("-2400w")) return;

  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const metadata = await sharp(filePath).metadata();

  console.log(`Processing: ${filePath} (${metadata.width}x${metadata.height})`);

  for (const width of TARGET_WIDTHS) {
    if (metadata.width && metadata.width < width * 0.7) {
      continue; // Don't upscale tiny images
    }

    const targetPath = path.join(dir, `${baseName}-${width}w.webp`);
    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(targetPath);

    console.log(`   -> Generated: ${targetPath}`);
  }

  // Also generate 1:1 master WebP
  const masterWebp = path.join(dir, `${baseName}.webp`);
  await sharp(filePath)
    .webp({ quality: 85, effort: 4 })
    .toFile(masterWebp);
  console.log(`   -> Generated master: ${masterWebp}`);
}

async function walkAndProcess(dir) {
  await ensureDir(dir);
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkAndProcess(fullPath);
    } else {
      try {
        await processImage(fullPath);
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err.message);
      }
    }
  }
}

async function run() {
  console.log("==================================================");
  console.log("   BAHINA HOSPITALITY IMAGE BUILDER");
  console.log("==================================================");
  await ensureDir(SOURCE_DIR);
  await walkAndProcess(SOURCE_DIR);
  console.log("\n✅ Image processing complete!");
}

run();
