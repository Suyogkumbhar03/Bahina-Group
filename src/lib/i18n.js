import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { en } from "@/locales/en"
import { mr } from "@/locales/mr"

const translations = { en, mr }

const LanguageContext = createContext(null)

/**
 * Determine initial language following the strict 5-tier fallback order:
 * 1. URL search param: ?lang=mr or ?lang=en
 * 2. URL path: /mr
 * 3. Visitor's choice saved in localStorage (wrapped in try/catch)
 * 4. Browser language starts with 'mr'
 * 5. Default English
 */
function getInitialLanguage() {
  if (typeof window === "undefined") return "en"

  try {
    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get("lang")?.toLowerCase()
    if (urlLang === "mr" || urlLang === "en") {
      return urlLang
    }
  } catch (e) {}

  try {
    const path = window.location.pathname.toLowerCase()
    if (path === "/mr" || path.startsWith("/mr/")) {
      return "mr"
    }
  } catch (e) {}

  try {
    const saved = localStorage.getItem("bahina_lang")?.toLowerCase()
    if (saved === "mr" || saved === "en") {
      return saved
    }
  } catch (e) {}

  try {
    const browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase()
    if (browserLang.startsWith("mr")) {
      return "mr"
    }
  } catch (e) {}

  return "en"
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)
  const [isFading, setIsFading] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const isInitialMount = useRef(true)

  // Dynamically ensure Devanagari Google Fonts are loaded with font-display: swap
  const loadMarathiFonts = useCallback(() => {
    if (typeof document === "undefined") return
    const fontLinkId = "google-fonts-noto-devanagari"
    if (!document.getElementById(fontLinkId)) {
      const link = document.createElement("link")
      link.id = fontLinkId
      link.rel = "stylesheet"
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;600;700&display=swap"
      document.head.appendChild(link)
    }
  }, [])

  // Translation function with English fallback and missing key warning in development
  const t = useCallback(
    (key, fallback = "") => {
      const activeDict = translations[language] || translations.en
      const val = activeDict[key]

      if (val !== undefined && val !== null) {
        return val
      }

      // Fallback to English dictionary
      const enVal = translations.en[key]
      if (enVal !== undefined && enVal !== null) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[i18n] Missing key "${key}" for language "${language}". Falling back to English.`)
        }
        return enVal
      }

      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing key "${key}" in both "${language}" and English.`)
      }
      return fallback || key
    },
    [language]
  )

  // Apply side-effects whenever language changes
  const applyLanguageEffects = useCallback(
    (targetLang) => {
      if (typeof document === "undefined") return

      // Update <html lang="...">
      document.documentElement.lang = targetLang

      // If Marathi, ensure fonts are requested
      if (targetLang === "mr") {
        loadMarathiFonts()
      }

      // Update document title and meta description
      const title = translations[targetLang]?.["meta.title"] || translations.en["meta.title"]
      const desc = translations[targetLang]?.["meta.description"] || translations.en["meta.description"]
      document.title = title

      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute("content", desc)
      }

      // Screen reader announcement via aria-live
      const announcedMsg =
        targetLang === "mr" ? "भाषा मराठीत बदलली आहे" : "Language changed to English"
      setAnnouncement(announcedMsg)

      // Refresh GSAP ScrollTrigger after font readiness and reflow
      const refreshScroll = () => {
        if (typeof window !== "undefined" && typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh()
        }
      }

      if (document.fonts) {
        document.fonts.ready.then(() => {
          setTimeout(refreshScroll, 100)
          setTimeout(refreshScroll, 300)
        })
      } else {
        setTimeout(refreshScroll, 200)
      }
    },
    [loadMarathiFonts]
  )

  // Initialize on mount
  useEffect(() => {
    applyLanguageEffects(language)
    isInitialMount.current = false
  }, [language, applyLanguageEffects])

  // Language switch handler with smooth 200ms text fade & scroll position preservation
  const setLanguage = useCallback(
    (nextLang) => {
      if (nextLang !== "en" && nextLang !== "mr") return
      if (nextLang === language) return

      const scrollPos = typeof window !== "undefined" ? window.scrollY : 0

      // Fade out for 200ms
      setIsFading(true)

      setTimeout(() => {
        // Save to localStorage
        try {
          localStorage.setItem("bahina_lang", nextLang)
        } catch (e) {}

        // Update URL query param cleanly without reload
        try {
          const url = new URL(window.location.href)
          url.searchParams.set("lang", nextLang)
          window.history.replaceState({}, "", url.toString())
        } catch (e) {}

        setLanguageState(nextLang)
        applyLanguageEffects(nextLang)

        // Keep scroll position
        if (typeof window !== "undefined") {
          window.scrollTo(0, scrollPos)
        }

        // Fade in
        setTimeout(() => {
          setIsFading(false)
          // Reinforce scroll position once DOM settles
          if (typeof window !== "undefined") {
            window.scrollTo(0, scrollPos)
          }
        }, 50)
      }, 200)
    },
    [language, applyLanguageEffects]
  )

  const value = {
    language,
    setLanguage,
    t,
    isFading,
    isMarathi: language === "mr",
  }

  return React.createElement(
    LanguageContext.Provider,
    { value },
    // Hidden live region for accessibility announcements
    React.createElement(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
      },
      announcement
    ),
    // Wrapped content with 200ms crossfade
    React.createElement(
      "div",
      {
        className: `transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"}`,
      },
      children
    )
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export default LanguageProvider
