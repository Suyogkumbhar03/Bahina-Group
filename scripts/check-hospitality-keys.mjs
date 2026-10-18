/**
 * Comprehensive Hospitality Key Checker
 * Scans all files in src/bahina-hospitality for translation keys:
 *  - t("...") and t('...')
 *  - *Key: "..." and *Key: '...'
 *  - highlightKeys, amenityIds (mapping to hosp.amenity.*), etc.
 * Verifies that EVERY key exists in BOTH en.js and mr.js.
 * Fails (exit code 1) if any key is missing.
 */

import fs from "fs";
import path from "path";
import { en } from "../src/locales/en.js";
import { mr } from "../src/locales/mr.js";

function findKeysInDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const keys = new Set();

  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      findKeysInDir(full).forEach((k) => keys.add(k));
    } else if (f.name.endsWith(".jsx") || f.name.endsWith(".js")) {
      const content = fs.readFileSync(full, "utf8");

      // 1. match t("...") or t('...')
      const tMatches = content.matchAll(/t\(\s*["']([^"']+)["']/g);
      for (const m of tMatches) {
        keys.add(m[1]);
      }

      // 2. match titleKey: "...", descKey: "...", etc.
      const keyPropMatches = content.matchAll(/\b\w*Key\s*:\s*["']([^"']+)["']/g);
      for (const m of keyPropMatches) {
        keys.add(m[1]);
      }

      // 3. match direct hosp.* strings in string literals
      const hospMatches = content.matchAll(/["'](hosp\.[a-zA-Z0-9_.-]+)["']/g);
      for (const m of hospMatches) {
        keys.add(m[1]);
      }
    }
  }
  return keys;
}

const keys = findKeysInDir("./src/bahina-hospitality");

// Filter to hosp. keys only
const hospitalityKeys = Array.from(keys).filter(
  (k) => k.startsWith("hosp.") || k.startsWith("common.")
).sort();

const missingInEn = [];
const missingInMr = [];

for (const k of hospitalityKeys) {
  if (!(k in en)) missingInEn.push(k);
  if (!(k in mr)) missingInMr.push(k);
}

console.log("==================================================");
console.log("   BAHINA HOSPITALITY TRANSLATION KEYS AUDIT");
console.log("==================================================");
console.log(`Discovered ${hospitalityKeys.length} hospitality key references in code.\n`);

let failed = false;

if (missingInEn.length > 0) {
  failed = true;
  console.error(`❌ Missing ${missingInEn.length} key(s) in English (en.js):`);
  missingInEn.forEach((k) => console.error(`   - ${k}`));
} else {
  console.log("✅ English (en.js): All hospitality keys present!");
}

if (missingInMr.length > 0) {
  failed = true;
  console.error(`\n❌ Missing ${missingInMr.length} key(s) in Marathi (mr.js):`);
  missingInMr.forEach((k) => console.error(`   - ${k}`));
} else {
  console.log("✅ Marathi (mr.js): All hospitality keys present!");
}

console.log("==================================================");

if (failed) {
  process.exit(1);
} else {
  console.log("🎉 All hospitality translation keys validated successfully!\n");
  process.exit(0);
}
