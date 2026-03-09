import Link from "next/link";

import { getAllTutorials, getSeriesReadmeHtml } from "@/lib/content";

export default async function TutorialsPage() {
  const tutorials = await getAllTutorials();
  const readmeHtml = await getSeriesReadmeHtml();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <p className="section-kicker">教程页</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl text-white">
            OpenClaw 从零陪跑
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/68">
            首页 CTA 会先把用户带到这里。你可以从这里进入所有教程，也可以再去看完整路线图。
          </p>
          <div
            className="tutorial-prose mt-8 max-w-none text-white/72 [&_h2]:text-white [&_h3]:text-white [&_a]:text-[var(--color-accent)]"
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </article>

        <article className="surface-card rounded-[2.5rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">教程顺序</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl text-white">
                从导读开始，一步步跑通 6 篇主线
              </h2>
            </div>
            <Link
              href="/roadmap"
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
            >
              查看路线图
            </Link>
          </div>
          <div className="mt-8 grid gap-4">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="group rounded-[2rem] border border-white/10 bg-black/10 p-5 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-white/45">
                      Episode 0{tutorial.episode}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                      {tutorial.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                    {tutorial.readingTime} min
                  </span>
                </div>
                <p className="mt-3 leading-7 text-white/66">{tutorial.summary}</p>
                <p className="mt-4 text-sm text-white/45 transition group-hover:text-white">
                  进入教程
                </p>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
