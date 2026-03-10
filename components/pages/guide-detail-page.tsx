import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getGuideNavigation, getGuidePageBySlug } from "@/lib/guides";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getPhaseBySlug } from "@/lib/site-data";

type GuideDetailPageProps = {
  locale: Locale;
  guideSlug: string;
};

const COPY = {
  zh: {
    guideFallback: "Guide / OpenClaw 从零陪跑",
    backGuide: "返回 Guide",
    backPhase: "返回阶段页",
    role: "角色",
    keyTakeaways: "关键要点",
    continue: "继续学习",
    continueTitle: "别中断主线，沿着顺序继续往前",
    previous: "上一篇",
    next: "下一篇",
    toc: "章节目录",
    tocBody: "读长文时，先知道自己现在位于哪一段。",
    minutes: (value: number) => `${value} 分钟阅读`,
    episodePrefix: "Episode",
  },
  en: {
    guideFallback: "Guide / OpenClaw from zero",
    backGuide: "Back to Guide",
    backPhase: "Back to stage",
    role: "Role",
    keyTakeaways: "Key takeaways",
    continue: "Keep going",
    continueTitle: "Stay on the main path and keep moving in order",
    previous: "Previous",
    next: "Next",
    toc: "Table of contents",
    tocBody: "When the lesson gets long, keep the current section visible.",
    minutes: (value: number) => `${value} min read`,
    episodePrefix: "Episode",
  },
} as const;

export async function GuideDetailPage({ locale, guideSlug }: GuideDetailPageProps) {
  const copy = COPY[locale];
  const guide = await getGuidePageBySlug(locale, guideSlug);

  if (!guide) {
    return null;
  }

  const navigation = await getGuideNavigation(locale, guideSlug);
  const phase = guide.phaseSlug ? getPhaseBySlug(locale, guide.phaseSlug) : null;
  const backHref = phase
    ? localizeHref(locale, `/phases/${phase.slug}`)
    : localizeHref(locale, "/guide");
  const backLabel = phase ? copy.backPhase : copy.backGuide;

  return (
    <div className="page-shell">
      <section className="surface-card-strong rounded-[2rem] px-6 py-8 sm:px-8 sm:py-9">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-white/58 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              {backLabel}
            </Link>

            <div className="mt-6">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/42">
                {phase ? `${phase.label} / ${phase.shortTitle}` : copy.guideFallback}
              </p>
              <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/68">{guide.summary}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/54">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                {copy.minutes(guide.readingTime)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                {copy.role}: {guide.roleName}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                {copy.episodePrefix} 0{guide.episode}
              </span>
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
              <Image
                data-testid="guide-cover-image"
                src={guide.coverImage}
                alt={guide.title}
                width={1600}
                height={896}
                className="h-auto w-full object-cover"
                priority={guide.episode <= 2}
                sizes="(min-width: 1280px) 720px, 100vw"
              />
            </div>
          </div>

          <aside className="surface-card rounded-[1.75rem] p-5 xl:sticky xl:top-28 xl:h-fit">
            <p className="section-kicker">{copy.toc}</p>
            <p className="mt-3 text-sm leading-7 text-white/60">{copy.tocBody}</p>
            <div className="mt-5 space-y-2">
              {guide.toc.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className="block rounded-[1rem] border border-transparent px-3 py-2 text-sm text-white/66 transition hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
                >
                  {entry.text}
                </a>
              ))}
            </div>
          </aside>
        </div>

      </section>

      {guide.keyTakeaways.length > 0 ? (
        <section className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
          <p className="section-kicker">{copy.keyTakeaways}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {guide.keyTakeaways.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/72"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 reading-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="guide-prose max-w-none">{guide.content}</div>
      </section>

      <section className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="section-kicker">{copy.continue}</p>
            <h2 className="font-[family-name:var(--font-serif)] text-3xl text-white">
              {copy.continueTitle}
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {navigation.previous ? (
            <Link
              href={localizeHref(locale, `/guide/${navigation.previous.slug}`)}
              className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 transition hover:border-white/20"
            >
              <p className="section-kicker">{copy.previous}</p>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                {navigation.previous.title}
              </h3>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/66">
                <ArrowLeft className="size-4" />
                {copy.previous}
              </p>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          {navigation.next ? (
            <Link
              href={localizeHref(locale, `/guide/${navigation.next.slug}`)}
              className="rounded-[1.5rem] border border-[rgba(255,107,74,0.2)] bg-[rgba(255,107,74,0.08)] p-5 transition hover:border-[rgba(255,107,74,0.32)]"
            >
              <p className="section-kicker">{copy.next}</p>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                {navigation.next.title}
              </h3>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/78">
                {copy.next}
                <ArrowRight className="size-4 text-[var(--color-accent)]" />
              </p>
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
