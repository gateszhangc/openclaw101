import { ResourceBrowser } from "@/components/resource-browser";
import { RESOURCE_ENTRIES } from "@/lib/site-data";

export default function ResourcesPage() {
  const featuredResources = RESOURCE_ENTRIES.filter((resource) => resource.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="surface-card rounded-[2.5rem] p-6 sm:p-8">
        <p className="section-kicker">OpenClaw 资源聚合</p>
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl text-white">
          把官方、社区、部署、视频等高价值资料整理到一起
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/66">
          教程负责跑通主线，资源页负责把你后续会反复查阅的入口收拢到同一个地方。
        </p>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <p className="section-kicker">置顶推荐</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {featuredResources.map((resource) => (
            <article key={resource.slug} className="rounded-[2rem] border border-white/10 bg-black/10 p-5">
              <p className="section-kicker">{resource.source}</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-white">
                {resource.title}
              </h2>
              <p className="mt-3 leading-7 text-white/66">{resource.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 surface-card rounded-[2.5rem] p-6 sm:p-8">
        <ResourceBrowser resources={RESOURCE_ENTRIES} />
      </section>
    </div>
  );
}
