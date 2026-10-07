import React, { useState, useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { RURAL_CONFIG } from "@/config"

/**
 * WelcomeOverlay
 * 
 * Minimalist, cinematic welcome video overlay:
 * - Starts playing instantly without getting stuck (native autoPlay + muted attributes).
 * - Safety watchdog timer (9.2s max for the 8.07s video) ensures it NEVER hangs or gets stuck.
 * - onError and onTimeUpdate fallbacks trigger smooth fade-out if buffering or network stalls.
 * - Only the clean Skip button is shown in the top-right corner.
 * - Fullscreen object-cover edge-to-edge layout.
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

  // Smooth fade-out close handler
  const handleClose = useCallback(() => {
    if (hasClosedRef.current) return
    hasClosedRef.current = true
    setIsFadingOut(true)

    // Remember seen state in localStorage
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

      // Return focus to page
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus()
      }
    }, 500)
  }, [onClose])

  // Handle dialog opening / closing, focus trap, and scroll lock
  useEffect(() => {
    if (!isOpen) return

    hasClosedRef.current = false
    setIsFadingOut(false)
    previousFocusRef.current = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    // Focus the dialog
    setTimeout(() => {
      dialogRef.current?.focus()
    }, 50)

    // Keydown listener for Escape and Tab trap
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
      } else if (e.key === "Tab") {
        if (!dialogRef.current) return
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleClose])

  // SAFETY WATCHDOG TIMER:
  // welcome.mp4 is 8.07 seconds long.
  // If after 9.2 seconds the video hasn't naturally closed, close it automatically!
  // This guarantees the visitor NEVER gets stuck on the preload screen.
  useEffect(() => {
    if (!isOpen) return

    const watchdogTimer = setTimeout(() => {
      handleClose()
    }, 9200)

    return () => clearTimeout(watchdogTimer)
  }, [isOpen, handleClose])

  // Video playback attempt with audio unmute check
  useEffect(() => {
    if (!isOpen) return

    const video = videoRef.current
    if (!video) return

    // Video starts muted automatically via JSX attributes so it never blocks
    // Attempt to unmute after 80ms if the browser allows audio
    const audioTimer = setTimeout(() => {
      if (!video) return
      video.muted = false
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks sound autoplay, keep playing muted seamlessly
          video.muted = true
          video.play().catch(() => {})
        })
      }
    }, 80)

    return () => clearTimeout(audioTimer)
  }, [isOpen])

  // Tap anywhere on video to unmute if browser kept it muted
  const handleVideoClick = () => {
    const video = videoRef.current
    if (video) {
      video.muted = false
      video.play().catch(() => {})
    }
  }

  // Monitor playback progress: when within 0.2s of end, transition smoothly
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070908] text-white outline-none select-none transition-opacity duration-500 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Fullscreen Video Viewport (Edge-to-edge object-cover) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-[#070908]">
        <video
          ref={videoRef}
          src={RURAL_CONFIG.welcomeVideo}
          poster={RURAL_CONFIG.welcomePoster}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleClose}
          onError={handleClose}
          onTimeUpdate={handleTimeUpdate}
          onClick={handleVideoClick}
          className="w-full h-full min-w-full min-h-full object-cover cursor-pointer"
        />
      </div>

      {/* ONLY Control: Clean, prominent Skip button */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30">
        <button
          onClick={handleClose}
          type="button"
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-black/65 hover:bg-black/85 border border-white/25 text-[#F3EFEA] hover:text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 shadow-2xl min-h-[52px]"
          aria-label={t("welcome.skipAria")}
        >
          <span>{t("welcome.skip")}</span>
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Subtle loader notice if frames are still finalizing in background */}
      {!isPageReady && (
        <div className="absolute bottom-6 inset-x-0 text-center text-xs text-neutral-400 font-sans pointer-events-none z-30">
          {t("welcome.loading")}
        </div>
      )}
    </div>
  )
}

export default WelcomeOverlay
