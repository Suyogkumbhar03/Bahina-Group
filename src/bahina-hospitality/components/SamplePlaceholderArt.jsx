import React from "react";
import { PhotoFallback } from "./PhotoFallback";

/**
 * Replaces the old flat illustrated cartoon vector scenes with the rich Indigo-to-Mango
 * gradient, grain, and block-print pattern required by the new visual design system.
 */
export function SamplePlaceholderArt({
  badgeType = null,
  status = null,
  aspectRatio = "aspect-auto h-full",
  className = "",
  label = null,
}) {
  return (
    <PhotoFallback
      badgeType={badgeType}
      status={status}
      aspectRatio={aspectRatio}
      className={className}
      label={label}
    />
  );
}

export default SamplePlaceholderArt;
