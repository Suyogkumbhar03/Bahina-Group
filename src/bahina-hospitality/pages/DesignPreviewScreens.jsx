import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { SAMPLE_FARMHOUSES } from "../data/farmhouses.sample";
import { FarmhouseCard } from "../components/FarmhouseCard";
import { ConstructionTimeline } from "../components/ConstructionTimeline";
import { StayPass } from "../components/StayPass";
import { HowItWorks } from "../components/HowItWorks";
import { AmenitiesMarquee } from "../components/AmenitiesMarquee";
import { NotifyDialog } from "../components/NotifyDialog";
import { FilterSheet } from "../components/FilterSheet";
import { BlockPrintDivider, BlockPrintFlower } from "../components/BlockPrintMotif";
import { Smartphone, Monitor, Globe, Check, Sparkles, ExternalLink, Bell, ArrowRight } from "lucide-react";
import "../theme/hospitality-theme.css";

export function DesignPreviewScreens() {
  const { language, setLanguage, t } = useLanguage();

  const [activeTab, setActiveTab] = useState("all");
  const [deviceWidth, setDeviceWidth] = useState("1440"); // "390" or "1440" or "full"
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const openFarmhouse = SAMPLE_FARMHOUSES[0];
  const constructionFarmhouse = SAMPLE_FARMHOUSES[3] || SAMPLE_FARMHOUSES[2];

  const screens = [
    { id: "hero", label: "Doorway Hero & Search" },
    { id: "stays", label: "Editorial Stays Grid" },
    { id: "empty", label: "No-Results & Coming-Soon" },
    { id: "path", label: "Village Path (How Booking Works)" },
    { id: "timeline", label: "ConstructionPath (Milestones)" },
    { id: "staypass", label: "Stay Pass (Ticket & Stamp)" },
    { id: "marquee", label: "Amenities Marquee" },
  ];

  return (
    <div className="min-h-screen bg-[#1C2B4F] text-[#FFFDF8] font-sans pb-24">
      {/* Top Controller Bar */}
      <header className="sticky top-0 z-50 bg-[#1C2B4F]/95 backdrop-blur-md border-b border-white/15 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/hospitality"
            className="flex items-center gap-2 text-white hover:text-[#F4A62A] transition-colors"
          >
            <BlockPrintFlower size={20} className="text-[#F4A62A]" />
            <span className="font-extrabold text-base tracking-wider uppercase">
              BAHINA Hospitality
            </span>
          </Link>
          <span className="px-2.5 py-0.5 rounded-full bg-[#BA4A21] text-[11px] font-bold text-white uppercase tracking-wider">
            Design Preview Screens
          </span>
        </div>

        {/* Viewport Width & Language Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Viewport Toggles */}
          <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/15">
            <button
              type="button"
              onClick={() => setDeviceWidth("390")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                deviceWidth === "390"
                  ? "bg-[#F4A62A] text-[#1C2B4F] shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>390px</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceWidth("1440")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                deviceWidth === "1440"
                  ? "bg-[#F4A62A] text-[#1C2B4F] shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>1440px</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceWidth("full")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                deviceWidth === "full"
                  ? "bg-[#F4A62A] text-[#1C2B4F] shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Full Width
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/15">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === "en"
                  ? "bg-[#BA4A21] text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("mr")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === "mr"
                  ? "bg-[#BA4A21] text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Live Route Shortcuts */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/hospitality"
              className="inline-flex items-center gap-1 text-xs text-[#FFF4D9] hover:text-[#F4A62A] font-bold px-3 py-1.5 rounded-full border border-white/20 hover:border-[#F4A62A]"
            >
              <span>Home</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to={`/hospitality/farmhouses/${openFarmhouse.slug}`}
              className="inline-flex items-center gap-1 text-xs text-[#FFF4D9] hover:text-[#F4A62A] font-bold px-3 py-1.5 rounded-full border border-white/20 hover:border-[#F4A62A]"
            >
              <span>Details</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to={`/hospitality/book/${openFarmhouse.slug}`}
              className="inline-flex items-center gap-1 text-xs text-[#FFF4D9] hover:text-[#F4A62A] font-bold px-3 py-1.5 rounded-full border border-white/20 hover:border-[#F4A62A]"
            >
              <span>Book</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/hospitality/sent"
              className="inline-flex items-center gap-1 text-xs text-[#FFF4D9] hover:text-[#F4A62A] font-bold px-3 py-1.5 rounded-full border border-white/20 hover:border-[#F4A62A]"
            >
              <span>Sent Pass</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Screen Navigation Tabs */}
      <div className="bg-[#1C2B4F]/80 border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "all"
              ? "bg-[#FFFDF8] text-[#1C2B4F]"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          All Screens
        </button>
        {screens.map((sc) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => setActiveTab(sc.id)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === sc.id
                ? "bg-[#FFFDF8] text-[#1C2B4F]"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Container simulating chosen width */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div
          className={`mx-auto transition-all duration-300 ${
            deviceWidth === "390"
              ? "max-w-[390px] border-4 border-[#35508C] rounded-[44px] overflow-hidden bg-[#FFFDF8] text-[#1F1B2D] p-3 shadow-2xl"
              : deviceWidth === "1440"
              ? "max-w-[1440px] border border-white/15 rounded-3xl bg-[#FFFDF8] text-[#1F1B2D] p-6 sm:p-8 shadow-2xl"
              : "w-full bg-[#FFFDF8] text-[#1F1B2D] p-6 sm:p-10 rounded-3xl"
          }`}
        >
          <div className="hospitality-theme" data-lang={language}>
            {/* 1. SCREEN: STAY PASS */}
            {(activeTab === "all" || activeTab === "staypass") && (
              <section className="py-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C2B4F]/15">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#BA4A21]">
                    Screen State: Booking Request Sent Pass
                  </span>
                  <span className="text-xs text-[#35508C] font-bold">
                    Signature Stay Pass with Animated Ink Stamp
                  </span>
                </div>
                <StayPass
                  farmhouse={openFarmhouse}
                  dates={{ checkIn: "2026-11-14", checkOut: "2026-11-16" }}
                  guests={{ adults: 4, children: 1 }}
                  requestId="BH-261016-8492"
                  showStamp={true}
                />
              </section>
            )}

            {/* 2. SCREEN: CONSTRUCTION PATH */}
            {(activeTab === "all" || activeTab === "timeline") && (
              <section className="py-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C2B4F]/15">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#BA4A21]">
                    Screen State: ConstructionPath (5 Milestones)
                  </span>
                  <span className="text-xs text-[#35508C] font-bold">
                    Alternating Cards Desktop / Vertical Mobile (Zero Text Overlap)
                  </span>
                </div>
                <ConstructionTimeline currentStep={3} />
              </section>
            )}

            {/* 3. SCREEN: VILLAGE PATH */}
            {(activeTab === "all" || activeTab === "path") && (
              <section className="py-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C2B4F]/15">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#BA4A21]">
                    Screen State: How Booking Works (Village Path)
                  </span>
                  <span className="text-xs text-[#35508C] font-bold">
                    Dotted Path with Warli Bullock Cart
                  </span>
                </div>
                <HowItWorks />
              </section>
            )}

            {/* 4. SCREEN: EDITORIAL STAYS GRID */}
            {(activeTab === "all" || activeTab === "stays") && (
              <section className="py-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C2B4F]/15">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#BA4A21]">
                    Screen State: Stays Grid (Editorial Rhythm)
                  </span>
                  <span className="text-xs text-[#35508C] font-bold">
                    Featured Wide Card + Standard Cards with Arch Frames & Hover Amenities
                  </span>
                </div>
                <div className="space-y-6">
                  <FarmhouseCard farmhouse={openFarmhouse} featured={true} index={0} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SAMPLE_FARMHOUSES.slice(1, 4).map((fh, i) => (
                      <FarmhouseCard key={fh.id} farmhouse={fh} featured={false} index={i + 1} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 5. SCREEN: AMENITIES MARQUEE */}
            {(activeTab === "all" || activeTab === "marquee") && (
              <section className="py-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C2B4F]/15">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#BA4A21]">
                    Screen State: Amenities Marquee
                  </span>
                  <span className="text-xs text-[#35508C] font-bold">
                    Slow Looping Strip (Pauses on Hover & Touch)
                  </span>
                </div>
                <AmenitiesMarquee />
              </section>
            )}

            {/* 6. SCREEN: EMPTY / COMING SOON STATES */}
            {(activeTab === "all" || activeTab === "empty") && (
              <section className="py-8 space-y-8">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C2B4F]/15">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#BA4A21]">
                    Screen States: Coming Soon & No-Results
                  </span>
                </div>
                {/* Coming Soon */}
                <div className="p-8 text-center max-w-xl mx-auto bg-[#FFF4D9] rounded-3xl border border-[#1C2B4F]/20 space-y-3">
                  <h3 className="text-2xl font-extrabold text-[#1C2B4F]">
                    {t("hosp.filter.comingSoonTitle", "Farmhouse stays opening soon")}
                  </h3>
                  <p className="text-sm text-[#1F1B2D]/80">
                    {t(
                      "hosp.filter.comingSoonText",
                      "We are building countryside retreats across Maharashtra."
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setNotifyOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#BA4A21] text-white text-xs font-bold"
                  >
                    <Bell className="w-4 h-4" />
                    <span>{t("hosp.filter.comingSoonAction", "Notify me when stays open")}</span>
                  </button>
                </div>

                {/* No Results */}
                <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-3xl border border-[#1C2B4F]/20 space-y-3 shadow-xs">
                  <h3 className="text-xl font-extrabold text-[#1C2B4F]">
                    {t("hosp.filter.noResultsTitle", "No farmhouses match your search")}
                  </h3>
                  <p className="text-xs text-[#1F1B2D]/80">
                    {t(
                      "hosp.filter.noResultsText",
                      "Try clearing some filters to see available sample stays."
                    )}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#1C2B4F] text-white text-xs font-bold"
                  >
                    {t("hosp.filter.clearFiltersBtn", "Clear filters")}
                  </button>
                </div>
              </section>
            )}

            {/* Modal Dialog Trigger for Testing */}
            <div className="py-6 flex items-center justify-center gap-3 border-t border-[#1C2B4F]/15">
              <button
                type="button"
                onClick={() => setNotifyOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#1C2B4F] text-white text-xs font-bold hover:bg-[#35508C] transition-colors"
              >
                Open Notify Dialog Preview
              </button>
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#BA4A21] text-white text-xs font-bold hover:bg-[#9E3E1A] transition-colors"
              >
                Open Filter Sheet Preview
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Notify Dialog Preview */}
      <NotifyDialog
        isOpen={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        farmhouse={openFarmhouse}
      />

      {/* Filter Sheet Preview */}
      <FilterSheet
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={{ status: [], maxPrice: 15000, amenities: [], minGuests: 1, sortBy: "recommended" }}
        onFiltersChange={() => {}}
        resultCount={4}
        onClearAll={() => {}}
      />
    </div>
  );
}

export default DesignPreviewScreens;
