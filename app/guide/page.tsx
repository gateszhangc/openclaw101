import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { getGuideIndexData } from "@/lib/guides";
import { RESOURCE_ENTRIES } from "@/lib/site-data";

const GUIDE_OUTCOMES = [
  "跑通第一次对话",
  "弄清模型与认证",
  "接上 Telegram 或其他渠道",
  "写人格与长期记忆",
  "装 Skills 做自动化",
];

const PHASE_SUPPORT_RESOURCE_SLUGS: Record<string, string[]> = {
  "phase-install": ["official-getting-started", "official-onboarding"],
  "phase-models": ["official-providers", "github-discussions"],
  "phase-channels": ["official-channels", "discord-community"],
  "phase-memory": ["discord-community", "github-discussions"],
  "phase-automation": ["clawhub", "github-releases"],
};

export default async function GuidePage() {
  const { guide, phases } = await getGuideIndexData();

  if (!guide) {
    throw new Error("Guide entry missing");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_340px]">
        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">Guide</p>
          <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-4xl text-white">
            从零开始，按正确顺序上手 OpenClaw
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/68">
            先看导读建立整体地图，再按阶段进入安装、模型、渠道、人格和自动化。你不需要先懂完
            全部，只需要知道自己现在在哪一步。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/guide/${guide.slug}`}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              从导读开始
            </Link>
            <Link
              href="/resources"
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
            >
              卡住就查资源
            </Link>
          </div>
        </article>

        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">这条主线会带你完成</p>
          <div className="mt-5 space-y-3">
            {GUIDE_OUTCOMES.map((outcome, index) => (
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
            <p className="section-kicker">Guide 入口</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              先看导读，再进入五个阶段
            </h2>
          </div>
          <Link
            href={`/guide/${guide.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
          >
            阅读导读
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <article className="mt-6 rounded-[2rem] border border-white/10 bg-black/10 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                Episode 0{guide.episode}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                {guide.title}
              </h3>
              <p className="mt-3 leading-7 text-white/68">{guide.summary}</p>
            </div>
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55">
              {guide.readingTime} 分钟阅读
            </span>
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-4">
        {phases.map((phase) => {
          const supportResources = (PHASE_SUPPORT_RESOURCE_SLUGS[phase.slug] || [])
            .map((slug) => RESOURCE_ENTRIES.find((resource) => resource.slug === slug))
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
                  href={`/phases/${phase.slug}`}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
                >
                  进入阶段
                </Link>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
                <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                  <p className="section-kicker">阶段目标</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/68">
                    {phase.goals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {phase.lesson ? (
                    <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                      <p className="section-kicker">核心教程</p>
                      <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                        {phase.lesson.title}
                      </h3>
                      <p className="mt-3 leading-7 text-white/66">{phase.lesson.summary}</p>
                      <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                        <span>{phase.lesson.readingTime} 分钟阅读</span>
                        <Link
                          href={`/guide/${phase.lesson.slug}`}
                          className="inline-flex items-center gap-2 transition hover:text-white"
                        >
                          打开教程
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                      <p className="section-kicker">核心教程</p>
                      <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                        该阶段教程整理中
                      </h3>
                      <p className="mt-3 leading-7 text-white/66">
                        阶段目标和资源入口已经先整理好，可以先按阶段页推进；对应的 Guide 正文后续再补上。
                      </p>
                      <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                        <span>暂未发布</span>
                        <Link
                          href={`/phases/${phase.slug}`}
                          className="inline-flex items-center gap-2 transition hover:text-white"
                        >
                          先看阶段页
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                    <p className="section-kicker">卡住时先查这些</p>
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
