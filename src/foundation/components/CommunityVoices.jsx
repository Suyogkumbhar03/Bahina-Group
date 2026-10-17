import React from "react"
import { motion } from "framer-motion"
import { Star, MessageSquareQuote, CheckCircle } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function CommunityVoices() {
  const { testimonials } = foundationContent

  return (
    <section id="testimonials" className="relative bg-[#FAF8F5] text-[#1A221E] py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3E9B63]/15 text-[#185331] font-sans text-xs uppercase font-semibold tracking-wider mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{testimonials.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0E1A14]">
            {testimonials.heading}
          </h2>
          <p className="mt-3 text-neutral-600 font-sans text-base sm:text-lg">
            {testimonials.subheading}
          </p>
        </div>

        {/* 3 Testimonials Cards Grid (Matching screenshot layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="group rounded-3xl bg-white border border-neutral-200 p-7 sm:p-8 flex flex-col justify-between hover:border-[#3E9B63] hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D9A441] text-[#D9A441]" />
                  ))}
                </div>

                {/* Quotation text */}
                <p className="font-sans text-sm sm:text-base text-neutral-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-[#0E2819] text-[#86EFAC] font-display font-semibold flex items-center justify-center text-sm shadow">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-sans font-semibold text-sm text-[#0E1A14]">
                      {item.author}
                    </h4>
                    <CheckCircle className="w-3.5 h-3.5 text-[#3E9B63]" />
                  </div>
                  <p className="font-sans text-xs text-neutral-500">
                    {item.role} • {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CommunityVoices
