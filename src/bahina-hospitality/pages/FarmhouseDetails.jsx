import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { getFarmhouseBySlug } from "../data/farmhouses.sample";
import { PreviewRibbon } from "../components/PreviewRibbon";
import { HospitalityHeader } from "../components/HospitalityHeader";
import { HospitalityFooter } from "../components/HospitalityFooter";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PhotoGrid } from "../components/PhotoGrid";
import { Lightbox } from "../components/Lightbox";
import { StatusBadge } from "../components/StatusBadge";
import { ShareButton } from "../components/ShareButton";
import { AmenityIcon } from "../components/AmenityIcon";
import { getAmenityById } from "../data/amenities";
import { ConstructionTimeline } from "../components/ConstructionTimeline";
import { BookingCard } from "../components/BookingCard";
import { MobileBookingBar } from "../components/MobileBookingBar";
import { FaqList } from "../components/FaqList";
import { NotifyDialog } from "../components/NotifyDialog";
import { NotFound } from "./NotFound";
import { MapPin, Users, Bed, Bath, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import "../theme/hospitality-theme.css";

export function FarmhouseDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);

  // Selected Booking State
  const [dates, setDates] = useState({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState({ adults: 2, children: 0 });

  // Look up farmhouse
  const farmhouse = useMemo(() => {
    return getFarmhouseBySlug(slug);
  }, [slug]);

  if (!farmhouse) {
    return <NotFound />;
  }

  // Update page title
  useEffect(() => {
    if (farmhouse) {
      const name = t(farmhouse.nameKey, "Sample Farmhouse");
      document.title = `${name} — BAHINA Hospitality`;
    }
  }, [farmhouse, t]);

  const handleBookingRequest = () => {
    navigate(`/hospitality/book/${farmhouse.slug}`, {
      state: { dates, guests },
    });
  };

  const handleNotifyMe = () => {
    setNotifyDialogOpen(true);
  };

  const breadcrumbItems = [
    { label: t("hosp.nav.stays", "Farmhouses"), to: "/hospitality" },
    { label: t(farmhouse.nameKey, "Farmhouse Details") },
  ];

  return (
    <div className="hospitality-theme min-h-screen flex flex-col bg-[#FFFDF8]" data-lang={language}>
      {/* Top Preview Ribbon */}
      <PreviewRibbon />

      {/* Header */}
      <HospitalityHeader />

      {/* Breadcrumbs */}
      <div className="border-b border-[#1C2B4F]/15 bg-[#FFF4D9]/40 pt-20 sm:pt-24">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8">
        {/* Farmhouse Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1C2B4F]/15">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={farmhouse.status} />
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#35508C]">
                <MapPin className="w-4 h-4 text-[#BA4A21]" />
                <span>
                  {t(farmhouse.villageKey, "Village")}, {t(farmhouse.districtKey, "District")}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C2B4F] leading-tight">
              {t(farmhouse.nameKey, "Sample Farmhouse")}
            </h1>

            <p className="text-base sm:text-lg text-[#1F1B2D]/80 font-normal max-w-2xl">
              {t(farmhouse.taglineKey, "A calm countryside retreat")}
            </p>
          </div>

          {/* Share Action */}
          <div className="shrink-0">
            <ShareButton
              title={t(farmhouse.nameKey, "Farmhouse Stay")}
              text={t(farmhouse.taglineKey, "Check out this peaceful stay by BAHINA Hospitality")}
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* PHOTO GALLERY (1 Arch-Framed Main Photo + 4 Grid Tiles)      */}
        {/* ============================================================ */}
        <div className="py-6">
          <PhotoGrid
            photos={farmhouse.photos}
            artVariation={farmhouse.artVariation}
            badgeType={
              farmhouse.status === "under_construction"
                ? "construction"
                : farmhouse.status === "coming_soon"
                ? "planned"
                : null
            }
            status={farmhouse.status}
          />
        </div>

        {/* ============================================================ */}
        {/* TWO-COLUMN DETAILS LAYOUT (Left Content, Right Sticky Card) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
          {/* Left Column (8 cols): Info Sections */}
          <div className="lg:col-span-8 space-y-10">
            {/* Under Construction Timeline Notice */}
            {farmhouse.status === "under_construction" && (
              <div className="space-y-4">
                <ConstructionTimeline currentStep={farmhouse.constructionStep || 3} />
              </div>
            )}

            {/* Quick Specs Strip */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 py-4 border-y border-[#1C2B4F]/15 text-xs sm:text-sm font-bold text-[#1C2B4F]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF4D9] border border-[#1C2B4F]/15">
                <Users className="w-4 h-4 text-[#BA4A21]" />
                <span>
                  {farmhouse.maxGuests} {t("hosp.card.maxGuests", "guests max")}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF4D9] border border-[#1C2B4F]/15">
                <Bed className="w-4 h-4 text-[#BA4A21]" />
                <span>
                  {farmhouse.bedrooms} {t("hosp.card.bedrooms", "bedrooms")}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF4D9] border border-[#1C2B4F]/15">
                <Bath className="w-4 h-4 text-[#BA4A21]" />
                <span>
                  {farmhouse.bathrooms} {t("hosp.card.bathrooms", "baths")}
                </span>
              </div>
            </div>

            {/* About / Narrative */}
            <section className="space-y-3">
              <h2 className="text-2xl font-extrabold text-[#1C2B4F]">
                {t("hosp.details.aboutTitle", "About this farmhouse")}
              </h2>
              <p className="text-base text-[#1F1B2D]/85 leading-relaxed">
                {t(farmhouse.leadDescKey, "")}
              </p>
              <p className="text-base text-[#1F1B2D]/85 leading-relaxed">
                {t(farmhouse.fullDescKey, "")}
              </p>
            </section>

            {/* Highlights */}
            {farmhouse.highlightKeys && farmhouse.highlightKeys.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-extrabold text-[#1C2B4F]">
                  {t("hosp.details.highlightsTitle", "Property highlights")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {farmhouse.highlightKeys.map((k, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#1C2B4F]/15 text-sm font-bold text-[#1C2B4F] shadow-2xs"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#35508C] shrink-0 mt-0.5" />
                      <span>{t(k, "")}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Amenities Grid */}
            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#1C2B4F]">
                {t("hosp.details.amenitiesTitle", "Amenities provided")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {farmhouse.amenityIds?.map((amenityId) => (
                  <div
                    key={amenityId}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#1C2B4F]/15 bg-white text-sm font-bold text-[#1C2B4F] shadow-2xs hover:border-[#F4A62A] transition-colors"
                  >
                    <AmenityIcon id={amenityId} className="w-5 h-5 text-[#BA4A21] shrink-0" />
                    <span>{t(getAmenityById(amenityId)?.labelKey || amenityId)}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Timings & House Rules */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#1C2B4F]/15 shadow-sm">
              <div className="space-y-3">
                <h3 className="text-lg font-extrabold text-[#1C2B4F] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#BA4A21]" />
                  <span>{t("hosp.details.timingsTitle", "Check-in and Check-out")}</span>
                </h3>
                <div className="space-y-1.5 text-sm text-[#1F1B2D]/80">
                  <div>
                    <span className="font-bold text-[#1C2B4F]">
                      {t("hosp.details.checkInLabel", "Check-in from")}:
                    </span>{" "}
                    {farmhouse.checkInTime}
                  </div>
                  <div>
                    <span className="font-bold text-[#1C2B4F]">
                      {t("hosp.details.checkOutLabel", "Check-out by")}:
                    </span>{" "}
                    {farmhouse.checkOutTime}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-extrabold text-[#1C2B4F] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#BA4A21]" />
                  <span>{t("hosp.details.rulesTitle", "House rules")}</span>
                </h3>
                <ul className="space-y-1.5 text-sm text-[#1F1B2D]/80">
                  {farmhouse.houseRuleKeys?.map((k, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#BA4A21] font-bold">•</span>
                      <span>{t(k, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section className="space-y-2 p-6 rounded-2xl bg-[#FFF4D9]/80 border border-[#F4A62A]/40">
              <h3 className="text-base font-extrabold text-[#1C2B4F]">
                {t("hosp.details.cancellationTitle", "Cancellation policy")}
              </h3>
              <p className="text-sm text-[#1F1B2D]/80 leading-relaxed">
                {t(
                  "hosp.details.cancellationPolicyText",
                  "Sample policy: Full refund if cancelled 5 days before check-in."
                )}
              </p>
            </section>

            {/* Farmhouse FAQs */}
            {farmhouse.faqList && farmhouse.faqList.length > 0 && (
              <section className="pt-4">
                <FaqList faqs={farmhouse.faqList} titleKey="hosp.details.faqTitle" />
              </section>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Desktop Booking Card with Border Beam */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28">
              <BookingCard
                farmhouse={farmhouse}
                dates={dates}
                guests={guests}
                onDatesChange={setDates}
                onGuestsChange={setGuests}
                onRequestBooking={handleBookingRequest}
                onNotifyMe={handleNotifyMe}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom Booking Bar (< 1024px) */}
      <div className="lg:hidden">
        <MobileBookingBar
          farmhouse={farmhouse}
          dates={dates}
          guests={guests}
          onDatesChange={setDates}
          onGuestsChange={setGuests}
          onRequestBooking={handleBookingRequest}
          onNotifyMe={handleNotifyMe}
        />
      </div>

      {/* Footer */}
      <HospitalityFooter />

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        farmhouse={farmhouse}
      />

      {/* Notify Dialog */}
      <NotifyDialog
        isOpen={notifyDialogOpen}
        onClose={() => setNotifyDialogOpen(false)}
        farmhouse={farmhouse}
      />
    </div>
  );
}

export default FarmhouseDetails;
