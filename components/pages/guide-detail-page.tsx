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
  const backHref = phase ? localizeHref(locale, `/phases/${phase.slug}`) : localizeHref(locale, "/guide");
  const backLabel = phase ? copy.backPhase : copy.backGuide;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="surface-card rounded-[2.5rem] p-6 sm:p-8">
        <Link href={backHref} className="text-sm text-white/55 transition hover:text-white">
          ← {backLabel}
        </Link>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_300px]">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
              {phase
                ? `${phase.label} / ${phase.shortTitle}`
                : copy.guideFallback}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl leading-tight text-white">
              {guide.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">{guide.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/50">
              <span className="rounded-full border border-white/10 px-4 py-2">
                {copy.minutes(guide.readingTime)}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                {copy.role}: {guide.roleName}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                {copy.episodePrefix} 0{guide.episode}
              </span>
            </div>
          </div>

          <aside className="surface-card rounded-[2rem] p-5 xl:sticky xl:top-28 xl:h-fit">
            <p className="section-kicker">{copy.toc}</p>
            <div className="mt-4 space-y-2">
              {guide.toc.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className="block rounded-2xl px-3 py-2 text-sm text-white/66 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {entry.text}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {guide.keyTakeaways.length > 0 ? (
        <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">{copy.keyTakeaways}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {guide.keyTakeaways.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/75"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 reading-panel rounded-[2.5rem] p-6 sm:p-8 lg:p-10">
        <div className="guide-prose max-w-none">{guide.content}</div>
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="section-kicker">{copy.continue}</p>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-white">
            {copy.continueTitle}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {navigation.previous ? (
            <Link
              href={localizeHref(locale, `/guide/${navigation.previous.slug}`)}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80"
            >
              {copy.previous}
            </Link>
          ) : null}
          {navigation.next ? (
            <Link
              href={localizeHref(locale, `/guide/${navigation.next.slug}`)}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
            >
              {copy.next}
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
