import React from "react"
import { cn } from "@/lib/utils"

export function StarBorder({
  as: Component = "button",
  className = "",
  color = "#ffffff",
  speed = "4s",
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "group relative inline-block py-[1px] px-[1px] overflow-hidden rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60",
        className
      )}
      {...props}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 bg-[#0E1210] border border-white/20 text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] text-center rounded-full px-8 py-3.5 transition-all duration-300 group-hover:bg-[#141A17] group-hover:border-white/50 active:scale-[0.98]">
        <div className="relative h-4 overflow-hidden">
          <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
            <span className="block text-white">{children}</span>
            <span className="block text-white">{children}</span>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default StarBorder
