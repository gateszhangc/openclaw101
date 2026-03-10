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

function resolveInitialCategory(
  initialCategory: ResourceCategory | "",
  categories: ResourceCategory[],
): ResourceCategory | "all" {
  return initialCategory && categories.includes(initialCategory) ? initialCategory : "all";
}

const COPY = {
  zh: {
    all: "全部",
    searchPlaceholder: "搜索资源、来源或关键词",
    total: (count: number) => `共找到 ${count} 条资源`,
    clear: "清空筛选",
    emptyLead: "当前筛选没有匹配到资源。可以清空筛选，或者回到",
    emptyLink: "Guide",
    emptyTail: "重新确认自己要解决的是哪一类问题。",
    browserHint: "像搜工具而不是翻目录一样使用它。",
    openResource: "打开资源",
  },
  en: {
    all: "All",
    searchPlaceholder: "Search resources, sources, or keywords",
    total: (count: number) => `${count} resources found`,
    clear: "Clear filters",
    emptyLead: "No resources matched the current filters. Clear them, or go back to",
    emptyLink: "Guide",
    emptyTail: "to confirm what kind of problem you are trying to solve.",
    browserHint: "Use it like a retrieval tool, not a category archive.",
    openResource: "Open resource",
  },
} as const;

export function ResourceBrowser({
  locale,
  resources,
  initialCategory = "",
  initialQuery = "",
}: ResourceBrowserProps) {
  const copy = COPY[locale];
  const categories = useMemo(
    () => [...new Set(resources.map((resource) => resource.category))],
    [resources],
  );
  const languages = useMemo(
    () => [...new Set(resources.map((resource) => resource.language))],
    [resources],
  );
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ResourceCategory | "all">(() =>
    resolveInitialCategory(initialCategory, categories),
  );
  const [language, setLanguage] = useState<ResourceLanguage | "all">("all");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCategory(resolveInitialCategory(initialCategory, categories));
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
      <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-5 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="space-y-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="h-12 w-full rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/22"
          />
          <p className="text-sm text-white/48">{copy.browserHint}</p>
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as ResourceCategory | "all")}
          className="h-12 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
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
          className="h-12 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
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
              className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-black/20 p-6 transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/42">
                <span>{getResourceCategoryLabel(locale, resource.category)}</span>
                <span>{getResourceLanguageLabel(locale, resource.language)}</span>
                <span>{resource.source}</span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-white">
                {resource.title}
              </h3>
              <p className="mt-3 flex-1 leading-7 text-white/66">{resource.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/58"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition group-hover:bg-[var(--color-accent-strong)]"
              >
                {copy.openResource}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-black/20 px-6 py-10 text-center text-sm leading-7 text-white/60">
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
