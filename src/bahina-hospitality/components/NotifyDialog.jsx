import React, { useState } from "react";
import { X, Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function NotifyDialog({
  isOpen,
  onClose,
  farmhouseName = "",
}) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    village: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validateMobile = (mob) => {
    // Strip +91, 0, spaces, dashes
    const clean = mob.replace(/^(\+91|0)/, "").replace(/[\s-]/g, "");
    return /^[6-9]\d{9}$/.test(clean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("hosp.notify.errorName");
    }

    if (!formData.mobile.trim() || !validateMobile(formData.mobile)) {
      newErrors.mobile = t("hosp.notify.errorMobile");
    }

    if (!formData.consent) {
      newErrors.consent = t("hosp.notify.errorConsent");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success (UI Demo only, no backend)
    setErrors({});
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: "", mobile: "", village: "", consent: false });
    setErrors({});
    onClose?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-dialog-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="bg-[#FFFFFF] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-[#E8DFCC] shadow-2xl p-6 sm:p-7 overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F6F0E4]">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-[#FDF3DC] text-[#B4532A]">
              <Bell className="w-5 h-5" />
            </span>
            <h3 id="notify-dialog-title" className="font-serif text-lg sm:text-xl font-bold text-[#23402F]">
              {t("hosp.notify.title")}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={t("hosp.common.close")}
            className="p-1.5 rounded-full hover:bg-[#F6F0E4] text-[#5E534D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-[#23402F] mx-auto" />
            <h4 className="font-serif text-xl font-bold text-[#23402F]">
              {t("hosp.notify.successTitle")}
            </h4>
            <p className="text-sm text-[#5E534D] leading-relaxed">
              {t("hosp.notify.successDesc")}
            </p>
            {/* Clear Demo honesty callout */}
            <div className="p-3 bg-[#FDF3DC] border border-[#E8A317] rounded-xl text-xs font-semibold text-[#8C5800]">
              {t("hosp.notify.demoNote")}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="btn-clay w-full mt-4"
            >
              {t("hosp.common.done")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <p className="text-xs sm:text-sm text-[#5E534D] leading-relaxed">
              {t("hosp.notify.leadText")} {farmhouseName && `"${farmhouseName}"`}
            </p>

            {/* Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#5E534D] font-bold mb-1">
                {t("hosp.notify.nameLabel")} *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("hosp.notify.namePlaceholder")}
                className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B4532A] min-h-[48px] ${
                  errors.name ? "border-[#B91C1C] bg-[#FEF2F2]" : "border-[#E8DFCC]"
                }`}
              />
              {errors.name && (
                <p className="flex items-center gap-1 text-xs text-[#B91C1C] font-semibold mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#5E534D] font-bold mb-1">
                {t("hosp.notify.mobileLabel")} *
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="e.g. 9822000000"
                className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B4532A] min-h-[48px] ${
                  errors.mobile ? "border-[#B91C1C] bg-[#FEF2F2]" : "border-[#E8DFCC]"
                }`}
              />
              {errors.mobile && (
                <p className="flex items-center gap-1 text-xs text-[#B91C1C] font-semibold mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Village (Optional) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#5E534D] font-bold mb-1">
                {t("hosp.notify.villageLabel")} ({t("hosp.common.optional")})
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder={t("hosp.notify.villagePlaceholder")}
                className="w-full px-4 py-2.5 bg-white border border-[#E8DFCC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B4532A] min-h-[48px]"
              />
            </div>

            {/* Consent checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-[#5E534D] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-[#B4532A] rounded cursor-pointer"
                />
                <span className="leading-snug">
                  {t("hosp.notify.consentText")}
                </span>
              </label>
              {errors.consent && (
                <p className="flex items-center gap-1 text-xs text-[#B91C1C] font-semibold mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button type="submit" className="btn-clay w-full text-base">
                {t("hosp.notify.submitButton")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default NotifyDialog;
