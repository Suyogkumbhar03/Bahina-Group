import React, { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getFrameRatioFromScroll, measureSectionScrollRatios } from "@/data/frameMap"
import { useLanguage } from "@/lib/i18n"

/**
 * FrameSequenceBackground
 * 
 * Renders the 120-frame "Day in the Village" scroll animation on a full-screen canvas.
 * - Reads counts, sizes, and patterns dynamically from manifest.json (no hardcoded frames)
 * - DPR cap: 1.5 on desktop, 1.0 on mobile
 * - 3-Pass Progressive Loader:
 *     Pass 1: Every 6th frame (Preloader waits only for this pass)
 *     Pass 2: Every 3rd frame (Background queue, 4 concurrent requests)
 *     Pass 3: All remaining frames (Background queue, 4 concurrent requests)
 * - Nearest loaded frame fallback while scrolling
 * - 0.12 lerp smoothing and decimal frame blending (floor and floor+1 with decimal alpha)
 * - Transform-only very slow canvas zoom: 1.0 -> 1.05 over the whole page
 * - Cache safety: ?v=<version> appended to all frame and poster URLs
 * - Low-data safeguards: prefers-reduced-motion, saveData, 2G/3G, or frame error -> poster fallback
 * - Tab visibility detection: pauses animation when tab is inactive
 * - Debug overlay via ?debug=1 (scroll, frame position, loaded %, active set, fps)
 */
