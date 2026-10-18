import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = process.env.TEST_URL || "http://localhost:5173";

const routes = [
  "/hospitality",
  "/hospitality/farmhouses/sample-farmhouse-1",
  "/hospitality/book/sample-farmhouse-1"
];

// Devanagari regex
const DEVANAGARI_REGEX = /[\u0900-\u097F]/;

// Allowed Devanagari in English mode: toggle label "मराठी" and brand mark ("बहिणा" / "बहिणा ग्रुप")
function isAllowedDevanagariInEnglish(text) {
  const trimmed = text.trim();
  if (trimmed === "मराठी") return true;
  if (trimmed === "बहिणा" || trimmed === "बहिणा ग्रुप" || trimmed === "श्री" || trimmed === "॥ श्री ॥") return true;
  // If the entire text contains only "मराठी" or toggle options e.g. "EN | मराठी"
  const cleaned = trimmed.replace(/मराठी|बहिणा/g, "").trim();
  return !DEVANAGARI_REGEX.test(cleaned);
}

// Raw key regex in Marathi mode
const RAW_KEY_REGEX = /\bhosp\.[a-zA-Z0-9_.-]+/i;

// Words considered allowed / non-sentences
const ALLOWED_TOKENS = new Set([
  "bahina", "hospitality", "group", "foundation", "pvt", "ltd", "private", "limited",
  "radhanagari", "kolhapur", "maharashtra", "bhogawati", "dajipur",
  "bos", "gaurus", "unesco",
  "sample", "preview", "design", "beta", "demo",
  "km", "sq", "am", "pm", "en", "mr",
  "bh", "id", "gst"
]);

function isAllowedEnglishSentence(text) {
  // Allow phone numbers
  if (/\+?\d[\d\s-]{7,}\d/.test(text)) return true;
  // Allow email
  if (/\S+@\S+\.\S+/.test(text)) return true;
  // Allow date strings like "2026-10-24" or timestamps
  if (/\d{4}-\d{2}-\d{2}/.test(text)) return true;

  // Split into Latin words
  const words = text
    .split(/\s+/)
    .map(w => w.replace(/[^a-zA-Z]/g, "").toLowerCase())
    .filter(w => w.length > 0);

  // If 3 or fewer English words, it's allowed
  if (words.length <= 3) return true;

  // If words are mostly brand/allowed tokens
  const nonAllowed = words.filter(w => !ALLOWED_TOKENS.has(w));
  if (nonAllowed.length <= 3) return true;

  return false;
}

