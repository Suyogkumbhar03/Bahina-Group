import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:5173";
const OUTPUT_DIR = "C:\\Users\\SUYOG\\.gemini\\antigravity-ide\\brain\\26330acf-925b-42d5-8cee-d97d44ecaecd\\screenshots";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  async function shot(name, clipOrFull = {}) {
    const filePath = path.join(OUTPUT_DIR, `${name}.png`);
    await page.screenshot({ path: filePath, ...clipOrFull });
    console.log(`Saved: ${name}.png`);
  }

  // 1. DESKTOP 1280px - ENGLISH
  console.log("\n--- Desktop 1280px EN ---");
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/hospitality?lang=en`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  // Navbar on Hero (Desktop EN)
  await shot("desktop_en_nav_hero", { clip: { x: 0, y: 0, width: 1280, height: 420 } });

  // Scroll to Light Section (#about-radhanagari)
  await page.evaluate(() => {
    const el = document.getElementById("about-radhanagari");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  // Navbar scrolled on Light Section (Desktop EN)
  await shot("desktop_en_nav_scrolled_light", { clip: { x: 0, y: 0, width: 1280, height: 420 } });

  // Scroll to Places Section (#things-to-see)
  await page.evaluate(() => {
    const el = document.getElementById("things-to-see");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 800));
  // Places Section (Desktop EN)
  await shot("desktop_en_places_section", { clip: { x: 0, y: 0, width: 1280, height: 800 } });

  // 2. DESKTOP 1280px - MARATHI
  console.log("\n--- Desktop 1280px MR ---");
  await page.goto(`${BASE_URL}/hospitality?lang=mr`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  // Navbar on Hero (Desktop MR)
  await shot("desktop_mr_nav_hero", { clip: { x: 0, y: 0, width: 1280, height: 420 } });

  // Scroll to Light Section (#about-radhanagari)
  await page.evaluate(() => {
    const el = document.getElementById("about-radhanagari");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  // Navbar scrolled on Light Section (Desktop MR)
  await shot("desktop_mr_nav_scrolled_light", { clip: { x: 0, y: 0, width: 1280, height: 420 } });

  // Scroll to Places Section (#things-to-see)
  await page.evaluate(() => {
    const el = document.getElementById("things-to-see");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 800));
  // Places Section (Desktop MR)
  await shot("desktop_mr_places_section", { clip: { x: 0, y: 0, width: 1280, height: 800 } });

  // 3. MOBILE 390px - ENGLISH
  console.log("\n--- Mobile 390px EN ---");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/hospitality?lang=en`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  // Navbar on Hero (Mobile EN)
  await shot("mobile_en_nav_hero", { clip: { x: 0, y: 0, width: 390, height: 320 } });

  // Open Mobile Menu (Mobile EN)
  await page.evaluate(() => {
    const btn = document.querySelector('header button[aria-haspopup="dialog"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await shot("mobile_en_menu_open", { clip: { x: 0, y: 0, width: 390, height: 600 } });
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));

  // Scroll to Places Section (Mobile EN)
  await page.evaluate(() => {
    const el = document.getElementById("things-to-see");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await shot("mobile_en_places_section", { clip: { x: 0, y: 0, width: 390, height: 844 } });

  // 4. MOBILE 390px - MARATHI
  console.log("\n--- Mobile 390px MR ---");
  await page.goto(`${BASE_URL}/hospitality?lang=mr`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  // Navbar on Hero (Mobile MR)
  await shot("mobile_mr_nav_hero", { clip: { x: 0, y: 0, width: 390, height: 320 } });

  // Open Mobile Menu (Mobile MR)
  await page.evaluate(() => {
    const btn = document.querySelector('header button[aria-haspopup="dialog"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await shot("mobile_mr_menu_open", { clip: { x: 0, y: 0, width: 390, height: 600 } });
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));

  // Scroll to Places Section (Mobile MR)
  await page.evaluate(() => {
    const el = document.getElementById("things-to-see");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await shot("mobile_mr_places_section", { clip: { x: 0, y: 0, width: 390, height: 844 } });

  // 5. CREDITS PAGE (Desktop 1280px)
  console.log("\n--- Credits Page Desktop ---");
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/hospitality/credits?lang=en`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));
  await shot("desktop_en_credits_page", { clip: { x: 0, y: 0, width: 1280, height: 850 } });

  await browser.close();
  console.log("\nAll screenshots captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
