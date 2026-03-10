import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllGuides, getGuideNavigation, getGuidePageBySlug } from "@/lib/guides";
import { PHASES } from "@/lib/site-data";

type GuidePageProps = {
  params: Promise<{
    guideSlug: string;
  }>;
};

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((guide) => ({
    guideSlug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const guide = await getGuidePageBySlug(guideSlug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.summary,
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { guideSlug } = await params;
  const guide = await getGuidePageBySlug(guideSlug);

  if (!guide) {
    notFound();
  }

  const navigation = await getGuideNavigation(guideSlug);
  const phase = guide.phaseSlug
    ? PHASES.find((entry) => entry.slug === guide.phaseSlug) || null
    : null;
  const backHref = phase ? `/phases/${phase.slug}` : "/guide";
  const backLabel = phase ? "返回阶段页" : "返回 Guide";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="surface-card rounded-[2.5rem] p-6 sm:p-8">
        <Link href={backHref} className="text-sm text-white/55 transition hover:text-white">
          ← {backLabel}
        </Link>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_300px]">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
              {phase ? `${phase.label} / ${phase.shortTitle}` : "Guide / OpenClaw 从零陪跑"}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl leading-tight text-white">
              {guide.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">{guide.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/50">
              <span className="rounded-full border border-white/10 px-4 py-2">
                {guide.readingTime} 分钟阅读
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                角色：{guide.roleName}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Episode 0{guide.episode}
              </span>
            </div>
          </div>

          <aside className="surface-card rounded-[2rem] p-5 xl:sticky xl:top-28 xl:h-fit">
            <p className="section-kicker">章节目录</p>
            <div className="mt-4 space-y-2">
              {guide.toc.map((entry) => (
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

      {guide.keyTakeaways.length > 0 ? (
        <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">关键要点</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {guide.keyTakeaways.map((item) => (
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
        <div className="guide-prose max-w-none">{guide.content}</div>
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
              href={`/guide/${navigation.previous.slug}`}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80"
            >
              上一篇
            </Link>
          ) : null}
          {navigation.next ? (
            <Link
              href={`/guide/${navigation.next.slug}`}
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
