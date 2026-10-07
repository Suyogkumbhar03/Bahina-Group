import React, { useState, useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { RURAL_CONFIG } from "@/data/config"

/**
 * WelcomeOverlay
 * 
 * Clean, cinematic, mobile-responsive welcome video overlay:
 * - Computer screens: Edge-to-edge full screen (object-cover).
 * - Mobile portrait: Zero-crop guarantee (object-contain with ambient blurred background layer).
 * - Minimal controls: Timeline, play button, sound button, captions, and language switch REMOVED.
 * - Only the clean, accessible Skip button ("Skip" / "वगळा") in the top-right corner.
 * - Silent/muted playback compliant with browser autoplay policies.
 * - Smoothly fades out and reveals the website when video finishes or skip is clicked.
 */
export function WelcomeOverlay({
  isOpen,
  onClose,
  isPageReady = true,
}) {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)
  const hasClosedRef = useRef(false)

  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isPortraitScreen, setIsPortraitScreen] = useState(false)
  const [portraitMediaAvailable, setPortraitMediaAvailable] = useState(false)

  // Check if optional vertical video exists (welcome-portrait.mp4)
  useEffect(() => {
    let active = true
    fetch("/video/welcome-portrait.mp4", { method: "HEAD" })
      .then((res) => {
        if (active && res.ok) {
          setPortraitMediaAvailable(true)
        }
      })
      .catch(() => {
        // Missing vertical video is expected and gracefully handled
      })
    return () => { active = false }
  }, [])

  // Detect viewport aspect ratio and orientation
  useEffect(() => {
    const updateViewport = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      setIsPortraitScreen(h > w || (typeof window.matchMedia === "function" && window.matchMedia("(orientation: portrait)").matches))
    }

    updateViewport()
    window.addEventListener("resize", updateViewport, { passive: true })
    window.addEventListener("orientationchange", updateViewport, { passive: true })
    return () => {
      window.removeEventListener("resize", updateViewport)
      window.removeEventListener("orientationchange", updateViewport)
    }
  }, [])

  // Choose vertical or landscape source
  const usePortrait = isPortraitScreen && portraitMediaAvailable
  const videoSource = usePortrait ? RURAL_CONFIG.welcomePortraitVideo : RURAL_CONFIG.welcomeVideo
  const posterSource = usePortrait ? RURAL_CONFIG.welcomePortraitPoster : RURAL_CONFIG.welcomePoster

  // Close handler with smooth fade-out
  const handleClose = useCallback(() => {
    if (hasClosedRef.current) return
    hasClosedRef.current = true
    setIsFadingOut(true)

    try {
      localStorage.setItem("bahina_welcome_seen", "1")
    } catch (e) {}

    setTimeout(() => {
      const video = videoRef.current
      if (video) {
        try {
          video.pause()
          video.currentTime = 0
          video.src = ""
          video.load()
        } catch (e) {}
      }
      onClose()

      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus()
      }
    }, 450)
  }, [onClose])

  // Dialog open/close, focus management, Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    hasClosedRef.current = false
    setIsFadingOut(false)
    previousFocusRef.current = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    setTimeout(() => {
      dialogRef.current?.focus()
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleClose])

  // Safety watchdog: 9.2s max duration so visitor is NEVER trapped
  useEffect(() => {
    if (!isOpen) return
    const watchdogTimer = setTimeout(() => {
      handleClose()
    }, 9200)
    return () => clearTimeout(watchdogTimer)
  }, [isOpen, handleClose])

  // Start video automatically muted (browser policy compliant)
  useEffect(() => {
    if (!isOpen) return
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.play().catch(() => {})
  }, [isOpen, videoSource])

  // Smoothly close when reaching end of video
  const handleTimeUpdate = (e) => {
    const v = e.currentTarget
    if (v.duration > 0 && v.currentTime >= v.duration - 0.25) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("welcome.dialogAria")}
      tabIndex={-1}
      style={{
        minHeight: "100svh",
        height: "100dvh",
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white outline-none select-none transition-opacity duration-500 ease-out overflow-hidden ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. Ambient Background Layer (fills letterbox space on mobile portrait with blurred copy) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <img
          src={posterSource}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-110"
          style={{
            filter: "blur(24px) brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* 2. Top Bar: Only the Skip Button ("वगळा" / "Skip", >=52px touch target) */}
      <div
        className="absolute z-30 flex items-center justify-end"
        style={{
          top: "max(1rem, env(safe-area-inset-top, 1rem))",
          right: "max(1rem, env(safe-area-inset-right, 1rem))",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-black/75 hover:bg-black/90 border border-white/25 hover:border-[#D9A441] text-[#F3EFEA] hover:text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md active:scale-95 shadow-2xl min-h-[52px] min-w-[52px] transition-all cursor-pointer"
          aria-label={t("welcome.skipAria")}
        >
          <span>{t("welcome.skip")}</span>
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 3. The Video:
          - Computer screens: Full screen edge-to-edge (object-cover).
          - Mobile phones in portrait: Fully contained without cropping text (object-contain).
      */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoSource}
          poster={posterSource}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleClose}
          onError={handleClose}
          className={`w-full h-full ${
            isPortraitScreen ? "object-contain" : "object-cover"
          } md:object-cover drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] pointer-events-none`}
        />
      </div>

      {/* Subtle loader notice if background frames are still finishing */}
      {!isPageReady && (
        <div className="absolute bottom-3 inset-x-0 text-center text-[11px] text-neutral-400 font-sans pointer-events-none z-30">
          {t("welcome.loading")}
        </div>
      )}
    </div>
  )
}

export default WelcomeOverlay
