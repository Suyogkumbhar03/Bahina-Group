import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Mail, MapPin, Sparkles } from "lucide-react";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import { Magnet } from "@/components/ui/Magnet";
import { useLanguage } from "@/lib/i18n";

export function HospitalityFooter() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tickerTexts = [
    t("hosp.footer.ticker1", "FROM SOIL TO SPACES • BAHINA HOSPITALITY • SLOW LIVING • AUTHENTIC RETREATS"),
    t("hosp.footer.ticker2", "UNPOLLUTED SKIES • PRIVATE ORCHARDS • HANDCRAFTED FARMSTEADS • RADHANAGARI • KOLHAPUR"),
  ];

  return (
    <footer id="contact" className="bg-[#122017] text-[#F6F0E4] pt-12 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Scroll Velocity Marquee Strip matching Landing Page craft */}
      <div className="w-full border-b border-white/10 py-4 mb-12 sm:mb-16 bg-white/[0.02]">
        <ScrollVelocity texts={tickerTexts} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Ethos (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <span
                lang="en"
                className="font-display text-2xl tracking-[0.18em] font-bold text-white"
              >
                BAHINA
              </span>
              <span className="text-[11px] uppercase font-sans font-bold tracking-[0.14em] text-[#DFA82E] px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                HOSPITALITY
              </span>
            </div>

            <p className="font-sans text-sm text-[#D7DEC9] leading-relaxed max-w-sm">
              {t(
                "hosp.footer.about",
                "A division of BAHINA Group creating peaceful countryside farmhouses close to nature, rural craft, and genuine hospitality."
              )}
            </p>

            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#DFA82E] hover:underline uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t("hosp.nav.backToGroup", "Return to BAHINA Group Main Site")}</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-sans text-xs font-bold text-white tracking-[0.14em] uppercase">
              {t("hosp.footer.navTitle", "Explore")}
            </h3>
            <ul className="space-y-2.5 text-sm font-sans text-[#D7DEC9]">
              <li>
                <a href="#stays" className="hover:text-white transition-colors">
                  {t("hosp.nav.stays", "Farmhouse Stays")}
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-white transition-colors">
                  {t("hosp.showcase.eyebrow", "The Countryside Atmosphere")}
                </a>
              </li>
              <li>
                <a href="#daytonight" className="hover:text-white transition-colors">
                  {t("hosp.nav.rhythm", "Day to Night Rhythm")}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {t("hosp.nav.howItWorks", "How Booking Works")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t("hosp.nav.faq", "Frequently Asked Questions")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Notice (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-sans text-xs font-bold text-white tracking-[0.14em] uppercase">
              {t("hosp.footer.contactTitle", "Get in Touch")}
            </h3>
            <div className="space-y-2 text-sm font-sans text-[#D7DEC9]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DFA82E] shrink-0" />
                <span>hospitality@bahinaa.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DFA82E] shrink-0" />
                <span>{t("hosp.footer.location", "Radhanagari, Kolhapur, Maharashtra")}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-sans text-[#E1D7C6] space-y-1">
              <span className="font-bold text-[#DFA82E] block">
                {t("hosp.preview.ribbonTitle", "Design Preview Note")}
              </span>
              <p className="leading-relaxed text-white/70">
                {t(
                  "hosp.footer.previewDisclaimer",
                  "This is an early preview for the director's review. No farmhouses are open for live payment or instant check-in."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Magnet Back-to-Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#A8B49E] gap-4">
          <p>© {new Date().getFullYear()} BAHINA Group. {t("hosp.footer.rights", "All rights reserved.")}</p>

          <div className="flex items-center gap-6">
            <p className="text-center sm:text-right">
              {t("hosp.footer.craftedFor", "Crafted with care for rural Maharashtra.")}
            </p>

            {/* Magnet Back-to-Top Button */}
            <Magnet magnetStrength={0.3} padding={30}>
              <button
                type="button"
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </Magnet>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HospitalityFooter;
