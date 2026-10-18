import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const USER_UPLOADED_DIR = 'C:/Users/SUYOG/.gemini/antigravity-ide/brain/26330acf-925b-42d5-8cee-d97d44ecaecd/.user_uploaded/';
const OUTPUT_DIR = './public/hospitality/images/places';

const images = [
  {
    file: 'media_1792305119560.jpg',
    id: 'rautwadi-waterfall',
    name: 'Rautwadi Waterfall',
  },
  {
    file: 'media_1792305119669.jpg',
    id: 'shivrai-sada',
    name: 'Shivrai Sada Plateau',
  },
  {
    file: 'media_1792305119694.jpg',
    id: 'kalammawadi-dam',
    name: 'Kalammawadi (Dudhganga) Dam',
  },
];

async function run() {
  for (const img of images) {
    const inputPath = path.join(USER_UPLOADED_DIR, img.file);
    const meta = await sharp(inputPath).metadata();
    console.log(`\nProcessing ${img.id} (${img.file}): original ${meta.width}x${meta.height}, format: ${meta.format}`);

    // Desktop version (target width 1200 or native max)
    const masterPath = path.join(OUTPUT_DIR, `${img.id}.webp`);
    const targetWidth = Math.max(meta.width, 1000);
    await sharp(inputPath)
      .resize({ width: targetWidth, kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 82, effort: 5 })
      .toFile(masterPath);

    let masterStats = fs.statSync(masterPath);
    console.log(`Saved master: ${masterPath} (${(masterStats.size / 1024).toFixed(1)} KB)`);

    if (masterStats.size > 200 * 1024) {
      await sharp(inputPath)
        .resize({ width: targetWidth, kernel: sharp.kernel.lanczos3 })
        .webp({ quality: 65, effort: 5 })
        .toFile(masterPath);
      masterStats = fs.statSync(masterPath);
      console.log(`Re-compressed master: ${masterPath} (${(masterStats.size / 1024).toFixed(1)} KB)`);
    }

    // Mobile version (400px wide, < 50 KB)
    const mobilePath = path.join(OUTPUT_DIR, `${img.id}-400w.webp`);
    await sharp(inputPath)
      .resize({ width: 400, kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 80, effort: 4 })
      .toFile(mobilePath);

    let mobileStats = fs.statSync(mobilePath);
    console.log(`Saved mobile: ${mobilePath} (${(mobileStats.size / 1024).toFixed(1)} KB)`);

    if (mobileStats.size > 50 * 1024) {
      await sharp(inputPath)
        .resize({ width: 400, kernel: sharp.kernel.lanczos3 })
        .webp({ quality: 70, effort: 4 })
        .toFile(mobilePath);
      mobileStats = fs.statSync(mobilePath);
      console.log(`Re-compressed mobile: ${mobilePath} (${(mobileStats.size / 1024).toFixed(1)} KB)`);
    }
  }
}

run().catch(console.error);
