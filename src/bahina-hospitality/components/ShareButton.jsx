import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function ShareButton({ title, text, url, className = "" }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    const shareTitle = title || t("hosp.share.defaultTitle", "BAHINA Hospitality Farmhouse");
    const shareText = text || t("hosp.share.defaultText", "Look at this peaceful farmhouse stay by BAHINA Hospitality.");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if (err.name !== "AbortError") {
          // If aborted by user, ignore; otherwise fall back to clipboard
        } else {
          return;
        }
      }
    }

    // Fallback: clipboard copy
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch (e) {
        // Fallback for older contexts
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleShare}
        aria-label={t("hosp.share.buttonAria", "Share this farmhouse")}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--hosp-border)] bg-white text-[var(--hosp-forest)] text-sm font-semibold hover:bg-[var(--hosp-section-alt)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hosp-primary)] min-h-[44px] ${className}`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span className="text-emerald-800 text-xs font-bold">{t("hosp.share.copied", "Link copied")}</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-[var(--hosp-forest)]" aria-hidden="true" />
            <span className="text-xs">{t("hosp.share.buttonText", "Share")}</span>
          </>
        )}
      </button>

      {/* Floating toast notification when copied */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-[var(--hosp-forest)] text-white text-xs px-3 py-1.5 rounded-md shadow-md animate-in fade-in zoom-in-95 duration-150"
        >
          {t("hosp.share.toastSuccess", "Link copied to clipboard")}
        </div>
      )}
    </div>
  );
}

export default ShareButton;
