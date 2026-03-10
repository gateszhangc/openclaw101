"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { localizeHref, type Locale } from "@/lib/i18n";
import {
  getResourceCategoryLabel,
  getResourceLanguageLabel,
  type ResourceCategory,
  type ResourceEntry,
  type ResourceLanguage,
} from "@/lib/site-data";

type ResourceBrowserProps = {
  locale: Locale;
  resources: ResourceEntry[];
  initialCategory?: ResourceCategory | "";
  initialQuery?: string;
};

const COPY = {
  zh: {
    all: "全部",
    searchPlaceholder: "搜索资源、来源或关键词",
    total: (count: number) => `共找到 ${count} 条资源`,
    clear: "清空筛选",
    emptyLead: "当前筛选没有匹配到资源。可以清空筛选，或者回到",
    emptyLink: "Guide",
    emptyTail: "重新确认自己要解决的是哪一类问题。",
  },
  en: {
    all: "All",
    searchPlaceholder: "Search resources, sources, or keywords",
    total: (count: number) => `${count} resources found`,
    clear: "Clear filters",
    emptyLead: "No resources matched the current filters. Clear them, or go back to",
    emptyLink: "Guide",
    emptyTail: "to confirm which kind of problem you are trying to solve.",
  },
} as const;

export function ResourceBrowser({
  locale,
  resources,
  initialCategory = "",
  initialQuery = "",
}: ResourceBrowserProps) {
  const copy = COPY[locale];
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ResourceCategory | "all">("all");
  const [language, setLanguage] = useState<ResourceLanguage | "all">("all");
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(
    () => [...new Set(resources.map((resource) => resource.category))],
    [resources],
  );
  const languages = useMemo(
    () => [...new Set(resources.map((resource) => resource.language))],
    [resources],
  );

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCategory(
      initialCategory && categories.includes(initialCategory) ? initialCategory : "all",
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
      const matchesCategory = category === "all" || resource.category === category;
      const matchesLanguage = language === "all" || resource.language === language;

      return matchesQuery && matchesCategory && matchesLanguage;
    });
  }, [category, deferredQuery, language, resources]);

  return (
    <div className="space-y-8" data-testid="resource-browser">
      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="h-12 rounded-full border border-white/10 bg-black/10 px-5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/25"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as ResourceCategory | "all")}
          className="h-12 rounded-full border border-white/10 bg-black/10 px-4 text-sm text-white outline-none"
        >
          <option value="all" className="bg-neutral-950">
            {copy.all}
          </option>
          {categories.map((item) => (
            <option key={item} value={item} className="bg-neutral-950">
              {getResourceCategoryLabel(locale, item)}
            </option>
          ))}
        </select>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value as ResourceLanguage | "all")}
          className="h-12 rounded-full border border-white/10 bg-black/10 px-4 text-sm text-white outline-none"
        >
          <option value="all" className="bg-neutral-950">
            {copy.all}
          </option>
          {languages.map((item) => (
            <option key={item} value={item} className="bg-neutral-950">
              {getResourceLanguageLabel(locale, item)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/52">
        <p>{copy.total(filteredResources.length)}</p>
        {(query || category !== "all" || language !== "all") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setLanguage("all");
            }}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/72 transition hover:border-white/20 hover:text-white"
          >
            {copy.clear}
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
                <span>{getResourceCategoryLabel(locale, resource.category)}</span>
                <span>{getResourceLanguageLabel(locale, resource.language)}</span>
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
                {locale === "en" ? "Open resource" : "打开资源"}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center text-sm leading-7 text-white/60">
          {copy.emptyLead}
          <Link
            href={localizeHref(locale, "/guide")}
            className="ml-1 text-white transition hover:text-[var(--color-accent)]"
          >
            {copy.emptyLink}
          </Link>
          <span className="ml-1">{copy.emptyTail}</span>
        </div>
      )}
    </div>
  );
}
