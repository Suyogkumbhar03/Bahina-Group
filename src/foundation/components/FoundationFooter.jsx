import React from "react"
import { Sprout, Mail, Phone, MapPin, ArrowUp, ArrowLeft, Heart, ShieldCheck } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function FoundationFooter({ onBackToMain, onOpenDonate }) {
  const { footer } = foundationContent

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-[#04140B] text-neutral-300 pt-16 pb-12 px-4 sm:px-6 md:px-12 border-t border-[#3E9B63]/25 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo-mark.png"
                alt="Bahina Group Emblem"
                className="h-10 w-auto object-contain drop-shadow"
              />
              <div>
                <span className="font-display text-xl font-bold tracking-wider text-white block">
                  BAHINA
                </span>
                <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.2em] text-[#4ADE80]">
                  Foundation
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
              {footer.aboutText}
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-1">
              <div className="flex items-center space-x-1.5 text-[#86EFAC] font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Verified Non-Profit Credentials</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                {footer.section8Note}
              </p>
            </div>

            {/* Return to Bahina Group Button */}
            <div className="pt-2">
              <button
                onClick={onBackToMain}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-sans font-semibold text-white transition-all shadow"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#4ADE80]" />
                <span>Return to Bahina Group Main Site</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.16em] font-semibold text-white mb-4">
              Explore Programs
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {footer.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenDonate}
                  className="text-[#D9A441] font-semibold hover:underline flex items-center space-x-1"
                >
                  <Heart className="w-3 h-3 fill-current" />
                  <span>Donate Online (80G)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.16em] font-semibold text-white mb-4">
              Field Headquarters
            </h4>
            <div className="space-y-3 text-xs font-sans text-neutral-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                <span>{footer.contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>{footer.contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <a
                  href={`mailto:${footer.contactInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {footer.contactInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-sans">
          <p>© 2026 Bahina Foundation. All Rights Reserved. A Section 8 Enterprise.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-neutral-300 hover:text-white transition-colors p-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FoundationFooter
