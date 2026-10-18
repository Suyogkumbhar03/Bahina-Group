import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  CalendarDays,
  Users,
  Search,
  Sparkles,
  Waves,
  UtensilsCrossed,
  ShieldCheck,
  Trees,
  Sun,
  Home,
  Flame,
  Wifi,
  Car,
  Zap,
  Leaf,
  Mountain,
  Gamepad2,
  HeartHandshake,
  Wind,
  Bath,
  ChevronDown,
  Check,
  PhoneCall,
  Menu,
  X,
  Star,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Info,
  Compass,
  EyeOff,
  Camera,
  ExternalLink,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import { useLanguage } from "@/lib/i18n";
import {
  RADHANAGARI_KEY_FACTS,
  RADHANAGARI_PLACES,
  KOLHAPURI_CHAV,
  WILDLIFE_SPECIES,
  RADHANAGARI_FARMHOUSES,
} from "../data/radhanagari";
import { RoadAnimation } from "../components/RoadAnimation";
import { HoofprintCursor } from "../components/HoofprintCursor";
import { HospitalityHeader } from "../components/HospitalityHeader";
import "../theme/hospitality-theme.css";

// Control flags
export const SHOW_SAMPLE_PRICES = false;
export const SHOW_SAMPLE_RATINGS = false;

/* ---------- Helper subcomponents ---------- */
function TambdaPandhraDivider({ light = false }) {
  return (
    <div
      className={`w-full h-[2.5px] ${light ? "tambda-pandhra-line-light" : "tambda-pandhra-line"
        }`}
      aria-hidden="true"
    />
  );
}

