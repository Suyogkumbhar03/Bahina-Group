import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Find input frames: either in raw-frames (if already moved) or public/frames
const rawDir = path.join(rootDir, 'raw-frames');
const publicFramesDir = path.join(rootDir, 'public', 'frames');

let sourceDir = '';
if (fs.existsSync(rawDir) && fs.readdirSync(rawDir).filter(f => f.endsWith('.jpg')).length > 0) {
  sourceDir = rawDir;
} else if (fs.existsSync(publicFramesDir) && fs.readdirSync(publicFramesDir).filter(f => f.endsWith('.jpg')).length > 0) {
  sourceDir = publicFramesDir;
} else {
  console.error('No source frames found in raw-frames or public/frames');
  process.exit(1);
}

console.log(`Source directory: ${sourceDir}`);

// Read and sort files numerically
const frameFiles = fs.readdirSync(sourceDir)
  .filter(f => f.match(/^ezgif-frame-\d+\.jpg$/i))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  });

console.log(`Found ${frameFiles.length} source frames (first: ${frameFiles[0]}, last: ${frameFiles[frameFiles.length - 1]})`);

if (frameFiles.length === 0) {
  console.error('No frame files matching ezgif-frame-*.jpg found');
  process.exit(1);
}

// Ensure destination directories exist
const desktopDir = path.join(publicFramesDir, 'desktop');
const mobileDir = path.join(publicFramesDir, 'mobile');

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

// Configuration targeting <12MB desktop (150 frames) and <4MB mobile (75 frames)
// 1280x720 at q58 WebP yields ~11.5 MB total for 150 frames with crisp visual quality.
// 854x480 at q60 WebP yields ~3.6 MB total for 75 frames.
const CONFIG = {
  desktop: {
    width: 1280,
    quality: 58,
    effort: 5,
    step: 2,
    dir: desktopDir,
  },
  mobile: {
    width: 854,
    quality: 60,
    effort: 5,
    step: 4,
    dir: mobileDir,
  },
};

