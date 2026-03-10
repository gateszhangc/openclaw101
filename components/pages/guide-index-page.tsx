import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { getGuideIndexData } from "@/lib/guides";
import { localizeHref, type Locale } from "@/lib/i18n";
import {
  getResourceCategoryLabel,
  getResourceLanguageLabel,
  getResources,
} from "@/lib/site-data";

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
    outcomes: [
      "跑通第一次对话",
      "弄清模型与认证",
      "接上 Telegram 或其他渠道",
      "写人格与长期记忆",
      "装 Skills 做自动化",
    ],
    headerKicker: "Guide",
    title: "从零开始，按正确顺序上手 OpenClaw",
    body:
      "先看导读建立整体地图，再按阶段进入安装、模型、渠道、人格和自动化。你不需要先懂完全部，只需要知道自己现在在哪一步。",
    introCta: "从导读开始",
    resourcesCta: "卡住就查资源",
    outcomesKicker: "这条主线会带你完成",
    entryKicker: "Guide 入口",
    entryTitle: "先看导读，再进入五个阶段",
    readIntro: "阅读导读",
    minutes: (value: number) => `${value} 分钟阅读`,
    phaseGoals: "阶段目标",
    coreGuide: "核心教程",
    support: "卡住时先查这些",
    enterPhase: "进入阶段",
    openGuide: "打开教程",
    pendingGuideTitle: "该阶段教程整理中",
    pendingGuideBody:
      "阶段目标和资源入口已经先整理好，可以先按阶段页推进；对应的 Guide 正文后续再补上。",
    pendingGuideMeta: "暂未发布",
    phasePageCta: "先看阶段页",
    episodePrefix: "Episode",
  },
  en: {
    outcomes: [
      "Finish the first conversation",
      "Understand models and authentication",
      "Connect Telegram or another channel",
      "Write identity and long-term memory files",
      "Install Skills and start automating work",
    ],
    headerKicker: "Guide",
    title: "Start from zero and learn OpenClaw in the right order",
    body:
      "Read the intro to build the map first, then move through installation, models, channels, identity, and automation. You do not need to understand everything up front. You only need to know which stage you are in right now.",
    introCta: "Start with the intro",
    resourcesCta: "Use Resources when stuck",
    outcomesKicker: "This main path gets you to",
    entryKicker: "Guide Entry",
    entryTitle: "Read the intro first, then move through the five stages",
    readIntro: "Read the intro",
    minutes: (value: number) => `${value} min read`,
    phaseGoals: "Stage goals",
    coreGuide: "Core guide",
    support: "Check these when you are blocked",
    enterPhase: "Enter stage",
    openGuide: "Open guide",
    pendingGuideTitle: "This stage guide is still being prepared",
    pendingGuideBody:
      "The stage goals and resource entry points are already here, so you can still move forward from the stage page until the full guide is published.",
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
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_340px]">
        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">{copy.headerKicker}</p>
          <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-4xl text-white">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/68">{copy.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localizeHref(locale, `/guide/${guide.slug}`)}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              {copy.introCta}
            </Link>
            <Link
              href={localizeHref(locale, "/resources")}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
            >
              {copy.resourcesCta}
            </Link>
          </div>
        </article>

        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">{copy.outcomesKicker}</p>
          <div className="mt-5 space-y-3">
            {copy.outcomes.map((outcome, index) => (
              <div
                key={outcome}
                className="rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-4"
              >
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                  0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/75">{outcome}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{copy.entryKicker}</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              {copy.entryTitle}
            </h2>
          </div>
          <Link
            href={localizeHref(locale, `/guide/${guide.slug}`)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
          >
            {copy.readIntro}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <article className="mt-6 rounded-[2rem] border border-white/10 bg-black/10 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                {copy.episodePrefix} 0{guide.episode}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                {guide.title}
              </h3>
              <p className="mt-3 leading-7 text-white/68">{guide.summary}</p>
            </div>
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55">
              {copy.minutes(guide.readingTime)}
            </span>
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-4">
        {phases.map((phase) => {
          const supportResources = (PHASE_SUPPORT_RESOURCE_SLUGS[phase.slug] || [])
            .map((slug) => resources.find((resource) => resource.slug === slug))
            .filter((resource) => resource !== undefined);

          return (
            <article
              key={phase.slug}
              data-testid={`guide-phase-${phase.slug}`}
              className="surface-card rounded-[2.5rem] p-6 sm:p-8"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                    {phase.label}
                  </p>
                  <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
                    {phase.title}
                  </h2>
                  <p className="mt-3 text-lg leading-8 text-white/66">{phase.description}</p>
                </div>
                <Link
                  href={localizeHref(locale, `/phases/${phase.slug}`)}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
                >
                  {copy.enterPhase}
                </Link>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
                <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                  <p className="section-kicker">{copy.phaseGoals}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/68">
                    {phase.goals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {phase.lesson ? (
                    <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                      <p className="section-kicker">{copy.coreGuide}</p>
                      <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                        {phase.lesson.title}
                      </h3>
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
                    <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                      <p className="section-kicker">{copy.coreGuide}</p>
                      <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                        {copy.pendingGuideTitle}
                      </h3>
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

                  <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                    <p className="section-kicker">{copy.support}</p>
                    <div className="mt-4 space-y-3">
                      {supportResources.map((resource) => (
                        <Link
                          key={resource.slug}
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-start justify-between gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.035] px-4 py-4 transition hover:border-white/20 hover:bg-white/[0.05]"
                        >
                          <div>
                            <p className="text-sm font-medium text-white">{resource.title}</p>
                            <p className="mt-2 text-sm leading-6 text-white/58">
                              {resource.summary}
                            </p>
                            <p className="mt-2 text-xs text-white/38">
                              {getResourceCategoryLabel(locale, resource.category)} ·{" "}
                              {getResourceLanguageLabel(locale, resource.language)}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 size-4 shrink-0 text-white/45 transition group-hover:text-white" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
