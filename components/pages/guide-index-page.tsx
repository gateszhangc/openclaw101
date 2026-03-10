import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { getGuideIndexData } from "@/lib/guides";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getResources } from "@/lib/site-data";

type GuideIndexPageProps = {
  locale: Locale;
};

const PHASE_SUPPORT_RESOURCE_SLUGS: Record<string, string[]> = {
  "phase-install": ["official-getting-started", "official-onboarding"],
  "phase-models": ["official-providers", "github-discussions"],
  "phase-channels": ["official-channels", "discord-community"],
  "phase-memory": ["discord-community", "github-discussions"],
  "phase-automation": ["clawhub", "github-releases"],
};

const COPY = {
  zh: {
    heroKicker: "Guide",
    title: "从零开始，按正确顺序把 OpenClaw 走通",
    body:
      "这一页不是文章列表，而是你的主线地图。先读导读建立整体感，再沿着五个阶段往前走，直到把模型、连接、人格和自动化都接起来。",
    introCta: "从导读开始",
    resourcesCta: "卡住时去 Resources",
    outcomesKicker: "这条主线会带你完成",
    outcomes: [
      "第一次对话跑通",
      "模型和认证关系理顺",
      "把 Telegram 或其他渠道接上",
      "写出会影响行为的人格与长期记忆",
      "装 Skills 并开始做自动化",
    ],
    entryKicker: "Episode 0",
    entryTitle: "先用导读建立地图，再进入阶段主线",
    readIntro: "阅读导读",
    minutes: (value: number) => `${value} 分钟阅读`,
    pathKicker: "Stage path",
    pathTitle: "五个阶段，一个不绕路的上手路径",
    pathBody: "每个阶段都把目标、核心教程和支援入口放在一起，减少来回跳页面的成本。",
    phaseGoals: "阶段目标",
    coreGuide: "核心教程",
    support: "卡住时先查这些",
    enterPhase: "进入阶段",
    openGuide: "打开教程",
    pendingGuideTitle: "该阶段教程整理中",
    pendingGuideBody:
      "阶段目标和资源入口已经先整理好，可以先按阶段页推进；完整教程后续再补上。",
    pendingGuideMeta: "暂未发布",
    phasePageCta: "先看阶段页",
    episodePrefix: "Episode",
  },
  en: {
    heroKicker: "Guide",
    title: "Start from zero and move through OpenClaw in the right order",
    body:
      "This page is not an article archive. It is the main path. Read the intro to build the map, then move through the five stages until models, channels, identity, and automation all click together.",
    introCta: "Start with the intro",
    resourcesCta: "Use Resources when blocked",
    outcomesKicker: "This path gets you to",
    outcomes: [
      "A working first conversation",
      "A clean mental model for auth and models",
      "Telegram or another channel connected",
      "Identity and long-term memory that change behavior",
      "Skills installed and automation started",
    ],
    entryKicker: "Episode 0",
    entryTitle: "Use the intro to build the map before the stage path begins",
    readIntro: "Read the intro",
    minutes: (value: number) => `${value} min read`,
    pathKicker: "Stage path",
    pathTitle: "Five stages and one path that avoids unnecessary loops",
    pathBody:
      "Each stage keeps the goal, core lesson, and support links in one place so the sequence is easier to hold in your head.",
    phaseGoals: "Stage goals",
    coreGuide: "Core lesson",
    support: "Open these first when blocked",
    enterPhase: "Enter stage",
    openGuide: "Open lesson",
    pendingGuideTitle: "This stage guide is still being prepared",
    pendingGuideBody:
      "The stage goals and support entry points are already here, so you can keep moving from the stage page until the full lesson ships.",
    pendingGuideMeta: "Not published yet",
    phasePageCta: "Open the stage page",
    episodePrefix: "Episode",
  },
} as const;

