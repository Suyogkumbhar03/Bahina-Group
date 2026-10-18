import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Magnet } from "@/components/ui/Magnet";
import { useLanguage } from "@/lib/i18n";

export function HospitalityHeader() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#about-radhanagari");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const sheetRef = useRef(null);

  const isSubpage =
    location.pathname.includes("/farmhouses/") ||
    location.pathname.includes("/book/") ||
    location.pathname.includes("/sent") ||
    location.pathname.includes("/credits");

  const navLinks = useMemo(
    () => [
      {
        id: "about",
        name: t("hosp.nav.aboutRadhanagari", "About"),
        href: isSubpage ? "/hospitality#about-radhanagari" : "#about-radhanagari",
        hash: "about-radhanagari",
      },
      {
        id: "see",
        name: t("hosp.nav.thingsToSee", "Things to see"),
        href: isSubpage ? "/hospitality#things-to-see" : "#things-to-see",
        hash: "things-to-see",
      },
      {
        id: "wildlife",
        name: t("hosp.nav.wildlife", "Wildlife"),
        href: isSubpage ? "/hospitality#wildlife" : "#wildlife",
        hash: "wildlife",
      },
      {
        id: "food",
        name: t("hosp.nav.kolhapuriChav", "Kolhapuri Chav"),
        href: isSubpage ? "/hospitality#kolhapuri-chav" : "#kolhapuri-chav",
        hash: "kolhapuri-chav",
      },
      {
        id: "farmhouses",
        name: t("hosp.nav.farmhouses", "Farmhouses"),
        href: isSubpage ? "/hospitality#farmhouses" : "#farmhouses",
        hash: "farmhouses",
      },
      {
        id: "faq",
        name: t("hosp.nav.faq", "FAQ"),
        href: isSubpage ? "/hospitality#faq" : "#faq",
        hash: "faq",
      },
    ],
    [t, isSubpage]
  );

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Track scroll state and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      if (!isSubpage) {
        const scrollPos = scrollY + window.innerHeight * 0.35;
        for (let i = navLinks.length - 1; i >= 0; i--) {
          const el = document.getElementById(navLinks[i].hash);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(`#${navLinks[i].hash}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, isSubpage]);

  // Trap focus & handle Escape key for mobile menu sheet
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        if (!sheetRef.current) return;
        const focusable = sheetRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Focus first element inside sheet
    const timer = setTimeout(() => {
      if (sheetRef.current) {
        const first = sheetRef.current.querySelector(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
      }
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const isMr = language === "mr";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-[12px] px-3 sm:px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto relative flex items-center justify-between w-full max-w-[1200px] hosp-floating-pill ${
            scrolled ? "is-scrolled py-1.5 px-3 sm:px-4 scale-[0.985]" : "py-2 px-3 sm:px-4 scale-100"
          }`}
          aria-label={t("hosp.aria.mainNav", "Hospitality Navigation")}
        >
          {/* Brand Logo with Magnet */}
          <div className="shrink-0">
            <Magnet magnetStrength={0.2} padding={30}>
              <Link
                to="/hospitality"
                className="flex items-center space-x-2 text-white group py-1 px-2 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                aria-label={t("hosp.brand.homeAria", "BAHINA Hospitality Home")}
              >
                <span
                  lang="en"
                  className="font-display text-lg sm:text-xl tracking-[0.16em] font-semibold text-white group-hover:opacity-85 transition-opacity"
                >
                  BAHINA
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold tracking-[0.12em] text-[#DFA82E] px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                  {t("hosp.brand.division", "Radhanagari")}
                </span>
              </Link>
            </Magnet>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center relative p-1 rounded-full bg-white/[0.04] mx-2 shrink-0 border border-white/10">
            {navLinks.map((link) => {
              const isActive = !isSubpage && activeSection === `#${link.hash}`;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-[12px] font-sans font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200 z-10 ${
                    isActive ? "text-white" : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="hosp-pill-active-bg"
                      className="absolute inset-0 rounded-full bg-white/20 border border-white/25 -z-10 shadow-sm"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 28 }
                      }
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Cluster: Language Switcher + "See farmhouses" CTA + Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Pill-shaped Language Toggle (मराठी / EN) */}
            <div className="flex items-center rounded-full bg-white/10 p-0.5 border border-white/15 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage("mr")}
                className={`rounded-full px-2.5 py-1 text-[11px] transition ${
                  isMr
                    ? "bg-white text-[#173327] font-bold shadow-sm"
                    : "text-white/80 hover:text-white"
                }`}
                aria-label="Switch to Marathi"
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 py-1 text-[11px] transition ${
                  !isMr
                    ? "bg-white text-[#173327] font-bold shadow-sm"
                    : "text-white/80 hover:text-white"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Pill-shaped "See farmhouses" CTA Button */}
            <div className="hidden sm:block shrink-0">
              <Magnet magnetStrength={0.15} padding={25}>
                <a
                  href={isSubpage ? "/hospitality#farmhouses" : "#farmhouses"}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#B5472A] hover:bg-[#9E3E1A] px-3.5 sm:px-4 py-1.5 transition-all duration-300 text-white font-sans font-bold text-[11px] xl:text-[12px] uppercase tracking-[0.08em] shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-white min-h-[34px]"
                >
                  <span>{t("hosp.nav.seeFarmhouses", "See farmhouses")}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 text-white group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Magnet>
            </div>

            {/* Mobile Hamburger Trigger (below 1024px) */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex lg:hidden p-2 rounded-full text-white/90 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 min-h-[44px] min-w-[44px] items-center justify-center bg-white/10 border border-white/15"
              aria-label={t("nav.menuOpen", "Open navigation menu")}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Rounded Glass Sheet Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-start pt-4 px-4 lg:hidden"
            onClick={closeMobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label={t("hosp.aria.mainNav", "Navigation Menu")}
          >
            <motion.div
              ref={sheetRef}
              initial={prefersReducedMotion ? { opacity: 1 } : { y: -20, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-md mx-auto hosp-glass-sheet p-6 text-white space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl font-bold tracking-wider">BAHINA</span>
                  <span className="text-xs uppercase font-sans font-bold text-[#DFA82E] bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                    {t("hosp.brand.division", "Radhanagari")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/90 hover:text-white border border-white/15 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  aria-label={t("nav.menuClose", "Close menu")}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switch in Sheet */}
              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span className="text-xs uppercase font-bold tracking-widest text-[#DFA82E]">
                  {t("hosp.nav.selectLanguage", "Language")}
                </span>
                <div className="flex items-center rounded-full bg-white/10 p-0.5 border border-white/15 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setLanguage("mr")}
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      isMr
                        ? "bg-white text-[#173327] font-bold shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    मराठी
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      !isMr
                        ? "bg-white text-[#173327] font-bold shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Big Nav Links (min-height 48px per requirement) */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="min-h-[48px] flex items-center justify-between text-base font-semibold text-white/90 hover:text-white py-2 px-3 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#DFA82E]" />
                  </a>
                ))}
              </nav>

              {/* Bottom Actions in Sheet */}
              <div className="pt-2 border-t border-white/15 flex flex-col gap-2.5">
                <a
                  href={isSubpage ? "/hospitality#farmhouses" : "#farmhouses"}
                  onClick={closeMobileMenu}
                  className="min-h-[48px] w-full flex items-center justify-center rounded-xl bg-[#B5472A] hover:bg-[#9E3E1A] text-white font-bold text-sm shadow-md transition-colors"
                >
                  {t("hosp.nav.seeFarmhouses", "See farmhouses")}
                </a>
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="min-h-[48px] w-full flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors"
                >
                  {t("hosp.nav.backToGroup", "BAHINA Group Home")}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HospitalityHeader;
