import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function GlareHover({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.12)",
  glareSize = 250,
}) {
  const ref = useRef(null)
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGlarePos({ x, y, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden group", className)}
    >
      {/* Glare Light Sheen */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(${glareSize}px circle at ${glarePos.x}px ${glarePos.y}px, ${glareColor}, transparent 75%)`,
        }}
      />
      {children}
    </div>
  )
}

export default GlareHover
