"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { localizeHref, stripLocalePrefix, type Locale } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
};

const OPTIONS: Array<{
  locale: Locale;
  label: string;
}> = [
  { locale: "zh", label: "中文" },
  { locale: "en", label: "EN" },
];

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const basePath = stripLocalePrefix(pathname || "/");

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
      aria-label="Locale switcher"
    >
      {OPTIONS.map((option) => {
        const href = localizeHref(option.locale, basePath);
        const target = search ? `${href}?${search}` : href;
        const isActive = option.locale === locale;

        return (
          <Link
            key={option.locale}
            href={target}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "bg-[var(--color-accent)] text-white shadow-[0_10px_24px_rgba(255,107,74,0.24)]"
                : "text-white/58 hover:text-white"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
