import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UA = 'BahinaHospitality/1.0 (info@bahinaa.com)';
const OUTPUT_DIR = './public/hospitality/images/places';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagesToFetch = [
  {
    id: 'radhanagari-sanctuary',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Radanagari_forest_maharashtra.jpg',
    author: 'Omkar d. chavan',
    license: 'CC BY-SA 4.0',
    license_url: 'https://creativecommons.org/licenses/by-sa/4.0',
    source_url: 'https://commons.wikimedia.org/wiki/File:Radanagari_forest_maharashtra.jpg'
  },
  {
    id: 'indian-gaur',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Indian_Bison_-_Radhanagari.jpg',
    author: 'Prasad2092',
    license: 'CC0',
    license_url: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source_url: 'https://commons.wikimedia.org/wiki/File:Indian_Bison_-_Radhanagari.jpg'
  },
  {
    id: 'radhanagari-dam',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Radhanagari_dam.jpg',
    author: 'Sajanpatil',
    license: 'CC BY-SA 4.0',
    license_url: 'https://creativecommons.org/licenses/by-sa/4.0',
    source_url: 'https://commons.wikimedia.org/wiki/File:Radhanagari_dam.jpg'
  },
  {
    id: 'kolhapur-ambabai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Ambabai_Temple%2C_Kolhapur.jpg',
    author: 'Madhavrao Bagal',
    license: 'Public Domain',
    license_url: 'https://creativecommons.org/publicdomain/mark/1.0/',
    source_url: 'https://commons.wikimedia.org/wiki/File:Ambabai_Temple,_Kolhapur.jpg'
  },
  {
    id: 'kolhapur-new-palace',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Kolhapur_New_Palace.jpg',
    author: 'Vijayshankar.munoli',
    license: 'CC BY-SA 3.0',
    license_url: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source_url: 'https://commons.wikimedia.org/wiki/File:Kolhapur_New_Palace.jpg'
  },
  {
    id: 'kolhapur-panhala',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Remotest_Rampart_on_Panhala.jpg',
    author: 'Ankur P',
    license: 'CC BY-SA 2.0',
    license_url: 'https://creativecommons.org/licenses/by-sa/2.0/',
    source_url: 'https://commons.wikimedia.org/wiki/File:Remotest_Rampart_on_Panhala.jpg'
  }
];

async function processImage(item) {
  console.log(`Downloading ${item.id} from ${item.url}...`);
  const res = await fetch(item.url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${item.url}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 1. Generate 1200px desktop version (< 200 KB)
  const masterPath = path.join(OUTPUT_DIR, `${item.id}.webp`);
  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(masterPath);

  let masterStats = fs.statSync(masterPath);
  console.log(`Saved ${masterPath} (${(masterStats.size / 1024).toFixed(1)} KB)`);

  // If size > 200KB, reduce quality
  if (masterStats.size > 200 * 1024) {
    await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 65, effort: 5 })
      .toFile(masterPath);
    masterStats = fs.statSync(masterPath);
    console.log(`Re-compressed ${masterPath} (${(masterStats.size / 1024).toFixed(1)} KB)`);
  }

  // 2. Generate 400px mobile version
  const mobilePath = path.join(OUTPUT_DIR, `${item.id}-400w.webp`);
  await sharp(buffer)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(mobilePath);

  const mobileStats = fs.statSync(mobilePath);
  console.log(`Saved ${mobilePath} (${(mobileStats.size / 1024).toFixed(1)} KB)`);
}

async function run() {
  for (const item of imagesToFetch) {
    try {
      await processImage(item);
    } catch (err) {
      console.error(`Failed ${item.id}:`, err.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  console.log('All downloads & conversions complete!');
}

run();
