import React from "react"
import { motion } from "framer-motion"
import { Sprout, ArrowRight, Quote, CheckCircle } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function AboutFoundation() {
  const { about } = foundationContent

  return (
    <section id="about-foundation" className="relative bg-[#FAF8F5] text-[#1A221E] py-16 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Image Collage Card (Matching Screenshot exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {/* Main Left Photo: Village Panchayat Meeting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl group min-h-[300px] sm:min-h-[420px]"
          >
            <img
              src="/foundation/village-meeting.jpg"
              alt="Rural Indian village panchayat meeting under banyan tree"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-[#3E9B63] text-white text-[11px] font-sans font-semibold uppercase tracking-wider mb-1.5 shadow">
                Grassroots Gram Sabha
              </span>
              <p className="font-display text-lg sm:text-xl font-medium drop-shadow">
                Community-led decision making across 40+ tribal hamlets
              </p>
            </div>
          </motion.div>

          {/* Right Photo: Rural Education Classroom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-xl group min-h-[300px] sm:min-h-[420px]"
          >
            <img
              src="/foundation/rural-classroom.jpg"
              alt="Tribal children learning in a village classroom"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-[#D9A441] text-black text-[11px] font-sans font-semibold uppercase tracking-wider mb-1.5 shadow">
                Holistic Education
              </span>
              <p className="font-display text-base sm:text-lg font-medium drop-shadow">
                Solar smart classrooms & girls' scholarship retention
              </p>
            </div>
          </motion.div>
        </div>

        {/* Narrative & Quote Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading + Body Story */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3E9B63]/15 text-[#185331] font-sans text-xs uppercase font-semibold tracking-wider">
              <Sprout className="w-3.5 h-3.5" />
              <span>{about.badge}</span>
            </div>

            {/* Main Headings */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0E1A14] leading-[1.15]">
              {about.heading}{" "}
              <span className="text-[#3E9B63] block mt-1 font-normal italic">
                {about.headingSub}
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-neutral-700 font-sans text-base sm:text-lg leading-relaxed">
              <p>{about.paragraph1}</p>
              <p className="text-neutral-600">{about.paragraph2}</p>
            </div>

            {/* Read Story CTA */}
            <div className="pt-2">
              <a
                href="#stories"
                className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-[#0E2819] hover:bg-[#163D27] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>{about.ctaBtn}</span>
                <ArrowRight className="w-4 h-4 text-[#4ADE80]" />
              </a>
            </div>
          </div>

          {/* Right Column: Quote Card + Quick Stats */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Styled Quote Box */}
            <div className="relative rounded-2xl bg-[#F0ECE1] border-l-4 border-[#3E9B63] p-6 sm:p-7 shadow-sm">
              <Quote className="w-8 h-8 text-[#3E9B63]/30 mb-3" />
              <p className="font-display italic text-base sm:text-lg text-[#1A221E] leading-snug">
                "{about.quote}"
              </p>
              
              <div className="mt-5 flex items-center space-x-3.5 pt-4 border-t border-black/10">
                <div className="w-11 h-11 rounded-full bg-[#3E9B63] text-white font-display font-semibold flex items-center justify-center text-sm shadow">
                  PP
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-[#0E1A14]">
                    {about.authorName}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500">
                    {about.authorRole}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Inline Stat Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {about.stats.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white p-4 border border-neutral-200 shadow-sm text-center flex flex-col justify-center"
                >
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#185331]">
                    {s.value}
                  </span>
                  <span className="font-sans text-[11px] text-neutral-600 mt-1 leading-tight font-medium">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutFoundation
