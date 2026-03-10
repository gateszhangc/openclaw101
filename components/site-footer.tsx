import Link from "next/link";

import { localizeHref, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

const COPY = {
  zh: {
    description:
      "Guide 负责告诉你下一步学什么，Resources 负责在你卡住时把官方、社区、源码和 Skills 入口快速拉回来。",
    guide: "Guide",
    resources: "Resources",
    roadmap: "Stages",
  },
  en: {
    description:
      "Guide tells you what to learn next, while Resources brings official docs, community threads, source code, and Skills back into one place when you get stuck.",
    guide: "Guide",
    resources: "Resources",
    roadmap: "Stages",
  },
} as const;

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = COPY[locale];

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-white/60 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-serif)] text-xl text-white">OpenClaw101</p>
          <p className="max-w-2xl leading-7">{copy.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Link href={localizeHref(locale, "/guide")} className="transition hover:text-white">
            {copy.guide}
          </Link>
          <Link
            href={localizeHref(locale, "/resources")}
            className="transition hover:text-white"
          >
            {copy.resources}
          </Link>
          <Link href={localizeHref(locale, "/roadmap")} className="transition hover:text-white">
            {copy.roadmap}
          </Link>
          <Link
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
