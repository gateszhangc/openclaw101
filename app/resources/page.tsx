import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";

import { ResourceBrowser } from "@/components/resource-browser";
import { RESOURCE_ENTRIES } from "@/lib/site-data";

const RESOURCE_ENTRYPOINTS = [
  { label: "官方文档", href: "/resources?category=%E5%AE%98%E6%96%B9" },
  { label: "安装部署", href: "/resources?category=%E9%83%A8%E7%BD%B2" },
  { label: "模型配置", href: "/resources?query=model" },
  { label: "聊天渠道", href: "/resources?query=telegram" },
  { label: "Skills 生态", href: "/resources?category=%E6%8A%80%E8%83%BD" },
  { label: "更新追踪", href: "/resources?category=%E6%9B%B4%E6%96%B0" },
];

const FEATURED_RESOURCE_SLUGS = [
  "official-getting-started",
  "github-repo",
  "clawhub",
] as const;

type ResourcesPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    query?: string | string[];
  }>;
};

function getFirstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value || "";
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = await searchParams;
  const initialCategory = getFirstValue(params.category);
  const initialQuery = getFirstValue(params.query);
  const featuredResources = FEATURED_RESOURCE_SLUGS.map((slug) =>
    RESOURCE_ENTRIES.find((resource) => resource.slug === slug),
  ).filter((resource) => resource !== undefined);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_360px]">
        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">Resources</p>
          <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-4xl text-white">
            把 OpenClaw 里会反复查的入口先收进一个地方
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">
            你来这里不是按顺序学习，而是更快找到能解决当前问题的入口。官方文档、源码、社区、
            聊天渠道和 Skills 相关资源都集中在这一页。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guide"
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              不知道先学什么？去 Guide
            </Link>
            <a
              href="#resource-browser"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
            >
              直接搜索资源
              <Search className="size-4" />
            </a>
          </div>
        </article>

        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">常见查找入口</p>
          <p className="mt-3 leading-7 text-white/66">
            按问题场景进入，不用先猜资源在哪一类。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {RESOURCE_ENTRYPOINTS.map((entrypoint) => (
              <Link
                key={entrypoint.label}
                href={entrypoint.href}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/78 transition hover:border-white/20 hover:text-white"
              >
                {entrypoint.label}
              </Link>
            ))}
          </div>
          {(initialCategory || initialQuery) && (
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-4 text-sm text-white/62">
              当前已带入筛选：
              {initialCategory ? ` 分类=${initialCategory}` : ""}
              {initialQuery ? ` 搜索=${initialQuery}` : ""}
            </div>
          )}
        </article>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">置顶推荐</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              先把这三条高频入口存起来
            </h2>
          </div>
          <Link href="/guide" className="text-sm text-white/72 transition hover:text-white">
            不知道先学什么？先去 Guide
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
                <span className="rounded-full border border-white/10 px-3 py-1">{resource.category}</span>
                <span className="rounded-full border border-white/10 px-3 py-1">{resource.language}</span>
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
                打开资源
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
            <p className="section-kicker">资源浏览器</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              按关键词、分类或语言快速定位
            </h2>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-white/45">
            需要顺序学习时，回到 Guide
            <ArrowRight className="size-4" />
          </p>
        </div>

        <div className="mt-6">
          <ResourceBrowser
            resources={RESOURCE_ENTRIES}
            initialCategory={initialCategory}
            initialQuery={initialQuery}
          />
        </div>
      </section>
    </div>
  );
}
