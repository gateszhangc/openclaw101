import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRoadmapData } from "@/lib/content";
import { PHASES, RESOURCE_ENTRIES } from "@/lib/site-data";

type PhasePageProps = {
  params: Promise<{
    phaseSlug: string;
  }>;
};

export async function generateStaticParams() {
  return PHASES.map((phase) => ({
    phaseSlug: phase.slug,
  }));
}

export async function generateMetadata({ params }: PhasePageProps): Promise<Metadata> {
  const { phaseSlug } = await params;
  const phase = PHASES.find((entry) => entry.slug === phaseSlug);

  if (!phase) {
    return {};
  }

  return {
    title: `${phase.label} ${phase.title}`,
    description: phase.description,
  };
}

export default async function PhasePage({ params }: PhasePageProps) {
  const { phaseSlug } = await params;
  const { phases } = await getRoadmapData();
  const currentIndex = phases.findIndex((phase) => phase.slug === phaseSlug);

  if (currentIndex === -1) {
    notFound();
  }

  const phase = phases[currentIndex];
  const previousPhase = currentIndex > 0 ? phases[currentIndex - 1] : null;
  const nextPhase = currentIndex < phases.length - 1 ? phases[currentIndex + 1] : null;
  const relatedResources = RESOURCE_ENTRIES.filter((resource) => resource.phaseSlug === phase.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="surface-card rounded-[2.5rem] p-6 sm:p-8">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
          {phase.label}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl text-white">
          {phase.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">{phase.description}</p>
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">学习目标</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-white/68">
            {phase.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </article>

        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">核心教程</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
                {phase.lesson.title}
              </h2>
            </div>
            <Link
              href={`/tutorials/${phase.lesson.slug}`}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
            >
              进入教程
            </Link>
          </div>
          <p className="mt-4 max-w-3xl leading-7 text-white/66">{phase.lesson.summary}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {phase.roadmapPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/70">
                {point}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">本阶段推荐资源</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              先把这几条入口存起来
            </h2>
          </div>
          <Link
            href="/resources"
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
          >
            浏览全部资源
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {relatedResources.map((resource) => (
            <article key={resource.slug} className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
              <p className="section-kicker">{resource.category}</p>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                {resource.title}
              </h3>
              <p className="mt-3 leading-7 text-white/66">{resource.summary}</p>
              <Link
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.1] hover:text-white"
              >
                打开资源
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="section-kicker">阶段导航</p>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-white">
            沿着阶段往前走，不需要一次全懂
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {previousPhase ? (
            <Link
              href={`/phases/${previousPhase.slug}`}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80"
            >
              上一阶段
            </Link>
          ) : null}
          {nextPhase ? (
            <Link
              href={`/phases/${nextPhase.slug}`}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
            >
              下一阶段
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
