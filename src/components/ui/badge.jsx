import React from "react"
import { cn } from "@/lib/utils"

export function Badge({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
