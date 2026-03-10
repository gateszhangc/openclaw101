import Link from "next/link";

import { getGuideIndexData } from "@/lib/guides";
import { localizeHref, type Locale } from "@/lib/i18n";
import {
  getAllPhaseSlugs,
  getResourceCategoryLabel,
  getResources,
} from "@/lib/site-data";

type PhasePageProps = {
  locale: Locale;
  phaseSlug: string;
};

const COPY = {
  zh: {
    goals: "学习目标",
    coreGuide: "核心教程",
    enterGuide: "进入教程",
    viewResources: "先看相关资源",
    stageResources: "本阶段推荐资源",
    stageResourcesTitle: "先把这几条入口存起来",
    browseAll: "浏览全部资源",
    stageNavigation: "阶段导航",
    stageNavigationTitle: "沿着阶段往前走，不需要一次全懂",
    previous: "上一阶段",
    next: "下一阶段",
    pendingGuide: "该阶段教程整理中",
    pendingBody: "当前阶段的目标和资源已经整理完成。若正文教程尚未发布，可以先按本页清单推进。",
    openResource: "打开资源",
  },
  en: {
    goals: "Learning goals",
    coreGuide: "Core guide",
    enterGuide: "Open guide",
    viewResources: "Start with related resources",
    stageResources: "Recommended resources for this stage",
    stageResourcesTitle: "Save these entry points first",
    browseAll: "Browse all resources",
    stageNavigation: "Stage navigation",
    stageNavigationTitle: "Keep moving stage by stage without understanding everything at once",
    previous: "Previous stage",
    next: "Next stage",
    pendingGuide: "This stage guide is still being prepared",
    pendingBody:
      "The goals and resources for this stage are already ready. If the main lesson has not shipped yet, keep moving with the checklist on this page.",
    openResource: "Open resource",
  },
} as const;

export function getPhaseStaticParams() {
  return getAllPhaseSlugs().map((phaseSlug) => ({ phaseSlug }));
}

export async function PhasePage({ locale, phaseSlug }: PhasePageProps) {
  const copy = COPY[locale];
  const resources = getResources(locale);
  const { phases } = await getGuideIndexData(locale);
  const currentIndex = phases.findIndex((phase) => phase.slug === phaseSlug);

  if (currentIndex === -1) {
    return null;
  }

  const phase = phases[currentIndex];
  const previousPhase = currentIndex > 0 ? phases[currentIndex - 1] : null;
  const nextPhase = currentIndex < phases.length - 1 ? phases[currentIndex + 1] : null;
  const relatedResources = resources.filter((resource) => resource.phaseSlug === phase.slug);

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
          <p className="section-kicker">{copy.goals}</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-white/68">
            {phase.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </article>

        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">{copy.coreGuide}</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
                {phase.lesson ? phase.lesson.title : copy.pendingGuide}
              </h2>
            </div>
            <Link
              href={
                phase.lesson
                  ? localizeHref(locale, `/guide/${phase.lesson.slug}`)
                  : localizeHref(locale, "/resources")
              }
              style={{ color: "var(--color-accent-ink)" }}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium"
            >
              {phase.lesson ? copy.enterGuide : copy.viewResources}
            </Link>
          </div>
          <p className="mt-4 max-w-3xl leading-7 text-white/66">
            {phase.lesson ? phase.lesson.summary : copy.pendingBody}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {phase.roadmapPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/70"
              >
                {point}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{copy.stageResources}</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
              {copy.stageResourcesTitle}
            </h2>
          </div>
          <Link
            href={localizeHref(locale, "/resources")}
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
          >
            {copy.browseAll}
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {relatedResources.map((resource) => (
            <article key={resource.slug} className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
              <p className="section-kicker">{getResourceCategoryLabel(locale, resource.category)}</p>
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
                {copy.openResource}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="section-kicker">{copy.stageNavigation}</p>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-white">
            {copy.stageNavigationTitle}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {previousPhase ? (
            <Link
              href={localizeHref(locale, `/phases/${previousPhase.slug}`)}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80"
            >
              {copy.previous}
            </Link>
          ) : null}
          {nextPhase ? (
            <Link
              href={localizeHref(locale, `/phases/${nextPhase.slug}`)}
              style={{ color: "var(--color-accent-ink)" }}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium"
            >
              {copy.next}
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
