import React, { useRef, useState, useEffect } from "react"
import { motion, useSpring } from "framer-motion"

export function Magnet({
  children,
  padding = 60,
  magnetStrength = 0.35,
  activeTransition = { type: "spring", damping: 15, stiffness: 150, mass: 0.1 },
  inactiveTransition = { type: "spring", damping: 12, stiffness: 120, mass: 0.2 },
  className = "",
  disabled = false,
  ...props
}) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [canHover, setCanHover] = useState(false)

  const springConfig = isHovered ? activeTransition : inactiveTransition
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setCanHover(isDesktop && !prefersReducedMotion && !disabled)
  }, [disabled])

  const handleMouseMove = (e) => {
    if (!ref.current || !canHover) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distX = clientX - centerX
    const distY = clientY - centerY

    // Apply magnetic pull scaled by strength
    x.set(distX * magnetStrength)
    y.set(distY * magnetStrength)
  }

  const handleMouseEnter = () => {
    if (!canHover) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!canHover) return
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  if (!canHover) {
    return <div className={className} {...props}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Magnet
