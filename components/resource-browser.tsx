"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import type { ResourceEntry } from "@/lib/site-data";

type ResourceBrowserProps = {
  resources: ResourceEntry[];
  initialCategory?: string;
  initialQuery?: string;
};

export function ResourceBrowser({
  resources,
  initialCategory = "",
  initialQuery = "",
}: ResourceBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>("全部");
  const [language, setLanguage] = useState<string>("全部");
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(
    () => ["全部", ...new Set(resources.map((resource) => resource.category))],
    [resources],
  );
  const languages = useMemo(
    () => ["全部", ...new Set(resources.map((resource) => resource.language))],
    [resources],
  );

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCategory(
      initialCategory && categories.includes(initialCategory)
        ? initialCategory
        : "全部",
    );
  }, [categories, initialCategory]);

  const filteredResources = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesQuery =
        !keyword ||
        [resource.title, resource.summary, resource.source, resource.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const matchesCategory = category === "全部" || resource.category === category;
      const matchesLanguage = language === "全部" || resource.language === language;

      return matchesQuery && matchesCategory && matchesLanguage;
    });
  }, [category, deferredQuery, language, resources]);

  return (
    <div className="space-y-8" data-testid="resource-browser">
      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索资源、来源或关键词"
          className="h-12 rounded-full border border-white/10 bg-black/10 px-5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/25"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-12 rounded-full border border-white/10 bg-black/10 px-4 text-sm text-white outline-none"
        >
          {categories.map((item) => (
            <option key={item} value={item} className="bg-neutral-950">
              {item}
            </option>
          ))}
        </select>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="h-12 rounded-full border border-white/10 bg-black/10 px-4 text-sm text-white outline-none"
        >
          {languages.map((item) => (
            <option key={item} value={item} className="bg-neutral-950">
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/52">
        <p>共找到 {filteredResources.length} 条资源</p>
        {(query || category !== "全部" || language !== "全部") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("全部");
              setLanguage("全部");
            }}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/72 transition hover:border-white/20 hover:text-white"
          >
            清空筛选
          </button>
        )}
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredResources.map((resource) => (
            <article
              key={resource.slug}
              data-testid="resource-card"
              className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/45">
                <span>{resource.category}</span>
                <span>{resource.language}</span>
                <span>{resource.source}</span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-white">
                {resource.title}
              </h3>
              <p className="mt-3 flex-1 leading-7 text-white/68">{resource.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition group-hover:bg-[var(--color-accent-strong)]"
              >
                打开资源
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center text-sm leading-7 text-white/60">
          当前筛选没有匹配到资源。可以清空筛选，或者回到
          <Link href="/guide" className="ml-1 text-white transition hover:text-[var(--color-accent)]">
            Guide
          </Link>
          重新确认自己要解决的是哪一类问题。
        </div>
      )}
    </div>
  );
}
