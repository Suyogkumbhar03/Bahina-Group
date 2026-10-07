import React from "react"
import { cn } from "@/lib/utils"

export const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-white/15 bg-[#0C100E]/95 text-[#F3EFEA] p-6 md:p-8 transition-colors duration-300 shadow-xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = "Card"

export const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-2 mb-4", className)} {...props}>
    {children}
  </div>
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display text-xl md:text-2xl font-bold tracking-tight text-[#F3EFEA]", className)}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs md:text-sm text-white leading-relaxed font-medium", className)}
    {...props}
  >
    {children}
  </p>
))
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props}>
    {children}
  </div>
))
CardContent.displayName = "CardContent"
