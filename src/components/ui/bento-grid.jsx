import React from "react"
import { cn } from "@/lib/utils"

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  className,
  title,
  description,
  header,
  icon,
  accent,
  division,
  children,
}) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-2xl transition duration-300 p-6 md:p-8 bg-[#0C100E]/70 border border-white/10 justify-between flex flex-col space-y-4 hover:border-white/20",
        className
      )}
      style={{
        borderLeft: accent ? `2px solid ${accent}` : undefined,
      }}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        <div className="flex items-center justify-between mb-3">
          {icon && (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
              style={{ color: accent || "#F3EFEA" }}
            >
              {icon}
            </div>
          )}
          {division && (
            <span
              className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full border"
              style={{
                borderColor: `${accent}40` || "rgba(255,255,255,0.15)",
                color: accent || "#9E9A93",
                backgroundColor: `${accent}10` || "rgba(255,255,255,0.05)",
              }}
            >
              {division}
            </span>
          )}
        </div>
        <h4 className="font-display font-bold text-lg md:text-xl text-[#F3EFEA] mb-1.5">
          {title}
        </h4>
        <p className="font-sans font-medium text-xs md:text-sm text-white leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}
