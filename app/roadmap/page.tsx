import Link from "next/link";

import { getRoadmapData } from "@/lib/content";

export default async function RoadmapPage() {
  const { guide, phases } = await getRoadmapData();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="surface-card rounded-[2.5rem] p-6 sm:p-8">
        <p className="section-kicker">OpenClaw 学习路线图</p>
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl text-white">
          从零开始，按阶段掌握，而不是按零散文章跳读
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">
          你先用导读建立整体地图，再按安装、模型、渠道、人格和自动化五个阶段推进。每个阶段都只盯住一个最关键的结果。
        </p>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Guide</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              先看导读，再进入阶段主线
            </h2>
          </div>
          {guide ? (
            <Link
              href={`/tutorials/${guide.slug}`}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
            >
              阅读导读
            </Link>
          ) : null}
        </div>
        {guide ? (
          <article className="mt-6 rounded-[2rem] border border-white/10 bg-black/10 p-6">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
              Episode 0{guide.episode}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
              {guide.title}
            </h3>
            <p className="mt-3 max-w-3xl leading-7 text-white/66">{guide.summary}</p>
          </article>
        ) : null}
      </section>

      <section className="mt-8 grid gap-4">
        {phases.map((phase) => (
          <article
            key={phase.slug}
            data-testid={`roadmap-phase-${phase.slug}`}
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
                进入本阶段
              </Link>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                <p className="section-kicker">本阶段学习目标</p>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-white/66">
                  {phase.goals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
                <p className="section-kicker">本阶段核心教程</p>
                <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                  {phase.lesson.title}
                </h3>
                <p className="mt-3 leading-7 text-white/66">{phase.lesson.summary}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                  <span>{phase.lesson.readingTime} 分钟阅读</span>
                  <Link href={`/tutorials/${phase.lesson.slug}`} className="transition hover:text-white">
                    打开教程
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
