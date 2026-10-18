import React from "react"
import { motion } from "framer-motion"
import { Layers, Users, Compass, CheckCircle2, ShieldCheck } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function CatalyzeChange() {
  const { catalyze } = foundationContent

  const stepIcons = [Compass, Users, Layers, ShieldCheck]

  return (
    <section id="catalyze" className="relative bg-[#FAF8F5] text-[#1A221E] py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3E9B63]/15 text-[#185331] font-sans text-xs uppercase font-semibold tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{catalyze.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0E1A14]">
            {catalyze.heading}
          </h2>
          <p className="mt-3 text-neutral-600 font-sans text-base sm:text-lg">
            {catalyze.subheading}
          </p>
        </div>

        {/* 4 Cards Grid (Matching screenshot layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalyze.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group rounded-3xl bg-white border border-neutral-200 p-7 sm:p-8 flex flex-col justify-between hover:border-[#3E9B63] hover:shadow-xl transition-all duration-300 relative"
              >
                <div>
                  {/* Top Step Number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-3xl font-bold text-[#185331] group-hover:text-[#3E9B63] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-neutral-200 flex items-center justify-center text-[#185331] group-hover:bg-[#3E9B63] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0E1A14] leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-3.5 text-neutral-600 font-sans text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center space-x-1.5 text-xs text-[#185331] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E9B63]" />
                  <span>Verified Grassroots Milestone</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default CatalyzeChange
