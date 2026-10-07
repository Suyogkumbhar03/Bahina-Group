import fs from "fs"
import path from "path"
import { en } from "../src/locales/en.js"
import { mr } from "../src/locales/mr.js"

const keys = Object.keys(en).sort()

let content = `# BAHINA GROUP — Website Bilingual Copy Review (English & Marathi)

This document contains all visible text across the BAHINA Group website for review by the director and native Marathi speakers.
- **English**: Simplified to a 12-year-old reading level, short active sentences (average ~7 words/sentence, max <= 15).
- **Marathi**: Natural, everyday language using polite conversational tone ("आपण" and "आम्ही"). Every Marathi line is marked **needs native review** until approved.

| Key | English Text | Marathi Text (needs native review) | Approved? |
| :--- | :--- | :--- | :---: |
`

for (const k of keys) {
  const enVal = (en[k] || "").replace(/\n/g, " ").replace(/\|/g, "\\|")
  const mrVal = (mr[k] || "").replace(/\n/g, " ").replace(/\|/g, "\\|")
  content += `| \`${k}\` | ${enVal} | ${mrVal} *(needs native review)* | | \n`
}

fs.writeFileSync(path.resolve("COPY.md"), content, "utf-8")
console.log(`Generated COPY.md with ${keys.length} keys. All Marathi lines marked "needs native review".`)
