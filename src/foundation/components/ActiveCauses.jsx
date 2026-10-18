import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Heart, MapPin, Users, Clock, ChevronDown, CheckCircle2 } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function ActiveCauses({ onSelectCauseDonate }) {
  const { causes } = foundationContent
  const [activeCategory, setActiveCategory] = useState("All Initiatives")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAll, setShowAll] = useState(false)

  const filteredItems = useMemo(() => {
    return causes.items.filter((item) => {
      const matchCategory =
        activeCategory === "All Initiatives" || item.category === activeCategory
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [causes.items, activeCategory, searchQuery])

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 8)

  return (
    <section id="active-causes" className="relative bg-[#FAF8F5] text-[#1A221E] py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3E9B63]/15 text-[#185331] font-sans text-xs uppercase font-semibold tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{causes.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0E1A14]">
            {causes.heading}
          </h2>
          <p className="mt-3 text-neutral-600 font-sans text-base sm:text-lg">
            {causes.subheading}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-neutral-200">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder={causes.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-neutral-300 text-sm text-neutral-800 placeholder-neutral-400 shadow-sm focus:outline-none focus:border-[#3E9B63] focus:ring-1 focus:ring-[#3E9B63]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {causes.categories.map((cat) => {
              const isSelected = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-[#0E2819] text-white shadow-md"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2-Column Campaign Cards Grid (Matching reference screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {visibleItems.map((item, idx) => {
            const percentage = Math.min(100, Math.round((item.raised / item.goal) * 100))

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (idx % 2) * 0.1 }}
                className="group rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    
                    {/* Top Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[#0E2819] text-[11px] font-sans font-bold uppercase tracking-wider shadow">
                        {item.tag}
                      </span>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-white text-xs drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-[#86EFAC]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0E1A14] leading-snug group-hover:text-[#185331] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-neutral-600 font-sans text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Funding Progress Meter */}
                    <div className="mt-6 pt-5 border-t border-neutral-100">
                      <div className="flex items-center justify-between text-xs font-sans font-semibold mb-2">
                        <span className="text-[#185331] text-sm">
                          ₹{item.raised.toLocaleString("en-IN")}{" "}
                          <span className="text-neutral-400 font-normal text-xs">
                            raised of ₹{item.goal.toLocaleString("en-IN")}
                          </span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#3E9B63]/15 text-[#185331] font-bold">
                          {percentage}%
                        </span>
                      </div>

                      {/* Progress Bar Line */}
                      <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#3E9B63] to-[#D9A441] transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Meta Donors and Days */}
                      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                        <span className="flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{item.donors} Donors</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.daysLeft} Days Left</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button (Gold / Yellow Pill Button matching reference) */}
                <div className="px-6 pb-6 sm:px-7 sm:pb-7">
                  <button
                    onClick={() => onSelectCauseDonate(item)}
                    className="w-full py-3.5 px-6 rounded-full bg-[#E5B842] hover:bg-[#d8a832] text-black font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Donate Now</span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Projects Button */}
        {filteredItems.length > 8 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-white border border-neutral-300 hover:border-neutral-400 text-[#0E1A14] font-sans text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow transition-all"
            >
              <span>{showAll ? "Show Less" : "View All 18+ Projects"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default ActiveCauses
