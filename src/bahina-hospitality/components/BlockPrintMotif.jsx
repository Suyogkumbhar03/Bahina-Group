import React from "react";

/**
 * Authentic Indigo Block-Print Motif (Inline SVG)
 * Designed with traditional geometric/floral block-print geometry.
 * Rendered at 5-8% opacity in Indigo Ink (#1C2B4F).
 * Used strictly for dividers, card corners, and section margins (NEVER behind text).
 */

export function BlockPrintMotif({
  variant = "medallion",
  className = "",
  size = 24,
  opacity = 0.08,
}) {
  if (variant === "corner") {
    return <BlockPrintCorner size={size} className={className} opacity={opacity} />;
  }
  if (variant === "strip" || variant === "divider") {
    return <BlockPrintDivider className={className} opacity={opacity} />;
  }
  return <BlockPrintFlower size={size} className={className} opacity={opacity} />;
}

export function BlockPrintCorner({
  position = "top-right",
  size = 40,
  className = "",
  opacity = 0.08,
}) {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0 -scale-x-100",
    "bottom-right": "bottom-0 right-0 -scale-y-100",
    "bottom-left": "bottom-0 left-0 -scale-x-100 -scale-y-100",
  };

  return (
    <div
      className={`absolute ${positionClasses[position] || "top-0 right-0"} pointer-events-none select-none z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 2h28v4H6v22H2V2z" fill="#1C2B4F" />
        <circle cx="16" cy="16" r="4" fill="#1C2B4F" />
        <circle cx="8" cy="8" r="2" fill="#1C2B4F" />
        <path
          d="M16 8l3 5h-6l3-5zM16 24l3-5h-6l3 5zM8 16l5 3v-6l-5 3zM24 16l-5 3v-6l5 3z"
          fill="#1C2B4F"
        />
      </svg>
    </div>
  );
}

export function BlockPrintDivider({ className = "", opacity = 0.12 }) {
  return (
    <div
      className={`w-full py-4 flex items-center justify-center gap-3 pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 border-t border-dashed border-[#1C2B4F]" />
      <BlockPrintFlower size={18} />
      <BlockPrintFlower size={24} />
      <BlockPrintFlower size={18} />
      <div className="h-[1px] flex-1 border-t border-dashed border-[#1C2B4F]" />
    </div>
  );
}

export function BlockPrintFlower({ size = 20, className = "", opacity = 1 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path
        d="M12 4c-0.8 2.5-2.5 3.5-4.5 3.5 2 0 3.5 1.5 3.5 4 0-2.5 1.5-4 4-4-2.5 0-3-1-3-3.5z"
        fill="currentColor"
      />
      <path
        d="M12 20c-0.8-2.5-2.5-3.5-4.5-3.5 2 0 3.5-1.5 3.5-4 0 2.5 1.5 4 4 4-2.5 0-3 1-3 3.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export default BlockPrintMotif;
