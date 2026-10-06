/**
 * Locale Key Parity Checker
 * Compares src/locales/en.js and src/locales/mr.js.
 * Fails (exit code 1) if there are missing keys in either direction.
 */

import { en } from "../src/locales/en.js"
import { mr } from "../src/locales/mr.js"

const enKeys = Object.keys(en).sort()
const mrKeys = Object.keys(mr).sort()

const enKeySet = new Set(enKeys)
const mrKeySet = new Set(mrKeys)

const missingInMr = enKeys.filter((k) => !mrKeySet.has(k))
const missingInEn = mrKeys.filter((k) => !enKeySet.has(k))

console.log("==================================================")
console.log("   BAHINA LOCALE KEYS PARITY AUDIT REPORT")
console.log("==================================================")
console.log(`Total English (en) keys: ${enKeys.length}`)
console.log(`Total Marathi (mr) keys: ${mrKeys.length}`)

let passed = true

if (missingInMr.length > 0) {
  passed = false
  console.error(`\n❌ FAIL: ${missingInMr.length} key(s) present in en.js but missing in mr.js:`)
  for (const k of missingInMr) {
    console.error(`   - ${k}`)
  }
}

if (missingInEn.length > 0) {
  passed = false
  console.error(`\n❌ FAIL: ${missingInEn.length} key(s) present in mr.js but missing in en.js:`)
  for (const k of missingInEn) {
    console.error(`   - ${k}`)
  }
}

if (passed) {
  console.log("\n✅ PASS: Perfect 1-to-1 key parity between en.js and mr.js!")
  console.log(`All ${enKeys.length} translation keys match exactly.`)
}

console.log("==================================================")
process.exit(passed ? 0 : 1)
