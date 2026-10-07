import React, { useState, useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { RURAL_CONFIG } from "@/data/config"

/**
 * WelcomeOverlay
 * 
 * Clean, cinematic, mobile-responsive welcome video overlay:
 * - Plays automatically on 1st website load.
 * - Zero player controls: NO play button, NO timeline / progress bar.
 * - Only the clean, accessible Skip button ("Skip" / "वगळा") in the top-right corner.
 * - Responsive presentation: Edge-to-edge on desktop (object-cover), and zero-crop contained
 *   with ambient blurred backdrop on mobile/portrait screens (object-contain).
 * - Smoothly dissolves out (700ms cinematic ease) to reveal the actual website at the end or on skip.
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPortraitScreen, setIsPortraitScreen] = useState(false)

  // Detect viewport aspect ratio and orientation for mobile portrait optimization
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

  const videoSource = RURAL_CONFIG.welcomeVideo
  const posterSource = RURAL_CONFIG.welcomePoster

  // Smooth close handler: fades out gracefully to reveal website underneath
  const handleClose = useCallback(() => {
    if (hasClosedRef.current) return
    hasClosedRef.current = true
    setIsFadingOut(true)

    // 800ms smooth cinematic dissolve into the main landing page
    setTimeout(() => {
      const video = videoRef.current
      if (video) {
        try {
          video.pause()
          video.currentTime = 0
          video.removeAttribute("src")
          video.load()
        } catch (e) {}
      }
      onClose()

      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus()
      }
    }, 800)
  }, [onClose])

  // Dialog lifecycle, focus management, Escape key, and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    hasClosedRef.current = false
    setIsFadingOut(false)
    setIsPlaying(false)
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

  // Safety fallback watchdog: only triggers if video fails to load/play after 12 seconds
  useEffect(() => {
    if (!isOpen || isPlaying) return
    const stallTimer = setTimeout(() => {
      // If after 12s the video still hasn't started playing, smoothly open website
      handleClose()
    }, 12000)
    return () => clearTimeout(stallTimer)
  }, [isOpen, isPlaying, handleClose])

  // Seamlessly unmute audio on user interaction without restarting playback
  const enableAudio = useCallback(() => {
    const video = videoRef.current
    if (video && video.muted) {
      video.muted = false
      video.volume = 1.0
    }
  }, [])

  // Auto-listen for any initial screen interaction (touch, click, key) to seamlessly unmute
  useEffect(() => {
    if (!isOpen) return

    const handleInteraction = () => {
      enableAudio()
    }

    const events = ["pointerdown", "touchstart", "click", "keydown"]
    events.forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { once: true, passive: true })
    })

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleInteraction)
      })
    }
  }, [isOpen, enableAudio])

  // Play video with audio enabled immediately on mount
  useEffect(() => {
    if (!isOpen) return
    const video = videoRef.current
    if (!video) return

    video.playsInline = true
    video.volume = 1.0

    const attemptPlay = () => {
      // 1. Try playing with audio enabled immediately
      video.muted = false
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // 2. If browser autoplay policy blocks unmuted audio on cold load,
            // start video playback muted so visitor isn't stalled, and wait for first gesture to unmute & sync
            video.muted = true
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => {})
          })
      }
    }

    attemptPlay()
  }, [isOpen, videoSource])

  // Handle canplay to ensure playback begins with audio as soon as first frames are ready
  const handleCanPlay = () => {
    const video = videoRef.current
    if (video && video.paused) {
      video.muted = false
      video.volume = 1.0
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          video.muted = true
          video.play()
            .then(() => setIsPlaying(true))
            .catch(() => {})
        })
    }
  }

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
      onClick={enableAudio}
      style={{
        minHeight: "100svh",
        height: "100dvh",
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black text-white outline-none select-none transition-opacity duration-700 ease-in-out overflow-hidden ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. Ambient Background Layer (fills letterbox space on mobile portrait with blurred poster) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <img
          src={posterSource}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-110"
          style={{
            filter: "blur(28px) brightness(0.55)",
          }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* 2. Top-Right: ONLY the Skip Button ("वगळा" / "Skip", min 48px touch target) */}
      <div
        className="absolute z-30 flex items-center justify-end"
        style={{
          top: "max(1.25rem, env(safe-area-inset-top, 1.25rem))",
          right: "max(1.25rem, env(safe-area-inset-right, 1.25rem))",
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 hover:border-[#D9A441] text-[#F3EFEA] hover:text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md active:scale-95 shadow-2xl min-h-[48px] min-w-[48px] transition-all cursor-pointer"
          aria-label={t("welcome.skipAria")}
        >
          <span>{t("welcome.skip")}</span>
          <X className="h-4 w-4 text-[#D9A441]" />
        </button>
      </div>

      {/* 3. The Video:
          - Computer screens: Full screen edge-to-edge (object-cover).
          - Mobile phones in portrait: Fully contained without cropping text (object-contain).
          - ZERO controls: No play button, no timeline, only pure video playback.
      */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoSource}
          poster={posterSource}
          autoPlay
          playsInline
          webkit-playsinline="true"
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          onCanPlay={handleCanPlay}
          onPlaying={() => setIsPlaying(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleClose}
          onError={() => {
            // Graceful fallback if any media error occurs
            handleClose()
          }}
          className={`welcome-video-clean w-full h-full ${
            isPortraitScreen ? "object-contain" : "object-cover"
          } md:object-cover drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] pointer-events-none`}
        />
      </div>

      {/* Subtle loader notice if background frames are still finishing */}
      {!isPageReady && (
        <div className="absolute bottom-4 inset-x-0 text-center text-[11px] text-white/70 font-sans pointer-events-none z-30 tracking-wider">
          {t("welcome.loading")}
        </div>
      )}
    </div>
  )
}

export default WelcomeOverlay

