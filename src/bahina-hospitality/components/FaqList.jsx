import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function FaqList({ faqs = [], titleKey = "hosp.faq.title", defaultOpenIndex = 0 }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full">
      {titleKey && (
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DFCC] shadow-2xs text-xs font-sans font-bold uppercase tracking-wider text-[#B9532C]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t("hosp.faq.eyebrow", "Common Enquiries")}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#182C20]">
            {t(titleKey, "Frequently Asked Questions")}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#5E534D]">
            {t("hosp.faq.subheading", "Everything you need to know about our peaceful farmhouse stays.")}
          </p>
        </div>
      )}

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const qId = `faq-q-${idx}`;
          const aId = `faq-a-${idx}`;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-white border-[#182C20]/30 shadow-md ring-1 ring-[#182C20]/10"
                  : "bg-white/70 hover:bg-white border-[#E8DFCC] hover:border-[#D1C5B0] shadow-2xs"
              }`}
            >
              <button
                type="button"
                id={qId}
                aria-expanded={isOpen}
                aria-controls={aId}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-4 p-5 sm:p-6 text-base sm:text-lg font-serif font-bold text-[#182C20] hover:text-[#B9532C] transition-colors focus:outline-none"
              >
                <span className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                    isOpen ? "bg-[#182C20] text-[#DFA82E]" : "bg-[#F6F0E4] text-[#5E534D]"
                  }`}>
                    0{idx + 1}
                  </span>
                  <span>{faq.qKey ? t(faq.qKey, faq.question) : faq.question}</span>
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-[#182C20] text-white rotate-180" : "bg-[#F6F0E4] text-[#182C20]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={aId}
                    role="region"
                    aria-labelledby={qId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-[#5E534D] font-sans text-sm sm:text-base leading-relaxed border-t border-[#F6F0E4] mt-2">
                      <p className="pt-4">{faq.aKey ? t(faq.aKey, faq.answer) : faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqList;
