import React from "react"

/**
 * WarliSectionDivider
 * 
 * An original, lightweight inline SVG divider in traditional Warli geometric style:
 * - Shows a gentle village path line with traditional triangular human figures,
 *   a small hut, a tree, and villagers walking together.
 * - Single warm earth colour (#E5DEC9 / #D9A441) at gentle contrast.
 * - Under 2KB in total size.
 * - Never positioned behind text; placed cleanly between sections.
 */
export function WarliSectionDivider({ className = "", accent = "#E5DEC9" }) {
  return (
    <div
      className={`w-full py-8 sm:py-12 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 900 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-5xl h-auto opacity-35 transition-opacity duration-300 hover:opacity-50"
        style={{ stroke: accent, fill: accent }}
      >
        {/* Village Path Line */}
        <line
          x1="20"
          y1="36"
          x2="880"
          y2="36"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Small Sun / Wheel motif at left */}
        <circle cx="90" cy="20" r="6" strokeWidth="1.2" fill="none" />
        <line x1="90" y1="11" x2="90" y2="7" strokeWidth="1.2" />
        <line x1="90" y1="29" x2="90" y2="33" strokeWidth="1.2" />
        <line x1="81" y1="20" x2="77" y2="20" strokeWidth="1.2" />
        <line x1="99" y1="20" x2="103" y2="20" strokeWidth="1.2" />

        {/* Traditional Warli Tree (left) */}
        <line x1="210" y1="12" x2="210" y2="36" strokeWidth="1.5" />
        <polygon points="210,10 200,18 220,18" strokeWidth="1" />
        <polygon points="210,16 195,25 225,25" strokeWidth="1" />
        <polygon points="210,23 190,32 230,32" strokeWidth="1" />

        {/* Warli Villager 1 (walking with staff) */}
        <circle cx="340" cy="14" r="3" />
        <polygon points="340,17 334,24 346,24" />
        <polygon points="340,31 334,24 346,24" />
        <line x1="337" y1="31" x2="334" y2="36" strokeWidth="1.2" />
        <line x1="343" y1="31" x2="346" y2="36" strokeWidth="1.2" />
        <line x1="344" y1="20" x2="350" y2="36" strokeWidth="1.2" /> {/* staff */}

        {/* Warli Villager 2 (carrying harvest basket) */}
        <circle cx="410" cy="14" r="3" />
        <polygon points="410,17 404,24 416,24" />
        <polygon points="410,31 404,24 416,24" />
        <line x1="407" y1="31" x2="405" y2="36" strokeWidth="1.2" />
        <line x1="413" y1="31" x2="415" y2="36" strokeWidth="1.2" />
        <path d="M403 9 Q410 4 417 9 Z" strokeWidth="1.2" fill="none" /> {/* basket on head */}

        {/* Center Village Hut */}
        <polygon points="450,22 438,22 444,14" strokeWidth="1.2" fill="none" />
        <rect x="439" y="22" width="10" height="14" strokeWidth="1.2" fill="none" />
        <line x1="444" y1="27" x2="444" y2="36" strokeWidth="1.2" />

        {/* Warli Villager 3 (with cattle/bullock) */}
        <circle cx="485" cy="14" r="3" />
        <polygon points="485,17 479,24 491,24" />
        <polygon points="485,31 479,24 491,24" />
        <line x1="482" y1="31" x2="480" y2="36" strokeWidth="1.2" />
        <line x1="488" y1="31" x2="490" y2="36" strokeWidth="1.2" />
        {/* Simple bullock figure */}
        <ellipse cx="515" cy="27" rx="9" ry="5" strokeWidth="1.2" fill="none" />
        <line x1="509" y1="31" x2="509" y2="36" strokeWidth="1.2" />
        <line x1="521" y1="31" x2="521" y2="36" strokeWidth="1.2" />
        <path d="M523 25 Q527 21 525 17" strokeWidth="1.2" fill="none" /> {/* horns */}

        {/* Traditional Warli Tree (right) */}
        <line x1="690" y1="12" x2="690" y2="36" strokeWidth="1.5" />
        <polygon points="690,10 680,18 700,18" strokeWidth="1" />
        <polygon points="690,16 675,25 705,25" strokeWidth="1" />
        <polygon points="690,23 670,32 710,32" strokeWidth="1" />

        {/* Small birds flying */}
        <path d="M780 16 Q784 12 788 16 Q792 12 796 16" strokeWidth="1.2" fill="none" />
        <path d="M805 12 Q809 8 813 12 Q817 8 821 12" strokeWidth="1.2" fill="none" />
      </svg>
    </div>
  )
}

/**
 * WarliCorner
 * 
 * Elegant small triangular corner motif for card borders.
 * Size: < 500 bytes.
 */
export function WarliCorner({ className = "", accent = "#D9A441" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`opacity-30 pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ stroke: accent, fill: accent }}
    >
      <circle cx="6" cy="6" r="2" />
      <polygon points="6,9 3,14 9,14" />
      <polygon points="6,18 3,14 9,14" />
      <line x1="1" y1="1" x2="23" y2="1" strokeWidth="1" />
      <line x1="1" y1="1" x2="1" y2="23" strokeWidth="1" />
    </svg>
  )
}

export default WarliSectionDivider;
