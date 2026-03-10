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
    entryTags: ["入门", "安装", "模型", "Telegram", "Skills"],
    steps: [
      {
        index: "01",
        title: "先看 Guide",
        copy: "先建立整体地图，知道自己现在处在哪一步。",
      },
      {
        index: "02",
        title: "再跑通安装与配置",
        copy: "按主线进入安装、模型、渠道和自动化，不再乱跳。",
      },
      {
        index: "03",
        title: "卡住就查资源页",
        copy: "官方、社区、GitHub 和 Skills 入口都已经替你收好了。",
      },
    ],
    entrypoints: [
      { label: "官方文档", href: "/resources?category=official" },
      { label: "安装部署", href: "/resources?category=deployment" },
      { label: "模型配置", href: "/resources?query=model" },
      { label: "聊天渠道", href: "/resources?query=telegram" },
      { label: "Skills 生态", href: "/resources?category=skills" },
    ],
    pill: "OpenClaw 新手入口",
    heroKicker: "Guide + Resources",
    heroTitle: "先走对顺序，",
    heroTitleSecond: "再开始折腾 OpenClaw。",
    heroBody:
      "这个站只做两件事：用一条最短路径带你上手 OpenClaw，再把官方、社区、GitHub、Skills 相关资源聚合到一起。先看 Guide 建立整体地图；真遇到安装、模型、Telegram、Skills 问题，再去资源页对照。",
    guideCta: "查看 Guide",
    resourcesCta: "浏览资源",
    panelKicker: "从这里开始",
    panelTitle: "先看导读，",
    panelTitleSecond: "再去查资料。",
    starterFlow: "Starter Flow",
    panelBody:
      "Guide 先帮你建立地图，资源页负责在你卡住时把入口快速拉回来。",
    firstGuide: "先看导读",
    goResources: "去资源页",
    resourcesKicker: "Resources",
    resourcesTitle: "把 OpenClaw 最常用的入口先收进一个地方。",
    resourcesBody:
      "教程负责带你走主线，资源页负责把你后面会反复查的文档、社区、源码和 Skills 入口集中起来。",
    fullResources: "进入完整资源页",
    openResource: "打开资源",
  },
  en: {
    entryTags: ["Getting Started", "Install", "Models", "Telegram", "Skills"],
    steps: [
      {
        index: "01",
        title: "Start with Guide",
        copy: "Build the mental map first so you know exactly where you are in the sequence.",
      },
      {
        index: "02",
        title: "Then finish install and setup",
        copy: "Move through installation, models, channels, and automation without jumping around.",
      },
      {
        index: "03",
        title: "Use Resources when stuck",
        copy: "Official docs, community links, GitHub, and Skills are already gathered for you.",
      },
    ],
    entrypoints: [
      { label: "Official docs", href: "/resources?category=official" },
      { label: "Deployment", href: "/resources?category=deployment" },
      { label: "Model setup", href: "/resources?query=model" },
      { label: "Channels", href: "/resources?query=telegram" },
      { label: "Skills", href: "/resources?category=skills" },
    ],
    pill: "OpenClaw starting point",
    heroKicker: "Guide + Resources",
    heroTitle: "Get the order right,",
    heroTitleSecond: "then start bending OpenClaw to your needs.",
    heroBody:
      "This site does two things: it gives you the shortest path to a working OpenClaw setup, then gathers the official docs, community, GitHub, and Skills ecosystem in one place. Start with Guide to build the map; use Resources when install, models, Telegram, or Skills become the real question.",
    guideCta: "Open Guide",
    resourcesCta: "Browse Resources",
    panelKicker: "Start Here",
    panelTitle: "Read the guide first,",
    panelTitleSecond: "then go hunting for references.",
    starterFlow: "Starter Flow",
    panelBody:
      "Guide gives you the map first. Resources pulls the right entry points back in when you get stuck.",
    firstGuide: "Read the intro",
    goResources: "Open Resources",
    resourcesKicker: "Resources",
    resourcesTitle: "Collect the OpenClaw links you will reuse in one place.",
    resourcesBody:
      "The tutorial keeps you on the main path. The resource page gathers the docs, community, source code, and Skills links you will keep coming back to.",
    fullResources: "Open the full resource page",
    openResource: "Open resource",
  },
} as const;

