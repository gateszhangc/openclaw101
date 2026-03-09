import Link from "next/link";

import { getAllTutorials, getRoadmapData } from "@/lib/content";
import {
  HOME_FAQS,
  HOME_OUTCOMES,
  HOME_REASONS,
  PHASES,
  RESOURCE_ENTRIES,
  SITE_DESCRIPTION,
} from "@/lib/site-data";

export default async function HomePage() {
  const tutorials = await getAllTutorials();
  const roadmap = await getRoadmapData();
  const featuredLessons = tutorials.slice(0, 4);
  const featuredResources = RESOURCE_ENTRIES.filter((resource) => resource.featured).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,90,54,0.28),transparent_60%)] blur-2xl" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="eyebrow-dot inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              OpenClaw Simplified
            </div>
            <div className="space-y-4">
              <p className="section-kicker">OpenClaw 新手入门站</p>
              <h1 className="max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                学会 OpenClaw，别再被文档淹没。
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/68">{SITE_DESCRIPTION}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tutorials"
                className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white shadow-[0_20px_50px_rgba(255,90,54,0.35)] transition hover:bg-[var(--color-accent-strong)]"
              >
                开始学习
              </Link>
              <Link
                href="/resources"
                className="rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
              >
                浏览资源
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/55">
              {["官方文档对齐", "白话讲透", "6 篇跑通主线", "虾滑陪你上手"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <article className="surface-card rounded-[2rem] p-5">
              <p className="section-kicker">虾滑对话模拟</p>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-sm leading-7 text-white/70">
                  <p className="text-white/45">你</p>
                  <p>我只想先跑通第一次聊天。</p>
                </div>
                <div className="rounded-2xl border border-[rgba(255,90,54,0.18)] bg-[rgba(255,90,54,0.08)] p-4 text-sm leading-7 text-white/80">
                  <p className="text-[var(--color-accent)]">虾滑</p>
                  <p>那就先别同时配 12 个东西，先把 Dashboard 跑通，再接模型和 Telegram。</p>
                </div>
              </div>
            </article>
            <article className="surface-card rounded-[2rem] p-5">
              <div className="flex items-center justify-between">
                <p className="section-kicker">学习路径卡片组</p>
                <Link href="/roadmap" className="text-sm text-white/55 transition hover:text-white">
                  查看完整路线图
                </Link>
              </div>
              <div className="mt-4 grid gap-3">
                <Link
                  href={`/tutorials/${roadmap.guide?.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20"
                >
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                    Guide
                  </p>
                  <p className="mt-2 font-medium text-white">{roadmap.guide?.title}</p>
                </Link>
                {PHASES.map((phase) => (
                  <Link
                    key={phase.slug}
                    href={`/phases/${phase.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20"
                  >
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                      {phase.label}
                    </p>
                    <p className="mt-2 font-medium text-white">{phase.shortTitle}</p>
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-14" id="why">
        <SectionHeading
          kicker="为什么从这里开始？"
          title="不是多做一个文档站，而是给初学者一个真正能走完的主线。"
          copy="首页看起来像产品站，实际体验又要对长教程阅读友好。这个站的目标是让新手不再在配置项里来回切换。"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {HOME_REASONS.map((reason) => (
            <article key={reason.title} className="surface-card rounded-[2rem] p-6">
              <p className="font-[family-name:var(--font-serif)] text-2xl text-white">{reason.title}</p>
              <p className="mt-3 leading-7 text-white/66">{reason.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" id="roadmap-preview">
        <SectionHeading
          kicker="学习路线图"
          title="1 篇导读 + 5 个阶段，把第一次上手真正拆开。"
          copy="导读先帮你建立整体地图，后面 5 个阶段按安装、模型、渠道、人格和自动化推进。"
        />
        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <article className="surface-card rounded-[2rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">Guide</p>
                <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                  {roadmap.guide?.title}
                </h2>
              </div>
              <Link
                href={`/tutorials/${roadmap.guide?.slug}`}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
              >
                先看导读
              </Link>
            </div>
            <p className="mt-4 max-w-3xl leading-7 text-white/66">{roadmap.guide?.summary}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {roadmap.phases.map((phase) => (
                <article
                  key={phase.slug}
                  className={`rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${phase.accent} p-[1px]`}
                >
                  <div className="h-full rounded-[1.4rem] bg-[rgba(9,10,14,0.9)] p-5">
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                      {phase.label}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                      {phase.title}
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-white/65">
                      {phase.roadmapPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </article>
          <article className="surface-card rounded-[2rem] p-6">
            <p className="section-kicker">How It Works</p>
            <div className="mt-4 space-y-5">
              {[
                { step: "先跑通", copy: "先在 Dashboard 完成第一次对话，确认系统真的能工作。" },
                {
                  step: "再接入口",
                  copy: "接上模型、认证和 Telegram，把 AI 从浏览器带到你真正会打开的聊天入口里。",
                },
                {
                  step: "再养成助手",
                  copy: "写人格、装 Skills、开自动化，让它开始像你的助手，而不是通用机器人。",
                },
              ].map((item, index) => (
                <div key={item.step} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-white">{item.step}</h3>
                  <p className="mt-2 leading-7 text-white/66">{item.copy}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mt-16" id="tutorials-preview">
        <SectionHeading
          kicker="精选教程"
          title="先从最影响上手体验的几篇开始。"
          copy="教程页会承接全部内容，这里先把最值得优先点开的几篇放到首页。"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {featuredLessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/tutorials/${lesson.slug}`}
              className="surface-card group rounded-[2rem] p-6 transition hover:-translate-y-1 hover:border-white/20"
            >
              <p className="section-kicker">Episode 0{lesson.episode}</p>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                {lesson.title}
              </h3>
              <p className="mt-3 leading-7 text-white/66">{lesson.summary}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                <span>{lesson.readingTime} 分钟阅读</span>
                <span className="transition group-hover:text-white">进入教程</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16" id="resources-preview">
        <SectionHeading
          kicker="精选资源"
          title="把官方、社区、部署、视频和技能生态收拢到一个入口。"
          copy="资源页不是教程替代，而是配合阶段学习使用的查阅和补充层。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredResources.map((resource) => (
            <article key={resource.slug} className="surface-card rounded-[2rem] p-6">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-white/45">
                <span>{resource.category}</span>
                <span>{resource.source}</span>
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                {resource.title}
              </h3>
              <p className="mt-3 leading-7 text-white/66">{resource.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/resources"
            className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
          >
            浏览全部资源
          </Link>
        </div>
      </section>

      <section className="mt-16" id="faq">
        <SectionHeading
          kicker="FAQ"
          title="先把最常见的三个误会拆掉，再进入真正的学习主线。"
          copy="这套教程不是替代官方文档，而是给你一个先跑通再深化的学习顺序。"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {HOME_FAQS.map((faq) => (
            <article key={faq.question} className="surface-card rounded-[2rem] p-6">
              <h3 className="font-[family-name:var(--font-serif)] text-2xl text-white">{faq.question}</h3>
              <p className="mt-3 leading-7 text-white/66">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="surface-card rounded-[2.5rem] px-6 py-10 sm:px-10">
          <p className="section-kicker">现在开始</p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl text-white">
                别再收集教程了，先把第一次聊天跑通。
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/66">
                你现在最需要的不是更多配置项，而是一个已经能工作的起点。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tutorials"
                className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white"
              >
                开始学习
              </Link>
              <Link
                href="/roadmap"
                className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/80"
              >
                查看路线图
              </Link>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {HOME_OUTCOMES.map((outcome) => (
              <div key={outcome} className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/70">
                {outcome}
              </div>
            ))}
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
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-white/66">{copy}</p>
    </div>
  );
}
