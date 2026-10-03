import React, { useRef, useEffect } from "react"

export function ClickSpark({
  sparkColor = "#D9A441",
  sparkSize = 10,
  sparkCount = 8,
  duration = 400,
}) {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext("2d")
    let animId = null

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    const handleClick = (e) => {
      const x = e.clientX
      const y = e.clientY
      const startTime = performance.now()

      const newSparks = []
      for (let i = 0; i < sparkCount; i++) {
        const angle = (2 * Math.PI * i) / sparkCount + (Math.random() * 0.2 - 0.1)
        const speed = 35 + Math.random() * 25
        newSparks.push({
          x,
          y,
          angle,
          speed,
          startTime,
        })
      }
      sparksRef.current.push(...newSparks)

      if (!animId) {
        animId = requestAnimationFrame(animate)
      }
    }

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime
        if (elapsed >= duration) return false

        const progress = elapsed / duration
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const distance = spark.speed * easeOut * 1.5

        const curX = spark.x + Math.cos(spark.angle) * distance
        const curY = spark.y + Math.sin(spark.angle) * distance
        const length = sparkSize * (1 - progress)

        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 1.5 * (1 - progress)
        ctx.globalAlpha = 1 - progress
        ctx.moveTo(curX, curY)
        ctx.lineTo(
          curX + Math.cos(spark.angle) * length,
          curY + Math.sin(spark.angle) * length
        )
        ctx.stroke()
        ctx.restore()

        return true
      })

      if (sparksRef.current.length > 0) {
        animId = requestAnimationFrame(animate)
      } else {
        animId = null
      }
    }

    window.addEventListener("click", handleClick, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("click", handleClick)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [sparkColor, sparkSize, sparkCount, duration])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ width: "100%", height: "100%" }}
    />
  )
}

export default ClickSpark
