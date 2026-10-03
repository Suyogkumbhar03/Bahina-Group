import React from "react"
import { cn } from "@/lib/utils"

export const ShimmerButton = React.forwardRef(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(14, 18, 16, 0.9)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={{
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        }}
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/20 px-7 py-3 text-xs uppercase font-sans font-semibold tracking-[0.14em] [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-[1.02] hover:border-white/40 active:scale-[0.98]",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Spark container */}
        <div className="-z-30 blur-[2px] pointer-events-none absolute inset-0 overflow-visible [container-type:size]">
          <div className="absolute inset-0 h-[100cqh] animate-shimmer [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin [animation-duration:var(--speed)] absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {/* Button Content */}
        <span className="relative z-10 inline-flex items-center justify-center text-current font-bold transition-transform duration-200 group-hover:scale-[1.01]">
          {children}
        </span>
        {/* Backdrop highlight */}
        <div className="insert-0 absolute size-full rounded-full px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] pointer-events-none" />
      </button>
    )
  }
)
ShimmerButton.displayName = "ShimmerButton"
