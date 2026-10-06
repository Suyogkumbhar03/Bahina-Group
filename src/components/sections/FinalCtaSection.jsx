import React, { useState } from "react"
import { ArrowUpRight, Copy, Check, Mail, Send } from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"
import { StarBorder } from "@/components/ui/star-border"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { ShinyText } from "@/components/ui/shiny-text"
import { Magnet } from "@/components/ui/Magnet"
import { useLanguage } from "@/lib/i18n"

export function FinalCtaSection() {
  const { t, language, isMarathi } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const emailAddress = "info@bahinaa.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = t("form.required")
    }
    if (!formData.email.trim()) {
      errs.email = t("form.required")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = t("form.invalidEmail")
    }
    if (!formData.message.trim()) {
      errs.message = t("form.required")
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    // Simulate sending message
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setSubmitted(false), 6000)
    }, 600)
  }

  const mailtoSubject = encodeURIComponent(t("mailto.subject"))
  const mailtoBody = encodeURIComponent(
    `${t("mailto.body")}\n\nLanguage: ${language}\n`
  )
  const mailtoLink = `mailto:${emailAddress}?subject=${mailtoSubject}&body=${mailtoBody}`

  return (
    <section id="contact" className="relative z-10 w-full scroll-mt-28 py-32 md:py-44 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Editorial Card with Magic UI BorderBeam */}
      <div className="relative rounded-3xl border border-white/20 bg-[#121815]/95 p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
        <BorderBeam
          size={380}
          duration={18}
          colorFrom="#D9A441"
          colorTo="#4C8DF6"
          borderWidth={1.5}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Subline, Direct Contact */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <ShinyText text={t("cta.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />

              {/* Big Editorial Headline */}
              <h2 className="mt-6 font-display font-light text-[#F3EFEA] leading-[1.1] tracking-[-0.02em] text-[clamp(2.25rem,5.5vw,4.5rem)]">
                {t("cta.headlinePart1")} <br />
                {t("cta.headlinePart2")} <br />
                <AnimatedGradientText className={`font-normal ${isMarathi ? "not-italic font-medium text-[#D9A441]" : "italic"}`}>
                  {t("cta.headlineHighlight")}
                </AnimatedGradientText>
              </h2>

              <p className="mt-6 font-sans text-[18px] text-neutral-200 font-normal leading-[1.65] max-w-xl">
                {t("cta.subline")}
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Star Border Mailto Button with Magnet */}
              <Magnet magnetStrength={0.25} padding={40}>
                <a href={mailtoLink} data-cursor-label="Email">
                  <StarBorder speed="3.5s" color="#D9A441">
                    <span className="flex items-center space-x-2">
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      <span>{t("cta.action")}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                    </span>
                  </StarBorder>
                </a>
              </Magnet>

              {/* Copy-Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor-label="Copy"
                className="flex items-center space-x-2.5 px-5 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-200 hover:text-white transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 active:scale-[0.98] min-h-[44px]"
                aria-label={t("cta.copyEmailAria")}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#3E9B63]" />
                    <span className="text-[#3E9B63]">{t("cta.emailCopied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-neutral-400" />
                    <span lang="en">{emailAddress}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form with Hidden Language Field */}
          <div className="lg:col-span-6 rounded-2xl border border-white/15 bg-[#090D0B]/80 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="font-display text-2xl font-light text-white mb-2">
              {t("form.title")}
            </h3>
            <p className="font-sans text-sm text-neutral-300 font-normal leading-relaxed mb-6">
              {t("form.description")}
            </p>

            {submitted ? (
              <div
                role="status"
                className="p-4 rounded-xl border border-[#3E9B63]/40 bg-[#3E9B63]/15 text-[#E6F4EA] text-sm font-sans flex items-center space-x-3"
              >
                <Check className="h-5 w-5 text-[#3E9B63] shrink-0" />
                <span>{t("form.success")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Hidden language field (en or mr) per requirements */}
                <input type="hidden" name="language" value={language} />

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                  >
                    {t("form.nameLabel")} *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("form.namePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-neutral-500 font-sans text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/40 transition-colors min-h-[44px]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-400 font-sans">{errors.name}</p>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                    >
                      {t("form.emailLabel")} *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("form.emailPlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-neutral-500 font-sans text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/40 transition-colors min-h-[44px]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400 font-sans">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                    >
                      {t("form.phoneLabel")}
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t("form.phonePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-neutral-500 font-sans text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/40 transition-colors min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                  >
                    {t("form.messageLabel")} *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("form.messagePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-neutral-500 font-sans text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/40 transition-colors resize-y min-h-[100px]"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-400 font-sans">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full bg-white text-black hover:bg-neutral-200 font-sans font-semibold text-xs uppercase tracking-[0.14em] transition-all flex items-center justify-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 min-h-[44px] cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submitting ? t("form.submitting") : t("form.submit")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
