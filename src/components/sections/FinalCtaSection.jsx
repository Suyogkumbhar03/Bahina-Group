import React, { useState } from "react"
import { ArrowUpRight, Copy, Check, Mail, Send, Phone, MessageCircle } from "lucide-react"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { ShinyText } from "@/components/ui/shiny-text"
import { Magnet } from "@/components/ui/Magnet"
import { WarliCorner } from "@/components/ui/warli-divider"
import { useLanguage } from "@/lib/i18n"
import { RURAL_CONFIG } from "@/config"

export function FinalCtaSection() {
  const { t, language, isMarathi } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Rural-first Contact Form State (Name, Phone, Village, optional Message)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
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
      errs.name = t("form.nameError")
    }
    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      errs.phone = t("form.phoneError")
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
      setFormData({ name: "", phone: "", village: "", message: "" })
      setTimeout(() => setSubmitted(false), 8000)
    }, 600)
  }

  const mailtoSubject = encodeURIComponent(t("mailto.subject"))
  const mailtoBody = encodeURIComponent(
    `${t("mailto.body")}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nVillage: ${formData.village}\nLanguage: ${language}\n`
  )
  const mailtoLink = `mailto:${emailAddress}?subject=${mailtoSubject}&body=${mailtoBody}`

  const hasPhone = Boolean(RURAL_CONFIG.phoneNumber)
  const hasWhatsapp = Boolean(RURAL_CONFIG.whatsappNumber)

  return (
    <section id="contact" className="relative z-10 w-full scroll-mt-28 py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Painted Wall Style Container (Earth palette, soft rounded corners, thin warm border) */}
      <div className="relative rounded-3xl border border-[#D9A441]/25 bg-[#090D0B]/60 backdrop-blur-[2px] p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
        {/* Warli Corner Accents */}
        <div className="absolute top-4 left-4">
          <WarliCorner accent="#D9A441" />
        </div>
        <div className="absolute top-4 right-4 rotate-90">
          <WarliCorner accent="#D9A441" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Outreach, Phone, WhatsApp */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <ShinyText text={t("cta.eyebrow")} className="text-[12px] font-sans font-semibold tracking-[0.14em]" />

              {/* Editorial Headline */}
              <h2 className="mt-6 font-display font-light text-[#F3EFEA] leading-[1.15] tracking-[-0.02em] text-[clamp(2.25rem,5.5vw,4.25rem)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {t("cta.headlinePart1")} <br />
                {t("cta.headlinePart2")} <br />
                <AnimatedGradientText className={`font-normal ${isMarathi ? "not-italic font-medium text-[#D9A441]" : "italic"}`}>
                  {t("cta.headlineHighlight")}
                </AnimatedGradientText>
              </h2>

              <p className="mt-6 font-sans text-[18px] text-[#EDE8E1] font-normal leading-[1.65] max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {t("cta.subline")}
              </p>
            </div>

            {/* Prominent Direct Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              {/* Biggest Action: Direct Call (When configured in config.js) */}
              {hasPhone && (
                <a
                  href={`tel:${RURAL_CONFIG.phoneNumber}`}
                  className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-full bg-[#D9A441] text-black font-sans font-bold text-sm uppercase tracking-[0.08em] hover:bg-[#E5A823] transition-all shadow-lg min-h-[52px]"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  <span>{t("action.call")}</span>
                </a>
              )}

              {/* Biggest Action: WhatsApp (When configured in config.js) */}
              {hasWhatsapp && (
                <a
                  href={`https://wa.me/${RURAL_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-full bg-[#25D366] text-black font-sans font-bold text-sm uppercase tracking-[0.08em] hover:bg-[#20BA56] transition-all shadow-lg min-h-[52px]"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>{t("action.whatsapp")}</span>
                </a>
              )}

              {/* Email Mailto Button */}
              <a
                href={mailtoLink}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-neutral-100 hover:text-white font-sans font-semibold text-xs uppercase tracking-[0.1em] transition-all min-h-[52px]"
              >
                <Mail className="h-4 w-4 mr-1 text-[#D9A441]" />
                <span>{t("cta.emailAction")}</span>
                <ArrowUpRight className="h-4 w-4 ml-1 opacity-70" />
              </a>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-sans font-semibold uppercase tracking-[0.1em] text-neutral-200 hover:text-white transition-all min-h-[52px]"
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

          {/* Right Column: Simplified Village Contact Form (Name, Phone, Village) */}
          <div className="lg:col-span-6 rounded-2xl border border-white/20 bg-black/45 p-6 sm:p-8 backdrop-blur-[2px] shadow-2xl">
            <h3 className="font-display text-2xl font-light text-white mb-2">
              {t("form.title")}
            </h3>
            <p className="font-sans text-sm text-neutral-300 font-normal leading-relaxed mb-6">
              {t("form.description")}
            </p>

            {submitted ? (
              <div
                role="status"
                className="p-5 rounded-2xl border border-[#3E9B63]/40 bg-[#3E9B63]/15 text-[#E6F4EA] text-base font-sans flex items-center space-x-3"
              >
                <Check className="h-6 w-6 text-[#3E9B63] shrink-0" />
                <span className="font-medium">{t("form.success")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Hidden language field */}
                <input type="hidden" name="language" value={language} />

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                  >
                    {t("form.nameLabel")} <span className="text-[#D9A441]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("form.namePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/[0.05] text-white placeholder-neutral-400 font-sans text-base focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-colors min-h-[52px]"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-300 font-sans font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Phone & Village Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                    >
                      {t("form.phoneLabel")} <span className="text-[#D9A441]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t("form.phonePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/[0.05] text-white placeholder-neutral-400 font-sans text-base focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-colors min-h-[52px]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-rose-300 font-sans font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Village Field (Optional) */}
                  <div>
                    <label
                      htmlFor="contact-village"
                      className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                    >
                      {t("form.villageLabel")}
                    </label>
                    <input
                      id="contact-village"
                      name="village"
                      type="text"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      placeholder={t("form.villagePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/[0.05] text-white placeholder-neutral-400 font-sans text-base focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-colors min-h-[52px]"
                    />
                  </div>
                </div>

                {/* Optional Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-1.5"
                  >
                    {t("form.messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("form.messagePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/[0.05] text-white placeholder-neutral-400 font-sans text-base focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-colors resize-y min-h-[90px]"
                  />
                </div>

                {/* Big Action Submit Button (>= 52px tap target) */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-full bg-[#D9A441] text-black hover:bg-[#E5A823] font-sans font-bold text-sm uppercase tracking-[0.1em] transition-all flex items-center justify-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 min-h-[52px] cursor-pointer shadow-lg active:scale-[0.99]"
                >
                  <Send className="h-4 w-4" />
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
