import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { getGuideIndexData } from "@/lib/guides";
import { localizeHref, type Locale } from "@/lib/i18n";
import {
  getResourceCategoryLabel,
  getResourceLanguageLabel,
  getResources,
} from "@/lib/site-data";

type HomePageProps = {
  locale: Locale;
};

const FEATURED_RESOURCE_SLUGS = [
  "official-getting-started",
  "github-repo",
  "clawhub",
] as const;

const COPY = {
  zh: {
    badge: "OpenClaw101 / 收藏级入门站",
    heroKicker: "Product-style Guide + Resources",
    heroTitle: "学会 OpenClaw，",
    heroTitleSecond: "不靠硬啃文档。",
    heroBody:
      "这不是把 Markdown 套进默认主题的教程站，而是一个把顺序、资源、路径和常见坑整理成产品体验的起点。先建立地图，再进入每个阶段，卡住时再快速查资源。",
    primaryCta: "从第 1 篇开始",
    secondaryCta: "我先查资源",
    heroSignals: ["顺序清晰", "资源聚合", "中文优先", "双语同步"],
    stats: {
      guides: "核心教程",
      phases: "学习阶段",
      resources: "高频资源",
    },
    cockpitKicker: "Starter cockpit",
    cockpitTitle: "把上手顺序压缩成一个可执行的面板",
    cockpitBody: "从导读开始，沿着阶段往前推，不在安装、模型、渠道之间来回跳。",
    cockpitLabel: "Main track",
    assistantTitle: "你会在首屏看到什么",
    assistantPrompt: "先看哪篇？什么时候再去翻官方文档？",
    assistantAnswer: "先读导读，再跑安装与启动；遇到具体问题，再去 Resources 对照官方与社区入口。",
    indexTitle: "路线入口",
    indexBody: "五个阶段串起从第一次对话到自动化进阶。",
    howKicker: "How it works",
    howTitle: "三步把 OpenClaw 从“看不懂”拉到“能上手”",
    howBody: "先建立地图，再跑主线，再在卡点时查资源。它不是最花哨的流程，但对新手最省时间。",
    steps: [
      {
        index: "01",
        title: "先知道自己在哪个阶段",
        copy: "导读和五阶段路径先给你整体地图，不用一上来就在 Provider、频道、Skills 之间乱跳。",
      },
      {
        index: "02",
        title: "按顺序跑通第一条主线",
        copy: "先完成安装、第一次对话和基础配置，再进入模型、渠道、人格和自动化。",
      },
      {
        index: "03",
        title: "卡住时再查资源",
        copy: "Resources 把官方、社区、源码、Skills 入口都收在一起，查问题时不再盲搜。",
      },
    ],
    pathKicker: "Learning path",
    pathTitle: "五个阶段，把 OpenClaw 从能聊到能干活串起来",
    pathBody:
      "每个阶段都明确给出目标、核心教程和下一跳，不把你扔进一堆概念里自己拼流程。",
    pathCta: "进入完整 Guide",
    phaseGoals: "阶段目标",
    phaseLesson: "核心教程",
    phaseFallback: "阶段页已就位",
    phaseEnter: "进入阶段",
    phaseRead: "阅读教程",
    whyKicker: "Why OpenClaw101",
    whyTitle: "为什么不是直接把官方文档从头啃到尾",
    whyBody:
      "官方文档负责定义能力边界，这个站负责把学习顺序、判断依据和高频坑梳理成适合第一次上手的产品体验。",
    whyThisSite: "在这里你会得到",
    whyOfficial: "官方文档仍然适合做什么",
    whySiteItems: [
      "先学什么、后学什么的明确顺序",
      "每个阶段的最小目标和下一跳",
      "踩坑时该去哪个入口排查",
      "更适合第一次配置成功的讲法",
    ],
    whyOfficialItems: [
      "核对命令、参数和规范写法",
      "查看能力边界和最新定义",
      "确认具体功能项是否存在",
      "对照版本变化和原始说明",
    ],
    resourcesKicker: "Featured resources",
    resourcesTitle: "把最常回查的入口先收起来",
    resourcesBody:
      "主线教程负责让你持续往前走，这里则把你后面一定会反复打开的入口提前收好。",
    resourcesCta: "进入完整资源页",
    openResource: "打开资源",
    faqKicker: "FAQ",
    faqTitle: "你可能最关心的四个问题",
    faqItems: [
      {
        question: "我完全没装过 OpenClaw，应该先去哪？",
        answer: "先从导读和第 2 篇安装教程开始，不建议先去论坛或 GitHub 里盲搜。",
      },
      {
        question: "我已经能跑起来了，这个站还值不值得看？",
        answer: "值得。后面的模型、频道、人格、自动化阶段会帮你把“能用”变成“顺手”。",
      },
      {
        question: "什么时候该看 Guide，什么时候该看 Resources？",
        answer: "不知道顺序时看 Guide；已经知道问题大概在哪一类时，直接去 Resources。",
      },
      {
        question: "为什么首页看起来像产品站，而不是普通教程站？",
        answer: "因为这个站想先解决“怎么开始”和“下一步去哪”，而不是只展示文章列表。",
      },
    ],
    finalKicker: "Start now",
    finalTitle: "现在开始，别再在文档海里来回跳",
    finalBody: "先走主线，再按需查资料。这样比一开始就试图理解一切更接近真正上手。",
    finalGuide: "进入 Guide",
    finalResources: "打开 Resources",
  },
  en: {
    badge: "OpenClaw101 / bookmark-worthy starter site",
    heroKicker: "Product-style Guide + Resources",
    heroTitle: "Learn OpenClaw",
    heroTitleSecond: "without brute-forcing the docs.",
    heroBody:
      "This is not a markdown site with a nicer skin. It is a product-shaped starting point that turns order, resource entry points, and common traps into a cleaner first-run experience. Build the map first, then move stage by stage.",
    primaryCta: "Start with episode 1",
    secondaryCta: "Browse resources first",
    heroSignals: ["Clear order", "Resource hub", "Chinese-first", "Bilingual"],
    stats: {
      guides: "Core guides",
      phases: "Learning stages",
      resources: "Key resources",
    },
    cockpitKicker: "Starter cockpit",
    cockpitTitle: "Compress the onboarding sequence into one executable panel",
    cockpitBody:
      "Start from the intro, move forward stage by stage, and stop bouncing between install, models, channels, and Skills.",
    cockpitLabel: "Main track",
    assistantTitle: "What the homepage gives you",
    assistantPrompt: "Which guide should I read first? When do I go back to the docs?",
    assistantAnswer:
      "Read the intro first, then finish install and launch. Use Resources only when the question becomes specific enough to compare docs and community links.",
    indexTitle: "Learning map",
    indexBody: "Five stages take you from the first conversation to proactive automation.",
    howKicker: "How it works",
    howTitle: "Three moves to turn OpenClaw from confusing into usable",
    howBody:
      "Build the map first, run the main path second, and use the resource hub only when you hit a concrete blocker.",
    steps: [
      {
        index: "01",
        title: "Know which stage you are in",
        copy: "The intro and five-stage map tell you where install, models, channels, memory, and automation fit.",
      },
      {
        index: "02",
        title: "Finish one clean main path",
        copy: "Install first, get the first conversation working, then move into models, channels, identity, and automation.",
      },
      {
        index: "03",
        title: "Search only when the problem is specific",
        copy: "Resources gathers official docs, community threads, source code, and Skills entry points in one place.",
      },
    ],
    pathKicker: "Learning path",
    pathTitle: "Five stages that move OpenClaw from talking to doing work",
    pathBody:
      "Each stage has a clear goal, a core lesson, and the next step, so the sequence does not collapse into a pile of concepts.",
    pathCta: "Open the full Guide",
    phaseGoals: "Stage goals",
    phaseLesson: "Core lesson",
    phaseFallback: "Stage page is ready",
    phaseEnter: "Enter stage",
    phaseRead: "Read lesson",
    whyKicker: "Why OpenClaw101",
    whyTitle: "Why not just read the official docs front to back",
    whyBody:
      "The official docs define the product. This site translates the first-time learning order, decision points, and common traps into a more guided experience.",
    whyThisSite: "What this site gives you",
    whyOfficial: "What the official docs are still best at",
    whySiteItems: [
      "A clear learning order instead of a flat doc tree",
      "The minimum goal for each stage",
      "A faster path to the right troubleshooting entry point",
      "Language optimized for the first successful setup",
    ],
    whyOfficialItems: [
      "Verify commands, parameters, and exact syntax",
      "Check the latest feature boundaries",
      "Confirm whether a capability exists",
      "Read canonical release and version details",
    ],
    resourcesKicker: "Featured resources",
    resourcesTitle: "Save the links you will keep opening later",
    resourcesBody:
      "The guide keeps you moving. This section saves the entry points you will revisit over and over once questions become specific.",
    resourcesCta: "Open the full resource page",
    openResource: "Open resource",
    faqKicker: "FAQ",
    faqTitle: "Four questions people usually have first",
    faqItems: [
      {
        question: "I have never installed OpenClaw. Where should I start?",
        answer: "Start with the intro and the install lesson. Do not begin by searching GitHub or forums blind.",
      },
      {
        question: "I already have it running. Is this site still useful?",
        answer: "Yes. The later stages turn a working setup into something that feels reliable and productive.",
      },
      {
        question: "When should I use Guide vs Resources?",
        answer: "Use Guide when the order is unclear. Use Resources when the category of the problem is already obvious.",
      },
      {
        question: "Why does the homepage look like a product site?",
        answer: "Because the first problem is not reading articles. It is deciding how to start and where to go next.",
      },
    ],
    finalKicker: "Start now",
    finalTitle: "Start now instead of pinballing across docs",
    finalBody:
      "Run the main path first, then reach for references only when you need them. That gets you to a real setup faster.",
    finalGuide: "Open Guide",
    finalResources: "Open Resources",
  },
} as const;

