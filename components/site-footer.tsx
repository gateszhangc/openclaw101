import Link from "next/link";

import { localizeHref, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

const COPY = {
  zh: {
    description:
      "把 OpenClaw 的学习顺序、资源入口和常见坑整理成一个更像产品而不是文档站的起点。",
    sections: "首页分区",
    product: "核心页面",
    howItWorks: "怎么学",
    path: "学习路径",
    faq: "常见问题",
    guide: "Guide",
    resources: "Resources",
    roadmap: "Stages",
    github: "GitHub",
  },
  en: {
    description:
      "A product-shaped starting point for OpenClaw: learning order, resource entry points, and the common traps in one place.",
    sections: "Home sections",
    product: "Core pages",
    howItWorks: "How it works",
    path: "Learning path",
    faq: "FAQ",
    guide: "Guide",
    resources: "Resources",
    roadmap: "Stages",
    github: "GitHub",
  },
} as const;

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = COPY[locale];
  const homeHref = localizeHref(locale, "/");
  const sectionLinks = [
    { label: copy.howItWorks, href: `${homeHref}#how-it-works` },
    { label: copy.path, href: `${homeHref}#learning-path` },
    { label: copy.faq, href: `${homeHref}#faq` },
  ];
  const pageLinks = [
    { label: copy.guide, href: localizeHref(locale, "/guide") },
    { label: copy.resources, href: localizeHref(locale, "/resources") },
    { label: copy.roadmap, href: localizeHref(locale, "/roadmap") },
  ];

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-white/60 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-semibold text-white">
              O1
            </span>
            <div>
              <p className="font-[family-name:var(--font-serif)] text-xl text-white">OpenClaw101</p>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/35">
                OpenClaw starter system
              </p>
            </div>
          </div>
          <p className="max-w-xl leading-7">{copy.description}</p>
        </div>
        <div className="space-y-4">
          <p className="section-kicker">{copy.sections}</p>
          <div className="grid gap-3">
            {sectionLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="section-kicker">{copy.product}</p>
          <div className="grid gap-3">
            {pageLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <Link
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              {copy.github}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
