import React, { useEffect, useState, useRef } from "react"
import { motion, useSpring, AnimatePresence } from "framer-motion"

export function SmoothCursor() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hoverState, setHoverState] = useState({
    isHovering: false,
    label: "",
    isFormField: false,
  })

  // Spring physics for smooth dot and ring
  const dotSpringConfig = { damping: 30, stiffness: 450, mass: 0.1 }
  const ringSpringConfig = { damping: 22, stiffness: 220, mass: 0.25 }

  const mouseX = useSpring(-100, dotSpringConfig)
  const mouseY = useSpring(-100, dotSpringConfig)

  const ringX = useSpring(-100, ringSpringConfig)
  const ringY = useSpring(-100, ringSpringConfig)

  useEffect(() => {
    // Only enable on desktop pointer fine devices and when not reduced motion
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isDesktop || prefersReducedMotion) return

    setMounted(true)

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      mouseX.set(clientX)
      mouseY.set(clientY)
      ringX.set(clientX)
      ringY.set(clientY)

      if (!visible) setVisible(true)

      const target = e.target
      if (!target) return

      const formField = target.closest("input, textarea, select")
      if (formField) {
        setHoverState({
          isHovering: false,
          label: "",
          isFormField: true,
        })
        return
      }

      const interactive = target.closest("button, a, [role='button'], .cursor-pointer")
      if (interactive) {
        let label = interactive.getAttribute("data-cursor-label") || ""
        if (!label) {
          const text = (interactive.innerText || interactive.getAttribute("aria-label") || "").trim().toLowerCase()
          if (text.includes("contact") || text.includes("touch") || text.includes("inquiry")) {
            label = "Contact"
          } else if (text.includes("explore") || text.includes("division")) {
            label = "Explore"
          } else if (text.includes("view") || text.includes("see")) {
            label = "View"
          } else {
            label = "Open"
          }
        }
        setHoverState({
          isHovering: true,
          label,
          isFormField: false,
        })
      } else {
        setHoverState({
          isHovering: false,
          label: "",
          isFormField: false,
        })
      }
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, ringX, ringY, visible])

  if (!mounted || !visible || hoverState.isFormField) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 1. Small precision center dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`fixed top-0 left-0 rounded-full bg-white transition-opacity duration-150 ${
          hoverState.isHovering ? "opacity-0" : "h-1.5 w-1.5 opacity-90 shadow-sm"
        }`}
      />

      {/* 2. Spring-following outer ring with dynamic expansion and label */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverState.isHovering ? 64 : 26,
          height: hoverState.isHovering ? 64 : 26,
          borderColor: hoverState.isHovering ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.28)",
          backgroundColor: hoverState.isHovering ? "rgba(255, 255, 255, 0.08)" : "transparent",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 240 }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border backdrop-blur-[0.5px]"
      >
        <AnimatePresence>
          {hoverState.isHovering && hoverState.label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="text-[10px] font-sans font-semibold tracking-wider text-white uppercase select-none pointer-events-none"
            >
              {hoverState.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default SmoothCursor
