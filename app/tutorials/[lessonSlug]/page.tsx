import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllTutorials, getTutorialBySlug, getTutorialNavigation } from "@/lib/content";
import { PHASES } from "@/lib/site-data";

type TutorialPageProps = {
  params: Promise<{
    lessonSlug: string;
  }>;
};

export async function generateStaticParams() {
  const tutorials = await getAllTutorials();
  return tutorials.map((tutorial) => ({
    lessonSlug: tutorial.slug,
  }));
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
  const { lessonSlug } = await params;
  const tutorial = await getTutorialBySlug(lessonSlug);

  if (!tutorial) {
    return {};
  }

  return {
    title: tutorial.title,
    description: tutorial.summary,
  };
}

export default async function TutorialDetailPage({ params }: TutorialPageProps) {
  const { lessonSlug } = await params;
  const tutorial = await getTutorialBySlug(lessonSlug);

  if (!tutorial) {
    notFound();
  }

  const navigation = await getTutorialNavigation(lessonSlug);
  const phase = tutorial.phaseSlug
    ? PHASES.find((entry) => entry.slug === tutorial.phaseSlug) || null
    : null;
  const backHref = phase ? `/phases/${phase.slug}` : "/tutorials";
  const backLabel = phase ? "返回阶段页" : "返回教程页";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="surface-card rounded-[2.5rem] p-6 sm:p-8">
        <Link href={backHref} className="text-sm text-white/55 transition hover:text-white">
          ← {backLabel}
        </Link>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_300px]">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
              {phase ? `${phase.label} / ${phase.shortTitle}` : `Guide / OpenClaw 从零陪跑`}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl leading-tight text-white">
              {tutorial.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">{tutorial.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/50">
              <span className="rounded-full border border-white/10 px-4 py-2">
                {tutorial.readingTime} 分钟阅读
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                角色：{tutorial.roleName}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Episode 0{tutorial.episode}
              </span>
            </div>
          </div>

          <aside className="surface-card rounded-[2rem] p-5 xl:sticky xl:top-28 xl:h-fit">
            <p className="section-kicker">章节目录</p>
            <div className="mt-4 space-y-2">
              {tutorial.toc.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className="block rounded-2xl px-3 py-2 text-sm text-white/66 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {entry.text}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {tutorial.keyTakeaways.length > 0 ? (
        <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">关键要点</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {tutorial.keyTakeaways.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/75"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 reading-panel rounded-[2.5rem] p-6 sm:p-8 lg:p-10">
        <div
          className="tutorial-prose max-w-none"
          dangerouslySetInnerHTML={{ __html: tutorial.html }}
        />
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="section-kicker">继续学习</p>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-white">
            别中断主线，沿着顺序继续往前
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {navigation.previous ? (
            <Link
              href={`/tutorials/${navigation.previous.slug}`}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80"
            >
              上一篇
            </Link>
          ) : null}
          {navigation.next ? (
            <Link
              href={`/tutorials/${navigation.next.slug}`}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
            >
              下一篇
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
