import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle2, Send } from "lucide-react"
import { foundationContent } from "../data/foundationContent"

export function NewsletterCta() {
  const { newsletter } = foundationContent
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <section className="relative bg-[#FAF8F5] py-14 px-4 sm:px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-[#061D12] via-[#0A2E1C] to-[#04160D] border border-[#3E9B63]/30 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#3E9B63]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#86EFAC] text-[11px] font-sans font-semibold uppercase tracking-wider mb-3">
              {newsletter.badge}
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-semibold text-white leading-tight">
              {newsletter.heading}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              {newsletter.subheading}
            </p>

            {subscribed ? (
              <div className="mt-8 p-4 rounded-2xl bg-[#3E9B63]/20 border border-[#3E9B63] flex items-center justify-center space-x-2 text-white text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                <span>You are subscribed! Welcome to the Bahina Foundation community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder={newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#E5B842] hover:bg-[#d8a832] text-black font-sans font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-1.5 shrink-0"
                >
                  <span>{newsletter.buttonText}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <p className="mt-4 text-[11px] text-neutral-400 font-sans">
              We respect your privacy. Zero spam. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterCta
