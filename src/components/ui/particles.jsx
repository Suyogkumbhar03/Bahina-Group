import React, { useEffect, useRef } from "react"

export function Particles({
  className = "",
  quantity = 35,
  staticity = 40,
  ease = 50,
  color = "#C8C4BD",
}) {
  const canvasRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const context = useRef(null)
  const circles = useRef([])
  const mousePosition = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const canvasSize = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  const rafID = useRef(null)

  useEffect(() => {
    // Zero on mobile or reduced motion
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isMobile || prefersReducedMotion) return

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }

    const init = () => {
      resizeCanvas()
      drawParticles()
    }

    const onMouseMove = (e) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const { w, h } = canvasSize.current
        const x = e.clientX - rect.left - w / 2
        const y = e.clientY - rect.top - h / 2
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
        if (inside) {
          mouse.current.x = x
          mouse.current.y = y
        }
      }
    }

    const resizeCanvas = () => {
      if (canvasContainerRef.current && canvasRef.current && context.current) {
        circles.current.length = 0
        canvasSize.current.w = canvasContainerRef.current.offsetWidth
        canvasSize.current.h = canvasContainerRef.current.offsetHeight
        canvasRef.current.width = canvasSize.current.w * dpr
        canvasRef.current.height = canvasSize.current.h * dpr
        canvasRef.current.style.width = `${canvasSize.current.w}px`
        canvasRef.current.style.height = `${canvasSize.current.h}px`
        context.current.scale(dpr, dpr)
      }
    }

    const circleParams = () => {
      const x = Math.floor(Math.random() * canvasSize.current.w)
      const y = Math.floor(Math.random() * canvasSize.current.h)
      const translateX = 0
      const translateY = 0
      const pSize = Math.floor(Math.random() * 2) + 0.8
      const alpha = 0
      const targetAlpha = parseFloat((Math.random() * 0.4 + 0.1).toFixed(2))
      const dx = (Math.random() - 0.5) * 0.15
      const dy = (Math.random() - 0.5) * 0.15
      const magnetism = 0.1 + Math.random() * 4
      return {
        x,
        y,
        translateX,
        translateY,
        size: pSize,
        alpha,
        targetAlpha,
        dx,
        dy,
        magnetism,
      }
    }

    const drawCircle = (circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle
        context.current.translate(translateX, translateY)
        context.current.beginPath()
        context.current.arc(x, y, size, 0, 2 * Math.PI)
        context.current.fillStyle = color
        context.current.globalAlpha = alpha
        context.current.fill()
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

        if (!update) {
          circles.current.push(circle)
        }
      }
    }

    const clearContext = () => {
      if (context.current) {
        context.current.clearRect(
          0,
          0,
          canvasSize.current.w,
          canvasSize.current.h
        )
      }
    }

    const drawParticles = () => {
      clearContext()
      const particleCount = Math.min(quantity, 40)
      for (let i = 0; i < particleCount; i++) {
        const circle = circleParams()
        drawCircle(circle)
      }
    }

    const animate = () => {
      clearContext()
      circles.current.forEach((circle, i) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size,
        ]
        const closestEdge = edge.reduce((a, b) => Math.min(a, b))
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        )
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha
          }
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge
        }
        circle.x += circle.dx
        circle.y += circle.dy
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
          ease
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
          ease

        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1)
          const newCircle = circleParams()
          drawCircle(newCircle)
        } else {
          drawCircle(
            {
              ...circle,
              x: circle.x,
              y: circle.y,
              translateX: circle.translateX,
              translateY: circle.translateY,
              alpha: circle.alpha,
            },
            true
          )
        }
      })
      rafID.current = window.requestAnimationFrame(animate)
    }

    const remapValue = (value, start1, stop1, start2, stop2) => {
      const rel = (value - start1) / (stop1 - start1)
      return start2 + rel * (stop2 - start2)
    }

    init()
    animate()
    window.addEventListener("resize", init)
    window.addEventListener("mousemove", onMouseMove)

    return () => {
      if (rafID.current) cancelAnimationFrame(rafID.current)
      window.removeEventListener("resize", init)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [color, quantity, staticity, ease, dpr])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 overflow-hidden ${className}`}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Particles
