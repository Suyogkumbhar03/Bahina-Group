import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../design-preview-screens/full-page-audits");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const viewports = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 1024, isMobile: true },
  { name: "1280", width: 1280, height: 800, isMobile: false },
  { name: "1920", width: 1920, height: 1080, isMobile: false },
];

const languages = ["mr", "en"];

async function main() {
  console.log("Launching Edge from:", EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  let allPass = true;

  for (const lang of languages) {
    for (const vp of viewports) {
      console.log(`\n======================================================`);
      console.log(`Auditing: Lang=${lang.toUpperCase()}, Viewport=${vp.name}px (${vp.width}x${vp.height})`);
      console.log(`======================================================`);

      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1.5,
        isMobile: vp.isMobile,
      });

      const url = `http://localhost:5173/hospitality?lang=${lang}&skip=1`;
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      // Ensure language is stored
      await page.evaluate((l) => {
        try {
          localStorage.setItem("bahina_lang", l);
        } catch (e) {}
      }, lang);

      // Smooth scroll down the page to trigger tickers, observer, road animation
      await page.evaluate(async () => {
        const totalHeight = document.body.scrollHeight;
        const step = 400;
        for (let current = 0; current < totalHeight; current += step) {
          window.scrollTo(0, current);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 200));
      });

      // Verify DOM for raw keys
      const rawKeyMatches = await page.evaluate(() => {
        const text = document.body.innerText || "";
        const matches = text.match(/\b(hosp\.[a-zA-Z0-9_.-]+|common\.[a-zA-Z0-9_.-]+)\b/g);
        return matches ? Array.from(new Set(matches)) : [];
      });

      if (rawKeyMatches.length > 0) {
        console.error(`❌ Raw keys found in UI (${lang}, ${vp.name}px):`, rawKeyMatches);
        allPass = false;
      } else {
        console.log(`✅ No raw keys found in UI.`);
      }

      // Verify sections are non-empty and visible
      const sectionChecks = await page.evaluate(() => {
        const ids = [
          "about-radhanagari",
          "things-to-see",
          "wildlife",
          "kolhapuri-chav",
          "farmhouses",
          "amenities",
          "how",
          "faq",
        ];
        const results = [];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) {
            results.push({ id, exists: false, visible: false, height: 0 });
          } else {
            const rect = el.getBoundingClientRect();
            const textLen = (el.innerText || "").trim().length;
            results.push({
              id,
              exists: true,
              visible: el.offsetHeight > 50,
              height: el.offsetHeight,
              textLen,
            });
          }
        }
        return results;
      });

      let sectionsOk = true;
      for (const s of sectionChecks) {
        if (!s.exists || !s.visible || s.textLen < 20) {
          console.error(`❌ Section #${s.id} issue: exists=${s.exists}, height=${s.height}, textLen=${s.textLen}`);
          sectionsOk = false;
          allPass = false;
        }
      }
      if (sectionsOk) {
        console.log(`✅ All ${sectionChecks.length} key sections exist, populated, and visible.`);
      }

      // Capture full-page screenshot
      const ssPath = path.join(outputDir, `fullpage-${vp.name}-${lang}.png`);
      await page.screenshot({ path: ssPath, fullPage: true });
      console.log(`📸 Saved screenshot: ${path.basename(ssPath)} (${(fs.statSync(ssPath).size / 1024).toFixed(1)} KB)`);
    }
  }

  await browser.close();

  if (allPass) {
    console.log("\n======================================================");
    console.log("🎉 AUDIT PASSED: All resolutions & languages verified!");
    console.log("======================================================");
    process.exit(0);
  } else {
    console.error("\n❌ AUDIT FAILED: Issues found in UI rendering.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
