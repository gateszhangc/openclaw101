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
    kicker: "Resources",
    title: "把 OpenClaw 里会反复查的入口先收进一个地方",
    body:
      "你来这里不是按顺序学习，而是更快找到能解决当前问题的入口。官方文档、源码、社区、聊天渠道和 Skills 相关资源都集中在这一页。",
    guideCta: "不知道先学什么？去 Guide",
    searchCta: "直接搜索资源",
    commonKicker: "常见查找入口",
    commonBody: "按问题场景进入，不用先猜资源在哪一类。",
    currentFilter: "当前已带入筛选：",
    categoryLabel: "分类",
    queryLabel: "搜索",
    featuredKicker: "置顶推荐",
    featuredTitle: "先把这三条高频入口存起来",
    featuredGuideCta: "不知道先学什么？先去 Guide",
    browserKicker: "资源浏览器",
    browserTitle: "按关键词、分类或语言快速定位",
    browserHint: "需要顺序学习时，回到 Guide",
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
    kicker: "Resources",
    title: "Collect the OpenClaw links you will keep revisiting in one place",
    body:
      "This page is not for sequential learning. It is for getting to the right entry point faster. Official docs, source code, community links, channels, and Skills resources are gathered here.",
    guideCta: "Not sure what to learn first? Go to Guide",
    searchCta: "Search resources now",
    commonKicker: "Common entry points",
    commonBody: "Jump in by problem type so you do not have to guess which bucket a resource lives in.",
    currentFilter: "Current filters:",
    categoryLabel: "category",
    queryLabel: "query",
    featuredKicker: "Featured",
    featuredTitle: "Save these three high-frequency links first",
    featuredGuideCta: "Need the learning order? Go back to Guide",
    browserKicker: "Resource browser",
    browserTitle: "Locate resources by keyword, category, or language",
    browserHint: "If you need the learning sequence, go back to Guide",
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

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_360px]">
        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">{copy.kicker}</p>
          <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-4xl text-white">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">{copy.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localizeHref(locale, "/guide")}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              {copy.guideCta}
            </Link>
            <a
              href="#resource-browser"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
            >
              {copy.searchCta}
              <Search className="size-4" />
            </a>
          </div>
        </article>

        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">{copy.commonKicker}</p>
          <p className="mt-3 leading-7 text-white/66">{copy.commonBody}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {copy.entrypoints.map((entrypoint) => (
              <Link
                key={entrypoint.label}
                href={localizeHref(locale, entrypoint.href)}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/78 transition hover:border-white/20 hover:text-white"
              >
                {entrypoint.label}
              </Link>
            ))}
          </div>
          {(initialCategory || initialQuery) && (
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-4 text-sm text-white/62">
              {copy.currentFilter}
              {initialCategory
                ? ` ${copy.categoryLabel}=${getResourceCategoryLabel(locale, initialCategory)}`
                : ""}
              {initialQuery ? ` ${copy.queryLabel}=${initialQuery}` : ""}
            </div>
          )}
        </article>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{copy.featuredKicker}</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              {copy.featuredTitle}
            </h2>
          </div>
          <Link
            href={localizeHref(locale, "/guide")}
            className="text-sm text-white/72 transition hover:text-white"
          >
            {copy.featuredGuideCta}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {featuredResources.map((resource) => (
            <article
              key={resource.slug}
              className="rounded-[2rem] border border-white/10 bg-black/10 p-5"
            >
              <p className="section-kicker">{resource.source}</p>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                {resource.title}
              </h3>
              <p className="mt-3 leading-7 text-white/66">{resource.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/50">
                <span className="rounded-full border border-white/10 px-3 py-1">
                  {getResourceCategoryLabel(locale, resource.category)}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1">
                  {getResourceLanguageLabel(locale, resource.language)}
                </span>
                {resource.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/78 transition hover:text-white"
              >
                {copy.openResource}
                <ArrowUpRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="resource-browser"
        className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{copy.browserKicker}</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              {copy.browserTitle}
            </h2>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-white/45">
            {copy.browserHint}
            <ArrowRight className="size-4" />
          </p>
        </div>

        <div className="mt-6">
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
