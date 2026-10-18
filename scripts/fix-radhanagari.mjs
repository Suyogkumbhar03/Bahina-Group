import fs from "fs";

const buf = fs.readFileSync("src/bahina-hospitality/data/radhanagari.js");
console.log("Buffer length:", buf.length);

// Try decoding as utf-8
try {
  const dec = new TextDecoder("utf-8", { fatal: true });
  const str = dec.decode(buf);
  console.log("Valid UTF-8 string length:", str.length);
} catch (err) {
  console.error("UTF-8 decoding error:", err);
  // Decode with replacement
  const lossy = new TextDecoder("utf-8", { fatal: false }).decode(buf);
  // Re-write clean UTF-8
  fs.writeFileSync("src/bahina-hospitality/data/radhanagari.js", lossy, "utf-8");
  console.log("Rewrote radhanagari.js as valid UTF-8.");
}
