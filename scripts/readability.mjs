/**
 * Readability Checker Script
 * Analyzes English sentences in src/locales/en.js.
 * Reports average words per sentence and flags any sentence over 22 words.
 * Fails (exit code 1) if average sentence length is above 16 words or if any sentence exceeds 22 words.
 */

import { en } from "../src/locales/en.js"

// Keys that are labels, titles, buttons, numbers, single terms, or metadata (not body sentences)
// We still analyze all multi-word body text and full statements.
const bodyKeys = Object.entries(en).filter(([key, val]) => {
  if (typeof val !== "string") return false
  // Exclude single words, email, URL, numbers, and short UI labels (< 4 words)
  const trimmed = val.trim()
  if (trimmed.includes("@") || trimmed.startsWith("www.") || trimmed.startsWith("http")) return false
  // Focus on strings that contain punctuation (., !, ?) or full sentences
  return /[.!?]/.test(trimmed) || trimmed.split(/\s+/).length > 4
})

const sentences = []

for (const [key, text] of bodyKeys) {
  // Clean newlines
  const normalized = text.replace(/[\n\r]+/g, " ").trim()
  // Split on sentence boundaries: ., !, ?, but avoid abbreviations like Pvt., Ltd., e.g., i.e.
  const rawSentences = normalized
    .replace(/(?:Pvt|Ltd|Dr|Mr|Mrs|e\.g|i\.e)\./gi, (m) => m.replace(".", "___DOT___"))
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/___DOT___/g, ".").trim())
    .filter((s) => s.length > 0)

  for (const s of rawSentences) {
    // Strip trailing punctuation and quotes for word counting
    const cleanWords = s
      .replace(/[^\w\s-]/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    if (cleanWords.length > 0) {
      sentences.push({
        key,
        text: s,
        wordCount: cleanWords.length,
      })
    }
  }
}

console.log("==================================================")
console.log("   BAHINA ENGLISH READABILITY AUDIT REPORT")
console.log("==================================================")
console.log(`Total sentences analyzed: ${sentences.length}`)

let totalWords = 0
let maxWords = 0
let longestSentence = null
const over22 = []

for (const item of sentences) {
  totalWords += item.wordCount
  if (item.wordCount > maxWords) {
    maxWords = item.wordCount
    longestSentence = item
  }
  if (item.wordCount > 22) {
    over22.push(item)
  }
}

const avgWords = (totalWords / sentences.length).toFixed(2)

console.log(`Average words per sentence: ${avgWords} (Target: <= 15, Max allowed: 16)`)
console.log(`Longest sentence: ${maxWords} words`)
if (longestSentence) {
  console.log(`   [${longestSentence.key}] "${longestSentence.text}"`)
}

let passed = true

if (parseFloat(avgWords) > 16) {
  console.error(`\n❌ FAIL: Average sentence length (${avgWords}) exceeds strict limit of 16 words!`)
  passed = false
} else {
  console.log(`\n✅ PASS: Average words per sentence (${avgWords}) is <= 16.`)
}

if (over22.length > 0) {
  console.error(`\n❌ FAIL: Found ${over22.length} sentence(s) exceeding 22 words:`)
  for (const item of over22) {
    console.error(`   - (${item.wordCount} words) [${item.key}]: "${item.text}"`)
  }
  passed = false
} else {
  console.log(`✅ PASS: No sentences exceed 22 words.`)
}

console.log("==================================================")
process.exit(passed ? 0 : 1)