async function processFrames() {
  console.log('\n--- Building Poster Frames ---');
  const firstFramePath = path.join(sourceDir, frameFiles[0]);
  const lastFramePath = path.join(sourceDir, frameFiles[frameFiles.length - 1]);

  const posterPath = path.join(publicFramesDir, 'poster.webp');
  const posterEndPath = path.join(publicFramesDir, 'poster-end.webp');

  await sharp(firstFramePath)
    .resize(1600, null, { withoutEnlargement: true })
    .webp({ quality: 75, effort: 5 })
    .toFile(posterPath);

  await sharp(lastFramePath)
    .resize(1600, null, { withoutEnlargement: true })
    .webp({ quality: 75, effort: 5 })
    .toFile(posterEndPath);

  const posterMeta = await sharp(posterPath).metadata();
  console.log(`Created poster.webp (${(fs.statSync(posterPath).size / 1024).toFixed(1)} KB, ${posterMeta.width}x${posterMeta.height})`);
  console.log(`Created poster-end.webp (${(fs.statSync(posterEndPath).size / 1024).toFixed(1)} KB)`);

  console.log('\n--- Building Desktop Frames (every 2nd frame) ---');
  let desktopTotalBytes = 0;
  let desktopCount = 0;
  let desktopWidth = 0;
  let desktopHeight = 0;

  for (let i = 0; i < frameFiles.length; i += CONFIG.desktop.step) {
    desktopCount++;
    const outName = `f_${String(desktopCount).padStart(4, '0')}.webp`;
    const outPath = path.join(desktopDir, outName);
    const inPath = path.join(sourceDir, frameFiles[i]);

    await sharp(inPath)
      .resize(CONFIG.desktop.width, null, { withoutEnlargement: true })
      .webp({ quality: CONFIG.desktop.quality, effort: CONFIG.desktop.effort })
      .toFile(outPath);

    const stat = fs.statSync(outPath);
    desktopTotalBytes += stat.size;

    if (desktopCount === 1) {
      const meta = await sharp(outPath).metadata();
      desktopWidth = meta.width;
      desktopHeight = meta.height;
    }

    if (desktopCount % 30 === 0 || desktopCount === 150) {
      console.log(`Desktop: processed ${desktopCount}/150 frames (${(desktopTotalBytes / (1024 * 1024)).toFixed(2)} MB)`);
    }
  }

  console.log('\n--- Building Mobile Frames (every 4th frame) ---');
  let mobileTotalBytes = 0;
  let mobileCount = 0;
  let mobileWidth = 0;
  let mobileHeight = 0;

  for (let i = 0; i < frameFiles.length; i += CONFIG.mobile.step) {
    mobileCount++;
    const outName = `f_${String(mobileCount).padStart(4, '0')}.webp`;
    const outPath = path.join(mobileDir, outName);
    const inPath = path.join(sourceDir, frameFiles[i]);

    await sharp(inPath)
      .resize(CONFIG.mobile.width, null, { withoutEnlargement: true })
      .webp({ quality: CONFIG.mobile.quality, effort: CONFIG.mobile.effort })
      .toFile(outPath);

    const stat = fs.statSync(outPath);
    mobileTotalBytes += stat.size;

    if (mobileCount === 1) {
      const meta = await sharp(outPath).metadata();
      mobileWidth = meta.width;
      mobileHeight = meta.height;
    }

    if (mobileCount % 25 === 0 || mobileCount === 75) {
      console.log(`Mobile: processed ${mobileCount}/75 frames (${(mobileTotalBytes / (1024 * 1024)).toFixed(2)} MB)`);
    }
  }

  // Create manifest.json
  const manifest = {
    desktop: {
      count: desktopCount,
      width: desktopWidth,
      height: desktopHeight,
      pattern: 'desktop/f_%04d.webp',
      step: CONFIG.desktop.step,
      totalBytes: desktopTotalBytes,
      totalMB: (desktopTotalBytes / (1024 * 1024)).toFixed(2),
    },
    mobile: {
      count: mobileCount,
      width: mobileWidth,
      height: mobileHeight,
      pattern: 'mobile/f_%04d.webp',
      step: CONFIG.mobile.step,
      totalBytes: mobileTotalBytes,
      totalMB: (mobileTotalBytes / (1024 * 1024)).toFixed(2),
    },
    poster: 'poster.webp',
    posterEnd: 'poster-end.webp',
  };

  const manifestPath = path.join(publicFramesDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nCreated manifest.json at ${manifestPath}`);

  console.log('\n================ SUMMARY ================');
  console.log(`Desktop: ${desktopCount} frames, ${manifest.desktop.width}x${manifest.desktop.height}, Total Size: ${manifest.desktop.totalMB} MB (Target: < 12 MB)`);
  console.log(`Mobile: ${mobileCount} frames, ${manifest.mobile.width}x${manifest.mobile.height}, Total Size: ${manifest.mobile.totalMB} MB (Target: < 4 MB)`);
  console.log('=========================================\n');

  // Move original JPGs to /raw-frames if source is public/frames
  if (sourceDir === publicFramesDir) {
    console.log(`Moving ${frameFiles.length} original frames to raw-frames/ ...`);
    fs.mkdirSync(rawDir, { recursive: true });
    for (const f of frameFiles) {
      fs.renameSync(path.join(publicFramesDir, f), path.join(rawDir, f));
    }
    console.log('Originals moved successfully to /raw-frames.');
  }

  // Ensure /raw-frames is in .gitignore
  const gitignorePath = path.join(rootDir, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    let gitignore = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignore.includes('/raw-frames') && !gitignore.includes('raw-frames')) {
      gitignore += '\n# Raw frame originals\n/raw-frames\n';
      fs.writeFileSync(gitignorePath, gitignore);
      console.log('Added /raw-frames to .gitignore');
    }
  }

  // Verify final contents of public/frames
  const remaining = fs.readdirSync(publicFramesDir);
  console.log('Final contents of public/frames:', remaining);
}

processFrames().catch(err => {
  console.error('Error processing frames:', err);
  process.exit(1);
});
