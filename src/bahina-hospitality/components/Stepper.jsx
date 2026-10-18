import React from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Stepper({ currentStep = 1, totalSteps = 3 }) {
  const { t } = useLanguage();

  const steps = [
    { num: 1, titleKey: "hosp.book.step1Title", fallback: "Dates & Guests" },
    { num: 2, titleKey: "hosp.book.step2Title", fallback: "Your Details" },
    { num: 3, titleKey: "hosp.book.step3Title", fallback: "Review & Send" },
  ];

  return (
    <nav aria-label={t("hosp.book.stepperAria", "Booking progress")} className="w-full py-4">
      <ol className="flex items-center justify-between w-full max-w-xl mx-auto px-4">
        {steps.map((step, idx) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;

          return (
            <li key={step.num} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {/* Left connector line */}
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      idx === 0
                        ? "invisible"
                        : isCompleted || isCurrent
                        ? "bg-[var(--hosp-forest)]"
                        : "bg-[var(--hosp-border)]"
                    }`}
                  />

                  {/* Step circle */}
                  <div
                    aria-current={isCurrent ? "step" : undefined}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all shrink-0 ${
                      isCompleted
                        ? "bg-[var(--hosp-forest)] text-white"
                        : isCurrent
                        ? "bg-[var(--hosp-primary)] text-white shadow-md ring-4 ring-[#F8D9C9]"
                        : "bg-[var(--hosp-section-alt)] text-[var(--hosp-text-muted)] border border-[var(--hosp-border)]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                    ) : (
                      <span>{step.num}</span>
                    )}
                  </div>

                  {/* Right connector line */}
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      idx === steps.length - 1
                        ? "invisible"
                        : isCompleted
                        ? "bg-[var(--hosp-forest)]"
                        : "bg-[var(--hosp-border)]"
                    }`}
                  />
                </div>

                {/* Step Title */}
                <span
                  className={`mt-2 text-xs text-center font-semibold tracking-tight transition-colors ${
                    isCurrent
                      ? "text-[var(--hosp-primary)] font-bold"
                      : isCompleted
                      ? "text-[var(--hosp-forest)]"
                      : "text-[var(--hosp-text-muted)]"
                  }`}
                >
                  {t(step.titleKey, step.fallback)}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Stepper;
