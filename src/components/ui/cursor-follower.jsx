import React, { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function CursorFollower() {
  const [visible, setVisible] = useState(false)
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)

  const springConfig = { damping: 24, stiffness: 260, mass: 0.15 }
  const cursorX = useSpring(-100, springConfig)
  const cursorY = useSpring(-100, springConfig)

  useEffect(() => {
    // Only enable on desktop pointer fine devices and when not reduced motion
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isDesktop || prefersReducedMotion) return

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)

      // Check if target or parent is interactive
      const target = e.target
      const isInteractive = target.closest("button, a, input, select, textarea, [role='button']")
      setIsHoveringClickable(!!isInteractive)
    }

    const handleMouseLeave = () => setVisible(false)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY, visible])

  if (!visible) return null

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full border transition-all duration-200 ${
        isHoveringClickable
          ? "h-12 w-12 border-white/60 bg-white/10 backdrop-blur-[1px]"
          : "h-6 w-6 border-white/35 bg-transparent"
      }`}
    />
  )
}
