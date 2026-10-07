import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const frame2Dir = path.join(rootDir, 'public', 'frame2');
const publicFramesDir = path.join(rootDir, 'public', 'frames');
const rawRuralDir = path.join(rootDir, 'raw-frames-rural');
const bgJpgPath = path.join(rootDir, 'public', 'bg.jpg');

if (!fs.existsSync(frame2Dir)) {
  console.error(`Source directory ${frame2Dir} does not exist!`);
  process.exit(1);
}

// Read and sort files numerically
const frameFiles = fs.readdirSync(frame2Dir)
  .filter(f => f.match(/^ezgif-frame-\d+\.jpg$/i))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  });

console.log(`Found ${frameFiles.length} source frames in public/frame2`);
console.log(`First frame: ${frameFiles[0]}, Last frame: ${frameFiles[frameFiles.length - 1]}`);

if (frameFiles.length === 0) {
  console.error('No frame files matching ezgif-frame-*.jpg found in public/frame2');
  process.exit(1);
}

const desktopDir = path.join(publicFramesDir, 'desktop');
const mobileDir = path.join(publicFramesDir, 'mobile');

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

async function build() {
  console.log('\n--- 1. Building bg.jpg (First frame as JPG under 300KB) ---');
  const firstFramePath = path.join(frame2Dir, frameFiles[0]);
  const lastFramePath = path.join(frame2Dir, frameFiles[frameFiles.length - 1]);

  await sharp(firstFramePath)
    .resize(1600, null, { withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(bgJpgPath);

  const bgSize = fs.statSync(bgJpgPath).size;
  console.log(`Created public/bg.jpg (${(bgSize / 1024).toFixed(1)} KB) - Target: < 300 KB`);

  console.log('\n--- 2. Building Posters (poster.webp and poster-end.webp) ---');
  const posterPath = path.join(publicFramesDir, 'poster.webp');
  const posterEndPath = path.join(publicFramesDir, 'poster-end.webp');

  await sharp(firstFramePath)
    .resize(1400, null, { withoutEnlargement: true })
    .webp({ quality: 75, effort: 5 })
    .toFile(posterPath);

  await sharp(lastFramePath)
    .resize(1400, null, { withoutEnlargement: true })
    .webp({ quality: 75, effort: 5 })
    .toFile(posterEndPath);

  console.log(`Created poster.webp (${(fs.statSync(posterPath).size / 1024).toFixed(1)} KB)`);
  console.log(`Created poster-end.webp (${(fs.statSync(posterEndPath).size / 1024).toFixed(1)} KB)`);

  console.log('\n--- 3. Building Desktop Frames (All frames, width 1400, WebP q70) ---');
  let desktopTotalBytes = 0;
  let desktopCount = 0;
  let desktopWidth = 0;
  let desktopHeight = 0;

  for (let i = 0; i < frameFiles.length; i++) {
    desktopCount++;
    const outName = `f_${String(desktopCount).padStart(4, '0')}.webp`;
    const outPath = path.join(desktopDir, outName);
    const inPath = path.join(frame2Dir, frameFiles[i]);

    await sharp(inPath)
      .resize(1400, null, { withoutEnlargement: true })
      .webp({ quality: 70, effort: 4 })
      .toFile(outPath);

    const stat = fs.statSync(outPath);
    desktopTotalBytes += stat.size;

    if (desktopCount === 1) {
      const meta = await sharp(outPath).metadata();
      desktopWidth = meta.width;
      desktopHeight = meta.height;
    }

    if (desktopCount % 30 === 0 || desktopCount === frameFiles.length) {
      console.log(`Desktop: processed ${desktopCount}/${frameFiles.length} frames (${(desktopTotalBytes / (1024 * 1024)).toFixed(2)} MB)`);
    }
  }

  // Check if desktop size exceeds 8MB; if so, compress further
  if (desktopTotalBytes > 8 * 1024 * 1024) {
    console.log(`Desktop size ${(desktopTotalBytes / (1024 * 1024)).toFixed(2)} MB exceeds 8MB! Re-compressing with q60...`);
    desktopTotalBytes = 0;
    desktopCount = 0;
    for (let i = 0; i < frameFiles.length; i++) {
      desktopCount++;
      const outName = `f_${String(desktopCount).padStart(4, '0')}.webp`;
      const outPath = path.join(desktopDir, outName);
      const inPath = path.join(frame2Dir, frameFiles[i]);

      await sharp(inPath)
        .resize(1280, null, { withoutEnlargement: true })
        .webp({ quality: 60, effort: 4 })
        .toFile(outPath);

      const stat = fs.statSync(outPath);
      desktopTotalBytes += stat.size;
    }
  }

  console.log('\n--- 4. Building Mobile Frames (Every 2nd frame, width 800, WebP q62) ---');
  let mobileTotalBytes = 0;
  let mobileCount = 0;
  let mobileWidth = 0;
  let mobileHeight = 0;

  for (let i = 0; i < frameFiles.length; i += 2) {
    mobileCount++;
    const outName = `f_${String(mobileCount).padStart(4, '0')}.webp`;
    const outPath = path.join(mobileDir, outName);
    const inPath = path.join(frame2Dir, frameFiles[i]);

    await sharp(inPath)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 62, effort: 4 })
      .toFile(outPath);

    const stat = fs.statSync(outPath);
    mobileTotalBytes += stat.size;

    if (mobileCount === 1) {
      const meta = await sharp(outPath).metadata();
      mobileWidth = meta.width;
      mobileHeight = meta.height;
    }

    if (mobileCount % 20 === 0 || i + 2 >= frameFiles.length) {
      console.log(`Mobile: processed ${mobileCount} frames (${(mobileTotalBytes / (1024 * 1024)).toFixed(2)} MB)`);
    }
  }

  // Generate version hash from first, middle and last frame content
  const hash = crypto.createHash('md5');
  hash.update(fs.readFileSync(path.join(desktopDir, 'f_0001.webp')));
  hash.update(fs.readFileSync(path.join(desktopDir, `f_${String(Math.floor(desktopCount / 2)).padStart(4, '0')}.webp`)));
  hash.update(fs.readFileSync(path.join(desktopDir, `f_${String(desktopCount).padStart(4, '0')}.webp`)));
  const version = hash.digest('hex').slice(0, 8);

  const manifest = {
    version: version,
    updatedAt: new Date().toISOString(),
    desktop: {
      count: desktopCount,
      width: desktopWidth,
      height: desktopHeight,
      pattern: 'desktop/f_%04d.webp',
      step: 1,
      totalBytes: desktopTotalBytes,
      totalMB: (desktopTotalBytes / (1024 * 1024)).toFixed(2),
    },
    mobile: {
      count: mobileCount,
      width: mobileWidth,
      height: mobileHeight,
      pattern: 'mobile/f_%04d.webp',
      step: 2,
      totalBytes: mobileTotalBytes,
      totalMB: (mobileTotalBytes / (1024 * 1024)).toFixed(2),
    },
    poster: 'poster.webp',
    posterEnd: 'poster-end.webp',
  };

  const manifestPath = path.join(publicFramesDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nCreated manifest.json with version "${version}"`);

  console.log('\n================ FINAL FRAME STATS ================');
  console.log(`Desktop: ${desktopCount} frames (${manifest.desktop.width}x${manifest.desktop.height}) = ${manifest.desktop.totalMB} MB (Target: < 8 MB)`);
  console.log(`Mobile:  ${mobileCount} frames (${manifest.mobile.width}x${manifest.mobile.height}) = ${manifest.mobile.totalMB} MB (Target: < 3 MB)`);
  console.log(`Poster: ${(fs.statSync(posterPath).size / 1024).toFixed(1)} KB`);
  console.log(`Poster End: ${(fs.statSync(posterEndPath).size / 1024).toFixed(1)} KB`);
  console.log(`Version hash: ${version}`);
  console.log('===================================================\n');

  // Move public/frame2 into /raw-frames-rural (outside public)
  console.log(`Moving public/frame2 to ${rawRuralDir} ...`);
  if (fs.existsSync(rawRuralDir)) {
    fs.rmSync(rawRuralDir, { recursive: true, force: true });
  }
  fs.renameSync(frame2Dir, rawRuralDir);
  console.log('Moved public/frame2 to raw-frames-rural successfully.');
  console.log('public/frame2 exists:', fs.existsSync(frame2Dir));

  // Verify final contents of public/frames
  const finalFiles = fs.readdirSync(publicFramesDir);
  console.log('Final contents of public/frames:', finalFiles);
}

build().catch(err => {
  console.error('Error during build:', err);
  process.exit(1);
});
