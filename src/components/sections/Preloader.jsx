import React, { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

export function Preloader({ onComplete, progress = null, isReady = false }) {
  const { t } = useLanguage()
  const [phase, setPhase] = useState("counting") // 'counting' | 'splitting' | 'done'
  const [counter, setCounter] = useState(0)
  const letters = ["B", "A", "H", "I", "N", "A"]
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const progressRef = useRef(progress)
  progressRef.current = progress
  const isReadyRef = useRef(isReady)
  isReadyRef.current = isReady
  const completedRef = useRef(false)

  const triggerComplete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    setPhase("splitting")
    try {
      sessionStorage.setItem("bahina_preloader_seen", "true")
    } catch (e) {}
    setTimeout(() => {
      setPhase("done")
      onCompleteRef.current?.()
    }, 500)
  }, [])

  useEffect(() => {
    // Skip on repeat visits in the same session and for prefers-reduced-motion
    let alreadyVisited = false
    try {
      alreadyVisited = typeof window !== "undefined" && sessionStorage.getItem("bahina_preloader_seen")
    } catch (e) {
      alreadyVisited = false
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion || alreadyVisited) {
      setPhase("done")
      onCompleteRef.current?.()
      return
    }

    // Safety fallback: ensure preloader never stays on screen longer than 1.4s
    const safetyTimer = setTimeout(() => {
      triggerComplete()
    }, 1400)

    // Smooth counter animation: strictly runs once on mount
    const startTime = performance.now()
    const targetDuration = 1000 // 1 second target count

    let animId = null
    const step = (now) => {
      const elapsed = now - startTime
      const timeRatio = Math.min(elapsed / targetDuration, 1)
      const timePacedProgress = Math.floor(timeRatio * 100)
      const currentRealProgress = typeof progressRef.current === "number" ? progressRef.current : 0
      const effectiveTarget = Math.max(timePacedProgress, currentRealProgress)

      setCounter((prev) => {
        if (isReadyRef.current || currentRealProgress >= 100 || elapsed >= 1150) {
          const next = prev + Math.max(4, Math.ceil((100 - prev) * 0.4))
          if (next >= 100) {
            triggerComplete()
            return 100
          }
          return next
        } else {
          // Smoothly advance without freezing
          if (prev < effectiveTarget) {
            return prev + Math.max(1, Math.ceil((effectiveTarget - prev) * 0.25))
          }
          return prev
        }
      })

      if (!completedRef.current) {
        animId = requestAnimationFrame(step)
      }
    }

    animId = requestAnimationFrame(step)

    return () => {
      clearTimeout(safetyTimer)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [triggerComplete])

  if (phase === "done") return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
      {/* 1.2-1.7s: Screen splits into two panels that slide up and down away */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === "splitting" ? "-100%" : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#070908] z-50 border-b border-white/5"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === "splitting" ? "100%" : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#070908] z-50 border-t border-white/5"
      />

      {/* Preloader Center Content (fades out slightly before splitting) */}
      <AnimatePresence>
        {phase === "counting" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center text-[#F3EFEA]"
          >
            {/* Letters of BAHINA rising in one by one */}
            <div className="flex items-center space-x-3 mb-6">
              {letters.map((letter, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.2em] text-[#F3EFEA]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="font-sans text-[12px] uppercase tracking-[0.2em] text-neutral-400 font-semibold text-center px-4"
            >
              {t("preloader.tagline")}
            </motion.p>

            {/* Fraunces Counter 0 to 100 */}
            <div className="mt-8 flex items-baseline space-x-1 font-display text-2xl font-light text-white/90">
              <span className="w-12 text-right">{counter}</span>
              <span className="text-sm font-sans text-neutral-500 font-normal">%</span>
            </div>

            {/* 1px progress track */}
            <div className="mt-4 h-[1.5px] w-28 overflow-hidden bg-white/10 rounded-full">
              <div
                className="h-full bg-white transition-all duration-75 ease-out rounded-full"
                style={{ width: `${counter}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Preloader
