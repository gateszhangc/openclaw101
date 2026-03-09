import type { ReactNode } from "react";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { getAllTutorials, getRoadmapData } from "@/lib/content";
import {
  HOME_OUTCOMES,
  HOME_REASONS,
  RESOURCE_ENTRIES,
  SITE_DESCRIPTION,
  THREE_STEPS,
} from "@/lib/site-data";

const PHASE_TONES = [
  { solid: "#ef6b43", soft: "rgba(239, 107, 67, 0.14)" },
  { solid: "#3f86ff", soft: "rgba(63, 134, 255, 0.14)" },
  { solid: "#7c69ff", soft: "rgba(124, 105, 255, 0.14)" },
  { solid: "#d98b2b", soft: "rgba(217, 139, 43, 0.14)" },
  { solid: "#2c9f75", soft: "rgba(44, 159, 117, 0.14)" },
];

export default async function HomePage() {
  const tutorials = await getAllTutorials();
  const roadmap = await getRoadmapData();
  const guide = roadmap.guide;

  if (!guide) {
    throw new Error("Guide tutorial missing");
  }

  const featuredLessons = tutorials.slice(1, 4);
  const featuredResources = [
    "official-getting-started",
    "github-repo",
    "clawhub",
  ]
    .map((slug) => RESOURCE_ENTRIES.find((resource) => resource.slug === slug))
    .filter((resource) => resource !== undefined);

  return (
    <div className="home-editorial mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <section className="home-hero rounded-[2.75rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-start">
          <div className="home-animate space-y-7">
            <span className="home-pill text-sm font-medium text-[color:var(--home-muted)]">
              OpenClaw Simplified
            </span>
            <div className="space-y-5">
              <p className="section-kicker text-[color:var(--home-muted)]">OpenClaw 新手入门站</p>
              <h1 className="max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-[0.94] tracking-[-0.04em] text-[color:var(--home-ink)] sm:text-5xl lg:text-[4.7rem]">
                学会 OpenClaw，
                <br />
                别再被文档淹没。
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--home-muted)] sm:text-[1.15rem]">
                {SITE_DESCRIPTION}
                首页只保留最该先点开的入口，让第一次上手看起来像一条路，而不是一片菜单。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tutorials"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--home-accent)] px-6 py-3 text-sm font-medium text-white shadow-[0_20px_40px_rgba(239,107,67,0.28)] transition hover:bg-[#db5f3d]"
              >
                开始学习
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] bg-white/45 px-6 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
              >
                查看路线
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-[color:var(--home-muted)]">
              {["官方文档对齐", "白话讲透", "6 篇跑通主线"].map((item) => (
                <span key={item} className="home-chip rounded-full px-4 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <article className="home-panel home-animate home-animate-delay-1 rounded-[2rem] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-kicker text-[color:var(--home-muted)]">起步路线摘要</p>
                  <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-[color:var(--home-ink)]">
                    三步先跑通，
                    <br />
                    再决定要不要继续折腾。
                  </h2>
                </div>
                <span className="rounded-full border border-[color:var(--home-line)] bg-white/55 px-3 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--home-muted)]">
                  Guide / 5 Phases
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {THREE_STEPS.map((item, index) => (
                  <div
                    key={item.step}
                    className="home-link-card rounded-[1.5rem] p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--home-accent-soft)] font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[color:var(--home-accent)]">
                        0{index + 1}
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-[color:var(--home-ink)]">{item.step}</p>
                        <p className="leading-7 text-[color:var(--home-muted)]">{item.copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--home-line)] pt-5 text-sm text-[color:var(--home-muted)]">
                <p>先建立地图，再动手配置，首页只负责把你送到正确的起点。</p>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 font-medium text-[color:var(--home-ink)] transition hover:text-[color:var(--home-accent)]"
                >
                  查看完整路线
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>

            <Link
              href={`/tutorials/${guide.slug}`}
              className="home-link-card home-animate home-animate-delay-2 block rounded-[1.75rem] p-5 sm:p-6"
            >
              <p className="section-kicker text-[color:var(--home-muted)]">先看导读</p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[color:var(--home-ink)]">
                    {guide.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-7 text-[color:var(--home-muted)]">
                    {guide.summary}
                  </p>
                </div>
                <ArrowRight className="home-link-arrow mt-1 size-5 shrink-0 text-[color:var(--home-accent)]" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="home-panel rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <SectionHeading
            kicker="Why This Works"
            title="不是多做一个文档站，而是替你先排好顺序。"
            copy="首页不再试图解释全部 OpenClaw 能力，只回答三个问题：为什么值得从这里开始、你会先得到什么、下一步该往哪去。"
            action={
              <div className="grid gap-3 sm:grid-cols-3">
                {HOME_OUTCOMES.slice(0, 3).map((outcome) => (
                  <div
                    key={outcome}
                    className="rounded-[1.4rem] border border-[color:var(--home-line)] bg-white/55 px-4 py-4 text-sm leading-6 text-[color:var(--home-ink)]"
                  >
                    {outcome}
                  </div>
                ))}
              </div>
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {HOME_REASONS.map((reason, index) => (
              <article
                key={reason.title}
                className="home-link-card rounded-[1.75rem] p-5 sm:p-6"
              >
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[color:var(--home-muted)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--home-ink)]">
                  {reason.title}
                </h3>
                <p className="mt-3 leading-7 text-[color:var(--home-muted)]">{reason.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8" id="learning-route" data-testid="home-route-snapshot">
        <div className="home-panel rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <SectionHeading
            kicker="学习路径"
            title="Guide + 5 个阶段，一个入口把第一次上手拆开。"
            copy="先看导读建立整体地图，再按阶段进入安装、模型、渠道、人格和自动化。你不用一次理解全部，只需要始终知道当前处在哪一步。"
            action={
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--home-line)] bg-white/55 px-5 py-3 text-sm font-medium text-[color:var(--home-ink)] transition hover:border-[rgba(34,24,16,0.22)] hover:bg-white/75"
              >
                打开完整路线图
                <ArrowUpRight className="size-4" />
              </Link>
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Link
              href={`/tutorials/${guide.slug}`}
              className="home-link-card block rounded-[2rem] p-6 sm:p-7"
            >
              <p className="section-kicker text-[color:var(--home-muted)]">Guide</p>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-3xl text-[color:var(--home-ink)]">
                {guide.title}
              </h3>
              <p className="mt-4 max-w-2xl leading-7 text-[color:var(--home-muted)]">
                {guide.summary}
              </p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[color:var(--home-line)] pt-5 text-sm">
                <span className="text-[color:var(--home-muted)]">先建立地图，再进入具体阶段。</span>
                <span className="inline-flex items-center gap-2 font-medium text-[color:var(--home-ink)]">
                  先看导读
                  <ArrowRight className="home-link-arrow size-4 text-[color:var(--home-accent)]" />
                </span>
              </div>
            </Link>

            <div className="rounded-[2rem] border border-[color:var(--home-line)] bg-white/45 p-6 sm:p-7">
              <p className="section-kicker text-[color:var(--home-muted)]">一次只解决一个结果</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[color:var(--home-ink)]">
                    首页负责分流，
                    <br />
                    路线图负责深入。
                  </h3>
                  <p className="mt-3 leading-7 text-[color:var(--home-muted)]">
                    当你想知道完整内容，再进入教程页、阶段页或资源页，不在首页消耗注意力。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-[color:var(--home-muted)]">
                  {["安装与启动", "模型与认证", "工具与连接", "人格与记忆", "自动化进阶"].map(
                    (item) => (
                      <span key={item} className="home-chip rounded-full px-3 py-2">
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-5">
            {roadmap.phases.map((phase, index) => {
              const tone = PHASE_TONES[index % PHASE_TONES.length];

              return (
                <Link
                  key={phase.slug}
                  href={`/phases/${phase.slug}`}
                  className="home-link-card block rounded-[1.75rem] p-5"
                  style={{
                    borderColor: tone.soft,
                    boxShadow: `inset 0 1px 0 ${tone.soft}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em]"
                      style={{ backgroundColor: tone.soft, color: tone.solid }}
                    >
                      {phase.label}
                    </span>
                    <ArrowRight className="home-link-arrow size-4" style={{ color: tone.solid }} />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--home-ink)]">
                    {phase.shortTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--home-muted)]">
                    {phase.description}
                  </p>
                  <p className="mt-5 text-sm text-[color:var(--home-muted)]">
                    {phase.roadmapPoints.slice(0, 2).join(" / ")}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8" data-testid="home-curated-section">
        <div className="home-panel rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <SectionHeading
            kicker="优先打开这些"
            title="把最该先读的教程和最值得常驻收藏夹的资源放在一起。"
            copy="教程负责陪你真正走一遍，资源负责在你需要对照、查阅和补充时随时拉回来。首页只放最值得优先点开的 6 个入口。"
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[color:var(--home-line)] bg-white/55 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="section-kicker text-[color:var(--home-muted)]">精选教程</p>
                  <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--home-ink)]">
                    先从最影响上手体验的几篇开始。
                  </h3>
                </div>
                <Link
                  href="/tutorials"
                  className="text-sm font-medium text-[color:var(--home-ink)] transition hover:text-[color:var(--home-accent)]"
                >
                  浏览全部教程
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {featuredLessons.map((lesson) => (
                  <CuratedLink
                    key={lesson.slug}
                    href={`/tutorials/${lesson.slug}`}
                    eyebrow={`Episode 0${lesson.episode}`}
                    title={lesson.title}
                    copy={lesson.summary}
                    meta={`${lesson.readingTime} 分钟阅读`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[color:var(--home-line)] bg-white/55 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="section-kicker text-[color:var(--home-muted)]">精选资源</p>
                  <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--home-ink)]">
                    有对照、有查阅，也有生态入口。
                  </h3>
                </div>
                <Link
                  href="/resources"
                  className="text-sm font-medium text-[color:var(--home-ink)] transition hover:text-[color:var(--home-accent)]"
                >
                  浏览全部资源
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {featuredResources.map((resource) => (
                  <CuratedLink
                    key={resource.slug}
                    href={resource.url}
                    eyebrow={`${resource.category} / ${resource.source}`}
                    title={resource.title}
                    copy={resource.summary}
                    meta={resource.language}
                    external
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#17110d,#26170f_55%,#351d10)] px-6 py-6 text-[#fff7f0] shadow-[0_32px_80px_rgba(15,10,7,0.24)] sm:px-8 sm:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-kicker text-white/55">现在开始</p>
                <h2 className="mt-3 font-[family-name:var(--font-serif)] text-4xl text-white">
                  别再收集教程了，
                  <br />
                  先把第一次聊天跑通。
                </h2>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-white/70">
                  你现在最需要的不是更多配置项，而是一个已经能工作的起点。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tutorials"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--home-accent)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#db5f3d]"
                >
                  开始学习
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  查看路线
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  copy,
  action,
}: {
  kicker: string;
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div className="max-w-3xl">
        <p className="section-kicker text-[color:var(--home-muted)]">{kicker}</p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl text-[color:var(--home-ink)] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-[color:var(--home-muted)]">{copy}</p>
      </div>
      {action ? <div className="w-full max-w-[30rem] lg:w-auto lg:flex-1">{action}</div> : null}
    </div>
  );
}

function CuratedLink({
  href,
  eyebrow,
  title,
  copy,
  meta,
  external = false,
}: {
  href: string;
  eyebrow: string;
  title: string;
  copy: string;
  meta: string;
  external?: boolean;
}) {
  const arrow = external ? (
    <ArrowUpRight className="home-link-arrow size-4 text-[color:var(--home-accent)]" />
  ) : (
    <ArrowRight className="home-link-arrow size-4 text-[color:var(--home-accent)]" />
  );

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="home-link-card flex items-start justify-between gap-4 rounded-[1.5rem] p-4"
    >
      <div>
        <p className="section-kicker text-[color:var(--home-muted)]">{eyebrow}</p>
        <h4 className="mt-2 text-lg font-medium text-[color:var(--home-ink)]">{title}</h4>
        <p className="mt-2 leading-7 text-[color:var(--home-muted)]">{copy}</p>
        <p className="mt-4 text-sm text-[color:var(--home-muted)]">{meta}</p>
      </div>
      {arrow}
    </Link>
  );
}
