import React, { useState, useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { RURAL_CONFIG } from "@/config"

/**
 * WelcomeOverlay
 * 
 * Minimalist, cinematic welcome video overlay:
 * - Plays welcome video automatically with recorded voice.
 * - Clean UI: ONLY the Skip button is displayed.
 * - When video finishes (onEnded) or Skip is clicked, smoothly fades out (0.5s)
 *   and reveals the fully loaded website.
 * - Fullscreen accessible dialog with focus trap and Escape key support.
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

  const [isFadingOut, setIsFadingOut] = useState(false)

  // Handle dialog opening / closing, focus trap, and scroll lock
  useEffect(() => {
    if (!isOpen) return

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
  }, [isOpen])

  // Start video playback when opened
  useEffect(() => {
    if (!isOpen) return

    setIsFadingOut(false)

    const timer = setTimeout(() => {
      const video = videoRef.current
      if (!video) return

      // Try playing unmuted first so visitor hears voice immediately
      video.muted = false
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks audio autoplay, fallback to muted autoplay
          video.muted = true
          video.play().catch(() => {})
        })
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [isOpen])

  // Smooth fade-out close handler
  const handleClose = useCallback(() => {
    setIsFadingOut(true)

    // Remember seen state in localStorage
    try {
      localStorage.setItem("bahina_welcome_seen", "1")
    } catch (e) {}

    setTimeout(() => {
      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
        video.src = ""
        video.load()
      }
      onClose()

      // Return focus to page
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus()
      }
    }, 500)
  }, [onClose])

  // Tap anywhere on video to unmute if browser initially muted it
  const handleVideoClick = () => {
    const video = videoRef.current
    if (video && video.muted) {
      video.muted = false
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
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={RURAL_CONFIG.welcomeVideo}
          poster={RURAL_CONFIG.welcomePoster}
          playsInline
          preload="auto"
          onEnded={handleClose}
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
