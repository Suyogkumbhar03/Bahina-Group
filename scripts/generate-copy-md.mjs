import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { en } from "../src/locales/en.js"
import { mr } from "../src/locales/mr.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const escapeCell = (text) => {
  if (text === null || text === undefined) return ""
  return String(text)
    .replace(/\|/g, "\\|")
    .replace(/\n/g, "<br>")
    .replace(/\r/g, "")
}

let md = `# BAHINA GROUP — Website Bilingual Copy Review (English & Marathi)

This document contains all visible text across the BAHINA Group website for review by the director and Marathi readers.
- **English**: Simplified to a 12-year-old reading level, short active sentences (average ~7 words/sentence, max <= 15).
- **Marathi**: Natural, everyday language. Every Marathi line is marked **[Needs native review]** until approved.

| Key | English Text | Marathi Text (Needs native review) | Approved? |
| :--- | :--- | :--- | :---: |
`

const keys = Object.keys(en)

for (const key of keys) {
  const enVal = escapeCell(en[key])
  const mrVal = escapeCell(mr[key])
  md += `| \`${key}\` | ${enVal} | ${mrVal} *(needs native review)* | | \n`
}

md += `\n---\n*Generated for BAHINA Group audit. Runnable copy check: \`npm run check:copy\`*\n`

fs.writeFileSync(path.join(rootDir, "COPY.md"), md, "utf-8")
console.log("Successfully generated COPY.md with", keys.length, "keys.")
