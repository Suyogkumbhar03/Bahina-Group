import React, { useCallback, useEffect, useMemo, useRef } from "react"

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 8,
  flickerChance = 0.3,
  color = "#4C8DF6",
  width,
  height,
  className = "",
  maxOpacity = 0.25,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isInView, setIsInView] = React.useState(false)

  const memoizedColor = useMemo(() => {
    const toRGBA = (hex) => {
      let c = hex.replace("#", "")
      if (c.length === 3) c = c.split("").map((x) => x + x).join("")
      const num = parseInt(c, 16)
      const r = (num >> 16) & 255
      const g = (num >> 8) & 255
      const b = num & 255
      return `${r}, ${g}, ${b}`
    }
    return toRGBA(color)
  }, [color])

  const setupCanvas = useCallback(
    (canvas, width, height) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.floor(width / (squareSize + gridGap))
      const rows = Math.floor(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity]
  )

  const updateSquares = useCallback(
    (squares) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance) {
          squares[i] = Math.random() * maxOpacity
        }
      }
    },
    [flickerChance, maxOpacity]
  )

  const render = useCallback(
    (ctx, width, height, cols, rows, squares, dpr) => {
      ctx.clearRect(0, 0, width * dpr, height * dpr)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const opacity = squares[c * rows + r]
          ctx.fillStyle = `rgba(${memoizedColor}, ${opacity})`
          ctx.fillRect(
            c * (squareSize + gridGap) * dpr,
            r * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    let gridParams

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth
      const newHeight = height || container.clientHeight
      gridParams = setupCanvas(canvas, newWidth, newHeight)
    }

    updateCanvasSize()

    let lastTime = 0
    const animate = (time) => {
      if (!isInView) return
      if (time - lastTime > 60) {
        updateSquares(gridParams.squares)
        render(
          ctx,
          width || container.clientWidth,
          height || container.clientHeight,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr
        )
        lastTime = time
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(container)

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", updateCanvasSize)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [setupCanvas, updateSquares, render, isInView, width, height])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default FlickeringGrid
