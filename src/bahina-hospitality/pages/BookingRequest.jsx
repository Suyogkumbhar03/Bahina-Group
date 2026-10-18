import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { PREVIEW_MODE } from "@/data/config";
import { getFarmhouseBySlug } from "../data/farmhouses.sample";
import { PreviewRibbon } from "../components/PreviewRibbon";
import { HospitalityHeader } from "../components/HospitalityHeader";
import { HospitalityFooter } from "../components/HospitalityFooter";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Stepper } from "../components/Stepper";
import { DateRangePicker } from "../components/DateRangePicker";
import { GuestPicker } from "../components/GuestPicker";
import { PriceSummary } from "../components/PriceSummary";
import { NotFound } from "./NotFound";
import { StayPass } from "../components/StayPass";
import {
  Calendar,
  Users,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import "../theme/hospitality-theme.css";

export function BookingRequest() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();

  const farmhouse = useMemo(() => getFarmhouseBySlug(slug), [slug]);

  // Initial values prefilled (Requirement 4c: dates and guests prefilled)
  const defaultCheckIn = new Date();
  defaultCheckIn.setDate(defaultCheckIn.getDate() + 7);
  const defaultCheckOut = new Date();
  defaultCheckOut.setDate(defaultCheckOut.getDate() + 9);

  const initialDates = location.state?.dates?.checkIn
    ? location.state.dates
    : {
        checkIn: defaultCheckIn.toISOString().split("T")[0],
        checkOut: defaultCheckOut.toISOString().split("T")[0],
      };
  const initialGuests = location.state?.guests || { adults: 2, children: 0 };

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [dates, setDates] = useState(initialDates);
  const [guests, setGuests] = useState(initialGuests);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    village: "",
    email: "",
    notes: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});

  if (!farmhouse) {
    return <NotFound />;
  }

  // Update page title
  useEffect(() => {
    document.title = `${t("hosp.book.pageTitlePrefix", "Booking Request — ")}${t(farmhouse.nameKey, "Farmhouse")}`;
  }, [farmhouse, language, t]);

  // Indian mobile number validator
  const validateIndianPhone = (rawPhone) => {
    if (!rawPhone) return false;
    // Strip spaces, dashes, parentheses
    const cleaned = rawPhone.replace(/[\s\-()]/g, "");
    // Check patterns: 10 digits starting 6-9, or +91 followed by 10 digits, or 0 followed by 10 digits
    const regex = /^(?:\+91|0)?[6-9]\d{9}$/;
    return regex.test(cleaned);
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!dates.checkIn || !dates.checkOut) {
      errs.dates = t("hosp.book.errDates", "Please select check-in and check-out dates.");
    }

    const totalGuests = (guests.adults || 1) + (guests.children || 0);
    if (totalGuests > farmhouse.maxGuests) {
      errs.guests = t(
        "hosp.book.errCapacity",
        "Number of guests exceeds farmhouse capacity."
      );
    }

    // Check for unavailable dates overlap
    if (dates.checkIn && dates.checkOut && farmhouse.unavailableDates?.length > 0) {
      const inTime = new Date(dates.checkIn).getTime();
      const outTime = new Date(dates.checkOut).getTime();

      const overlaps = farmhouse.unavailableDates.some((dateStr) => {
        const d = new Date(dateStr).getTime();
        return d >= inTime && d <= outTime;
      });

      if (overlaps) {
        errs.dates = t(
          "hosp.book.errUnavailable",
          "Selected dates include unavailable days."
        );
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = t("hosp.book.errName", "Please enter your name.");
    }
    if (!validateIndianPhone(formData.phone)) {
      errs.phone = t(
        "hosp.book.errPhone",
        "Enter a valid 10-digit Indian mobile number."
      );
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs = {};
    if (!formData.consent) {
      errs.consent = t(
        "hosp.book.consentRequired",
        "Please tick the consent box to continue."
      );
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendRequest = () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);

    // Generate Request ID in format BH-YYMMDD-XXXX
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    const requestId = `BH-${yy}${mm}${dd}-${rand}`;

    // Simulate short network delay for design realism
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/hospitality/sent", {
        state: {
          requestId,
          farmhouse,
          dates,
          guests,
          formData,
        },
      });
    }, 600);
  };

  const breadcrumbItems = [
    { label: t("hosp.nav.stays", "Farmhouses"), to: "/hospitality" },
    { label: t(farmhouse.nameKey, "Details"), to: `/hospitality/farmhouses/${farmhouse.slug}` },
    { label: t("hosp.book.pageTitle", "Booking Request") },
  ];

  return (
    <div className="hospitality-theme min-h-screen flex flex-col" data-lang={language}>
      {/* Top Preview Ribbon */}
      <PreviewRibbon />

      {/* Header */}
      <HospitalityHeader />

      {/* Breadcrumbs */}
      <div className="border-b border-[var(--hosp-border)] bg-[var(--hosp-section-alt)]/50">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Title & Design Disclaimer */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--hosp-forest)]">
            {t("hosp.book.pageTitle", "Request Farmhouse Booking")}
          </h1>
          <p className="text-sm sm:text-base text-[var(--hosp-text-muted)]">
            {t(
              "hosp.book.subtitle",
              "Design preview. No payment or confirmed reservation."
            )}
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="mb-8">
          <Stepper currentStep={currentStep} totalSteps={3} />
        </div>

        {/* ============================================================ */}
        {/* STEP 1: DATES & GUESTS                                       */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[var(--hosp-border)] shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--hosp-border)]">
                <Calendar className="w-5 h-5 text-[var(--hosp-primary)]" />
                <h2 className="text-xl font-bold text-[var(--hosp-forest)]">
                  {t("hosp.book.step1Title", "Dates & Guests")}
                </h2>
              </div>

              {/* Date Range Picker */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[var(--hosp-forest)]">
                  {t("hosp.search.datesLabel", "Select Stay Dates")}
                </label>
                <DateRangePicker
                  dates={dates}
                  onDatesChange={(newDates) => {
                    setDates(newDates);
                    if (errors.dates) setErrors((prev) => ({ ...prev, dates: null }));
                  }}
                  unavailableDates={farmhouse.unavailableDates}
                />
                {errors.dates && (
                  <p className="flex items-center gap-1.5 text-xs text-[var(--hosp-error)] font-semibold mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.dates}</span>
                  </p>
                )}
              </div>

              {/* Guest Picker */}
              <div className="space-y-2 pt-4 border-t border-[var(--hosp-border)]">
                <label className="block text-sm font-bold text-[var(--hosp-forest)]">
                  {t("hosp.search.guestsLabel", "Guests")}
                </label>
                <div className="max-w-md">
                  <GuestPicker
                    guests={guests}
                    onGuestsChange={(newGuests) => {
                      setGuests(newGuests);
                      if (errors.guests) setErrors((prev) => ({ ...prev, guests: null }));
                    }}
                    maxGuests={farmhouse.maxGuests}
                  />
                </div>
                {errors.guests && (
                  <p className="flex items-center gap-1.5 text-xs text-[var(--hosp-error)] font-semibold mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.guests}</span>
                  </p>
                )}
              </div>

              {/* Price Estimate Summary */}
              {farmhouse.pricePerNight && (
                <div className="pt-4 border-t border-[var(--hosp-border)]">
                  <PriceSummary
                    pricePerNight={farmhouse.pricePerNight}
                    dates={dates}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--hosp-primary)] text-white font-bold text-sm hover:bg-[var(--hosp-primary-hover)] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hosp-primary)] min-h-[48px]"
              >
                <span>{t("hosp.book.nextStep", "Continue")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: YOUR DETAILS                                         */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[var(--hosp-border)] shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--hosp-border)]">
                <Users className="w-5 h-5 text-[var(--hosp-primary)]" />
                <h2 className="text-xl font-bold text-[var(--hosp-forest)]">
                  {t("hosp.book.contactDetailsTitle", "Your Contact Information")}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-bold text-[var(--hosp-forest)]">
                    {t("hosp.book.fullNameLabel", "Full Name")} <span className="text-[var(--hosp-error)]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                    }}
                    placeholder={t("hosp.book.fullNamePlaceholder", "Enter your full name")}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 min-h-[48px] ${
                      errors.fullName
                        ? "border-[var(--hosp-error-border)] bg-[var(--hosp-error-bg)] focus:ring-[var(--hosp-error)]"
                        : "border-[var(--hosp-border)] bg-white focus:ring-[var(--hosp-primary)]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="flex items-center gap-1.5 text-xs text-[var(--hosp-error)] font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-bold text-[var(--hosp-forest)]">
                    {t("hosp.book.phoneLabel", "Mobile Number")} <span className="text-[var(--hosp-error)]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                    }}
                    placeholder={t("hosp.book.phonePlaceholder", "10-digit mobile number")}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 min-h-[48px] ${
                      errors.phone
                        ? "border-[var(--hosp-error-border)] bg-[var(--hosp-error-bg)] focus:ring-[var(--hosp-error)]"
                        : "border-[var(--hosp-border)] bg-white focus:ring-[var(--hosp-primary)]"
                    }`}
                  />
                  <p className="text-xs text-[var(--hosp-text-muted)]">
                    {t("hosp.book.phoneHint", "Enter an Indian number starting with 6, 7, 8, or 9.")}
                  </p>
                  {errors.phone && (
                    <p className="flex items-center gap-1.5 text-xs text-[var(--hosp-error)] font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Village / City */}
                <div className="space-y-1.5">
                  <label htmlFor="village" className="block text-sm font-bold text-[var(--hosp-forest)]">
                    {t("hosp.book.villageLabel", "Village or City")}
                  </label>
                  <input
                    id="village"
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder={t("hosp.book.villagePlaceholder", "Your village (optional)")}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hosp-border)] bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--hosp-primary)] min-h-[48px]"
                  />
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-bold text-[var(--hosp-forest)]">
                    {t("hosp.book.emailLabel", "Email Address")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("hosp.book.emailPlaceholder", "name@example.com (optional)")}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hosp-border)] bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--hosp-primary)] min-h-[48px]"
                  />
                </div>

                {/* Notes / Special Requests */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-bold text-[var(--hosp-forest)]">
                    {t("hosp.book.noteLabel", "Special Requests or Arrival Notes")}
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t("hosp.book.notePlaceholder", "Any notes or arrival plans (optional)")}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hosp-border)] bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--hosp-primary)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--hosp-border)] bg-white text-[var(--hosp-forest)] font-bold text-sm hover:bg-[var(--hosp-section-alt)] transition-colors min-h-[48px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("hosp.book.prevStep", "Back")}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--hosp-primary)] text-white font-bold text-sm hover:bg-[var(--hosp-primary-hover)] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hosp-primary)] min-h-[48px]"
              >
                <span>{t("hosp.book.nextStep", "Continue")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: REVIEW & SEND                                        */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[var(--hosp-border)] shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--hosp-border)]">
                <CheckCircle2 className="w-5 h-5 text-[var(--hosp-primary)]" />
                <h2 className="text-xl font-bold text-[var(--hosp-forest)]">
                  {t("hosp.book.reviewTitle", "Review your booking request")}
                </h2>
              </div>

              {/* Signature Stay Pass Ticket Preview */}
              <StayPass
                farmhouse={farmhouse}
                dates={dates}
                guests={guests}
                requestId="BH-PREVIEW-DRAFT"
                showStamp={false}
              />

              {/* Guest Details Summary */}
              <div className="p-4 rounded-2xl bg-[#E6ECF7]/50 border border-[#1C2B4F]/15 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div>
                  <span className="text-xs text-[#35508C] font-bold block uppercase tracking-wider">
                    {t("hosp.book.fullNameLabel", "Guest Name")}
                  </span>
                  <span className="font-extrabold text-[#1C2B4F]">
                    {formData.fullName || "Guest"}
                  </span>
                  {formData.village && (
                    <span className="text-xs text-[#1F1B2D]/70 ml-2">
                      ({formData.village})
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-xs text-[#35508C] font-bold block uppercase tracking-wider">
                    {t("hosp.book.phoneLabel", "Contact Phone")}
                  </span>
                  <span className="font-extrabold text-[#1C2B4F]">
                    {formData.phone || "—"}
                  </span>
                </div>
              </div>

              {/* Notes Review */}
              {formData.notes && (
                <div className="p-4 rounded-xl border border-[#1C2B4F]/15 text-sm bg-white">
                  <span className="text-xs font-bold text-[#1C2B4F] block mb-1">
                    {t("hosp.book.noteLabel", "Special Requests")}:
                  </span>
                  <p className="text-[#1F1B2D]/85">{formData.notes}</p>
                </div>
              )}

              {/* Price Estimate Review */}
              {farmhouse.pricePerNight && (
                <PriceSummary
                  pricePerNight={farmhouse.pricePerNight}
                  dates={dates}
                />
              )}

              {/* Honest Preview Notice */}
              <div className="p-4 rounded-xl bg-[var(--hosp-marigold-light)] border border-[var(--hosp-border)] text-xs text-[var(--hosp-text)] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[var(--hosp-marigold)] shrink-0 mt-0.5" />
                <span>
                  {t(
                    "hosp.sent.previewBanner",
                    "Design preview: nothing was sent or stored."
                  )}
                </span>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData({ ...formData, consent: e.target.checked });
                      if (errors.consent) setErrors((prev) => ({ ...prev, consent: null }));
                    }}
                    className="mt-1 w-5 h-5 rounded border-[var(--hosp-border)] text-[var(--hosp-primary)] focus:ring-[var(--hosp-primary)] shrink-0"
                  />
                  <span className="text-sm text-[var(--hosp-forest)] leading-relaxed font-medium">
                    {t(
                      "hosp.book.consentText",
                      "I agree that BAHINA Hospitality may use my details to contact me about this request."
                    )}
                  </span>
                </label>
                {errors.consent && (
                  <p className="flex items-center gap-1.5 text-xs text-[var(--hosp-error)] font-semibold mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--hosp-border)] bg-white text-[var(--hosp-forest)] font-bold text-sm hover:bg-[var(--hosp-section-alt)] transition-colors min-h-[48px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("hosp.book.prevStep", "Back")}</span>
              </button>

              <button
                type="button"
                onClick={handleSendRequest}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--hosp-primary)] text-white font-bold text-sm hover:bg-[var(--hosp-primary-hover)] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hosp-primary)] min-h-[48px] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t("hosp.book.submittingState", "Preparing preview...")}</span>
                ) : (
                  <>
                    <span>{t("hosp.book.sendRequestBtn", "Send booking request")}</span>
                    <Check className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <HospitalityFooter />
    </div>
  );
}

export default BookingRequest;