function Eyebrow({ children, light }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold normal-case tracking-normal transition ${light
          ? "glass text-forest-foreground"
          : "bg-[#FAF0EC] text-[#B5472A]"
        }`}
    >
      <Sparkles className="h-3.5 w-3.5 text-gold" /> {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, sub, light, kolhapuriTag }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      {kolhapuriTag && (
        <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-gold">
          {kolhapuriTag}
        </span>
      )}
      <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl text-inherit">
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-lg ${light ? "text-forest-foreground/80" : "text-[#5C6E64]"
            }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function AnimatedHeroHeadline({ lang, before, highlight, after }) {
  return (
    <h1
      key={lang}
      className={`animate-rise mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-8xl ${lang === "mr" ? "tracking-normal" : "tracking-tight"
        }`}
      style={{ animationDelay: ".15s" }}
    >
      <span className="inline-block">{before}</span>{" "}
      <em className="text-sunset not-italic inline-block font-semibold">{highlight}</em>
      {after && (
        <>
          {" "}
          <span className="inline-block">{after}</span>
        </>
      )}
    </h1>
  );
}

function NumberTicker({ value, unit }) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef(null);
  const numeric = parseInt(value, 10);

  useEffect(() => {
    if (isNaN(numeric) || numeric < 10) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * numeric);
      setDisplayValue(current.toString());

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(updateCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, numeric]);

  return (
    <span ref={elementRef} className="font-display font-bold">
      {displayValue}
      {unit ? <span className="text-sm ml-1 font-sans">{unit}</span> : null}
    </span>
  );
}

export function HospitalityHome() {
  const { t, language, setLanguage } = useLanguage();
  // Default to Marathi if not set
  const isMr = language === "mr" || !language;

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePlaceFilter, setActivePlaceFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);

  // Search parameters (District is fixed to Radhanagari, Kolhapur)
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("4");

  // Farmhouse filter (All, Open, Coming soon, Under construction)
  const [farmhouseFilter, setFarmhouseFilter] = useState("All");

  // Quick inquiry modal
  const [modalType, setModalType] = useState(null); // 'booking' | 'notify' | null
  const [selectedStay, setSelectedStay] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dates: "",
    guests: "4",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: t("hosp.nav.aboutRadhanagari", "About Radhanagari"), href: "#about-radhanagari" },
      { label: t("hosp.nav.route", "Route"), href: "#route" },
      { label: t("hosp.nav.thingsToSee", "Things to see"), href: "#things-to-see" },
      { label: t("hosp.nav.wildlife", "Wildlife"), href: "#wildlife" },
      { label: t("hosp.nav.kolhapuriChav", "Kolhapuri Chav"), href: "#kolhapuri-chav" },
      { label: t("hosp.nav.farmhouses", "Farmhouses"), href: "#farmhouses" },
      { label: t("hosp.nav.faq", "FAQ"), href: "#faq" },
    ],
    [t, language]
  );

  const placeTypes = useMemo(
    () => [
      { id: "all", label: t("hosp.see.filterAll", "All Places") },
      { id: "wildlife", label: t("hosp.see.filterWildlife", "Wildlife") },
      { id: "dam", label: t("hosp.see.filterDam", "Dams & Water") },
      { id: "place", label: t("hosp.see.filterPlace", "Plateau & Falls") },
    ],
    [t, language]
  );

  const filteredPlaces = useMemo(() => {
    if (activePlaceFilter === "all") return RADHANAGARI_PLACES;
    return RADHANAGARI_PLACES.filter((p) => p.type === activePlaceFilter);
  }, [activePlaceFilter]);

  const farmhouseStatusFilters = useMemo(
    () => [
      { id: "All", label: t("hosp.fhSection.filterAll", "All Farmhouses") },
      { id: "open", label: t("hosp.fhSection.filterOpen", "Open for Requests") },
      { id: "coming_soon", label: t("hosp.fhSection.filterComing", "Coming Soon") },
      { id: "under_construction", label: t("hosp.fhSection.filterUnderConst", "Under Construction") },
    ],
    [t, language]
  );

  const filteredFarmhouses = useMemo(() => {
    if (farmhouseFilter === "All") return RADHANAGARI_FARMHOUSES;
    return RADHANAGARI_FARMHOUSES.filter((fh) => fh.status === farmhouseFilter);
  }, [farmhouseFilter]);

  const amenities = useMemo(
    () => [
      [Waves, t("hosp.amenities.item1", "Private plunge pool")],
      [UtensilsCrossed, t("hosp.amenities.item2", "Authentic Kolhapuri meals")],
      [Wifi, t("hosp.amenities.item3", "High-speed Wi-Fi")],
      [Flame, t("hosp.amenities.item4", "Bonfire lawn")],
      [Zap, t("hosp.amenities.item5", "Solar & power backup")],
      [Trees, t("hosp.amenities.item6", "Evergreen forest edge")],
      [Mountain, t("hosp.amenities.item7", "Sahyadri valley views")],
      [Car, t("hosp.amenities.item8", "Secure gated parking")],
      [Bath, t("hosp.amenities.item9", "Hot showers")],
      [Gamepad2, t("hosp.amenities.item10", "Board & lawn games")],
      [HeartHandshake, t("hosp.amenities.item11", "Pet friendly")],
      [Wind, t("hosp.amenities.item12", "Naturally airy bedrooms")],
    ],
    [t, language]
  );

  const howSteps = useMemo(
    () => [
      {
        i: Search,
        t: t("hosp.how.step1Title", "Discover your retreat"),
        d: t("hosp.how.step1Desc", "Browse farmhouses by forest proximity, private pool, and family size."),
      },
      {
        i: CalendarDays,
        t: t("hosp.how.step2Title", "Send stay request"),
        d: t("hosp.how.step2Desc", "Pick your tentative dates and guest count — no upfront payment required."),
      },
      {
        i: PhoneCall,
        t: t("hosp.how.step3Title", "Personal host care"),
        d: t("hosp.how.step3Desc", "Our local host calls to coordinate route directions, meal plans, and check-in."),
      },
    ],
    [t, language]
  );

  const faqs = useMemo(
    () => [
      [
        t("hosp.faq.q1", "Where is Radhanagari and how to reach?"),
        t("hosp.faq.a1", "Radhanagari is in Kolhapur district, Maharashtra, 46 km from the city, nestled in the Western Ghats."),
      ],
      [
        t("hosp.faq.q2", "Can we see wildlife and Indian bison?"),
        t("hosp.faq.a2", "Radhanagari is home to the Indian gaur. Sightings depend on nature; we do not promise animal sightings."),
      ],
      [
        t("hosp.faq.q3", "What is the best season to visit?"),
        t("hosp.faq.a3", "Please check official Forest Department schedules for sanctuary opening dates and safaris. Dirt tracks close during heavy rains."),
      ],
      [
        t("hosp.faq.q4", "Are the farmhouses open for stays now?"),
        t("hosp.faq.a4", "These farmhouses are currently under development. Guests cannot stay yet. Register to receive opening alerts."),
      ],
      [
        t("hosp.faq.q5", "Are authentic Kolhapuri meals provided?"),
        t("hosp.faq.a5", "Local cooks prepare fresh jowar bhakri, stone-ground curries, and authentic Kolhapuri recipes."),
      ],
    ],
    [t, language]
  );

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const target = document.getElementById("farmhouses");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBooking = (stay) => {
    setSelectedStay(stay);
    // Strict requirement: Only "open" shows booking request; rest show "notify me"
    setModalType(stay.status === "open" ? "booking" : "notify");
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setModalType(null);
      setFormSubmitted(false);
    }, 2500);
  };

  return (
    <div className="hospitality-theme relative overflow-x-hidden text-[#1A2E24] bg-[#FAF8F5]">
      {/* Desktop-only subtle hoofprint trail cursor */}
      <HoofprintCursor />

      {/* ---------- 1. NAVBAR (Curved Glassy Floating Pill) ---------- */}
      <HospitalityHeader />

      {/* ---------- 2a. HERO SECTION ---------- */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-forest pb-16 pt-36 sm:pt-40 md:pt-44 text-forest-foreground">
        <img
          src={hero}
          alt={t("hosp.hero.imgAlt", "Lush evergreen slopes of Radhanagari sanctuary")}
          className="animate-kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="bg-hero-overlay absolute inset-0" />

        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="max-w-3xl">
            {/* Friendly Kolhapuri greeting chip */}
            <div className="animate-rise inline-block mb-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-gold border border-gold/40">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                {t("hosp.hero.greeting", "Kasa kay? (Hello, in Kolhapuri)")}
              </span>
            </div>

            <div className="animate-rise">
              <Eyebrow light>
                {t("hosp.hero.greenCorner", "Kolhapur's green corner, 46 km from the city.")}
              </Eyebrow>
            </div>

            {/* Headline with AnimatedHeroHeadline, key={language} for re-render on language change */}
            <AnimatedHeroHeadline
              lang={language}
              before={t("hero.title.before", "Find")}
              highlight={t("hero.title.highlight", "calm")}
              after={t("hero.title.after", "beside Radhanagari.")}
            />

            <p
              className="animate-rise mt-6 max-w-xl text-lg text-forest-foreground/85"
              style={{ animationDelay: ".3s" }}
            >
              {t(
                "hosp.hero.desc",
                "Peaceful countryside farmhouses nestled beside Radhanagari Wildlife Sanctuary. An unhurried nature retreat about 46 km from Kolhapur city."
              )}
            </p>

            <div
              className="animate-rise mt-8 flex flex-wrap gap-4"
              style={{ animationDelay: ".45s" }}
            >
              <a
                href="#farmhouses"
                className="inline-flex items-center gap-2 rounded-full bg-sunset px-7 py-4 font-semibold text-white shadow-glow transition hover:-translate-y-1"
              >
                {t("hosp.hero.ctaFarmhouses", "Explore Farmhouses")}
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#about-radhanagari"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold text-forest-foreground transition hover:bg-forest-foreground/20"
              >
                {t("hosp.hero.ctaAbout", "Know Radhanagari")}
              </a>
            </div>
          </div>

          {/* Search bar: Fixed chip "Radhanagari, Kolhapur" + Dates + Guests */}
          <form
            onSubmit={handleHeroSearch}
            className="animate-rise mt-14 grid gap-2 rounded-3xl bg-white p-3 text-[#1A2E24] shadow-soft md:grid-cols-[1.2fr_1fr_1fr_auto]"
            style={{ animationDelay: ".6s" }}
          >
            {/* Fixed location chip (no district dropdown) */}
            <div className="flex items-center gap-3 rounded-2xl bg-[#FAF0EC] px-5 py-3 border border-[#B5472A]/20">
              <MapPin className="h-5 w-5 shrink-0 text-[#B5472A]" />
              <div className="flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-[#B5472A]">
                  {t("hosp.hero.search.locationLabel", "Location (Fixed)")}
                </span>
                <span className="font-semibold text-sm text-[#1A2E24] block">
                  {t("hosp.common.location", "Radhanagari, Kolhapur")}
                </span>
              </div>
            </div>

            {/* Dates */}
            <label className="flex items-center gap-3 rounded-2xl px-5 py-3 transition hover:bg-[#F3F5F3] cursor-pointer">
              <CalendarDays className="h-5 w-5 shrink-0 text-[#B5472A]" />
              <span className="flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-[#5C6E64]">
                  {t("hosp.hero.search.datesLabel", "Stay Dates")}
                </span>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-transparent font-semibold outline-none cursor-pointer text-[#1A2E24] text-sm"
                />
              </span>
            </label>

            {/* Guests */}
            <label className="flex items-center gap-3 rounded-2xl px-5 py-3 transition hover:bg-[#F3F5F3] cursor-pointer">
              <Users className="h-5 w-5 shrink-0 text-[#B5472A]" />
              <span className="flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-[#5C6E64]">
                  {t("hosp.hero.search.guestsLabel", "Guests")}
                </span>
                <select
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  className="w-full bg-transparent font-semibold outline-none cursor-pointer text-[#1A2E24] text-sm"
                >
                  <option value="2">{t("hosp.guests.option2", "2 guests")}</option>
                  <option value="4">{t("hosp.guests.option4", "4 guests")}</option>
                  <option value="8">{t("hosp.guests.option8", "8 guests")}</option>
                  <option value="12">{t("hosp.guests.option12", "12+ guests")}</option>
                </select>
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-forest px-8 py-4 font-semibold text-forest-foreground transition hover:opacity-95"
            >
              <Search className="h-5 w-5" /> {t("hosp.hero.search.submit", "Find Stays")}
            </button>
          </form>
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider />

      {/* ---------- 2b. "KNOW RADHANAGARI" FACT STRIP ---------- */}
      <section id="about-radhanagari" className="bg-[#FAF8F5] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead
            eyebrow={t("hosp.know.eyebrow", "Verified Facts")}
            kolhapuriTag={t("hosp.know.tag", "Pure Western Ghats Heritage")}
            title={
              <>
                {t("hosp.know.titleBefore", "Know Radhanagari:")}{" "}
                <span className="text-sunset">{t("hosp.know.titleHighlight", "A Living Sanctuary")}</span>
              </>
            }
            sub={t(
              "hosp.know.sub",
              "Officially documented sanctuary facts from Forest Department and UNESCO archives."
            )}
          />

          {/* 4 Fact tiles with number-ticker */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RADHANAGARI_KEY_FACTS.map((fact) => (
              <div
                key={fact.id}
                className="stitched-border rounded-3xl bg-white p-7 shadow-soft transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B5472A]">
                    {fact.status === "verified" ? (
                      <span className="inline-flex items-center gap-1 text-[#173327]">
                        <Check className="h-3.5 w-3.5" />
                        {t("hosp.know.verified", "Verified")}
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </span>
                  <span className="text-[10px] text-[#5C6E64] font-medium">Official Record</span>
                </div>

                <div className="mt-4 text-4xl font-bold text-[#173327]">
                  <NumberTicker
                    value={fact.number}
                    unit={isMr ? fact.unit.mr : fact.unit.en}
                  />
                </div>

                <h3 className="mt-3 text-lg font-semibold text-[#1A2E24]">
                  {isMr ? fact.label.mr : fact.label.en}
                </h3>
                <p className="mt-2 text-sm text-[#5C6E64] leading-relaxed">
                  {fact.desc
                    ? (isMr ? fact.desc.mr : fact.desc.en)
                    : fact.detail
                      ? (isMr ? fact.detail.mr : fact.detail.en)
                      : ""}
                </p>
              </div>
            ))}
          </div>

          {/* ---------- 2c. ROAD ANIMATION SECTION ---------- */}
          <div id="route" className="pt-10">
            <RoadAnimation />
          </div>
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider light />

      {/* ---------- 2d. "THINGS TO SEE" HORIZONTAL CARDS ---------- */}
      <section id="things-to-see" className="bg-[#F3F5F3] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead
            eyebrow={t("hosp.see.eyebrow", "Places of Interest")}
            title={
              <>
                {t("hosp.see.titleBefore", "Things to See in")}{" "}
                <span className="text-sunset">{t("hosp.see.titleHighlight", "Radhanagari")}</span>
              </>
            }
            sub={t(
              "hosp.see.sub",
              "Historic siphon dams, high altitude bison plateaus, and seasonal forest falls."
            )}
          />

          {/* Tag filter pills */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {placeTypes.map((pt) => (
              <button
                key={pt.id}
                type="button"
                onClick={() => setActivePlaceFilter(pt.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activePlaceFilter === pt.id
                    ? "bg-[#173327] text-white shadow-soft"
                    : "bg-white text-[#1A2E24] hover:bg-[#FAF0EC]"
                  }`}
              >
                {pt.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((place) => (
              <article
                key={place.id}
                className="stitched-border overflow-hidden rounded-3xl bg-white shadow-soft transition duration-300 hover:-translate-y-1 flex flex-col"
              >
                {place.image && place.image.src ? (
                  <div className="relative h-56 overflow-hidden bg-[#1E3A2B]">
                    <img
                      srcSet={`${place.image.srcMobile} 400w, ${place.image.src} 1200w`}
                      sizes="(max-width: 640px) 400px, 600px"
                      src={place.image.src}
                      alt={isMr ? place.image.alt.mr : place.image.alt.en}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                    {/* Category Chip */}
                    <span className="absolute left-4 top-4 rounded-full bg-[#173327]/90 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm shadow-sm">
                      {place.type}
                    </span>

                    {/* Real photo badge */}
                    <span className="absolute bottom-2 right-3 text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Camera className="h-3 w-3 text-[#DFA82E]" />
                      {t("hosp.badge.realPhoto", "Real photo")}
                    </span>
                  </div>
                ) : (
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#1E3A2B] via-[#2A4D3B] to-[#142820] flex flex-col items-center justify-center text-center p-6 text-white/90">
                    <Camera className="h-8 w-8 text-white/40 mb-2" />
                    <p className="text-sm font-semibold text-white/90">
                      {isMr ? place.name.mr : place.name.en}
                    </p>
                    <p className="text-[11px] text-white/60 mt-1">
                      {isMr ? "मुक्त परवाना छायाचित्र हवे आहे" : "Free-license photo needed"}
                    </p>

                    {/* Category Chip */}
                    <span className="absolute left-4 top-4 rounded-full bg-[#173327]/90 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm shadow-sm">
                      {place.type}
                    </span>

                    {/* Photo needed badge */}
                    <span className="absolute bottom-2 right-3 text-[10px] font-semibold text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Camera className="h-3 w-3 text-amber-300" />
                      {t("hosp.badge.photoNeeded", "Photo needed")}
                    </span>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2E24]">
                      {isMr ? place.name.mr : place.name.en}
                    </h3>
                    <p className="mt-2 text-sm text-[#5C6E64] leading-relaxed">
                      {isMr ? place.blurb.mr : place.blurb.en}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-[#E2E7E3] pt-4">
                      {place.facts.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#1A2E24]/80">
                          <Check className="h-3.5 w-3.5 text-[#B5472A] shrink-0 mt-0.5" />
                          <span>{isMr ? f.mr : f.en}</span>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider />

      {/* ---------- 2e. WILDLIFE SECTION (DARK GREEN) ---------- */}
      <section id="wildlife" className="relative overflow-hidden bg-forest py-28 text-forest-foreground">
        {/* Ambient floating glow */}
        <div className="animate-floaty absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#B5472A]/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHead
            light
            eyebrow={t("hosp.wildlife.eyebrow", "Forest Biodiversity")}
            kolhapuriTag={t("hosp.wildlife.tag", "Dajipur Bison Reserve")}
            title={
              <>
                {t("hosp.wildlife.titleBefore", "Realm of the Gaur:")}{" "}
                <span className="text-sunset">{t("hosp.wildlife.titleHighlight", "Evergreen Wilderness")}</span>
              </>
            }
            sub={t(
              "hosp.wildlife.sub",
              "351 sq km of pristine Western Ghats canopy sheltering rare endemic mammals and birds."
            )}
          />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left: Indian Gaur Silhouette & Species Showcase */}
            <div>
              {/* Majestic Indian Gaur Silhouette Graphic */}
              <div className="relative rounded-3xl bg-forest-foreground/5 p-8 border border-forest-foreground/10 text-center mb-8">
                <div className="animate-floaty mx-auto my-4 w-48 h-36 flex items-center justify-center">
                  {/* Stylized Gaur / Bison silhouette */}
                  <svg
                    viewBox="0 0 200 140"
                    className="w-full h-full fill-[#D9A441] opacity-90 drop-shadow-md"
                    aria-label="Indian Gaur Bison Silhouette"
                  >
                    <path d="M25,85 C30,70 45,55 60,52 C65,40 70,30 80,24 C75,18 70,12 60,10 C55,9 52,14 55,16 C62,18 68,22 72,28 C55,26 42,35 38,45 C32,55 30,68 25,85 Z" />
                    <path d="M55,55 C70,45 95,42 120,44 C140,46 160,52 175,65 C185,75 190,90 190,110 L180,110 C178,98 174,85 165,78 C155,70 135,66 115,64 C95,62 75,65 60,75 L55,55 Z" />
                    <path d="M40,75 C50,68 70,72 85,82 C95,88 105,98 110,115 L95,115 C92,102 85,95 75,90 C65,85 52,82 40,75 Z" />
                    <path d="M125,75 C135,78 145,85 150,95 L155,130 L145,130 L140,100 C135,92 128,85 120,80 Z" />
                    <path d="M70,85 L75,130 L65,130 L60,95 C62,90 66,88 70,85 Z" />
                    <path d="M165,90 L170,130 L160,130 L155,98 Z" />
                    <path d="M95,95 L100,130 L90,130 L85,102 Z" />
                  </svg>
                </div>
                <h4 className="font-display text-2xl font-bold text-white">
                  {t("hosp.wildlife.gaurTitle", "Indian Gaur (Bison)")}
                </h4>
                <p className="mt-1 text-xs uppercase tracking-widest text-gold font-semibold">
                  Bos gaurus • Keystone Herbivore
                </p>
                <p className="mt-3 text-sm text-forest-foreground/75 max-w-md mx-auto">
                  {t(
                    "hosp.wildlife.gaurDesc",
                    "Radhanagari is recognized as Maharashtra's premier sanctuary for the formidable Indian Gaur."
                  )}
                </p>
              </div>

              {/* Species Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WILDLIFE_SPECIES.map((sp) => (
                  <div
                    key={sp.name.en}
                    className="rounded-2xl border border-forest-foreground/10 bg-forest-foreground/5 p-3.5 text-center transition hover:border-gold/40 hover:bg-forest-foreground/10"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold block">
                      {isMr ? sp.badge.mr : sp.badge.en}
                    </span>
                    <span className="mt-1 font-semibold text-xs text-white block">
                      {isMr ? sp.name.mr : sp.name.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bird species count & STRICT VISITOR RULES BOX */}
            <div className="space-y-6">
              {/* 264 Bird Species Card */}
              <div className="stitched-border-dark rounded-3xl bg-forest-foreground/5 p-7">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  {t("hosp.wildlife.birdsEyebrow", "Avian Diversity")}
                </span>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-5xl font-bold text-white">264</span>
                  <span className="text-sm text-forest-foreground/80 font-medium">
                    {t("hosp.wildlife.birdsCount", "Recorded bird species")}
                  </span>
                </div>
                <p className="mt-3 text-sm text-forest-foreground/75 leading-relaxed">
                  {t(
                    "hosp.wildlife.birdsDesc",
                    "Including the magnificent Great Pied Hornbill and endemic Malabar Grey Hornbill nesting in old-growth fruit trees."
                  )}
                </p>
              </div>

              {/* STRICT VISITOR RULES BOX (MANDATORY REQUIREMENT) */}
              <div className="rounded-3xl border-2 border-[#B5472A]/70 bg-[#173327]/90 p-7 shadow-soft">
                <div className="flex items-center gap-2.5 text-[#E65C2B]">
                  <ShieldCheck className="h-6 w-6 text-[#D9A441]" />
                  <h4 className="font-bold text-base uppercase tracking-wider text-white">
                    {t("hosp.wildlife.rulesTitle", "Forest Department Visitor Rules")}
                  </h4>
                </div>

                <ul className="mt-4 space-y-3 text-sm text-forest-foreground/85">
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <span>
                      {t(
                        "hosp.wildlife.rule1",
                        "Narrow dirt and forest tracks remain strictly closed during the monsoon season for safety."
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <span>
                      {t(
                        "hosp.wildlife.rule2",
                        "Entry is permitted solely as per official Maharashtra Forest Department timings and gate passes."
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-amber-300 font-semibold">
                    <EyeOff className="h-4 w-4 shrink-0 text-amber-300 mt-0.5" />
                    <span>
                      {t(
                        "hosp.wildlife.rule3",
                        "We do not promise animal sightings. Wildlife movements remain completely wild and natural."
                      )}
                    </span>
                  </li>
                </ul>

                {/* Clear note that no safari booking button exists */}
                <div className="mt-5 pt-4 border-t border-forest-foreground/15 text-[11px] text-forest-foreground/60 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span>
                    {t(
                      "hosp.wildlife.rulesNote",
                      "Note: We do not operate or sell safari bookings. Contact the local Forest Office for permits."
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider />

      {/* ---------- 2f. "KOLHAPURI CHAV" STRIP ---------- */}
      <section id="kolhapuri-chav" className="bg-[#FAF8F5] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead
            eyebrow={t("hosp.chav.eyebrow", "Regional Heritage")}
            kolhapuriTag={t("hosp.chav.tag", "Taste of Kolhapur")}
            title={
              <>
                {t("hosp.chav.titleBefore", "Kolhapuri Chav:")}{" "}
                <span className="text-sunset">{t("hosp.chav.titleHighlight", "Culinary & Cultural Pride")}</span>
              </>
            }
            sub={t(
              "hosp.chav.sub",
              "World-renowned spicy broths, fiery misal, GI-tagged leathercraft, and royal wrestling traditions."
            )}
          />

          {/* Cards for Kolhapuri Chav */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {KOLHAPURI_CHAV.map((item) => (
              <div
                key={item.id}
                className="stitched-border rounded-3xl bg-white p-6 shadow-soft transition hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B5472A] block">
                    {isMr ? item.tag.mr : item.tag.en}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-[#1A2E24]">
                    {isMr ? item.title.mr : item.title.en}
                  </h3>
                  <p className="mt-2 text-xs text-[#5C6E64] leading-relaxed">
                    {isMr ? item.desc.mr : item.desc.en}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E7E3] text-[10px] text-[#B5472A] font-semibold">
                  {t("hosp.chav.pride", "Kolhapur Pride")}
                </div>
              </div>
            ))}
          </div>

          {/* Mandatory Disclaimer Note */}
          <div className="mt-8 rounded-2xl bg-[#FAF0EC] p-4 text-center text-xs text-[#B5472A] font-semibold border border-[#B5472A]/20 max-w-xl mx-auto">
            <Info className="h-4 w-4 inline mr-1 text-[#B5472A]" />
            {t(
              "hosp.chav.disclaimer",
              "Cultural reference only; denotes regional heritage, not immediate on-site commercial services."
            )}
          </div>
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider light />

      {/* ---------- 2g. FARMHOUSES: "BAHINA FARMHOUSES IN RADHANAGARI" ---------- */}
      <section id="farmhouses" className="bg-[#F3F5F3] py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead
            eyebrow={t("hosp.fhSection.eyebrow", "Countryside Farmhouses")}
            kolhapuriTag={t("hosp.fhSection.tag", "Radhanagari, Kolhapur, Maharashtra")}
            title={
              <>
                {t("hosp.fhSection.titleBefore", "BAHINA Farmhouses in")}{" "}
                <span className="text-sunset">{t("hosp.fhSection.titleHighlight", "Radhanagari")}</span>
              </>
            }
            sub={t(
              "hosp.fhSection.sub",
              "Eco-sensitive laterite stone retreats in development. Exact location shared after launch."
            )}
          />

          {/* Status filter pills */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {farmhouseStatusFilters.map((flt) => (
              <button
                key={flt.id}
                type="button"
                onClick={() => setFarmhouseFilter(flt.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${farmhouseFilter === flt.id
                    ? "bg-[#173327] text-white shadow-soft"
                    : "bg-white text-[#1A2E24] hover:bg-[#FAF0EC]"
                  }`}
              >
                {flt.label}
              </button>
            ))}
          </div>

          {/* Farmhouses Cards (Text-only location, NO map pins) */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredFarmhouses.map((s) => (
              <article
                key={s.slug}
                className="stitched-border overflow-hidden rounded-3xl bg-white shadow-soft transition duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-[#E2E7E3]">
                    <img
                      src={s.img}
                      alt={isMr ? s.name.mr : s.name.en}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />

                    {/* Status Chip */}
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${s.status === "open"
                          ? "bg-sunset text-white"
                          : "glass text-forest-foreground"
                        }`}
                    >
                      {isMr ? s.statusLabel.mr : s.statusLabel.en}
                    </span>

                    {/* Image Type Label */}
                    <span className="absolute bottom-2 right-3 text-[10px] font-semibold text-white/80 bg-black/45 px-2 py-0.5 rounded backdrop-blur-sm">
                      {s.imgType}
                    </span>

                    {/* Sample rating only if flag is enabled */}
                    {SHOW_SAMPLE_RATINGS && s.sampleRating && (
                      <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1A2E24] shadow-sm">
                        <span className="rounded bg-amber-100 px-1 text-[9px] text-amber-800 font-bold mr-1">
                          {t("hosp.fhSection.sample", "Sample")}
                        </span>
                        <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {s.sampleRating}
                      </span>
                    )}
                  </div>

                  <div className="p-7">
                    {/* Text-only location with explicit Radhanagari Kolhapur string */}
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#B5472A]">
                      {s.location}
                    </p>
                    <p className="text-[11px] text-[#5C6E64] italic mt-0.5">
                      {t("hosp.fhSection.locationNotice", "Exact location shared after launch")}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#1A2E24]">
                      {isMr ? s.name.mr : s.name.en}
                    </h3>

                    <p className="mt-2 text-xs text-[#5C6E64]">
                      {isMr ? s.tagline.mr : s.tagline.en}
                    </p>

                    <div className="mt-4 flex gap-4 text-xs font-semibold text-[#5C6E64] border-t border-[#E2E7E3] pt-4">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-[#B5472A]" /> {s.guests} {t("hosp.fhSection.guests", "guests")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Home className="h-4 w-4 text-[#B5472A]" /> {s.beds} {t("hosp.fhSection.bedrooms", "bedrooms")}
                      </span>
                    </div>

                    <div className="mt-4 space-y-1.5">
                      {(s.highlights || s.amenities || []).map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#1A2E24]/80">
                          <Check className="h-3 w-3 text-gold shrink-0 mt-0.5" />
                          <span>{isMr ? h.mr : h.en}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-7 pb-7 pt-2">
                  <div className="flex items-center justify-between border-t border-[#E2E7E3] pt-4">
                    <div>
                      {SHOW_SAMPLE_PRICES && s.samplePrice ? (
                        <>
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] text-amber-800 font-bold block w-max mb-1">
                            {t("hosp.fhSection.samplePrice", "Sample Price")}
                          </span>
                          <span className="font-display text-xl font-bold text-[#1A2E24]">
                            {s.samplePrice}
                          </span>
                          <span className="text-xs text-[#5C6E64]">{t("hosp.fhSection.perNight", " / night")}</span>
                        </>
                      ) : (
                        <span className="text-xs font-semibold text-[#5C6E64] block">
                          {t("hosp.fhSection.priceOnRequest", "Price on request")}
                        </span>
                      )}
                    </div>

                    {/* Strict rule: only "open" shows Request to book, rest show Notify me */}
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(s)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold transition ${s.status === "open"
                          ? "bg-sunset text-white hover:opacity-90 shadow-sm"
                          : "bg-[#173327] text-white hover:opacity-90"
                        }`}
                    >
                      {s.status === "open"
                        ? t("hosp.fhSection.requestToBook", "Request to book")
                        : t("hosp.fhSection.notifyMe", "Notify me")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider />

      {/* ---------- 2h. SIGNATURE AMENITIES (FIX 0: VISIBLE BY DEFAULT) ---------- */}
      <section id="amenities" className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead
          eyebrow={t("hosp.amenities.eyebrow", "Farmhouse Amenities")}
          title={
            <>
              {t("hosp.amenities.titleBefore", "Everything You Need for a")}{" "}
              <span className="text-sunset">{t("hosp.amenities.titleHighlight", "Restful Stay")}</span>
            </>
          }
          sub={t(
            "hosp.amenities.sub",
            "Thoughtfully balanced with rural calm and comfortable modern essentials."
          )}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {amenities.map(([Icon, label], i) => (
            <div
              key={label}
              className="stitched-border group flex items-center gap-4 rounded-2xl bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#B5472A] hover:shadow-soft"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#FAF0EC] text-[#B5472A] transition group-hover:bg-sunset group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-semibold text-sm text-[#1A2E24]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider light />

      {/* ---------- 2h. HOW BOOKING WORKS ---------- */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead
          eyebrow={t("hosp.how.eyebrow", "Booking Process")}
          title={t("hosp.how.title", "How Booking Works")}
          sub={t(
            "hosp.how.sub",
            "Transparent, direct planning without any upfront advance."
          )}
        />
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-0.5 border-t-2 border-dashed border-[#B5472A]/40 md:block pointer-events-none" />
          {howSteps.map(({ i: Icon, t, d }, idx) => (
            <div key={t} className="relative text-center">
              <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-sunset text-white shadow-glow">
                <Icon className="h-8 w-8" />
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-forest text-xs font-bold text-forest-foreground">
                  {idx + 1}
                </span>
              </span>
              <h3 className="mt-6 text-2xl font-bold text-[#1A2E24]">{t}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-[#5C6E64]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider />

      {/* ---------- 2h. COMMON QUESTIONS (FAQ) ---------- */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <SectionHead
          eyebrow={t("hosp.faq.eyebrow", "Frequently Asked Questions")}
          title={t("hosp.faq.title", "Common Questions")}
        />
        <div className="space-y-4">
          {faqs.map(([q, a], i) => (
            <div
              key={q}
              className={`stitched-border overflow-hidden rounded-2xl bg-white transition ${openFaq === i ? "shadow-soft border-[#B5472A]" : ""
                }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-bold text-[#1A2E24]"
              >
                {q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#B5472A] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""
                    }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
              >
                <div className="overflow-hidden px-6 text-[#5C6E64]">
                  <p className="pb-6 text-sm leading-relaxed">{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Tambda-Pandhra Split Line Divider ---------- */}
      <TambdaPandhraDivider />

      {/* ---------- 2h. FOOTER & FINAL CTA ---------- */}
      <footer className="bg-forest text-forest-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* Final CTA Banner */}
          <div className="mb-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-sunset p-10 text-white md:flex-row md:items-center shadow-glow">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-200 block mb-1">
                {t("hosp.cta.eyebrow", "Countryside Beckons")}
              </span>
              <h3 className="text-3xl font-bold md:text-4xl">
                {t("hosp.cta.title", "Come to Radhanagari!")}
              </h3>
              <p className="mt-2 text-white/90 text-sm max-w-md">
                {t(
                  "hosp.cta.sub",
                  "Register your interest to experience honest village hospitality and Western Ghats tranquility."
                )}
              </p>
            </div>
            <a
              href="#farmhouses"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 font-bold text-forest-foreground transition hover:-translate-y-1 shadow-md"
            >
              {t("hosp.cta.btn", "View Farmhouses")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="font-display text-2xl font-bold">
                BAHINA <span className="text-gold">Hospitality</span>
              </p>
              <p className="mt-3 max-w-xs text-forest-foreground/75 text-sm leading-relaxed">
                {t(
                  "hosp.home.about",
                  "Quiet rural farmhouses near Radhanagari Wildlife Sanctuary. An eco-conscious initiative of BAHINA Group."
                )}
              </p>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
                {t("hosp.home.explore", "Explore")}
              </p>
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-1.5 text-sm text-forest-foreground/80 transition hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/hospitality/credits"
                className="block py-1.5 text-sm text-forest-foreground/80 transition hover:text-gold"
              >
                {t("hosp.footer.creditsLink", "Photo credits and licenses")}
              </Link>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
                {t("hosp.home.contact", "Contact & Location")}
              </p>
              <p className="flex items-center gap-2 py-1.5 text-sm text-forest-foreground/80">
                <Mail className="h-4 w-4 text-gold" /> hospitality@bahinas.com
              </p>
              {/* STRICT REQUIREMENT: Location must be Radhanagari, Kolhapur, Maharashtra */}
              <p className="flex items-center gap-2 py-1.5 text-sm text-forest-foreground/80">
                <MapPin className="h-4 w-4 text-gold" /> Radhanagari, Kolhapur, Maharashtra
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-forest-foreground/15 pt-6 text-xs text-forest-foreground/50 sm:flex-row">
            <p>© 2026 BAHINA Group. Design preview — sample content only.</p>
            <Link to="/" className="text-forest-foreground/70 hover:text-gold transition">
              ← {t("hosp.home.backToMain", "Back to BAHINA Group")}
            </Link>
          </div>
        </div>
      </footer>

      {/* ---------- QUICK INQUIRY / NOTIFY MODAL ---------- */}
      {modalType && selectedStay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-7 text-[#1A2E24] shadow-2xl animate-rise">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#F3F5F3] text-[#5C6E64] hover:text-[#1A2E24] transition"
            >
              <X className="h-5 w-5" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center animate-rise">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#FAF0EC] text-[#B5472A]">
                  <CheckCircle2 className="h-10 w-10 text-[#B5472A]" />
                </div>
                <h3 className="text-2xl font-bold">
                  {modalType === "booking"
                    ? t("hosp.modal.bookingSuccessTitle", "Stay request received!")
                    : t("hosp.modal.notifySuccessTitle", "You're on the early alert list!")}
                </h3>
                <p className="mt-2 text-sm text-[#5C6E64]">
                  {modalType === "booking"
                    ? t(
                      "hosp.modal.bookingSuccessDesc",
                      "Our concierge team will call to review your dates and dietary preferences."
                    )
                    : t(
                      "hosp.modal.notifySuccessDesc",
                      "We will notify you the moment this Radhanagari property opens for reservations."
                    )}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 pr-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B5472A]">
                    {modalType === "booking"
                      ? t("hosp.modal.bookingTitle", "Stay Request (No upfront payment)")
                      : t("hosp.modal.notifyTitle", "Opening Notification")}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold">
                    {isMr ? selectedStay.name.mr : selectedStay.name.en}
                  </h3>
                  <p className="text-xs text-[#5C6E64]">{selectedStay.location}</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6E64] mb-1">
                      {t("hosp.modal.nameLabel", "Your Full Name")}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E7E3] px-4 py-2.5 text-sm outline-none focus:border-[#B5472A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6E64] mb-1">
                        {t("hosp.modal.phoneLabel", "Mobile Number")}
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-[#E2E7E3] px-4 py-2.5 text-sm outline-none focus:border-[#B5472A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6E64] mb-1">
                        {t("hosp.modal.emailLabel", "Email Address")}
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-[#E2E7E3] px-4 py-2.5 text-sm outline-none focus:border-[#B5472A]"
                      />
                    </div>
                  </div>

                  {modalType === "booking" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6E64] mb-1">
                          {t("hosp.modal.datesLabel", "Preferred Dates")}
                        </label>
                        <input
                          type="date"
                          value={formData.dates}
                          onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                          className="w-full rounded-xl border border-[#E2E7E3] px-4 py-2 text-sm outline-none focus:border-[#B5472A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6E64] mb-1">
                          {t("hosp.modal.guestsLabel", "Guests")}
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full rounded-xl border border-[#E2E7E3] px-4 py-2 text-sm outline-none focus:border-[#B5472A]"
                        >
                          <option value="2">{t("hosp.guests.option2", "2 guests")}</option>
                          <option value="4">{t("hosp.guests.option4", "4 guests")}</option>
                          <option value="8">{t("hosp.guests.option8", "8 guests")}</option>
                          <option value="12">{t("hosp.guests.option12", "12+ guests")}</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6E64] mb-1">
                      {t("hosp.modal.requestsLabel", "Special Requests")}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={t(
                        "hosp.modal.requestsPlaceholder",
                        "e.g. Vegetarian preference or authentic Kolhapuri meal requests"
                      )}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E7E3] px-4 py-2 text-sm outline-none focus:border-[#B5472A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-sunset py-3.5 font-bold text-white shadow-soft transition hover:opacity-95"
                  >
                    {modalType === "booking"
                      ? t("hosp.modal.submitBooking", "Submit Stay Request")
                      : t("hosp.modal.submitNotify", "Notify Me on Opening")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-center text-[11px] text-[#5C6E64]">
                    {t(
                      "hosp.modal.noUpfront",
                      "No upfront payment. Our local host verifies details via call."
                    )}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalityHome;
