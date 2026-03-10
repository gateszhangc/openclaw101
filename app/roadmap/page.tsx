import Link from "next/link";

import { getGuideIndexData } from "@/lib/guides";

export default async function RoadmapPage() {
  const { guide, phases } = await getGuideIndexData();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="surface-card rounded-[2.5rem] p-6 sm:p-8">
        <p className="section-kicker">阶段总览</p>
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl text-white">
          当你已经知道顺序，再按阶段深入
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">
          Guide 负责告诉你下一步学什么，这一页负责把五个阶段拆开，方便你按阶段深入查看
          目标、核心教程和推荐资源。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/guide"
            className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
          >
            回到 Guide
          </Link>
          <Link
            href="/resources"
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
          >
            去资源页
          </Link>
        </div>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Guide 起点</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              先看导读，再进入阶段主线
            </h2>
          </div>
          {guide ? (
            <Link
              href={`/guide/${guide.slug}`}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
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
                {phase.lesson ? (
                  <>
                    <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                      {phase.lesson.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/66">{phase.lesson.summary}</p>
                    <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                      <span>{phase.lesson.readingTime} 分钟阅读</span>
                      <Link
                        href={`/guide/${phase.lesson.slug}`}
                        className="transition hover:text-white"
                      >
                        打开教程
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-white">
                      该阶段教程整理中
                    </h3>
                    <p className="mt-3 leading-7 text-white/66">
                      这一阶段的阶段目标和资源已经先就位，教程正文会后续补齐。
                    </p>
                    <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                      <span>暂未发布</span>
                      <Link href={`/phases/${phase.slug}`} className="transition hover:text-white">
                        先看阶段页
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
