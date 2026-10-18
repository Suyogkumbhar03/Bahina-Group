import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { RURAL_CONFIG } from "@/data/config";
import { PreviewRibbon } from "../components/PreviewRibbon";
import { HospitalityHeader } from "../components/HospitalityHeader";
import { HospitalityFooter } from "../components/HospitalityFooter";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ShareButton } from "../components/ShareButton";
import { StayPass } from "../components/StayPass";
import { ArrowLeft, Phone, Info } from "lucide-react";
import "../theme/hospitality-theme.css";

export function RequestSent() {
  const location = useLocation();
  const { t, language } = useLanguage();

  const phone = RURAL_CONFIG?.phoneNumber || "";

  // Extract submitted data or fallback to demo values
  const {
    requestId = "BH-2026-8492",
    farmhouse,
    dates,
    guests,
    formData,
  } = location.state || {};

  useEffect(() => {
    document.title = t("hosp.sent.pageTitle", "Request Received — BAHINA Hospitality");
  }, [language, t]);

  const breadcrumbItems = [
    { label: t("hosp.nav.stays", "Farmhouses"), to: "/hospitality" },
    { label: t("hosp.sent.title", "Request Received") },
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

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Explicit Design Preview Demo Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF4D9] border-2 border-[#1C2B4F]/20 text-sm font-semibold text-[#1C2B4F] flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 text-[#BA4A21] shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-[#1C2B4F] block">
                {t("hosp.preview.ribbonTitle", "Design Preview Note")}
              </span>
              <span>
                {t(
                  "hosp.sent.previewBanner",
                  "Design preview: nothing was sent or stored."
                )}
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SIGNATURE STAY PASS (With Animated Ink Stamp)                */}
          {/* ============================================================ */}
          <StayPass
            farmhouse={farmhouse}
            dates={dates}
            guests={guests}
            requestId={requestId}
            showStamp={true}
          />

          {/* Action Cluster */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/hospitality"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1C2B4F] text-white font-bold text-sm hover:bg-[#35508C] transition-colors min-h-[48px] shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("hosp.sent.backToStays", "Back to farmhouses")}</span>
            </Link>

            <ShareButton
              title={t("hosp.sent.title", "Booking Request Received")}
              text={`${t("hosp.sent.refLabel", "Request Number")}: ${requestId}`}
              className="w-full sm:w-auto min-h-[48px] justify-center"
            />

            {phone && (
              <a
                href={`tel:${phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#1C2B4F]/25 bg-white text-[#1C2B4F] font-bold text-sm hover:bg-[#FFF4D9] transition-colors min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-[#BA4A21]" />
                <span>{t("hosp.btn.callUs", "Call Us")}</span>
              </a>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <HospitalityFooter />
    </div>
  );
}

export default RequestSent;
