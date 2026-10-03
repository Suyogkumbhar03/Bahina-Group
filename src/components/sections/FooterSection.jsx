import React from "react"
import { ArrowUp, ArrowUpRight, Mail, Globe } from "lucide-react"
import { BAHINA_CONTENT } from "@/data/content"
import { FlowingMenu } from "@/components/ui/flowing-menu"
import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import { HyperText } from "@/components/ui/hyper-text"
import { Magnet } from "@/components/ui/Magnet"

export function FooterSection() {
  const { footer, brand, divisions } = BAHINA_CONTENT

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const flowingMenuItems = divisions.map((div) => ({
    number: div.number,
    text: div.name,
    shortName: div.shortName,
    tagline: div.tagline,
    category: div.category.split(",")[0],
    color: div.accent,
  }))

  return (
    <footer className="relative border-t border-white/10 bg-[#060807] pt-16 pb-14 overflow-hidden text-neutral-400">
      {/* 1. React Bits Flowing Menu for the Three Divisions */}
      <div className="w-full mb-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4">
          <span className="font-sans text-xs uppercase font-semibold tracking-[0.14em] text-neutral-400">
            Portfolio Navigation
          </span>
        </div>
        <FlowingMenu items={flowingMenuItems} />
      </div>

      {/* 2. React Bits Scroll Velocity Tagline Strip */}
      <div className="w-full border-b border-white/10 py-6 mb-16 bg-white/[0.01]">
        <ScrollVelocity
          texts={[
            "From Soil to Spaces • Enriching Every Life • BAHINA Group •",
            "One Name • Three Commitments • Endless Impact •",
          ]}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-3 text-[#F3EFEA]">
              <span className="font-display text-2xl tracking-[0.2em] font-semibold">
                {brand.shortName}
              </span>
              <span className="text-[11px] uppercase font-sans font-semibold tracking-[0.14em] text-neutral-400">
                Group
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-sm font-normal leading-relaxed">
              {footer.description}
            </p>

            <p className="font-display italic text-base text-neutral-200 font-light pt-2">
              "{brand.tagline}"
            </p>

            <div className="pt-4 flex flex-col space-y-2.5 text-xs font-sans text-neutral-400">
              <a
                href={`mailto:${footer.contact.email}`}
                className="flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors"
                data-cursor-label="Email"
              >
                <Mail className="h-3.5 w-3.5 text-neutral-400" />
                <span>{footer.contact.email}</span>
              </a>
              <a
                href={`https://${footer.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors"
                data-cursor-label="Website"
              >
                <Globe className="h-3.5 w-3.5 text-neutral-400" />
                <span>{footer.contact.website}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-neutral-300 mb-2">
              Index
            </h4>
            {footer.quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.14em] font-sans font-medium text-neutral-400 hover:text-white transition-colors flex items-center group py-1"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="ml-1.5 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Divisions Column with Back to Top Magnet Button */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-neutral-300">
                  Headquarters & Inquiries
                </h4>
                {/* Back to top button with Magnet */}
                <Magnet magnetStrength={0.25} padding={30}>
                  <button
                    onClick={scrollToTop}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-sans uppercase font-semibold tracking-[0.14em] text-neutral-300 hover:text-white transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                    aria-label="Back to top"
                    data-cursor-label="Top"
                  >
                    <span>Top</span>
                    <ArrowUp className="h-3 w-3" />
                  </button>
                </Magnet>
              </div>

              <div className="space-y-2 text-xs font-sans text-neutral-400">
                <p className="text-neutral-300">BAHINA Group Enterprise</p>
                <p>Website: {brand.website}</p>
                <p>Inquiries: {brand.email}</p>
              </div>
            </div>

            {/* Giant HyperText Wordmark that scrambles into place */}
            <div className="pt-6 border-t border-white/10">
              <HyperText
                text="BAHINA"
                duration={1000}
                animateOnHover
                className="text-5xl sm:text-6xl lg:text-7xl font-light text-white/20 hover:text-white/40 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-neutral-400 gap-4">
          <p>{footer.contact.rights}</p>
          <p className="text-neutral-400 font-medium">
            One Name. Three Commitments. Endless Impact.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
