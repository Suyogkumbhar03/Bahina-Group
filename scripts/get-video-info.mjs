import fs from "fs"

const buf = fs.readFileSync("public/video/welcome.mp4")
const stat = fs.statSync("public/video/welcome.mp4")

console.log("File size bytes:", stat.size)
console.log("File size MB:", (stat.size / (1024 * 1024)).toFixed(2) + " MB")

// Find 'mvhd' atom
const mvhdIndex = buf.indexOf("mvhd")
if (mvhdIndex !== -1) {
  // mvhd version is 1 byte at mvhdIndex + 4
  const version = buf.readUInt8(mvhdIndex + 4)
  let timescale, duration
  if (version === 1) {
    // 64-bit creation (8), mod (8), timescale (4), duration (8)
    timescale = buf.readUInt32BE(mvhdIndex + 4 + 4 + 16)
    const durationHi = buf.readUInt32BE(mvhdIndex + 4 + 4 + 16 + 4)
    const durationLo = buf.readUInt32BE(mvhdIndex + 4 + 4 + 16 + 8)
    duration = durationHi * 4294967296 + durationLo
  } else {
    // version 0: 32-bit creation (4), mod (4), timescale (4), duration (4)
    timescale = buf.readUInt32BE(mvhdIndex + 4 + 4 + 8)
    duration = buf.readUInt32BE(mvhdIndex + 4 + 4 + 8 + 4)
  }
  const durationSec = duration / timescale
  console.log(`Timescale: ${timescale}, Duration units: ${duration}, Duration seconds: ${durationSec.toFixed(2)}s`)
} else {
  console.log("mvhd not found in initial buffer, file might be fragmented mp4")
}
