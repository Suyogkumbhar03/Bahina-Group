import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sprout, Menu, X, ArrowLeft, Heart, ExternalLink } from "lucide-react"

export function FoundationNavbar({ onOpenDonate, onBackToMain }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "About Us", href: "#about-foundation" },
    { name: "Active Causes", href: "#active-causes" },
    { name: "Focus Areas", href: "#focus-areas" },
    { name: "Our Impact", href: "#impact" },
    { name: "Stories", href: "#stories" },
    { name: "Our Model", href: "#catalyze" },
    { name: "Voices", href: "#testimonials" },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex flex-col items-center pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
        <nav
          className="pointer-events-auto relative flex items-center justify-between w-full max-w-7xl rounded-full bg-[#07190F]/85 backdrop-blur-md border border-[#3E9B63]/25 py-2.5 px-4 sm:px-6 shadow-2xl transition-all"
          aria-label="Bahina Foundation Navigation"
        >
          {/* Logo with Green Leaf Sprout */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToMain}
              className="group flex items-center space-x-2.5 text-left focus:outline-none"
              title="Return to Bahina Group Main Site"
            >
              <img
                src="/logo-mark.png"
                alt="Bahina Group Emblem"
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow"
              />
              <div className="flex flex-col">
                <span className="font-display text-base sm:text-lg tracking-[0.14em] font-semibold text-white leading-none">
                  BAHINA
                </span>
                <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.18em] text-[#4ADE80] mt-0.5">
                  Foundation
                </span>
              </div>
            </button>

            {/* Back to main site pill button (Desktop) */}
            <button
              onClick={onBackToMain}
              className="hidden md:inline-flex items-center space-x-1.5 ml-3 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Bahina Group</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-2.5 py-1 text-xs font-sans font-medium uppercase tracking-[0.08em] text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action: DONATE NOW + Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenDonate}
              className="relative inline-flex items-center justify-center space-x-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#184E2E] hover:bg-[#1E623A] border border-[#3E9B63]/60 text-white font-sans text-xs uppercase font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg min-h-[38px]"
            >
              <Heart className="w-3.5 h-3.5 text-[#4ADE80] fill-current" />
              <span>Donate Now</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#07190F] border-l border-[#3E9B63]/20 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src="/logo-mark.png"
                      alt="Bahina Group Emblem"
                      className="h-8 w-auto object-contain"
                    />
                    <span className="font-display text-lg font-semibold text-white">
                      BAHINA Foundation
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white/5 text-neutral-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Return to main site button inside mobile menu */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onBackToMain()
                  }}
                  className="w-full mt-4 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-sans uppercase font-semibold text-neutral-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to BAHINA Group</span>
                </button>

                {/* Links */}
                <nav className="flex flex-col space-y-2 mt-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="py-2.5 px-3 rounded-lg text-sm font-sans font-medium text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenDonate()
                  }}
                  className="w-full py-3 rounded-full bg-[#E5B842] hover:bg-[#d8a832] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Make a Donation</span>
                </button>
                <p className="text-center text-[11px] text-neutral-400">
                  80G Tax Exemption Eligible • Section 8 NGO
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FoundationNavbar
