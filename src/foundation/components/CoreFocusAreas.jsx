import React from "react"
import { motion } from "framer-motion"
import { Trees, GraduationCap, Users2, Droplets, ArrowUpRight } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function CoreFocusAreas() {
  const { focusAreas } = foundationContent

  const iconMap = {
    "01": Trees,
    "02": GraduationCap,
    "03": Users2,
    "04": Droplets,
  }

  return (
    <section id="focus-areas" className="relative bg-[#FAF8F5] text-[#1A221E] py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3E9B63]/15 text-[#185331] font-sans text-xs uppercase font-semibold tracking-wider mb-4">
            <Trees className="w-3.5 h-3.5" />
            <span>{focusAreas.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0E1A14]">
            {focusAreas.heading}
          </h2>
          <p className="mt-3 text-neutral-600 font-sans text-base sm:text-lg">
            {focusAreas.subheading}
          </p>
        </div>

        {/* 2x2 Dark Green Frosted Card Grid (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {focusAreas.cards.map((card, idx) => {
            const Icon = iconMap[card.number] || Trees

            return (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-gradient-to-br from-[#0F291C] via-[#133524] to-[#0A1F15] p-7 sm:p-9 text-white shadow-xl overflow-hidden flex flex-col justify-between border border-[#3E9B63]/30 hover:border-[#3E9B63]/70 transition-all duration-300"
              >
                {/* Background Subtle Radial Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3E9B63]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#3E9B63]/20 transition-all duration-500" />

                <div>
                  {/* Top Header: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#86EFAC] group-hover:scale-110 transition-transform shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-2xl font-semibold text-[#D9A441]">
                      {card.number}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
                    {card.shortDesc}
                  </p>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                    {card.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-neutral-300">
                        <span className="text-[#4ADE80] font-bold mt-0.5">•</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Link Button */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  <a
                    href="#active-causes"
                    className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#86EFAC] group-hover:text-white transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default CoreFocusAreas
