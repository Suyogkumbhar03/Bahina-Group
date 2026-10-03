import React, { useState } from "react"
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react"
import { BAHINA_CONTENT } from "@/data/content"
import { BorderBeam } from "@/components/ui/border-beam"
import { StarBorder } from "@/components/ui/star-border"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { ShinyText } from "@/components/ui/shiny-text"
import { Magnet } from "@/components/ui/Magnet"

export function FinalCtaSection() {
  const { cta } = BAHINA_CONTENT
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(cta.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative z-10 w-full scroll-mt-28 py-32 md:py-44 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Lighter Editorial Card with Magic UI BorderBeam (Card 2 of 2 strictly allowed) */}
      <div className="relative rounded-3xl border border-white/20 bg-[#121815]/95 p-10 sm:p-16 md:p-20 overflow-hidden shadow-2xl">
        <BorderBeam
          size={350}
          duration={18}
          colorFrom="#D9A441"
          colorTo="#4C8DF6"
          borderWidth={1.5}
        />

        <div className="relative z-10 max-w-3xl">
          <ShinyText text={cta.eyebrow} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />

          {/* Big Editorial Headline with Aurora/AnimatedGradientText strictly on "Endless Impact." (Phrase 2 of 2) */}
          <h2 className="mt-6 font-display font-light text-[#F3EFEA] leading-[1.08] tracking-[-0.02em] text-[clamp(2.25rem,5.5vw,4.75rem)]">
            One Name. <br />
            Three Commitments. <br />
            <AnimatedGradientText className="italic font-normal">
              Endless Impact.
            </AnimatedGradientText>
          </h2>

          <p className="mt-6 font-sans text-[18px] text-neutral-200 font-normal leading-[1.65] max-w-xl">
            {cta.subline}
          </p>

          {/* Contact Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            {/* React Bits Star Border Button with Magnet */}
            <Magnet magnetStrength={0.25} padding={40}>
              <a href={`mailto:${cta.email}`} data-cursor-label="Contact">
                <StarBorder speed="3.5s" color="#D9A441">
                  <span className="flex items-center space-x-2">
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    <span>{cta.action}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                  </span>
                </StarBorder>
              </a>
            </Magnet>

            {/* Copy-Email Button with 2s Check Icon */}
            <button
              onClick={handleCopyEmail}
              data-cursor-label="Copy"
              className="flex items-center space-x-2.5 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-neutral-200 hover:text-white transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 active:scale-[0.98]"
              aria-label="Copy contact email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#3E9B63]" />
                  <span className="text-[#3E9B63]">Email Copied (info@bahinaa.com)</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-neutral-400" />
                  <span>{cta.email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
