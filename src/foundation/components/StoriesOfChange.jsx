import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, ArrowRight, Clock, Calendar, X } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function StoriesOfChange() {
  const { stories } = foundationContent
  const [activeStoryModal, setActiveStoryModal] = useState(null)

  return (
    <section id="stories" className="relative bg-[#FAF8F5] text-[#1A221E] py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3E9B63]/15 text-[#185331] font-sans text-xs uppercase font-semibold tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{stories.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0E1A14]">
            {stories.heading}
          </h2>
          <p className="mt-3 text-neutral-600 font-sans text-base sm:text-lg">
            {stories.subheading}
          </p>
        </div>

        {/* Stories Grid: Large Featured Story on top + 2 Secondary Stories below (Matching Screenshot) */}
        <div className="space-y-8">
          
          {/* 1. Large Hero Featured Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-72 sm:h-96 lg:h-[420px] overflow-hidden bg-neutral-100">
              <img
                src={stories.featured.image}
                alt={stories.featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-[#E5B842] text-black text-[11px] font-sans font-bold uppercase tracking-wider mb-3 shadow">
                  {stories.featured.tag}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white drop-shadow">
                  {stories.featured.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-200 font-sans line-clamp-3 leading-relaxed drop-shadow">
                  {stories.featured.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-300">
                  <span>{stories.featured.author}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{stories.featured.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{stories.featured.date}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Secondary Stories Row (2 Cards with Horizontal Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.secondary.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-stretch"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden bg-neutral-100">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#3E9B63]">
                      {s.tag}
                    </span>
                    <h4 className="font-display text-lg sm:text-xl font-semibold text-[#0E1A14] mt-1 group-hover:text-[#185331] transition-colors leading-snug">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-neutral-600 font-sans text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {s.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{s.readTime}</span>
                    </span>
                    <button
                      onClick={() => setActiveStoryModal(s)}
                      className="inline-flex items-center space-x-1 font-sans font-semibold text-[#185331] hover:text-[#0E2819] uppercase tracking-wider text-[11px]"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Story Full Modal */}
      <AnimatePresence>
        {activeStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStoryModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 text-[#1A221E] shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveStoryModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
              <img
                src={activeStoryModal.image}
                alt={activeStoryModal.title}
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow"
              />
              <span className="px-3 py-1 rounded-full bg-[#3E9B63]/15 text-[#185331] text-xs font-sans font-bold uppercase tracking-wider">
                {activeStoryModal.tag}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0E1A14] mt-3">
                {activeStoryModal.title}
              </h3>
              <p className="mt-4 text-neutral-700 font-sans leading-relaxed text-base">
                {activeStoryModal.excerpt}
              </p>
              <p className="mt-4 text-neutral-600 font-sans leading-relaxed text-sm">
                Through persistent community stewardship and targeted educational resources, Bahina Foundation continues to back grassroots pioneers who inspire whole districts.
              </p>
              <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="px-6 py-2.5 rounded-full bg-[#0E2819] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default StoriesOfChange
