import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Breadcrumbs({ items = [] }) {
  const { t } = useLanguage();

  const allItems = [
    { label: t("hosp.nav.home", "Hospitality"), to: "/hospitality" },
    ...items,
  ];

  return (
    <nav aria-label={t("hosp.aria.breadcrumbs", "Breadcrumbs")} className="py-3 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm text-[var(--hosp-text-muted)]">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[var(--hosp-text-muted)] opacity-60" aria-hidden="true" />
              )}
              {isLast || !item.to ? (
                <span className="font-semibold text-[var(--hosp-forest)]" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-[var(--hosp-primary)] transition-colors underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
