import React, { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getFrameRatioFromScroll, FRAME_MILESTONES, SECTION_MILESTONES } from "@/data/frameMap"

/**
 * FrameSequenceBackground
 * 
 * Replaces the static/scrub background with a scroll-controlled frame sequence drawn on a full-screen canvas.
 * - Progressive multi-pass loader (Pass 1 required for preloader; Passes 2-4 background idle loaded)
 * - Nearest-loaded-frame fallback while scrolling
 * - Decode() on near-viewport frames only (prevents memory spikes)
 * - 0.12 lerp smoothing and draw-on-change optimization
 * - 1.0 -> 1.06 slow zoom & desktop mouse parallax (max 8px)
 * - Dynamic text scrim following day (55%) to night (35%)
 * - Doorway portal glow flash (~8% opacity, 0.6s)
 * - Fallbacks: Reduced-motion, 2G/3G, saveData -> Poster image crossfade
 * - Debug overlay via ?debug=1
 */
export function FrameSequenceBackground({
  activeTheme = "neutral",
  onPass1Progress = null,
  onPass1Complete = null,
}) {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const animFrameRef = useRef(null)

  // Fallback state (reduced motion, saveData, 2g/3g, or frame failure)
  const [isFallback, setIsFallback] = useState(false)
  const [firstFrameDrawn, setFirstFrameDrawn] = useState(false)
  const [doorGlowActive, setDoorGlowActive] = useState(false)
  const [scrimOpacity, setScrimOpacity] = useState(0.32)
  const [posterEndOpacity, setPosterEndOpacity] = useState(0)

  // Debug HUD state (enabled when ?debug=1)
  const [showDebug, setShowDebug] = useState(false)
  const [debugData, setDebugData] = useState({
    scrollProgress: 0,
    currentFrame: 1,
    totalFrames: 150,
    loadedCount: 0,
    loadedPercent: 0,
    fps: 60,
    mode: "desktop",
    frameRatio: 0,
  })

  // Internal mutable state in refs for 60fps tick performance
  const stateRef = useRef({
    isDesktop: true,
    totalFrames: 150,
    pattern: "desktop/f_%04d.webp",
    frames: [], // Array of HTMLImageElement or null
    loadedMap: new Uint8Array(150), // 1 if loaded
    loadedCount: 0,
    targetProgress: 0,
    currentProgress: 0,
    lastRenderedIndex: -1,
    lastDoorThresholdCrossed: false,
    mouseParallax: { x: 0, y: 0, targetX: 0, targetY: 0 },
    fpsCount: 0,
    lastFpsTime: performance.now(),
    fps: 60,
    isTabHidden: false,
  })

  const onPass1ProgressRef = useRef(onPass1Progress)
  onPass1ProgressRef.current = onPass1Progress
  const onPass1CompleteRef = useRef(onPass1Complete)
  onPass1CompleteRef.current = onPass1Complete
  const firstFrameDrawnRef = useRef(false)

  // Detect fallback conditions
  const checkFallbackConditions = useCallback(() => {
    if (typeof window === "undefined") return false
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const saveData = conn?.saveData === true
    const slowConn = conn && (conn.effectiveType === "2g" || conn.effectiveType === "3g" || conn.effectiveType === "slow-2g")
    return prefersReduced || saveData || slowConn
  }, [])

  // Canvas drawing with cover fit & devicePixelRatio capping
  const drawFrameToCanvas = useCallback((frameImg) => {
    const canvas = canvasRef.current
    if (!canvas || !frameImg) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = frameImg.naturalWidth || frameImg.width
    const ih = frameImg.naturalHeight || frameImg.height

    if (!iw || !ih) return

    const canvasAspect = cw / ch
    const imgAspect = iw / ih

    let drawW, drawH, drawX, drawY

    if (canvasAspect > imgAspect) {
      drawW = cw
      drawH = Math.round(cw / imgAspect)
      drawX = 0
      drawY = Math.round((ch - drawH) / 2)
    } else {
      drawH = ch
      drawW = Math.round(ch * imgAspect)
      drawY = 0
      drawX = Math.round((cw - drawW) / 2)
    }

    ctx.drawImage(frameImg, drawX, drawY, drawW, drawH)

    if (!firstFrameDrawnRef.current) {
      firstFrameDrawnRef.current = true
      setFirstFrameDrawn(true)
    }
  }, [])

  // Resize handler with DPI capping: 1.5 on desktop, 1.0 on mobile
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isDesktop = stateRef.current.isDesktop
    const dpr = Math.min(window.devicePixelRatio || 1, isDesktop ? 1.5 : 1.0)
    const displayW = window.innerWidth
    const displayH = window.innerHeight

    const targetW = Math.floor(displayW * dpr)
    const targetH = Math.floor(displayH * dpr)

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW
      canvas.height = targetH
    }

    canvas.style.width = `${displayW}px`
    canvas.style.height = `${displayH}px`

    // Re-draw current frame immediately
    const s = stateRef.current
    if (s.lastRenderedIndex >= 0 && s.frames[s.lastRenderedIndex]) {
      drawFrameToCanvas(s.frames[s.lastRenderedIndex])
    }
  }, [drawFrameToCanvas])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Check debug mode (?debug=1)
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      setShowDebug(urlParams.get("debug") === "1")
    }

    // Check fallback
    if (checkFallbackConditions()) {
      setIsFallback(true)
      onPass1ProgressRef.current?.(100)
      onPass1CompleteRef.current?.()
      return
    }

    // Determine device mode
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const isDesktop = finePointer && window.innerWidth >= 900
    const totalFrames = isDesktop ? 150 : 75
    const pattern = isDesktop ? "desktop/f_%04d.webp" : "mobile/f_%04d.webp"

    stateRef.current.isDesktop = isDesktop
    stateRef.current.totalFrames = totalFrames
    stateRef.current.pattern = pattern
    stateRef.current.frames = new Array(totalFrames).fill(null)
    stateRef.current.loadedMap = new Uint8Array(totalFrames)

    // Initial resize setup
    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("orientationchange", handleResize, { passive: true })

    // Setup Desktop Mouse Parallax (max 8px)
    const handleMouseMove = (e) => {
      if (!stateRef.current.isDesktop) return
      const halfW = window.innerWidth / 2
      const halfH = window.innerHeight / 2
      const normX = (e.clientX - halfW) / halfW
      const normY = (e.clientY - halfH) / halfH
      stateRef.current.mouseParallax.targetX = normX * 8
      stateRef.current.mouseParallax.targetY = normY * 8
    }

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    // Tab visibility handling: pause animation when hidden
    const handleVisibility = () => {
      stateRef.current.isTabHidden = document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibility)

    // Setup GSAP ScrollTrigger for document progress (0 to 1)
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        stateRef.current.targetProgress = self.progress

        // For fallback crossfade near bottom
        if (self.progress > 0.82) {
          const fadeP = (self.progress - 0.82) / (1 - 0.82)
          setPosterEndOpacity(Math.min(1, Math.max(0, fadeP)))
        } else {
          setPosterEndOpacity(0)
        }
      },
    })

    // PROGRESSIVE LOADING PIPELINE
    // Pass 1: first 10 frames + every 8th frame
    const pass1Indices = new Set()
    for (let i = 0; i < Math.min(10, totalFrames); i++) {
      pass1Indices.add(i)
    }
    for (let i = 0; i < totalFrames; i += 8) {
      pass1Indices.add(i)
    }
    pass1Indices.add(totalFrames - 1) // include final frame
    const pass1List = Array.from(pass1Indices).sort((a, b) => a - b)

    // Pass 2: every 4th frame not in Pass 1
    const pass2List = []
    for (let i = 0; i < totalFrames; i += 4) {
      if (!pass1Indices.has(i)) pass2List.push(i)
    }

    // Pass 3: every 2nd frame not in Pass 1 or 2
    const pass3List = []
    for (let i = 0; i < totalFrames; i += 2) {
      if (!pass1Indices.has(i) && !pass2List.includes(i)) pass3List.push(i)
    }

    // Pass 4: remaining frames
    const pass4List = []
    for (let i = 0; i < totalFrames; i++) {
      if (!pass1Indices.has(i) && !pass2List.includes(i) && !pass3List.includes(i)) {
        pass4List.push(i)
      }
    }

    let isMounted = true

    // Helper to load a single frame
    const loadFrame = (index) => {
      return new Promise((resolve) => {
        if (!isMounted) return resolve(null)
        if (stateRef.current.loadedMap[index] === 1) {
          return resolve(stateRef.current.frames[index])
        }

        let settled = false
        const finish = (result) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          resolve(result)
        }
        const timer = setTimeout(() => finish(null), 2500)

        const img = new Image()
        const frameNum = index + 1
        const paddedNum = String(frameNum).padStart(4, "0")
        const src = `/frames/${stateRef.current.pattern.replace("%04d", paddedNum)}`

        img.onload = () => {
          if (!isMounted) return finish(null)
          stateRef.current.frames[index] = img
          stateRef.current.loadedMap[index] = 1
          stateRef.current.loadedCount++
          finish(img)
        }

        img.onerror = () => {
          finish(null)
        }

        img.src = src
      })
    }

    // Execute Pass 1 loading using a continuous sliding pool (concurrency = 8)
    let pass1Loaded = 0
    const totalPass1 = pass1List.length

    const runPass1 = () => {
      return new Promise((resolve) => {
        let activeRequests = 0
        let nextIndex = 0
        let isDone = false
        const concurrency = 8

        const checkCompletion = () => {
          if (isDone) return
          if (pass1Loaded >= totalPass1) {
            isDone = true
            onPass1ProgressRef.current?.(100)
            onPass1CompleteRef.current?.()
            setTimeout(() => {
              if (typeof window !== "undefined") {
                ScrollTrigger.refresh()
              }
            }, 50)
            startBackgroundPasses()
            resolve()
          }
        }

        // Fast-path safety: if first 6 frames are ready after 1s, let preloader proceed
        const fastTimer = setTimeout(() => {
          if (!isDone && isMounted && pass1Loaded >= 6) {
            isDone = true
            onPass1ProgressRef.current?.(100)
            onPass1CompleteRef.current?.()
            setTimeout(() => {
              if (typeof window !== "undefined") {
                ScrollTrigger.refresh()
              }
            }, 50)
            startBackgroundPasses()
            resolve()
          }
        }, 1000)

        const pump = () => {
          if (!isMounted) return

          while (activeRequests < concurrency && nextIndex < totalPass1) {
            const frameIdx = pass1List[nextIndex++]
            activeRequests++

            loadFrame(frameIdx).then((img) => {
              if (!isMounted) return
              activeRequests--
              pass1Loaded++

              // Immediately draw first frame to canvas as soon as index 0 arrives
              if (frameIdx === 0 && img) {
                drawFrameToCanvas(img)
                stateRef.current.lastRenderedIndex = 0
              }

              const pct = Math.min(100, Math.floor((pass1Loaded / totalPass1) * 100))
              onPass1ProgressRef.current?.(pct)

              checkCompletion()
              pump()
            })
          }
        }

        pump()
      })
    }

    // Concurrency queue for background passes (4-6 requests at a time, using idle time)
    const startBackgroundPasses = () => {
      const remainingQueue = [...pass2List, ...pass3List, ...pass4List]
      let activeRequests = 0
      const concurrency = 4

      const pump = () => {
        if (!isMounted) return

        while (activeRequests < concurrency && remainingQueue.length > 0) {
          const nextIndex = remainingQueue.shift()
          activeRequests++

          loadFrame(nextIndex).finally(() => {
            activeRequests--
            // Schedule next pump on idle time or short timer
            if (typeof window !== "undefined" && "requestIdleCallback" in window) {
              window.requestIdleCallback(() => pump(), { timeout: 100 })
            } else {
              setTimeout(pump, 16)
            }
          })
        }
      }

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => pump(), { timeout: 150 })
      } else {
        setTimeout(pump, 50)
      }
    }

    runPass1()

    // MAIN TICK / RAF ANIMATION LOOP
    const tick = (now) => {
      const s = stateRef.current

      if (!s.isTabHidden) {
        // 1. Smooth scroll progress: current += (target - current) * 0.12
        s.currentProgress += (s.targetProgress - s.currentProgress) * 0.12

        // 2. Mouse parallax smoothing
        s.mouseParallax.x += (s.mouseParallax.targetX - s.mouseParallax.x) * 0.1
        s.mouseParallax.y += (s.mouseParallax.targetY - s.mouseParallax.y) * 0.1

        // 3. Very slow canvas zoom: 1.0 to 1.06 across the whole page
        const scale = 1.0 + s.currentProgress * 0.06
        if (wrapperRef.current) {
          const px = s.mouseParallax.x.toFixed(2)
          const py = s.mouseParallax.y.toFixed(2)
          wrapperRef.current.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${scale.toFixed(4)})`
        }

        // 4. Section-linked frame progress mapping
        const frameRatio = getFrameRatioFromScroll(s.currentProgress)
        const targetFrameIndex = Math.min(
          s.totalFrames - 1,
          Math.max(0, Math.round(frameRatio * (s.totalFrames - 1)))
        )

        // 5. Memory optimization: Call decode() only on frames within 10 frames of current position
        const decodeStart = Math.max(0, targetFrameIndex - 10)
        const decodeEnd = Math.min(s.totalFrames - 1, targetFrameIndex + 10)
        for (let i = decodeStart; i <= decodeEnd; i++) {
          const img = s.frames[i]
          if (img && !img._decoded && img.decode) {
            img._decoded = true
            img.decode().catch(() => {})
          }
        }

        // 6. Draw only when the frame index changes
        if (targetFrameIndex !== s.lastRenderedIndex) {
          // Find nearest already-loaded frame
          let frameToDraw = s.frames[targetFrameIndex]
          if (!frameToDraw) {
            // Search outward for nearest loaded frame
            let bestDist = Infinity
            let bestIndex = -1
            for (let i = 0; i < s.totalFrames; i++) {
              if (s.loadedMap[i] === 1) {
                const dist = Math.abs(i - targetFrameIndex)
                if (dist < bestDist) {
                  bestDist = dist
                  bestIndex = i
                }
              }
            }
            if (bestIndex >= 0) {
              frameToDraw = s.frames[bestIndex]
            }
          }

          if (frameToDraw) {
            drawFrameToCanvas(frameToDraw)
            s.lastRenderedIndex = targetFrameIndex
          }

          // 7. Doorway Portal Moment Check:
          // When camera passes through door (~0.48), trigger 8% white-gold glow for 0.6s
          const isAtDoorway = Math.abs(frameRatio - FRAME_MILESTONES.DOOR_PASSAGE) < 0.03
          if (isAtDoorway && !s.lastDoorThresholdCrossed) {
            s.lastDoorThresholdCrossed = true
            setDoorGlowActive(true)
            setTimeout(() => setDoorGlowActive(false), 600)
          } else if (!isAtDoorway && s.lastDoorThresholdCrossed) {
            s.lastDoorThresholdCrossed = false
          }

          // 8. Text scrim that follows the scene:
          // Daytime (frameRatio < 0.48): ~32% dark scrim (keeps meadow vibrant)
          // Nighttime (frameRatio >= 0.48): ~14% dark scrim (keeps doorway & night stars visible)
          const dayFactor = Math.max(0, Math.min(1, (0.48 - frameRatio) / 0.15))
          const calculatedScrim = 0.14 + dayFactor * 0.18
          setScrimOpacity(calculatedScrim)
        }

        // 9. FPS counter and debug overlay updates
        s.fpsCount++
        if (now - s.lastFpsTime >= 500) {
          s.fps = Math.round((s.fpsCount * 1000) / (now - s.lastFpsTime))
          s.fpsCount = 0
          s.lastFpsTime = now

          if (showDebug) {
            setDebugData({
              scrollProgress: Number(s.currentProgress.toFixed(3)),
              currentFrame: s.lastRenderedIndex >= 0 ? s.lastRenderedIndex + 1 : 1,
              totalFrames: s.totalFrames,
              loadedCount: s.loadedCount,
              loadedPercent: Number(((s.loadedCount / s.totalFrames) * 100).toFixed(1)),
              fps: s.fps,
              mode: s.isDesktop ? "desktop" : "mobile",
              frameRatio: Number(frameRatio.toFixed(3)),
            })
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      isMounted = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
      if (isDesktop) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      document.removeEventListener("visibilitychange", handleVisibility)
      scrollTriggerInstance.kill()
    }
  }, [checkFallbackConditions, drawFrameToCanvas, handleResize, showDebug])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Canvas wrapper with slow zoom & mouse parallax */}
      <div
        ref={wrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin: "center center",
          transform: "translate3d(0, 0, 0) scale(1)",
        }}
      >
        {/* Poster 1 (Underneath canvas until first frame renders; also primary fallback) */}
        <img
          src="/frames/poster.webp"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
          style={{
            opacity: firstFrameDrawn && !isFallback ? 0 : 1,
          }}
        />

        {/* Poster End (Fallback crossfade near bottom of page) */}
        {isFallback && (
          <img
            src="/frames/poster-end.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
            style={{
              opacity: posterEndOpacity,
            }}
          />
        )}

        {/* Frame Sequence Canvas (Hidden on fallback) */}
        {!isFallback && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block w-full h-full"
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </div>

      {/* Layer 1: "Door moment" portal glow flash (~18% warm-gold, 0.6s) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 248, 220, 0.22) 0%, rgba(217, 164, 65, 0.10) 60%, transparent 100%)",
          opacity: doorGlowActive ? 1 : 0,
        }}
      />

      {/* Layer 2: Text Scrim that follows scene (32% in daytime, 14% at starry night) */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-3/5 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          background: `linear-gradient(to right, rgba(7, 9, 8, ${scrimOpacity.toFixed(2)}) 0%, rgba(7, 9, 8, ${(scrimOpacity * 0.6).toFixed(2)}) 55%, transparent 100%)`,
        }}
      />

      {/* Layer 3: Soft subtle vignette to preserve header/footer contrast without crushing background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(7, 9, 8, 0.28) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070908]/35 via-transparent to-[#070908]/45 pointer-events-none" />

      {/* Layer 4: Section colour tints (very subtle, <= 10% opacity) */}
      <div
        className={`absolute inset-0 bg-[#D9A441] mix-blend-color transition-opacity duration-1000 pointer-events-none ${
          activeTheme === "hospitality" ? "opacity-10" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 bg-[#3E9B63] mix-blend-color transition-opacity duration-1000 pointer-events-none ${
          activeTheme === "foundation" ? "opacity-10" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 bg-[#4C8DF6] mix-blend-color transition-opacity duration-1000 pointer-events-none ${
          activeTheme === "labs" ? "opacity-10" : "opacity-0"
        }`}
      />

      {/* Layer 5: Film grain texture at low opacity */}
      <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

      {/* Debug Overlay (?debug=1 only) */}
      {showDebug && (
        <aside
          aria-label="Frame Sequence Debug Overlay"
          className="fixed bottom-4 right-4 z-50 bg-[#070908]/90 text-[#F3EFEA] border border-white/20 rounded-lg p-3 font-mono text-xs shadow-2xl backdrop-blur-md pointer-events-auto select-text space-y-1 min-w-[220px]"
        >
          <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider border-b border-white/10 pb-1 mb-1">
            Frame Sequence HUD
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Mode:</span>
            <span className="font-semibold text-white">{debugData.mode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">FPS:</span>
            <span className={debugData.fps >= 50 ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
              {debugData.fps}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Scroll:</span>
            <span className="text-white font-semibold">{(debugData.scrollProgress * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Frame Arc:</span>
            <span className="text-white font-semibold">{(debugData.frameRatio * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Current Frame:</span>
            <span className="text-amber-300 font-semibold">
              #{debugData.currentFrame} / {debugData.totalFrames}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Loaded:</span>
            <span className="text-emerald-400 font-semibold">
              {debugData.loadedCount}/{debugData.totalFrames} ({debugData.loadedPercent}%)
            </span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-150"
              style={{ width: `${debugData.loadedPercent}%` }}
            />
          </div>
        </aside>
      )}
    </div>
  )
}

export default FrameSequenceBackground
