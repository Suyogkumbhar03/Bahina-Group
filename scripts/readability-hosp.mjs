/**
 * BAHINA Hospitality - Readability and Simplicity Audit
 *
 * Rules:
 * - English sentences: Max 12 words per sentence.
 * - English banned words: retreat, unwind, curated, immersive, escape, serene,
 *   unhurried, basin, foothills, getaway, premium, bespoke, seamless,
 *   accommodation, explore, tranquil, nestled.
 * - No uppercase text blocks.
 * - Marathi sentences: Max 14 words per sentence.
 * - Average words per sentence: Target <= 9 words.
 */

import { hospitalityEn } from "../src/bahina-hospitality/locales/en.js";
import { hospitalityMr } from "../src/bahina-hospitality/locales/mr.js";

const BANNED_REGEX = /\b(retreat|retreats|unwind|unwinds|curated|curate|curating|immersive|escape|escapes|serene|serenity|unhurried|basin|basins|foothill|foothills|getaway|getaways|premium|bespoke|seamless|seamlessly|accommodation|accommodations|explore|explores|exploring|tranquil|tranquility|nestled|nestle)\b/i;

const ALLOWED_ACRONYMS = new Set(["BAHINA", "UNESCO", "GST", "ID", "AM", "PM", "EN", "MR", "B2B", "COVID"]);

function isAllUppercaseBlock(text) {
  const trimmed = text.trim();
  if (trimmed.length <= 4) return false;
  if (!/[a-z]/i.test(trimmed)) return false;
  if (ALLOWED_ACRONYMS.has(trimmed)) return false;

  // Check if string contains all-caps words forming a block (> 1 word all caps)
  const words = trimmed.split(/[\s•·|,-]+/).map(w => w.trim()).filter(w => w.length > 1 && /[A-Z]/.test(w));
  if (words.length >= 2) {
    const allUpper = words.every(w => w === w.toUpperCase() && !ALLOWED_ACRONYMS.has(w));
    if (allUpper) return true;
  }

  // Pure all-caps check
  if (trimmed === trimmed.toUpperCase() && /[A-Z]{5,}/.test(trimmed) && !ALLOWED_ACRONYMS.has(trimmed)) {
    return true;
  }

  return false;
}

function splitSentences(text, isMarathi = false) {
  if (!text || typeof text !== "string") return [];
  // Normalize dots in abbreviations and numbers like 46 km., 351.16, e.g.
  const protectedText = text
    .replace(/(?:Pvt|Ltd|Dr|Mr|Mrs|e\.g|i\.e|approx|sq\.?\s*km)\./gi, (m) => m.replace(".", "___DOT___"))
    .replace(/(\d+)\.(\d+)/g, "$1___DOT___$2")
    .replace(/(\d+)\s*km\./gi, "$1 km___DOT___");

  // Split on sentence boundaries: . ! ? | \n ।
  const regex = isMarathi ? /(?<=[.!?।\n])\s+/ : /(?<=[.!?\n])\s+/;
  return protectedText
    .split(regex)
    .map(s => s.replace(/___DOT___/g, ".").trim())
    .filter(s => s.length > 0);
}

function countWords(sentence) {
  return sentence
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

console.log("==================================================");
console.log("   BAHINA HOSPITALITY READABILITY AUDIT (check:simple)");
console.log("==================================================");

let enFailures = 0;
let mrFailures = 0;

// 1. Audit English
console.log("\n--- AUDITING ENGLISH STRINGS (en.js) ---");
const enSentences = [];
let totalEnWords = 0;

for (const [key, val] of Object.entries(hospitalityEn)) {
  if (typeof val !== "string") continue;
  const trimmed = val.trim();
  if (!trimmed) continue;

  // Rule A: Banned marketing jargon words
  const matchBanned = trimmed.match(BANNED_REGEX);
  if (matchBanned) {
    console.error(`❌ BANNED WORD: [${key}] contains "${matchBanned[0]}": "${trimmed}"`);
    enFailures++;
  }

  // Rule B: Uppercase text blocks
  if (isAllUppercaseBlock(trimmed)) {
    console.error(`❌ UPPERCASE BLOCK: [${key}] "${trimmed}"`);
    enFailures++;
  }

  // Rule C: Sentence length <= 12 words
  const parts = splitSentences(trimmed, false);
  for (const s of parts) {
    const wc = countWords(s);
    if (wc > 0) {
      enSentences.push({ key, text: s, wordCount: wc });
      totalEnWords += wc;
      if (wc > 12) {
        console.error(`❌ SENTENCE > 12 WORDS (${wc} words): [${key}] "${s}"`);
        enFailures++;
      }
    }
  }
}

const avgEnWords = enSentences.length > 0 ? (totalEnWords / enSentences.length).toFixed(2) : 0;
console.log(`\nEnglish Sentences Analyzed: ${enSentences.length}`);
console.log(`English Total Words: ${totalEnWords}`);
console.log(`English Average Words/Sentence: ${avgEnWords} (Target: <= 9.0)`);
if (Number(avgEnWords) > 9.0) {
  console.warn(`⚠️ WARNING: Average words per sentence (${avgEnWords}) is above target 9.0!`);
}

// 2. Audit Marathi
console.log("\n--- AUDITING MARATHI STRINGS (mr.js) ---");
const mrSentences = [];
let totalMrWords = 0;

for (const [key, val] of Object.entries(hospitalityMr)) {
  if (typeof val !== "string") continue;
  const trimmed = val.trim();
  if (!trimmed) continue;

  // Sentence length <= 14 words
  const parts = splitSentences(trimmed, true);
  for (const s of parts) {
    const wc = countWords(s);
    if (wc > 0) {
      mrSentences.push({ key, text: s, wordCount: wc });
      totalMrWords += wc;
      if (wc > 14) {
        console.error(`❌ MARATHI SENTENCE > 14 WORDS (${wc} words): [${key}] "${s}"`);
        mrFailures++;
      }
    }
  }
}

const avgMrWords = mrSentences.length > 0 ? (totalMrWords / mrSentences.length).toFixed(2) : 0;
console.log(`\nMarathi Sentences Analyzed: ${mrSentences.length}`);
console.log(`Marathi Total Words: ${totalMrWords}`);
console.log(`Marathi Average Words/Sentence: ${avgMrWords} (Target: <= 9.0)`);
if (Number(avgMrWords) > 9.0) {
  console.warn(`⚠️ WARNING: Average Marathi words per sentence (${avgMrWords}) is above target 9.0!`);
}

console.log("\n==================================================");
console.log(`AUDIT RESULTS: English Failures = ${enFailures}, Marathi Failures = ${mrFailures}`);
console.log("==================================================");

if (enFailures > 0 || mrFailures > 0) {
  console.error(`\nReadability audit failed with ${enFailures + mrFailures} total errors!`);
  process.exit(1);
} else {
  console.log("\n🎉 ALL READABILITY AUDITS PASSED WITH 0 FAILURES!");
  process.exit(0);
}
