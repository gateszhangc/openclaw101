import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";

import { ResourceBrowser } from "@/components/resource-browser";
import { localizeHref, type Locale } from "@/lib/i18n";
import {
  getResourceCategoryLabel,
  getResourceLanguageLabel,
  getResources,
  normalizeResourceCategory,
  type ResourceCategory,
} from "@/lib/site-data";

const FEATURED_RESOURCE_SLUGS = [
  "official-getting-started",
  "github-repo",
  "clawhub",
] as const;

type ResourcesPageProps = {
  locale: Locale;
  searchParams: Promise<{
    category?: string | string[];
    query?: string | string[];
  }>;
};

const COPY = {
  zh: {
    entrypoints: [
      { label: "官方文档", href: "/resources?category=official" },
      { label: "安装部署", href: "/resources?category=deployment" },
      { label: "模型配置", href: "/resources?query=model" },
      { label: "聊天渠道", href: "/resources?query=telegram" },
      { label: "Skills 生态", href: "/resources?category=skills" },
      { label: "更新追踪", href: "/resources?category=updates" },
    ],
    stats: {
      all: "资源总数",
      categories: "分类",
      languages: "语言",
    },
    kicker: "Resources",
    title: "把 OpenClaw 里会反复查的入口整理成一个工具页",
    body:
      "Guide 负责顺序，Resources 负责检索。你来这里不是为了从头学起，而是为了更快定位官方文档、社区讨论、源码和 Skills 入口。",
    guideCta: "不知道先学什么？去 Guide",
    searchCta: "直接跳到搜索",
    commonKicker: "Problem entry points",
    commonBody: "按问题场景进入，不用先猜资源应该归在哪一类。",
    currentFilter: "当前已带入筛选：",
    categoryLabel: "分类",
    queryLabel: "搜索",
    featuredKicker: "High-frequency links",
    featuredTitle: "先把这三条高频入口存起来",
    featuredGuideCta: "需要顺序时回到 Guide",
    browserKicker: "Resource browser",
    browserTitle: "按关键词、分类或语言快速定位",
    browserHint: "如果你需要学习顺序，请回到 Guide",
    openResource: "打开资源",
  },
  en: {
    entrypoints: [
      { label: "Official docs", href: "/resources?category=official" },
      { label: "Deployment", href: "/resources?category=deployment" },
      { label: "Model setup", href: "/resources?query=model" },
      { label: "Channels", href: "/resources?query=telegram" },
      { label: "Skills", href: "/resources?category=skills" },
      { label: "Release tracking", href: "/resources?category=updates" },
    ],
    stats: {
      all: "Resources",
      categories: "Categories",
      languages: "Languages",
    },
    kicker: "Resources",
    title: "Turn OpenClaw links you revisit into a real tool page",
    body:
      "Guide is for order. Resources is for retrieval. This page helps you get to the right docs, community threads, repositories, and Skills entry points faster once the question is specific.",
    guideCta: "Need the learning order? Go to Guide",
    searchCta: "Jump to search",
    commonKicker: "Problem entry points",
    commonBody: "Jump in by problem type instead of guessing which bucket the resource lives in.",
    currentFilter: "Current filters:",
    categoryLabel: "category",
    queryLabel: "query",
    featuredKicker: "High-frequency links",
    featuredTitle: "Save these three links first",
    featuredGuideCta: "Need sequence? Go back to Guide",
    browserKicker: "Resource browser",
    browserTitle: "Locate resources by keyword, category, or language",
    browserHint: "If you need sequence, go back to Guide",
    openResource: "Open resource",
  },
} as const;

function getFirstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value || "";
}

export async function ResourcesPage({ locale, searchParams }: ResourcesPageProps) {
  const copy = COPY[locale];
  const resources = getResources(locale);
  const params = await searchParams;
  const initialCategory = normalizeResourceCategory(getFirstValue(params.category)) as
    | ResourceCategory
    | "";
  const initialQuery = getFirstValue(params.query);
  const featuredResources = FEATURED_RESOURCE_SLUGS.map((slug) =>
    resources.find((resource) => resource.slug === slug),
  ).filter((resource) => resource !== undefined);
  const categoryCount = new Set(resources.map((resource) => resource.category)).size;
  const languageCount = new Set(resources.map((resource) => resource.language)).size;

  return (
    <div className="page-shell">
      <section className="surface-card-strong rounded-[2rem] px-6 py-8 sm:px-8 sm:py-9">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_360px]">
          <article className="space-y-6">
            <div>
              <p className="section-kicker">{copy.kicker}</p>
              <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/68">{copy.body}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={localizeHref(locale, "/guide")} className="site-button-secondary">
                {copy.guideCta}
                <ArrowRight className="size-4" />
              </Link>
              <a href="#resource-browser" className="site-button-primary">
                {copy.searchCta}
                <Search className="size-4" />
              </a>
            </div>
          </article>

          <article className="surface-card rounded-[1.75rem] p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  {resources.length}
                </p>
                <p className="mt-2 text-sm text-white/58">{copy.stats.all}</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  {categoryCount}
                </p>
                <p className="mt-2 text-sm text-white/58">{copy.stats.categories}</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  {languageCount}
                </p>
                <p className="mt-2 text-sm text-white/58">{copy.stats.languages}</p>
              </div>
            </div>
            <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="section-kicker">{copy.commonKicker}</p>
              <p className="mt-3 text-sm leading-7 text-white/64">{copy.commonBody}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {copy.entrypoints.map((entrypoint) => (
                  <Link
                    key={entrypoint.label}
                    href={localizeHref(locale, entrypoint.href)}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/72 transition hover:border-white/20 hover:text-white"
                  >
                    {entrypoint.label}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>

        {(initialCategory || initialQuery) && (
          <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/62">
            {copy.currentFilter}
            {initialCategory
              ? ` ${copy.categoryLabel}=${getResourceCategoryLabel(locale, initialCategory)}`
              : ""}
            {initialQuery ? ` ${copy.queryLabel}=${initialQuery}` : ""}
          </div>
        )}
      </section>

      <section className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">{copy.featuredKicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
              {copy.featuredTitle}
            </h2>
          </div>
          <Link href={localizeHref(locale, "/guide")} className="site-button-ghost">
            {copy.featuredGuideCta}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {featuredResources.map((resource) => (
            <article key={resource.slug} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
              <p className="section-kicker">{resource.source}</p>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                {resource.title}
              </h3>
              <p className="mt-3 leading-7 text-white/66">{resource.summary}</p>
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
              <Link
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
              >
                {copy.openResource}
                <ArrowUpRight className="size-4 text-[var(--color-accent)]" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="resource-browser"
        className="mt-8 surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{copy.browserKicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
              {copy.browserTitle}
            </h2>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-white/48">
            {copy.browserHint}
            <ArrowRight className="size-4" />
          </p>
        </div>

        <div className="mt-8">
          <ResourceBrowser
            locale={locale}
            resources={resources}
            initialCategory={initialCategory}
            initialQuery={initialQuery}
          />
        </div>
      </section>
    </div>
  );
}
