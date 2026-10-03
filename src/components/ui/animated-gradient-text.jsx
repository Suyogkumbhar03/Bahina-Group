import React from "react"
import { cn } from "@/lib/utils"

export function AnimatedGradientText({
  children,
  className,
}) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-[#D9A441] via-[#E2E8F0] via-40% to-[#4C8DF6] bg-[length:200%_auto] bg-clip-text text-transparent font-medium animate-gradient-flow",
        className
      )}
    >
      {children}
    </span>
  )
}

export default AnimatedGradientText
