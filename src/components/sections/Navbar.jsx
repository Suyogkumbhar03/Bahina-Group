import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ArrowUpRight } from "lucide-react"
import { BAHINA_CONTENT } from "@/data/content"
import { Magnet } from "@/components/ui/Magnet"
import { StaggeredMenu } from "@/components/ui/staggered-menu"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export function Navbar() {
  const { nav, brand } = BAHINA_CONTENT
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

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
      for (let i = nav.links.length - 1; i >= 0; i--) {
        const id = nav.links[i].href.replace("#", "")
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(nav.links[i].href)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [nav.links])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex flex-col items-center pt-4 md:pt-6 px-4 pointer-events-none"
      >
        <nav
          className="pointer-events-auto relative flex items-center justify-between w-full max-w-5xl rounded-full nav-glass py-2 px-4 md:px-6 shadow-2xl transition-all"
          aria-label="Main Navigation"
        >
          {/* Magnet Wrapped Logo */}
          <Magnet magnetStrength={0.25} padding={40}>
            <a
              href="#"
              className="flex items-center space-x-2 text-[#F3EFEA] group py-1 px-2 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              aria-label="BAHINA Group Home"
            >
              <span className="font-display text-lg tracking-[0.2em] font-semibold text-white group-hover:opacity-85 transition-opacity">
                {brand.shortName}
              </span>
              <span className="text-[11px] uppercase font-sans font-semibold tracking-[0.14em] text-neutral-400">
                Group
              </span>
            </a>
          </Magnet>

          {/* Desktop React Bits Pill Nav with sliding highlight */}
          <div className="hidden md:flex items-center relative p-1 rounded-full bg-white/[0.03]">
            {nav.links.map((link) => {
              const isActive = activeSection === link.href
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-[12px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors duration-200 z-10 ${
                    isActive ? "text-white" : "text-neutral-300 hover:text-white"
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

          {/* Right Action Button & Mobile Menu Trigger */}
          <div className="flex items-center space-x-2.5">
            {/* Desktop Contact Button with Magnet & Rolling Text */}
            <div className="hidden sm:block">
              <Magnet magnetStrength={0.2} padding={30}>
                <a
                  href={nav.cta.href}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-4 py-1.5 transition-all duration-300 hover:border-white/50 hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                  data-cursor-label="Contact"
                >
                  <div className="relative h-4 overflow-hidden">
                    <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      <span className="block text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-neutral-200">
                        {nav.cta.text}
                      </span>
                      <span className="block text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-white">
                        {nav.cta.text}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1.5 text-neutral-300 group-hover:text-white transition-colors" />
                </a>
              </Magnet>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden p-2 rounded-full text-neutral-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Thin Magic UI Scroll Progress under the navbar */}
        <div className="w-full max-w-5xl px-6 mt-1 pointer-events-none">
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
