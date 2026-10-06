import React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const InteractiveHoverButton = React.forwardRef(
  ({ text = "Button", className, children, ...props }, ref) => {
    const contentText = typeof children === "string" ? children : text

    return (
      <button
        ref={ref}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-full border border-white/20 bg-white/[0.03] px-7 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-neutral-200 transition-all duration-300 hover:border-white/50 hover:bg-white/10 active:scale-[0.98] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-white/60 transition-all duration-300 group-hover:scale-[100] group-hover:opacity-0" />
          <div className="relative h-[22px] overflow-hidden flex items-center">
            <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
              <span className="block text-neutral-300 leading-normal">{children || text}</span>
              <span className="block text-white leading-normal">{children || text}</span>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-white" />
        </div>
      </button>
    )
  }
)

InteractiveHoverButton.displayName = "InteractiveHoverButton"
export default InteractiveHoverButton