export async function GuideIndexPage({ locale }: GuideIndexPageProps) {
  const copy = COPY[locale];
  const resources = getResources(locale);
  const { guide, phases } = await getGuideIndexData(locale);

  if (!guide) {
    throw new Error("Guide entry missing");
  }

  return (
    <div className="page-shell">
      <section className="surface-card-strong rounded-[2rem] px-6 py-8 sm:px-8 sm:py-9">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_360px]">
          <article className="space-y-6">
            <div>
              <p className="section-kicker">{copy.heroKicker}</p>
              <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/68">{copy.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={localizeHref(locale, `/guide/${guide.slug}`)} className="site-button-primary">
                {copy.introCta}
                <ArrowRight className="size-4" />
              </Link>
              <Link href={localizeHref(locale, "/resources")} className="site-button-secondary">
                {copy.resourcesCta}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </article>

          <article className="surface-card rounded-[1.75rem] p-5 sm:p-6">
            <p className="section-kicker">{copy.outcomesKicker}</p>
            <div className="mt-5 space-y-3">
              {copy.outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4"
                >
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/42">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/74">{outcome}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_320px]">
        <article className="surface-card rounded-[2rem] p-6 sm:p-7">
          <p className="section-kicker">{copy.entryKicker}</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
                {copy.entryTitle}
              </h2>
              <p className="mt-4 leading-8 text-white/66">{guide.summary}</p>
            </div>
            <Link href={localizeHref(locale, `/guide/${guide.slug}`)} className="site-button-secondary">
              {copy.readIntro}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>

        <article className="surface-card rounded-[2rem] p-6">
          <p className="section-kicker">{copy.episodePrefix}</p>
          <p className="mt-4 text-sm text-white/58">
            {copy.episodePrefix} 0{guide.episode}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
            {guide.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/64">{copy.minutes(guide.readingTime)}</p>
        </article>
      </section>

      <section className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
        <div className="max-w-3xl">
          <p className="section-kicker">{copy.pathKicker}</p>
          <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
            {copy.pathTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/66">{copy.pathBody}</p>
        </div>

        <div className="mt-8 grid gap-4">
          {phases.map((phase) => {
            const supportResources = (PHASE_SUPPORT_RESOURCE_SLUGS[phase.slug] || [])
              .map((slug) => resources.find((resource) => resource.slug === slug))
              .filter((resource) => resource !== undefined);

            return (
              <article
                key={phase.slug}
                data-testid={`guide-phase-${phase.slug}`}
                className="rounded-[1.85rem] border border-white/10 bg-black/20 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/42">
                      {phase.label}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-serif)] text-3xl text-white">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-lg leading-8 text-white/66">{phase.description}</p>
                  </div>
                  <Link href={localizeHref(locale, `/phases/${phase.slug}`)} className="site-button-secondary">
                    {copy.enterPhase}
                  </Link>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="section-kicker">{copy.phaseGoals}</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-white/68">
                      {phase.goals.map((goal) => (
                        <li key={goal}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {phase.lesson ? (
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="section-kicker">{copy.coreGuide}</p>
                        <h4 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                          {phase.lesson.title}
                        </h4>
                        <p className="mt-3 leading-7 text-white/66">{phase.lesson.summary}</p>
                        <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                          <span>{copy.minutes(phase.lesson.readingTime)}</span>
                          <Link
                            href={localizeHref(locale, `/guide/${phase.lesson.slug}`)}
                            className="inline-flex items-center gap-2 transition hover:text-white"
                          >
                            {copy.openGuide}
                            <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="section-kicker">{copy.coreGuide}</p>
                        <h4 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                          {copy.pendingGuideTitle}
                        </h4>
                        <p className="mt-3 leading-7 text-white/66">{copy.pendingGuideBody}</p>
                        <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                          <span>{copy.pendingGuideMeta}</span>
                          <Link
                            href={localizeHref(locale, `/phases/${phase.slug}`)}
                            className="inline-flex items-center gap-2 transition hover:text-white"
                          >
                            {copy.phasePageCta}
                            <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </div>
                    )}

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <p className="section-kicker">{copy.support}</p>
                      <div className="mt-4 space-y-3">
                        {supportResources.map((resource) => (
                          <Link
                            key={resource.slug}
                            href={resource.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/20"
                          >
                            <div>
                              <p className="text-sm font-medium text-white">{resource.title}</p>
                              <p className="mt-1 text-xs text-white/50">{resource.source}</p>
                            </div>
                            <ArrowUpRight className="size-4 shrink-0 text-[var(--color-accent)]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
