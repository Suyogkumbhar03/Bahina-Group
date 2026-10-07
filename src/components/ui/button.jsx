import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs uppercase tracking-widest font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#F3EFEA] text-[#070908] hover:bg-white active:scale-[0.98]",
        editorial:
          "border border-white/20 bg-transparent text-[#F3EFEA] hover:bg-white/10 hover:border-white/40 active:scale-[0.98]",
        subtle:
          "border border-white/10 bg-[#0E1210]/60 text-neutral-100 hover:text-white hover:border-white/25 active:scale-[0.98]",
        ghost:
          "text-white hover:text-white hover:bg-white/5",
        link:
          "text-[#F3EFEA] underline-offset-4 hover:underline p-0 h-auto",
        shimmer:
          "relative overflow-hidden border border-white/20 bg-[#0E1210]/80 text-[#F3EFEA] hover:border-white/40 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-full",
        sm: "h-9 px-4 text-[11px] rounded-full",
        lg: "h-13 px-8 text-xs rounded-full",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "shimmer" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  )
})
Button.displayName = "Button"
