import React from "react"
import { cn } from "@/lib/utils"

export function ShinyText({
  text,
  children,
  disabled = false,
  speed = 5,
  className = "",
}) {
  const content = children || text

  return (
    <span
      className={cn(
        "inline-block bg-[linear-gradient(110deg,#9E9A93,45%,#ffffff,55%,#9E9A93)] bg-[length:250%_100%] bg-clip-text text-transparent font-sans uppercase font-semibold text-[13px] tracking-[0.14em]",
        !disabled && "animate-shiny-text",
        className
      )}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {content}
    </span>
  )
}

export default ShinyText