export async function HomePage({ locale }: HomePageProps) {
  const copy = COPY[locale];
  const resources = getResources(locale);
  const { guide } = await getGuideIndexData(locale);

  if (!guide) {
    throw new Error("Guide tutorial missing");
  }

  const featuredResources = FEATURED_RESOURCE_SLUGS.map((slug) =>
    resources.find((resource) => resource.slug === slug),
  ).filter((resource) => resource !== undefined);

  return (
    <div className="home-editorial mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <section className="home-hero rounded-[2.75rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_340px] xl:items-start">
          <div className="home-animate space-y-7">
            <span className="home-pill text-sm font-medium text-[color:var(--home-muted)]">
              {copy.pill}
            </span>

            <div className="space-y-5">
              <p className="section-kicker text-[color:var(--home-muted)]">{copy.heroKicker}</p>
              <h1 className="max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-[0.94] tracking-[-0.04em] text-[color:var(--home-ink)] sm:text-5xl lg:text-[4.7rem]">
                {copy.heroTitle}
                <br />
                {copy.heroTitleSecond}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[color:var(--home-muted)] sm:text-[1.15rem]">
                {copy.heroBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={localizeHref(locale, "/guide")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--home-accent)] px-6 py-3 text-sm font-medium text-white shadow-[0_20px_40px_rgba(239,107,67,0.28)] transition hover:bg-[#db5f3d]"
              >
                {copy.guideCta}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={localizeHref(locale, "/resources")}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] bg-white/45 px-6 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
              >
                {copy.resourcesCta}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-[color:var(--home-muted)]">
              {copy.entryTags.map((item) => (
                <span key={item} className="home-chip rounded-full px-4 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <article
            data-testid="home-start-panel"
            className="home-panel home-animate home-animate-delay-1 rounded-[2rem] p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker text-[color:var(--home-muted)]">{copy.panelKicker}</p>
                <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-[color:var(--home-ink)]">
                  {copy.panelTitle}
                  <br />
                  {copy.panelTitleSecond}
                </h2>
              </div>
              <span className="rounded-full border border-[color:var(--home-line)] bg-white/55 px-3 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--home-muted)]">
                {copy.starterFlow}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {copy.steps.map((step) => (
                <div key={step.index} className="home-link-card rounded-[1.5rem] p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--home-accent-soft)] font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[color:var(--home-accent)]">
                      {step.index}
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-[color:var(--home-ink)]">
                        {step.title}
                      </p>
                      <p className="leading-7 text-[color:var(--home-muted)]">{step.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[color:var(--home-line)] pt-5">
              <p className="text-sm leading-7 text-[color:var(--home-muted)]">{copy.panelBody}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={localizeHref(locale, `/guide/${guide.slug}`)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--home-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#db5f3d]"
                >
                  {copy.firstGuide}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={localizeHref(locale, "/resources")}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] px-5 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
                >
                  {copy.goResources}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-8" data-testid="home-resource-section">
        <div className="home-panel rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="max-w-3xl">
              <p className="section-kicker text-[color:var(--home-muted)]">
                {copy.resourcesKicker}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl text-[color:var(--home-ink)] sm:text-4xl">
                {copy.resourcesTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-[color:var(--home-muted)]">
                {copy.resourcesBody}
              </p>
            </div>
            <div className="w-full max-w-[24rem]">
              <Link
                href={localizeHref(locale, "/resources")}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] bg-white/55 px-5 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
              >
                {copy.fullResources}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {copy.entrypoints.map((entrypoint) => (
              <Link
                key={entrypoint.label}
                href={localizeHref(locale, entrypoint.href)}
                className="home-chip rounded-full px-4 py-2 text-sm text-[color:var(--home-ink)] transition hover:border-[rgba(239,107,67,0.24)] hover:text-[color:var(--home-accent)]"
              >
                {entrypoint.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <Link
                key={resource.slug}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="home-link-card flex h-full flex-col rounded-[1.9rem] p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-kicker text-[color:var(--home-muted)]">
                      {resource.source}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--home-ink)]">
                      {resource.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="home-link-arrow mt-1 size-5 shrink-0 text-[color:var(--home-accent)]" />
                </div>
                <p className="mt-3 flex-1 leading-7 text-[color:var(--home-muted)]">
                  {resource.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-[color:var(--home-muted)]">
                  <span className="home-chip rounded-full px-3 py-1.5">
                    {getResourceCategoryLabel(locale, resource.category)}
                  </span>
                  <span className="home-chip rounded-full px-3 py-1.5">
                    {getResourceLanguageLabel(locale, resource.language)}
                  </span>
                  {resource.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="home-chip rounded-full px-3 py-1.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--home-ink)]">
                  {copy.openResource}
                  <ArrowRight className="home-link-arrow size-4 text-[color:var(--home-accent)]" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
