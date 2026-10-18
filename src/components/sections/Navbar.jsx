import React, { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Menu, ArrowUpRight } from "lucide-react"
import { Magnet } from "@/components/ui/Magnet"
import { StaggeredMenu } from "@/components/ui/staggered-menu"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { TextSizeControl } from "@/components/ui/text-size-control"
import { useLanguage } from "@/lib/i18n"

export function Navbar() {
  const { t, isMarathi } = useLanguage()
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("#about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  const navLinks = useMemo(
    () => [
      { name: t("nav.about"), href: "#about" },
      { name: t("nav.divisions"), href: "#divisions" },
      { name: t("nav.visionMission"), href: "#vision-mission" },
      { name: t("nav.focusAreas"), href: "#focus-areas" },
      { name: t("nav.values"), href: "#values" },
      { name: t("nav.approach"), href: "#approach" },
    ],
    [t]
  )

  // Track active section and hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 6) {
          setHidden(true)
        } else if (currentScrollY < lastScrollY.current - 6) {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY

      // Track active section for pill sliding indicator
      const scrollPos = currentScrollY + window.innerHeight * 0.35
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const id = navLinks[i].href.replace("#", "")
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].href)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navLinks])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex flex-col items-center pt-3 md:pt-5 px-3 md:px-4 pointer-events-none"
      >
        <nav
          className="pointer-events-auto relative flex items-center justify-between w-full max-w-7xl rounded-full nav-glass py-2 px-3 sm:px-4 md:px-5 lg:px-6 shadow-2xl transition-all"
          aria-label={t("nav.mainNavAria")}
        >
          {/* Magnet Wrapped Logo */}
          <div className="shrink-0">
            <Magnet magnetStrength={0.25} padding={30}>
              <a
                href="#"
                className="flex items-center space-x-2 text-[#F3EFEA] group py-1 px-1.5 sm:px-2 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                aria-label={t("nav.homeAria")}
              >
                <img
                  src="/logo-mark.png"
                  alt="BAHINA Group Emblem"
                  className="h-6 sm:h-7 w-auto object-contain group-hover:scale-105 transition-transform"
                />
                <span
                  lang="en"
                  className="font-display text-base sm:text-lg tracking-[0.14em] font-semibold text-white group-hover:opacity-85 transition-opacity whitespace-nowrap"
                >
                  BAHINA
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase font-sans font-semibold tracking-[0.12em] text-white/90 whitespace-nowrap">
                  {t("brand.group")}
                </span>
              </a>
            </Magnet>
          </div>

          {/* Desktop Pill Nav (1024px and above) */}
          <div className="hidden lg:flex items-center relative p-1 rounded-full bg-white/[0.03] mx-1 xl:mx-2 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-2 xl:px-3 py-1.5 text-[11px] xl:text-[12px] font-sans font-semibold uppercase tracking-[0.06em] whitespace-nowrap transition-colors duration-200 z-10 ${
                    isActive ? "text-white" : "text-neutral-100 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="pill-active-bg"
                      className="absolute inset-0 rounded-full bg-white/15 border border-white/20 -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Right Action Elements: Language Switcher + Contact + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0 pr-0.5 sm:pr-1">
            {/* Text Size Scaling Control (A, A+, A++) - visible on xl+ to avoid crowding on 1024-1279px viewports, always in mobile drawer */}
            <div className="hidden xl:inline-flex">
              <TextSizeControl compact />
            </div>

            {/* Language Switcher in Navbar (compact mode) */}
            <LanguageSwitcher compact />

            {/* Desktop Contact Button with Magnet */}
            <div className="hidden sm:block shrink-0">
              <Magnet magnetStrength={0.2} padding={20}>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-3 sm:px-3.5 py-1.5 transition-all duration-300 hover:border-white/50 hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 min-h-[34px] whitespace-nowrap"
                  data-cursor-label="Contact"
                >
                  <span className="block text-[11px] xl:text-[12px] font-sans font-semibold uppercase tracking-[0.08em] text-white group-hover:text-white transition-colors whitespace-nowrap">
                    {t("nav.contact")}
                  </span>
                  <ArrowUpRight className="h-3 w-3 ml-1 text-neutral-100 group-hover:text-white transition-colors shrink-0" />
                </a>
              </Magnet>
            </div>

            {/* Mobile Hamburger Trigger (below 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex lg:hidden p-2 rounded-full text-neutral-100 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 min-h-[44px] min-w-[44px] items-center justify-center"
              aria-label={t("nav.menuOpen")}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Magic UI Scroll Progress under the navbar */}
        <div className="w-full max-w-6xl px-6 mt-1 pointer-events-none">
          <ScrollProgress className="relative h-[2px] rounded-full overflow-hidden" />
        </div>
      </motion.header>

      {/* Mobile Staggered Menu */}
      <StaggeredMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}

export default Navbar