export async function HomePage({ locale }: HomePageProps) {
  const copy = COPY[locale];
  const resources = getResources(locale);
  const { guide, phases } = await getGuideIndexData(locale);

  if (!guide) {
    throw new Error("Guide tutorial missing");
  }

  const featuredResources = FEATURED_RESOURCE_SLUGS.map((slug) =>
    resources.find((resource) => resource.slug === slug),
  ).filter((resource) => resource !== undefined);

  return (
    <div className="page-shell">
      <section
        className="surface-card-strong rounded-[2rem] px-6 py-8 sm:px-8 lg:px-10 lg:py-10"
        data-testid="home-hero"
      >
        <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_420px] xl:items-start">
          <div className="space-y-7 fade-in-up">
            <span className="site-chip">{copy.badge}</span>

            <div className="space-y-5">
              <p className="section-kicker">{copy.heroKicker}</p>
              <h1 className="max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-[0.96] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.9rem]">
                {copy.heroTitle}
                <br />
                {copy.heroTitleSecond}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/70 sm:text-[1.1rem]">
                {copy.heroBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={localizeHref(locale, `/guide/${guide.slug}`)}
                prefetch={false}
                className="site-button-primary"
              >
                {copy.primaryCta}
                <ArrowRight className="size-4" />
              </Link>
              <Link href={localizeHref(locale, "/resources")} prefetch={false} className="site-button-secondary">
                {copy.secondaryCta}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-white/65">
              {copy.heroSignals.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <article className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">6</p>
                <p className="mt-2 text-sm text-white/60">{copy.stats.guides}</p>
              </article>
              <article className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  {phases.length}
                </p>
                <p className="mt-2 text-sm text-white/60">{copy.stats.phases}</p>
              </article>
              <article className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  {resources.length}
                </p>
                <p className="mt-2 text-sm text-white/60">{copy.stats.resources}</p>
              </article>
            </div>
          </div>

          <div className="grid gap-4">
            <article
              data-testid="home-start-panel"
              className="surface-card rounded-[1.75rem] p-5 sm:p-6 fade-in-up fade-in-delay-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">{copy.cockpitKicker}</p>
                  <h2 className="mt-3 max-w-sm font-[family-name:var(--font-serif)] text-3xl leading-tight text-white">
                    {copy.cockpitTitle}
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-white/50">
                  {copy.cockpitLabel}
                </span>
              </div>

              <p className="mt-4 max-w-md leading-7 text-white/68">{copy.cockpitBody}</p>

              <div className="mt-6 space-y-3">
                {copy.steps.map((step) => (
                  <div
                    key={step.index}
                    className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-[#ffb29d]">
                        {step.index}
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-medium text-white">{step.title}</p>
                        <p className="text-sm leading-7 text-white/62">{step.copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <article className="surface-card rounded-[1.75rem] p-5 fade-in-up fade-in-delay-2">
                <p className="section-kicker">{copy.assistantTitle}</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-white/65">
                    {copy.assistantPrompt}
                  </div>
                  <div className="rounded-[1.25rem] border border-[rgba(255,107,74,0.22)] bg-[rgba(255,107,74,0.08)] px-4 py-3 text-sm leading-7 text-white/82">
                    {copy.assistantAnswer}
                  </div>
                </div>
              </article>

              <article className="surface-card rounded-[1.75rem] p-5 fade-in-up fade-in-delay-3">
                <p className="section-kicker">{copy.indexTitle}</p>
                <p className="mt-3 text-sm leading-7 text-white/66">{copy.indexBody}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {phases.map((phase) => (
                    <span
                      key={phase.slug}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/66"
                    >
                      {phase.shortTitle}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
        <div className="max-w-3xl">
          <p className="section-kicker">{copy.howKicker}</p>
          <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
            {copy.howTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/66">{copy.howBody}</p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {copy.steps.map((step) => (
            <article key={step.index} className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-white/42">
                {step.index}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-white/64">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="learning-path"
        className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">{copy.pathKicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
              {copy.pathTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/66">{copy.pathBody}</p>
          </div>
          <Link href={localizeHref(locale, "/guide")} className="site-button-secondary">
            {copy.pathCta}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-3">
          {phases.map((phase) => (
            <article key={phase.slug} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/42">
                    {phase.label}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                    {phase.title}
                  </h3>
                </div>
                <Link
                  href={localizeHref(locale, `/phases/${phase.slug}`)}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/62 transition hover:border-white/20 hover:text-white"
                >
                  {copy.phaseEnter}
                </Link>
              </div>
              <p className="mt-3 leading-7 text-white/66">{phase.description}</p>

              <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="section-kicker">{copy.phaseGoals}</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-white/66">
                  {phase.goals.slice(0, 3).map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                <div>
                  <p className="section-kicker">{copy.phaseLesson}</p>
                  <p className="mt-2 text-sm text-white/74">
                    {phase.lesson ? phase.lesson.title : copy.phaseFallback}
                  </p>
                </div>
                <Link
                  href={
                    phase.lesson
                      ? localizeHref(locale, `/guide/${phase.lesson.slug}`)
                      : localizeHref(locale, `/phases/${phase.slug}`)
                  }
                  className="text-sm font-medium text-white transition hover:text-[var(--color-accent-strong)]"
                >
                  {phase.lesson ? copy.phaseRead : copy.phaseEnter}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="why-openclaw101"
        className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8"
      >
        <div className="max-w-3xl">
          <p className="section-kicker">{copy.whyKicker}</p>
          <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
            {copy.whyTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/66">{copy.whyBody}</p>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          <article className="rounded-[1.75rem] border border-[rgba(255,107,74,0.18)] bg-[rgba(255,107,74,0.08)] p-5">
            <p className="section-kicker text-white/62">{copy.whyThisSite}</p>
            <div className="mt-4 space-y-3">
              {copy.whySiteItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
            <p className="section-kicker">{copy.whyOfficial}</p>
            <div className="mt-4 space-y-3">
              {copy.whyOfficialItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8"
        data-testid="home-resource-section"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">{copy.resourcesKicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
              {copy.resourcesTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/66">{copy.resourcesBody}</p>
          </div>
          <Link href={localizeHref(locale, "/resources")} className="site-button-secondary">
            {copy.resourcesCta}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {featuredResources.map((resource) => (
            <Link
              key={resource.slug}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">{resource.source}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                    {resource.title}
                  </h3>
                </div>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-[var(--color-accent)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-3 leading-7 text-white/64">{resource.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/52">
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  {getResourceCategoryLabel(locale, resource.category)}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  {getResourceLanguageLabel(locale, resource.language)}
                </span>
                {resource.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                {copy.openResource}
                <ArrowRight className="size-4 text-[var(--color-accent)]" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
        <div className="max-w-3xl">
          <p className="section-kicker">{copy.faqKicker}</p>
          <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
            {copy.faqTitle}
          </h2>
        </div>
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {copy.faqItems.map((item) => (
            <article key={item.question} className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
              <h3 className="font-[family-name:var(--font-serif)] text-2xl leading-tight text-white">
                {item.question}
              </h3>
              <p className="mt-3 leading-7 text-white/64">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 surface-card-strong rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">{copy.finalKicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
              {copy.finalTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/68">{copy.finalBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={localizeHref(locale, "/guide")} className="site-button-primary">
              {copy.finalGuide}
              <ArrowRight className="size-4" />
            </Link>
            <Link href={localizeHref(locale, "/resources")} className="site-button-secondary">
              {copy.finalResources}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