export function FrameSequenceBackground({
  onPass1Progress = null,
  onPass1Complete = null,
}) {
  const { language } = useLanguage()
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const animFrameRef = useRef(null)

  // Fallback state
  const [isFallback, setIsFallback] = useState(false)
  const [firstFrameDrawn, setFirstFrameDrawn] = useState(false)
  const [posterEndOpacity, setPosterEndOpacity] = useState(0)
  const [manifest, setManifest] = useState(null)

  // Debug HUD state (?debug=1)
  const [showDebug, setShowDebug] = useState(false)
  const [debugData, setDebugData] = useState({
    scrollProgress: 0,
    framePosition: 0,
    currentFrame: 1,
    totalFrames: 120,
    loadedCount: 0,
    loadedPercent: 0,
    fps: 60,
    mode: "desktop",
  })

  // Mutable animation state inside ref for 60fps tick performance
  const stateRef = useRef({
    manifest: null,
    isDesktop: true,
    totalFrames: 120,
    pattern: "desktop/f_%04d.webp",
    version: "1",
    frames: [], // HTMLImageElement or null
    loadedMap: null, // Uint8Array
    loadedCount: 0,
    targetProgress: 0,
    currentProgress: 0,
    lastDrawnDecimalPos: -1,
    isTabHidden: false,
    sectionMilestones: null,
    fpsCount: 0,
    lastFpsTime: performance.now(),
    fps: 60,
    isMounted: true,
  })

  const onPass1ProgressRef = useRef(onPass1Progress)
  onPass1ProgressRef.current = onPass1Progress
  const onPass1CompleteRef = useRef(onPass1Complete)
  onPass1CompleteRef.current = onPass1Complete
  const firstFrameDrawnRef = useRef(false)

  // Detect fallback conditions: reduced-motion, saveData, 2g/3g
  const checkFallbackConditions = useCallback(() => {
    if (typeof window === "undefined") return false
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const saveData = conn?.saveData === true
    const slowConn = conn && (conn.effectiveType === "2g" || conn.effectiveType === "3g" || conn.effectiveType === "slow-2g")
    return prefersReduced || saveData || slowConn
  }, [])

  // Canvas drawing with cover fit and centered alignment
  const drawFrameCover = useCallback((ctx, img, cw, ch, alpha = 1.0) => {
    if (!ctx || !img) return
    const iw = img.naturalWidth || img.width
    const ih = img.naturalHeight || img.height
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

    const prevAlpha = ctx.globalAlpha
    ctx.globalAlpha = alpha
    ctx.drawImage(img, drawX, drawY, drawW, drawH)
    ctx.globalAlpha = prevAlpha
  }, [])

  // Find nearest loaded frame index
  const getNearestLoadedIndex = useCallback((targetIdx) => {
    const s = stateRef.current
    if (!s.loadedMap || s.totalFrames === 0) return -1
    if (s.loadedMap[targetIdx] === 1 && s.frames[targetIdx]) {
      return targetIdx
    }

    let bestDist = Infinity
    let bestIdx = -1

    for (let i = 0; i < s.totalFrames; i++) {
      if (s.loadedMap[i] === 1 && s.frames[i]) {
        const dist = Math.abs(i - targetIdx)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      }
    }
    return bestIdx
  }, [])

  // Draw blended frames (floor frame + next frame with alpha)
  const drawBlendedFrame = useCallback((decimalPos) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const s = stateRef.current
    const total = s.totalFrames
    if (total === 0) return

    const clampedPos = Math.max(0, Math.min(total - 1, decimalPos))
    const floorIdx = Math.floor(clampedPos)
    const nextIdx = Math.min(total - 1, floorIdx + 1)
    const alpha = clampedPos - floorIdx

    const idxA = getNearestLoadedIndex(floorIdx)
    const idxB = getNearestLoadedIndex(nextIdx)

    const imgA = idxA >= 0 ? s.frames[idxA] : null
    const imgB = idxB >= 0 ? s.frames[idxB] : null

    if (!imgA && !imgB) return

    const cw = canvas.width
    const ch = canvas.height

    if (imgA && (!imgB || idxA === idxB || alpha < 0.01)) {
      // Single frame draw
      drawFrameCover(ctx, imgA, cw, ch, 1.0)
    } else if (imgA && imgB) {
      // Blended draw: base frame A, then frame B on top with alpha
      drawFrameCover(ctx, imgA, cw, ch, 1.0)
      if (alpha >= 0.01) {
        drawFrameCover(ctx, imgB, cw, ch, alpha)
      }
    } else if (imgB) {
      drawFrameCover(ctx, imgB, cw, ch, 1.0)
    }

    if (!firstFrameDrawnRef.current) {
      firstFrameDrawnRef.current = true
      setFirstFrameDrawn(true)
    }
  }, [drawFrameCover, getNearestLoadedIndex])

  // Resize handler with DPR capping: 1.5 on desktop, 1.0 on mobile
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

    // Re-render current frame immediately on resize
    const s = stateRef.current
    if (s.lastDrawnDecimalPos >= 0) {
      drawBlendedFrame(s.lastDrawnDecimalPos)
    }
  }, [drawBlendedFrame])

  // Re-measure section milestones when language changes or fonts load
  useEffect(() => {
    const updateMilestones = () => {
      const dynamicMilestones = measureSectionScrollRatios()
      stateRef.current.sectionMilestones = dynamicMilestones
      if (typeof window !== "undefined") {
        ScrollTrigger.refresh()
      }
    }

    updateMilestones()

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateMilestones)
    }

    const timer = setTimeout(updateMilestones, 400)
    return () => clearTimeout(timer)
  }, [language])

  // Main lifecycle: fetch manifest, initialize frames, progressive load, animation loop
  useEffect(() => {
    stateRef.current.isMounted = true
    gsap.registerPlugin(ScrollTrigger)

    // Check debug mode (?debug=1)
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      setShowDebug(urlParams.get("debug") === "1")
    }

    // Check low-data fallback
    if (checkFallbackConditions()) {
      setIsFallback(true)
      onPass1ProgressRef.current?.(100)
      onPass1CompleteRef.current?.()
      return
    }

    let isCancelled = false

    // Fetch manifest.json
    fetch(`/frames/manifest.json?t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Manifest fetch failed")
        return res.json()
      })
      .then((data) => {
        if (isCancelled || !stateRef.current.isMounted) return
        setManifest(data)
        initSequence(data)
      })
      .catch((err) => {
        console.warn("Could not load /frames/manifest.json, falling back to static poster:", err)
        if (!isCancelled && stateRef.current.isMounted) {
          setIsFallback(true)
          onPass1ProgressRef.current?.(100)
          onPass1CompleteRef.current?.()
        }
      })

    const initSequence = (m) => {
      // Determine device set: desktop if fine pointer & >= 900px, otherwise mobile
      const finePointer = window.matchMedia("(pointer: fine)").matches
      const isDesktop = finePointer && window.innerWidth >= 900
      const activeConfig = isDesktop ? m.desktop : m.mobile

      const totalFrames = activeConfig.count
      const pattern = activeConfig.pattern
      const version = m.version || "1"

      stateRef.current.manifest = m
      stateRef.current.isDesktop = isDesktop
      stateRef.current.totalFrames = totalFrames
      stateRef.current.pattern = pattern
      stateRef.current.version = version
      stateRef.current.frames = new Array(totalFrames).fill(null)
      stateRef.current.loadedMap = new Uint8Array(totalFrames)
      stateRef.current.loadedCount = 0

      // Initial canvas sizing
      handleResize()
      window.addEventListener("resize", handleResize, { passive: true })
      window.addEventListener("orientationchange", handleResize, { passive: true })

      // Tab visibility handling: pause tick when hidden
      const handleVisibility = () => {
        stateRef.current.isTabHidden = document.hidden
      }
      document.addEventListener("visibilitychange", handleVisibility)

      // GSAP ScrollTrigger for 0 to 1 scroll progression
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          stateRef.current.targetProgress = self.progress

          // Fallback poster crossfade near footer (last 10% of page)
          if (self.progress > 0.90) {
            const p = (self.progress - 0.90) / 0.10
            setPosterEndOpacity(Math.min(1, Math.max(0, p)))
          } else {
            setPosterEndOpacity(0)
          }
        },
      })

      // Frame loader helper: Plain Image objects with ?v=<version>
      const loadFrame = (index) => {
        return new Promise((resolve) => {
          if (!stateRef.current.isMounted) return resolve(null)
          if (stateRef.current.loadedMap[index] === 1) {
            return resolve(stateRef.current.frames[index])
          }

          let settled = false
          const finish = (result) => {
            if (settled) return
            settled = true
            clearTimeout(timeoutId)
            resolve(result)
          }

          const timeoutId = setTimeout(() => finish(null), 1500)

          const img = new Image()
          const frameNum = index + 1
          const paddedNum = String(frameNum).padStart(4, "0")
          const frameSrc = `/frames/${pattern.replace("%04d", paddedNum)}?v=${version}`

          img.onload = () => {
            if (!stateRef.current.isMounted) return finish(null)
            stateRef.current.frames[index] = img
            stateRef.current.loadedMap[index] = 1
            stateRef.current.loadedCount++
            finish(img)
          }

          img.onerror = () => {
            // If frame fails, resolve null (graceful degradation)
            finish(null)
          }

          img.src = frameSrc
        })
      }

      // PASS 1: Every 6th frame (indices: 0, 6, 12, 18, ..., totalFrames - 1)
      const pass1Indices = new Set()
      pass1Indices.add(0)
      for (let i = 0; i < totalFrames; i += 6) {
        pass1Indices.add(i)
      }
      pass1Indices.add(totalFrames - 1)
      const pass1List = Array.from(pass1Indices).sort((a, b) => a - b)

      // PASS 2: Every 3rd frame not in Pass 1
      const pass2List = []
      for (let i = 0; i < totalFrames; i += 3) {
        if (!pass1Indices.has(i)) pass2List.push(i)
      }

      // PASS 3: Remaining frames
      const pass3List = []
      for (let i = 0; i < totalFrames; i++) {
        if (!pass1Indices.has(i) && !pass2List.includes(i)) {
          pass3List.push(i)
        }
      }

      // Execute Pass 1 with concurrency = 6
      let pass1Loaded = 0
      const totalPass1 = pass1List.length

      const runPass1 = () => {
        let active = 0
        let nextIdx = 0
        let pass1Completed = false

        // Absolute safety watchdog: Pass 1 should NEVER hold back the site for more than 2.0s
        const pass1Watchdog = setTimeout(() => {
          if (!pass1Completed && stateRef.current.isMounted) {
            notifyComplete()
          }
        }, 2000)

        const notifyComplete = () => {
          if (pass1Completed) return
          pass1Completed = true
          clearTimeout(fastTimer)
          clearTimeout(pass1Watchdog)
          onPass1ProgressRef.current?.(100)
          onPass1CompleteRef.current?.()
          setTimeout(() => {
            if (typeof window !== "undefined") {
              ScrollTrigger.refresh()
            }
          }, 60)
          startBackgroundPasses()
        }

        // Fast-path safety: if first 4 frames load within 1.0s, allow completion
        const fastTimer = setTimeout(() => {
          if (!pass1Completed && stateRef.current.isMounted && pass1Loaded >= 4) {
            notifyComplete()
          }
        }, 1000)

        const pump = () => {
          if (!stateRef.current.isMounted) return

          while (active < 6 && nextIdx < totalPass1) {
            const frameIndex = pass1List[nextIdx++]
            active++

            loadFrame(frameIndex).then((loadedImg) => {
              if (!stateRef.current.isMounted) return
              active--
              pass1Loaded++

              // Immediately draw first frame when index 0 arrives
              if (frameIndex === 0 && loadedImg) {
                drawBlendedFrame(0)
                stateRef.current.lastDrawnDecimalPos = 0
              }

              const pct = Math.min(100, Math.floor((pass1Loaded / totalPass1) * 100))
              onPass1ProgressRef.current?.(pct)

              if (pass1Loaded >= totalPass1) {
                clearTimeout(fastTimer)
                notifyComplete()
              } else {
                pump()
              }
            })
          }
        }

        pump()
      }

      // Background loading for Pass 2 and Pass 3 (4 requests at a time)
      const startBackgroundPasses = () => {
        const remainingQueue = [...pass2List, ...pass3List]
        let activeRequests = 0
        const concurrency = 4

        const pumpBackground = () => {
          if (!stateRef.current.isMounted) return

          while (activeRequests < concurrency && remainingQueue.length > 0) {
            const nextFrameIndex = remainingQueue.shift()
            activeRequests++

            loadFrame(nextFrameIndex).finally(() => {
              activeRequests--
              if (typeof window !== "undefined" && "requestIdleCallback" in window) {
                window.requestIdleCallback(() => pumpBackground(), { timeout: 80 })
              } else {
                setTimeout(pumpBackground, 16)
              }
            })
          }
        }

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          window.requestIdleCallback(() => pumpBackground(), { timeout: 120 })
        } else {
          setTimeout(pumpBackground, 40)
        }
      }

      runPass1()

      // MAIN RAF ANIMATION LOOP
      const tick = (now) => {
        const s = stateRef.current

        if (!s.isTabHidden && s.totalFrames > 0) {
          // 1. Smooth scroll progress: current += (target - current) * 0.12
          s.currentProgress += (s.targetProgress - s.currentProgress) * 0.12

          // 2. Slow canvas zoom from 1.0 to 1.05 over the whole page (transform only)
          const scale = 1.0 + s.currentProgress * 0.05
          if (wrapperRef.current) {
            wrapperRef.current.style.transform = `scale(${scale.toFixed(4)})`
          }

          // 3. Map scroll progress (0 to 1) to frame ratio using section milestones
          const frameRatio = getFrameRatioFromScroll(s.currentProgress, s.sectionMilestones)
          const decimalPos = frameRatio * (s.totalFrames - 1)

          // 4. Memory optimization: decode() only on frames near current position (within 8 frames)
          const centerIdx = Math.round(decimalPos)
          const decodeStart = Math.max(0, centerIdx - 8)
          const decodeEnd = Math.min(s.totalFrames - 1, centerIdx + 8)
          for (let i = decodeStart; i <= decodeEnd; i++) {
            const img = s.frames[i]
            if (img && !img._decoded && img.decode) {
              img._decoded = true
              img.decode().catch(() => {})
            }
          }

          // 5. Blending & draw optimization: draw only when position changed
          const posDelta = Math.abs(decimalPos - s.lastDrawnDecimalPos)
          if (posDelta >= 0.005 || s.lastDrawnDecimalPos < 0) {
            drawBlendedFrame(decimalPos)
            s.lastDrawnDecimalPos = decimalPos
          }

          // 6. FPS counter & Debug overlay
          s.fpsCount++
          if (now - s.lastFpsTime >= 500) {
            s.fps = Math.round((s.fpsCount * 1000) / (now - s.lastFpsTime))
            s.fpsCount = 0
            s.lastFpsTime = now

            if (showDebug) {
              setDebugData({
                scrollProgress: Number(s.currentProgress.toFixed(3)),
                framePosition: Number(decimalPos.toFixed(2)),
                currentFrame: Math.round(decimalPos) + 1,
                totalFrames: s.totalFrames,
                loadedCount: s.loadedCount,
                loadedPercent: Number(((s.loadedCount / s.totalFrames) * 100).toFixed(1)),
                fps: s.fps,
                mode: s.isDesktop ? "desktop" : "mobile",
              })
            }
          }
        }

        animFrameRef.current = requestAnimationFrame(tick)
      }

      animFrameRef.current = requestAnimationFrame(tick)

      // Store cleanup on stateRef
      stateRef.current.cleanup = () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("orientationchange", handleResize)
        document.removeEventListener("visibilitychange", handleVisibility)
        scrollTriggerInstance.kill()
      }
    }

    return () => {
      isCancelled = true
      stateRef.current.isMounted = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (stateRef.current.cleanup) stateRef.current.cleanup()
    }
  }, [checkFallbackConditions, drawBlendedFrame, handleResize, showDebug])

  const posterVersion = manifest?.version ? `?v=${manifest.version}` : ""

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Canvas wrapper with very slow zoom (1.0 -> 1.05) */}
      <div
        ref={wrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin: "center center",
          transform: "scale(1)",
        }}
      >
        {/* Poster 1 (Underneath canvas until first frame renders; also primary fallback) */}
        <img
          src={`/frames/poster.webp${posterVersion}`}
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
            src={`/frames/poster-end.webp${posterVersion}`}
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

      {/* Layer: Soft Dark Gradient Scrim (Lightened so background animation is clearly visible) */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-1/2 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(7, 9, 8, 0.40) 0%, rgba(7, 9, 8, 0.12) 60%, transparent 100%)",
        }}
      />

      {/* Subtle vignette to preserve edge contrast without crushing video vibrancy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 65%, rgba(7, 9, 8, 0.20) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070908]/25 via-transparent to-[#070908]/30 pointer-events-none" />

      {/* Debug Overlay (?debug=1 only) */}
      {showDebug && (
        <aside
          aria-label="Frame Sequence Debug Overlay"
          className="fixed bottom-4 right-4 z-50 bg-[#070908]/92 text-[#F3EFEA] border border-white/20 rounded-lg p-3 font-mono text-xs shadow-2xl backdrop-blur-md pointer-events-auto select-text space-y-1 min-w-[230px]"
        >
          <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider border-b border-white/10 pb-1 mb-1">
            Village Frame Sequence HUD
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
            <span className="text-neutral-400">Frame Pos:</span>
            <span className="text-amber-300 font-semibold">
              #{debugData.framePosition.toFixed(1)} / {debugData.totalFrames}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Current Int:</span>
            <span className="text-white font-semibold">
              #{debugData.currentFrame}
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
