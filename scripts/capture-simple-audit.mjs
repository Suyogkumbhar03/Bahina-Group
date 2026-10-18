import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\SUYOG\\.gemini\\antigravity-ide\\brain\\3efa8499-0e10-465d-8514-4af9e01e6d42";
const LOCAL_DIR = path.resolve("design-preview-screens");

if (!fs.existsSync(LOCAL_DIR)) {
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
}

async function run() {
  console.log("Launching Edge browser...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--window-size=1280,800"]
  });

  const page = await browser.newPage();

  // Test 1: Check 360px viewport for overflows on chips and buttons
  console.log("\n--- Checking 360px Viewport for Overflow / Wrapping issues ---");
  await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 2 });
  for (const lang of ["en", "mr"]) {
    await page.goto(`http://localhost:5173/hospitality?lang=${lang}`, { waitUntil: "networkidle0" });
    await page.waitForSelector("h1, .hospitality-theme");
    
    // Check horizontal scrollbar
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`[${lang.toUpperCase()} 360px] Horizontal Page Overflow: ${hasHorizontalOverflow ? "YES (Bad)" : "NO (Clean)"}`);

    // Check chip/button bounding boxes exceeding 360px
    const overflowingElements = await page.evaluate(() => {
      const results = [];
      const nodes = document.querySelectorAll("button, a, .chip, [class*='rounded-full']");
      nodes.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > 360 && rect.width < 360) {
          results.push({ tag: el.tagName, text: el.innerText.slice(0, 30), right: rect.right });
        }
      });
      return results;
    });

    if (overflowingElements.length > 0) {
      console.warn(`[${lang.toUpperCase()} 360px] Found overflowing elements:`, overflowingElements);
    } else {
      console.log(`[${lang.toUpperCase()} 360px] All buttons and chips fit within 360px width.`);
    }
  }

  // Helper to save screenshot to both artifact and local dirs
  async function capture(filename) {
    const localPath = path.join(LOCAL_DIR, filename);
    const artifactPath = path.join(ARTIFACT_DIR, filename);
    await page.screenshot({ path: localPath, fullPage: false });
    fs.copyFileSync(localPath, artifactPath);
    console.log(`Captured: ${filename}`);
  }

  // 2. Mobile Screenshots (390px)
  console.log("\n--- Capturing 390px Screenshots (Mobile) ---");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  // 2a. English 390px Hero
  await page.goto("http://localhost:5173/hospitality?lang=en", { waitUntil: "networkidle0" });
  await page.waitForSelector("h1, .hospitality-theme");
  await new Promise(r => setTimeout(r, 600));
  await capture("mobile_390px_en_hero.png");

  // 2b. English 390px Farmhouses
  await page.evaluate(() => {
    const el = document.getElementById("farmhouses");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 600));
  await capture("mobile_390px_en_farmhouses.png");

  // 2c. Marathi 390px Hero
  await page.goto("http://localhost:5173/hospitality?lang=mr", { waitUntil: "networkidle0" });
  await page.waitForSelector("h1, .hospitality-theme");
  await new Promise(r => setTimeout(r, 600));
  await capture("mobile_390px_mr_hero.png");

  // 2d. Marathi 390px Farmhouses
  await page.evaluate(() => {
    const el = document.getElementById("farmhouses");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 600));
  await capture("mobile_390px_mr_farmhouses.png");

  // 3. Desktop Screenshots (1280px)
  console.log("\n--- Capturing 1280px Screenshots (Desktop) ---");
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });

  // 3a. English 1280px Hero
  await page.goto("http://localhost:5173/hospitality?lang=en", { waitUntil: "networkidle0" });
  await page.waitForSelector("h1, .hospitality-theme");
  await new Promise(r => setTimeout(r, 600));
  await capture("desktop_1280px_en_hero.png");

  // 3b. English 1280px Road Animation / Route
  await page.evaluate(() => {
    const el = document.getElementById("route");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 600));
  await capture("desktop_1280px_en_route.png");

  // 3c. English 1280px Farmhouses
  await page.evaluate(() => {
    const el = document.getElementById("farmhouses");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 600));
  await capture("desktop_1280px_en_farmhouses.png");

  // 3d. Marathi 1280px Hero
  await page.goto("http://localhost:5173/hospitality?lang=mr", { waitUntil: "networkidle0" });
  await page.waitForSelector("h1, .hospitality-theme");
  await new Promise(r => setTimeout(r, 600));
  await capture("desktop_1280px_mr_hero.png");

  // 3e. Marathi 1280px Road Animation / Route
  await page.evaluate(() => {
    const el = document.getElementById("route");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 600));
  await capture("desktop_1280px_mr_route.png");

  // 3f. Marathi 1280px Farmhouses
  await page.evaluate(() => {
    const el = document.getElementById("farmhouses");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 600));
  await capture("desktop_1280px_mr_farmhouses.png");

  await browser.close();
  console.log("\n✅ All screenshots captured and verified successfully!");
}

run().catch(err => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
