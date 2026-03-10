import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { localizeHref, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

const COPY = {
  zh: {
    subtitle: "教程 + 资源",
    howItWorks: "怎么学",
    path: "学习路径",
    why: "为什么不是官方文档",
    faq: "常见问题",
    guide: "Guide",
    resources: "Resources",
    github: "GitHub",
    cta: "开始陪跑",
  },
  en: {
    subtitle: "Guide + Resources",
    howItWorks: "How it works",
    path: "Learning path",
    why: "Why this site",
    faq: "FAQ",
    guide: "Guide",
    resources: "Resources",
    github: "GitHub",
    cta: "Start learning",
  },
} as const;

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = COPY[locale];
  const homeHref = localizeHref(locale, "/");
  const sectionLinks = [
    { label: copy.howItWorks, href: `${homeHref}#how-it-works` },
    { label: copy.path, href: `${homeHref}#learning-path` },
    { label: copy.why, href: `${homeHref}#why-openclaw101` },
    { label: copy.faq, href: `${homeHref}#faq` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--header-bg)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={localizeHref(locale, "/")} prefetch={false} className="flex items-center gap-3">
          <span
            data-testid="site-logo-mark"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.26)]"
          >
            O1
          </span>
          <div className="leading-tight">
            <p className="font-[family-name:var(--font-serif)] text-lg font-semibold tracking-[-0.02em] text-white">
              OpenClaw101
            </p>
            <p className="text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
              {copy.subtitle}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/68 xl:flex">
          {sectionLinks.map((link) => (
            <Link key={link.label} href={link.href} prefetch={false} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link href={localizeHref(locale, "/guide")} prefetch={false} className="transition hover:text-white">
            {copy.guide}
          </Link>
          <Link href={localizeHref(locale, "/resources")} prefetch={false} className="transition hover:text-white">
            {copy.resources}
          </Link>
          <Link
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            {copy.github}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Link
            href={localizeHref(locale, "/guide")}
            prefetch={false}
            className="site-button-primary hidden md:inline-flex"
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
