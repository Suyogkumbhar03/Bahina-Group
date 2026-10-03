import React, { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  suffix = "",
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0)

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const duration = 2000 // 2 seconds

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = direction === "down"
        ? value - (value * ease)
        : value * ease

      setDisplayValue(Number(current.toFixed(decimalPlaces)))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplayValue(value)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(step)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isInView, value, direction, delay, decimalPlaces])

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums tracking-tight font-display", className)}
    >
      {Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(displayValue)}
      {suffix}
    </span>
  )
}
