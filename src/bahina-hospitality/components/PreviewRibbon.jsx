import React from "react";
import { Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { PREVIEW_MODE } from "@/config";

export function PreviewRibbon() {
  const { t } = useLanguage();

  if (!PREVIEW_MODE) return null;

  return (
    <div
      role="banner"
      className="relative z-30 w-full bg-[#E8A317] text-[#1B3323] px-4 py-1.5 text-xs font-semibold text-center flex items-center justify-center gap-2 border-b border-[#D18F08] shadow-xs select-none"
    >
      <Info className="w-3.5 h-3.5 shrink-0 text-[#1B3323]" aria-hidden="true" />
      <span>{t("hosp.ribbon.text", "Design preview only. Sample data shown.")}</span>
    </div>
  );
}

export default PreviewRibbon;
