/**
 * Capture High-Res Screenshots for BAHINA Hospitality Design Preview
 */

import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../design-preview-screens");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function main() {
  console.log("Launching Edge browser from:", EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const viewports = [
    { name: "390", width: 390, height: 844, isMobile: true, hasTouch: true },
    { name: "1440", width: 1440, height: 900, isMobile: false, hasTouch: false },
  ];

  const languages = ["en", "mr"];

  const page = await browser.newPage();

  for (const lang of languages) {
    for (const vp of viewports) {
      console.log(`\n========================================`);
      console.log(`Capturing for Lang: ${lang.toUpperCase()}, Viewport: ${vp.name}px`);
      console.log(`========================================`);

      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
      });

      const goTo = async (urlPath) => {
        const url = `http://localhost:5173${urlPath}?lang=${lang}&skip=1`;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        await page.evaluate((l) => {
          try {
            localStorage.setItem("bahina_lang", l);
          } catch (e) {}
        }, lang);
        await new Promise((r) => setTimeout(r, 600));
      };

      // 1. Stays Page (Hero & Full)
      console.log("Capturing: stays-page (Hero)");
      await goTo("/hospitality");
      await page.screenshot({
        path: path.join(outputDir, `stays-page-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      console.log("Capturing: homepage-full");
      await page.screenshot({
        path: path.join(outputDir, `homepage-full-${vp.name}-${lang}.png`),
        fullPage: true,
      });

      // Section captures
      console.log("Capturing: storytelling");
      await page.evaluate(() => {
        const el = document.querySelector("#storytelling");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `storytelling-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      console.log("Capturing: experience");
      await page.evaluate(() => {
        const el = document.querySelector("#experience");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `experience-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      console.log("Capturing: destinations");
      await page.evaluate(() => {
        const el = document.querySelector("#destinations");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `destinations-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      console.log("Capturing: daytonight");
      await page.evaluate(() => {
        const el = document.querySelector("#daytonight");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `daytonight-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      console.log("Capturing: amenities");
      await page.evaluate(() => {
        const el = document.querySelector("#amenities");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `amenities-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      console.log("Capturing: stays-catalog");
      await page.evaluate(() => {
        const el = document.querySelector("#stays");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `stays-catalog-${vp.name}-${lang}.png`),
        fullPage: false,
      });


      // 2. Filters Open
      console.log("Capturing: filters-open");
      await goTo("/hospitality");
      if (vp.isMobile) {
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll("button"));
          const target = btns.find((b) => b.textContent.includes("Filter") || b.textContent.includes("फिल्टर"));
          if (target) target.click();
        });
        await new Promise((r) => setTimeout(r, 700));
      } else {
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll("button"));
          const target = btns.find((b) => b.textContent.includes("Amenities") || b.textContent.includes("सुविधा"));
          if (target) target.click();
        });
        await new Promise((r) => setTimeout(r, 700));
      }
      await page.screenshot({
        path: path.join(outputDir, `filters-open-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 3. No Results State
      console.log("Capturing: no-results-state");
      await goTo("/hospitality");
      await page.evaluate(() => {
        // Filter by Under construction + Raigad (0 matches)
        const selects = document.querySelectorAll("select");
        for (const s of selects) {
          if (s.options && Array.from(s.options).some((o) => o.value === "Raigad")) {
            s.value = "Raigad";
            s.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
        const statusChips = Array.from(document.querySelectorAll("button"));
        const underConst = statusChips.find((b) => b.textContent.includes("Under construction") || b.textContent.includes("बांधकाम"));
        if (underConst) underConst.click();

        // Scroll to stays section so no-results is front and center
        const staysEl = document.querySelector("#stays");
        if (staysEl) staysEl.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `no-results-state-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 4. Details Page (Open - Sample Farmhouse 1)
      console.log("Capturing: details-page-open");
      await goTo("/hospitality/farmhouses/sample-farmhouse-1");
      await page.screenshot({
        path: path.join(outputDir, `details-page-open-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 5. Details Page (Under Construction - Sample Farmhouse 4)
      console.log("Capturing: details-page-under-construction");
      await goTo("/hospitality/farmhouses/sample-farmhouse-4");
      await page.screenshot({
        path: path.join(outputDir, `details-page-under-construction-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 6. Booking Step 1
      console.log("Capturing: booking-step1");
      await goTo("/hospitality/book/sample-farmhouse-1");
      await page.screenshot({
        path: path.join(outputDir, `booking-step1-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 7. Booking Step 2
      console.log("Capturing: booking-step2");
      await goTo("/hospitality/book/sample-farmhouse-1");
      await page.evaluate(() => {
        const nextBtns = Array.from(document.querySelectorAll("button")).filter(
          (b) => b.textContent.includes("Continue") || b.textContent.includes("पुढे जा")
        );
        if (nextBtns.length > 0) nextBtns[0].click();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `booking-step2-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 8. Booking Step 3
      console.log("Capturing: booking-step3");
      await page.evaluate(() => {
        const nameInput = document.querySelector("#fullName");
        const phoneInput = document.querySelector("#phone");
        if (nameInput) {
          nameInput.value = "Suresh Patil";
          nameInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
        if (phoneInput) {
          phoneInput.value = "9822123456";
          phoneInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
        const nextBtns = Array.from(document.querySelectorAll("button")).filter(
          (b) => b.textContent.includes("Continue") || b.textContent.includes("पुढे जा")
        );
        if (nextBtns.length > 0) nextBtns[0].click();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outputDir, `booking-step3-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 9. Sent Page
      console.log("Capturing: sent-page");
      await goTo("/hospitality/sent");
      await page.screenshot({
        path: path.join(outputDir, `sent-page-${vp.name}-${lang}.png`),
        fullPage: false,
      });

      // 10. Notify Dialog
      console.log("Capturing: notify-dialog");
      await goTo("/hospitality/farmhouses/sample-farmhouse-2");
      await page.evaluate(() => {
        const notifyBtns = Array.from(document.querySelectorAll("button")).filter(
          (b) =>
            b.textContent.includes("Notify me") ||
            b.textContent.includes("उघडल्यावर कळवा") ||
            b.textContent.includes("मला कळवा")
        );
        if (notifyBtns.length > 0) {
          notifyBtns[0].click();
        }
      });
      await new Promise((r) => setTimeout(r, 700));
      await page.screenshot({
        path: path.join(outputDir, `notify-dialog-${vp.name}-${lang}.png`),
        fullPage: false,
      });
    }
  }

  await browser.close();
  console.log("\nAll preview screenshots captured successfully in:", outputDir);
}

main().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
