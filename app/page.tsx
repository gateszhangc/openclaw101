import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { getGuideIndexData } from "@/lib/guides";
import { RESOURCE_ENTRIES } from "@/lib/site-data";

const HOME_ENTRY_TAGS = ["入门", "安装", "模型", "Telegram", "Skills"];

const HOME_ENTRY_STEPS = [
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
];

const HOME_RESOURCE_ENTRYPOINTS = [
  { label: "官方文档", href: "/resources?category=%E5%AE%98%E6%96%B9" },
  { label: "安装部署", href: "/resources?category=%E9%83%A8%E7%BD%B2" },
  { label: "模型配置", href: "/resources?query=model" },
  { label: "聊天渠道", href: "/resources?query=telegram" },
  { label: "Skills 生态", href: "/resources?category=%E6%8A%80%E8%83%BD" },
];

const FEATURED_RESOURCE_SLUGS = [
  "official-getting-started",
  "github-repo",
  "clawhub",
] as const;

export default async function HomePage() {
  const { guide } = await getGuideIndexData();

  if (!guide) {
    throw new Error("Guide tutorial missing");
  }

  const featuredResources = FEATURED_RESOURCE_SLUGS.map((slug) =>
    RESOURCE_ENTRIES.find((resource) => resource.slug === slug),
  ).filter((resource) => resource !== undefined);

  return (
    <div className="home-editorial mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <section className="home-hero rounded-[2.75rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_340px] xl:items-start">
          <div className="home-animate space-y-7">
            <span className="home-pill text-sm font-medium text-[color:var(--home-muted)]">
              OpenClaw 新手入口
            </span>

            <div className="space-y-5">
              <p className="section-kicker text-[color:var(--home-muted)]">Guide + Resources</p>
              <h1 className="max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-[0.94] tracking-[-0.04em] text-[color:var(--home-ink)] sm:text-5xl lg:text-[4.7rem]">
                先走对顺序，
                <br />
                再开始折腾 OpenClaw。
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[color:var(--home-muted)] sm:text-[1.15rem]">
                这个站只做两件事：用一条最短路径带你上手 OpenClaw，再把官方、社区、
                GitHub、Skills 相关资源聚合到一起。先看 Guide 建立整体地图；真遇到安装、
                模型、Telegram、Skills 问题，再去资源页对照。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--home-accent)] px-6 py-3 text-sm font-medium text-white shadow-[0_20px_40px_rgba(239,107,67,0.28)] transition hover:bg-[#db5f3d]"
              >
                查看 Guide
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] bg-white/45 px-6 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
              >
                浏览资源
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-[color:var(--home-muted)]">
              {HOME_ENTRY_TAGS.map((item) => (
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
                <p className="section-kicker text-[color:var(--home-muted)]">从这里开始</p>
                <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-[color:var(--home-ink)]">
                  先看导读，
                  <br />
                  再去查资料。
                </h2>
              </div>
              <span className="rounded-full border border-[color:var(--home-line)] bg-white/55 px-3 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--home-muted)]">
                Starter Flow
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {HOME_ENTRY_STEPS.map((step) => (
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
              <p className="text-sm leading-7 text-[color:var(--home-muted)]">
                Guide 先帮你建立地图，资源页负责在你卡住时把入口快速拉回来。
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/guide/${guide.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--home-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#db5f3d]"
                >
                  先看导读
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] px-5 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
                >
                  去资源页
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
              <p className="section-kicker text-[color:var(--home-muted)]">Resources</p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl text-[color:var(--home-ink)] sm:text-4xl">
                把 OpenClaw 最常用的入口先收进一个地方。
              </h2>
              <p className="mt-4 text-lg leading-8 text-[color:var(--home-muted)]">
                教程负责带你走主线，资源页负责把你后面会反复查的文档、社区、源码和 Skills
                入口集中起来。
              </p>
            </div>
            <div className="w-full max-w-[24rem]">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] bg-white/55 px-5 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
              >
                进入完整资源页
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {HOME_RESOURCE_ENTRYPOINTS.map((entrypoint) => (
              <Link
                key={entrypoint.label}
                href={entrypoint.href}
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
                  <span className="home-chip rounded-full px-3 py-1.5">{resource.category}</span>
                  <span className="home-chip rounded-full px-3 py-1.5">{resource.language}</span>
                  {resource.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="home-chip rounded-full px-3 py-1.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--home-ink)]">
                  打开资源
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
