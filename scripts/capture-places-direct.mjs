import puppeteer from "puppeteer-core";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:5173";
const OUTPUT_DIR = "C:\\Users\\SUYOG\\.gemini\\antigravity-ide\\brain\\26330acf-925b-42d5-8cee-d97d44ecaecd\\screenshots";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // Desktop Places EN
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/hospitality?lang=en`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop_en_nav_hero.png"),
    clip: { x: 0, y: 0, width: 1280, height: 350 },
  });
  console.log("Captured desktop_en_nav_hero.png");

  await page.evaluate(() => {
    const el = document.getElementById("things-to-see");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const placesEn = await page.$("#things-to-see");
  if (placesEn) {
    await placesEn.screenshot({ path: path.join(OUTPUT_DIR, "desktop_en_places_section.png") });
    console.log("Captured desktop_en_places_section.png");
  }

  // Desktop Scrolled Nav on light section (#about-radhanagari)
  await page.evaluate(() => {
    window.scrollTo(0, 1200);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop_en_nav_scrolled_light.png"),
    clip: { x: 0, y: 0, width: 1280, height: 420 },
  });
  console.log("Captured desktop_en_nav_scrolled_light.png");

  // Desktop Places MR
  await page.goto(`${BASE_URL}/hospitality?lang=mr`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    const el = document.getElementById("things-to-see");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const placesMr = await page.$("#things-to-see");
  if (placesMr) {
    await placesMr.screenshot({ path: path.join(OUTPUT_DIR, "desktop_mr_places_section.png") });
    console.log("Captured desktop_mr_places_section.png");
  }

  // Desktop Scrolled Nav on light section MR
  await page.evaluate(() => {
    window.scrollTo(0, 1200);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop_mr_nav_scrolled_light.png"),
    clip: { x: 0, y: 0, width: 1280, height: 420 },
  });
  console.log("Captured desktop_mr_nav_scrolled_light.png");

  // Mobile Places EN
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/hospitality?lang=en`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));

  const placesMobileEn = await page.$("#things-to-see");
  if (placesMobileEn) {
    await placesMobileEn.screenshot({ path: path.join(OUTPUT_DIR, "mobile_en_places_section.png") });
    console.log("Captured mobile_en_places_section.png");
  }

  // Mobile Places MR
  await page.goto(`${BASE_URL}/hospitality?lang=mr`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));

  const placesMobileMr = await page.$("#things-to-see");
  if (placesMobileMr) {
    await placesMobileMr.screenshot({ path: path.join(OUTPUT_DIR, "mobile_mr_places_section.png") });
    console.log("Captured mobile_mr_places_section.png");
  }

  // Desktop Credits EN
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/hospitality/credits?lang=en`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "desktop_en_credits_page.png"), fullPage: true });
  console.log("Captured desktop_en_credits_page.png");

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
