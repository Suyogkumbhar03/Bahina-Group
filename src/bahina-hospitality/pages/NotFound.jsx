import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { PreviewRibbon } from "../components/PreviewRibbon";
import { HospitalityHeader } from "../components/HospitalityHeader";
import { HospitalityFooter } from "../components/HospitalityFooter";
import { ArrowLeft, Home } from "lucide-react";
import "../theme/hospitality-theme.css";

export function NotFound() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t("hosp.notFound.pageTitle", "Page Not Found — BAHINA Hospitality");
  }, [language, t]);

  return (
    <div className="hospitality-theme min-h-screen flex flex-col" data-lang={language}>
      {/* Top Preview Ribbon */}
      <PreviewRibbon />

      {/* Header */}
      <HospitalityHeader />

      <main className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[var(--hosp-border)] shadow-xs space-y-6 w-full">
          <div className="w-16 h-16 rounded-full bg-[var(--hosp-section-alt)] text-[var(--hosp-primary)] flex items-center justify-center mx-auto text-2xl font-bold font-mono">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--hosp-forest)]">
              {t("hosp.404.title", "Farmhouse Not Found")}
            </h1>
            <p className="text-base text-[var(--hosp-text-muted)] leading-relaxed">
              {t(
                "hosp.404.desc",
                "The requested farmhouse page does not exist or has moved."
              )}
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/hospitality"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--hosp-primary)] text-white font-bold text-sm hover:bg-[var(--hosp-primary-hover)] transition-colors min-h-[48px] shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>{t("hosp.404.btn", "Browse all farmhouses")}</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <HospitalityFooter />
    </div>
  );
}

export default NotFound;
