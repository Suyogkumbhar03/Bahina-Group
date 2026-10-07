import React, { useMemo } from "react"
import { ArrowUp, ArrowUpRight, Mail, Globe, Play } from "lucide-react"
import { FlowingMenu } from "@/components/ui/flowing-menu"
import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import { HyperText } from "@/components/ui/hyper-text"
import { Magnet } from "@/components/ui/Magnet"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/lib/i18n"

export function FooterSection({ onOpenWelcomeVideo }) {
  const { t, isMarathi } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const flowingMenuItems = useMemo(
    () => [
      {
        number: "01",
        text: t("division.hospitality.name"),
        shortName: t("division.hospitality.shortName"),
        tagline: t("division.hospitality.tagline"),
        category: t("division.hospitality.shortName"),
        color: "#D9A441",
      },
      {
        number: "02",
        text: t("division.foundation.name"),
        shortName: t("division.foundation.shortName"),
        tagline: t("division.foundation.tagline"),
        category: t("division.foundation.shortName"),
        color: "#3E9B63",
      },
      {
        number: "03",
        text: t("division.labs.name"),
        shortName: t("division.labs.shortName"),
        tagline: t("division.labs.tagline"),
        category: t("division.labs.shortName"),
        color: "#4C8DF6",
      },
    ],
    [t]
  )

  const quickLinks = useMemo(
    () => [
      { name: t("nav.about"), href: "#about" },
      { name: t("nav.divisions"), href: "#divisions" },
      { name: t("nav.visionMission"), href: "#vision-mission" },
      { name: t("nav.focusAreas"), href: "#focus-areas" },
      { name: t("nav.values"), href: "#values" },
      { name: t("nav.approach"), href: "#approach" },
    ],
    [t]
  )

  const velocityTexts = useMemo(
    () => [t("velocity.strip1"), t("velocity.strip2")],
    [t]
  )

  const email = "info@bahinaa.com"
  const website = "www.bahinaa.com"

  return (
    <footer className="relative border-t border-white/10 bg-[#060807] pt-16 pb-14 overflow-hidden text-white">
      {/* 1. React Bits Flowing Menu for the Three Divisions */}
      <div className="w-full mb-12 sm:mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-4">
          <span className="font-sans text-xs uppercase font-semibold tracking-[0.14em] text-white">
            {t("footer.portfolioNav")}
          </span>
        </div>
        <FlowingMenu items={flowingMenuItems} />
      </div>

      {/* 2. React Bits Scroll Velocity Tagline Strip */}
      <div className="w-full border-b border-white/10 py-4 sm:py-6 mb-12 sm:mb-16 bg-white/[0.01]">
        <ScrollVelocity key={velocityTexts.join("-")} texts={velocityTexts} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-3 text-[#F3EFEA]">
              <span
                lang="en"
                className="font-display text-2xl tracking-[0.2em] font-semibold"
              >
                BAHINA
              </span>
              <span className="text-[11px] uppercase font-sans font-semibold tracking-[0.14em] text-white">
                {t("brand.group")}
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-neutral-100 max-w-sm font-semibold leading-relaxed">
              {t("footer.description")}
            </p>

            <p className="font-display italic text-base text-white font-medium pt-2">
              "{t("brand.tagline")}"
            </p>

            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>

            <div className="pt-4 flex flex-col space-y-2.5 text-xs font-sans text-white">
              <a
                href={`mailto:${email}`}
                className="flex items-center space-x-2 text-neutral-100 hover:text-white transition-colors min-h-[36px]"
                data-cursor-label="Email"
                aria-label={t("footer.emailAria")}
              >
                <Mail className="h-3.5 w-3.5 text-white" />
                <span lang="en">{email}</span>
              </a>
              <a
                href={`https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-neutral-100 hover:text-white transition-colors min-h-[36px]"
                data-cursor-label="Website"
                aria-label={t("footer.websiteAria")}
              >
                <Globe className="h-3.5 w-3.5 text-white" />
                <span lang="en">{website}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-neutral-100 mb-2">
              {t("footer.indexTitle")}
            </h4>
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.14em] font-sans font-medium text-white hover:text-white transition-colors flex items-center group py-1.5 min-h-[36px]"
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
                <h4 className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-neutral-100">
                  {t("footer.hqTitle")}
                </h4>
                {/* Back to top button with Magnet */}
                <Magnet magnetStrength={0.25} padding={30}>
                  <button
                    onClick={scrollToTop}
                    className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-sans uppercase font-semibold tracking-[0.14em] text-neutral-100 hover:text-white transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 min-h-[44px]"
                    aria-label={t("footer.backToTopAria")}
                    data-cursor-label="Top"
                  >
                    <span>{t("footer.backToTop")}</span>
                    <ArrowUp className="h-3 w-3" />
                  </button>
                </Magnet>
              </div>

              <div className="space-y-2 text-xs font-sans text-white">
                <p className="text-neutral-100">{t("footer.enterpriseLabel")}</p>
                <p>
                  {t("footer.websiteLabel")}: <span lang="en">{website}</span>
                </p>
                <p>
                  {t("footer.inquiriesLabel")}: <span lang="en">{email}</span>
                </p>
              </div>
            </div>

            {/* Giant HyperText Wordmark that scrambles into place */}
            <div className="pt-6 border-t border-white/10">
              <HyperText
                text="BAHINA"
                duration={1000}
                animateOnHover
                className="text-4xl sm:text-6xl lg:text-7xl font-medium text-white/20 hover:text-white/40 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Warm Village Welcome Line & Watch Video CTA */}
        <div className="pt-8 pb-5 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-display text-lg sm:text-xl text-[#F3EFEA] font-medium tracking-wide opacity-90">
            "{t("footer.warmWelcome")}"
          </p>

          {onOpenWelcomeVideo && (
            <button
              onClick={onOpenWelcomeVideo}
              type="button"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-sans font-medium text-white hover:text-white transition-all min-h-[44px]"
              aria-label={t("welcome.watchVideoAria")}
            >
              <Play className="h-3 w-3 text-[#D9A441] fill-current" />
              <span>{t("welcome.watchVideo")}</span>
            </button>
          )}
        </div>

        {/* Bottom Rights */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-white gap-4">
          <p>{t("footer.copyright")}</p>
          <p className="text-white font-medium">
            {t("footer.subline")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
