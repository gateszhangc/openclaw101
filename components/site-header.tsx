import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { localizeHref, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

const COPY = {
  zh: {
    subtitle: "教程 + 资源",
    guide: "Guide",
    resources: "Resources",
    cta: "开始上手",
  },
  en: {
    subtitle: "Guide + Resources",
    guide: "Guide",
    resources: "Resources",
    cta: "Start learning",
  },
} as const;

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = COPY[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={localizeHref(locale, "/")} className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
            OC
          </span>
          <div className="leading-tight">
            <p className="font-[family-name:var(--font-serif)] text-lg font-semibold text-white">
              OpenClaw101
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">{copy.subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <Link href={localizeHref(locale, "/guide")} className="transition hover:text-white">
            {copy.guide}
          </Link>
          <Link href={localizeHref(locale, "/resources")} className="transition hover:text-white">
            {copy.resources}
          </Link>
          <Link
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
          <Link
            href={localizeHref(locale, "/guide")}
            className="hidden rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_40px_rgba(255,90,54,0.35)] transition hover:bg-[var(--color-accent-strong)] md:inline-flex"
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
