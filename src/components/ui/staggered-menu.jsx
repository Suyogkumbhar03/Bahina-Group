import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowUpRight } from "lucide-react"
import { BAHINA_CONTENT } from "@/data/content"

export function StaggeredMenu({ isOpen, onClose }) {
  const { nav, brand, divisions } = BAHINA_CONTENT

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          {/* Layer 1: Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Layer 2: Decorative accent panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-[#0E1210] border-l border-white/10 shadow-2xl flex flex-col justify-between p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center space-x-2">
                <span className="font-display text-2xl font-light tracking-[0.16em] text-white">
                  {brand.shortName}
                </span>
                <span className="text-[12px] uppercase font-sans font-semibold tracking-[0.14em] text-neutral-400">
                  Group
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links with Staggered Entrance */}
            <nav className="flex flex-col space-y-4 my-auto py-6" aria-label="Mobile Navigation">
              {nav.links.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + idx * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center justify-between py-2 text-2xl font-display font-light text-neutral-200 hover:text-white transition-colors border-b border-white/5"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.name}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-neutral-500 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom: Three Division Color Dots */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <span className="block text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-neutral-400">
                Operating Divisions
              </span>
              <div className="flex items-center justify-between gap-3">
                {divisions.map((div) => (
                  <a
                    key={div.id}
                    href="#divisions"
                    onClick={onClose}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all flex-1"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: div.accent }}
                    />
                    <span className="text-[12px] font-sans font-medium text-neutral-300 truncate">
                      {div.shortName}
                    </span>
                  </a>
                ))}
              </div>

              {/* Contact Button */}
              <a
                href={nav.cta.href}
                onClick={onClose}
                className="block w-full mt-4 text-center py-3 rounded-full bg-white text-black font-sans font-semibold text-[13px] uppercase tracking-[0.14em] hover:bg-neutral-200 transition-colors"
              >
                {nav.cta.text}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default StaggeredMenu
