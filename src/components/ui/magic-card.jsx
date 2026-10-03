import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function MagicCard({
  children,
  className,
  gradientColor = "rgba(255, 255, 255, 0.08)",
  gradientSize = 250,
}) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -gradientSize, y: -gradientSize })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C100E]/85 p-7 transition-all duration-300 hover:border-white/25",
        className
      )}
    >
      {/* Spotlight Radial Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${gradientSize}px circle at ${mousePos.x}px ${mousePos.y}px, ${gradientColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