async function runCheck() {
  console.log("=== CHECKING LANGUAGE LEAKS & INTEGRITY ===");
  console.log("Browser executable:", EDGE_PATH);
  console.log("Base URL:", BASE_URL);

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  let totalFailures = 0;
  const failureLog = [];

  // 1. Check English mode (?lang=en)
  console.log("\n------------------------------------------------------------");
  console.log("TEST SUITE 1: English Mode (?lang=en) — Zero Devanagari Leaks");
  console.log("------------------------------------------------------------");

  for (const route of routes) {
    const url = `${BASE_URL}${route}?lang=en`;
    console.log(`\nAuditing English: ${url}`);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector("h1, .hospitality-theme", { timeout: 15000 });
    // Scroll through the page to trigger all lazy sections & scroll animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 50);
      });
    });
    await new Promise(r => setTimeout(r, 600));

    const textNodes = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (["script", "style", "noscript", "svg"].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }
            const style = window.getComputedStyle(parent);
            if (style.display === "none" || style.visibility === "hidden") {
              return NodeFilter.FILTER_REJECT;
            }
            const text = node.textContent.trim();
            if (!text) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      const results = [];
      while (walker.nextNode()) {
        const text = walker.currentNode.textContent.trim();
        const el = walker.currentNode.parentElement;
        results.push({
          text,
          tag: el?.tagName?.toLowerCase() || "",
          className: (el?.className || "").toString().slice(0, 80),
          id: el?.id || ""
        });
      }
      return results;
    });

    let routeDevanagariLeaks = 0;
    for (const item of textNodes) {
      if (DEVANAGARI_REGEX.test(item.text)) {
        if (!isAllowedDevanagariInEnglish(item.text)) {
          routeDevanagariLeaks++;
          totalFailures++;
          const msg = `[LEAK][EN] Devanagari in EN route ${route}: "${item.text}" (Tag: <${item.tag}> Class: "${item.className}")`;
          console.error(`  FAIL: ${msg}`);
          failureLog.push(msg);
        }
      }
    }

    if (routeDevanagariLeaks === 0) {
      console.log(`  PASS: No Devanagari leaks on ${route} (${textNodes.length} visible text elements checked).`);
    } else {
      console.error(`  FAIL: Found ${routeDevanagariLeaks} Devanagari leak(s) on ${route}!`);
    }
  }

  // 2. Check Marathi mode (?lang=mr)
  console.log("\n------------------------------------------------------------");
  console.log("TEST SUITE 2: Marathi Mode (?lang=mr) — No Raw Keys & Long English Sentences");
  console.log("------------------------------------------------------------");

  for (const route of routes) {
    const url = `${BASE_URL}${route}?lang=mr`;
    console.log(`\nAuditing Marathi: ${url}`);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector("h1, .hospitality-theme", { timeout: 15000 });
    // Scroll through the page to trigger all lazy sections & scroll animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 50);
      });
    });
    await new Promise(r => setTimeout(r, 600));

    const textNodes = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (["script", "style", "noscript", "svg"].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }
            const style = window.getComputedStyle(parent);
            if (style.display === "none" || style.visibility === "hidden") {
              return NodeFilter.FILTER_REJECT;
            }
            const text = node.textContent.trim();
            if (!text) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      const results = [];
      while (walker.nextNode()) {
        const text = walker.currentNode.textContent.trim();
        const el = walker.currentNode.parentElement;
        results.push({
          text,
          tag: el?.tagName?.toLowerCase() || "",
          className: (el?.className || "").toString().slice(0, 80),
          id: el?.id || ""
        });
      }
      return results;
    });

    let routeMrIssues = 0;
    for (const item of textNodes) {
      // Check 1: Raw hosp.* keys
      if (RAW_KEY_REGEX.test(item.text)) {
        routeMrIssues++;
        totalFailures++;
        const msg = `[RAW_KEY][MR] Raw key found on ${route}: "${item.text}"`;
        console.error(`  FAIL: ${msg}`);
        failureLog.push(msg);
      }

      // Check 2: English sentences > 3 words
      // Check if text is predominantly Latin (no Devanagari) and exceeds 3 words
      if (!DEVANAGARI_REGEX.test(item.text)) {
        if (!isAllowedEnglishSentence(item.text)) {
          routeMrIssues++;
          totalFailures++;
          const msg = `[ENGLISH_LEAK][MR] Unallowed English sentence (>3 words) on ${route}: "${item.text}" (Tag: <${item.tag}> Class: "${item.className}")`;
          console.error(`  FAIL: ${msg}`);
          failureLog.push(msg);
        }
      }
    }

    if (routeMrIssues === 0) {
      console.log(`  PASS: No raw keys or unallowed English sentences on ${route} (${textNodes.length} visible text elements checked).`);
    } else {
      console.error(`  FAIL: Found ${routeMrIssues} issue(s) on ${route}!`);
    }
  }

  await browser.close();

  console.log("\n============================================================");
  console.log(`AUDIT COMPLETE: Total Failures = ${totalFailures}`);
  console.log("============================================================");

  if (totalFailures > 0) {
    console.error(`\nSummary of ${totalFailures} failure(s):`);
    failureLog.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
    process.exit(1);
  } else {
    console.log("\nALL LANGUAGE AUDIT CHECKS PASSED WITH 0 FAILURES!");
    process.exit(0);
  }
}

runCheck().catch((err) => {
  console.error("Audit script failed with error:", err);
  process.exit(1);
});
