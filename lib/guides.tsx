import fs from "node:fs";
import path from "node:path";

import { compile, run } from "@mdx-js/mdx";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { ReactNode } from "react";
import { cache } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { guideMdxComponents } from "@/components/guide-mdx";
import { getGuideMedia, type GuideMediaEntry } from "@/lib/guide-media";
import type { Locale } from "@/lib/i18n";
import { GUIDE_LESSON_SLUG, getPhases, hasPhaseSlug, type PhaseEntry } from "@/lib/site-data";

export type TocEntry = {
  id: string;
  text: string;
  level: number;
};

export type GuideFrontmatter = {
  title: string;
  description: string;
  episode: number;
  roleName: string;
  phaseSlug?: string;
  order: number;
  keyTakeaways: string[];
};

export type GuideEntry = {
  slug: string;
  title: string;
  summary: string;
  episode: number;
  order: number;
  roleName: string;
  readingTime: number;
  toc: TocEntry[];
  keyTakeaways: string[];
  phaseSlug?: string;
} & GuideMediaEntry;

export type GuidePageEntry = GuideEntry & {
  content: ReactNode;
};

export type GuidePhaseEntry = PhaseEntry & {
  lesson: GuideEntry | null;
};

type GuideSource = {
  slug: string;
  body: string;
  frontmatter: GuideFrontmatter;
  toc: TocEntry[];
  readingTime: number;
};

type RuntimeModule = {
  default: (props: { components?: typeof guideMdxComponents }) => ReactNode;
};

function getGuidesDir(locale: Locale) {
  return locale === "en"
    ? path.join(process.cwd(), "content", "guides", "en")
    : path.join(process.cwd(), "content", "guides");
}

function getGuideFiles(locale: Locale) {
  return fs
    .readdirSync(getGuidesDir(locale))
    .filter((file) => /^\d{2}-.*\.mdx$/.test(file))
    .sort();
}

function coerceString(value: unknown, field: string, slug: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Guide "${slug}" is missing a valid "${field}" string.`);
  }

  return value.trim();
}

function coerceNumber(value: unknown, field: string, slug: string) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Guide "${slug}" is missing a valid "${field}" number.`);
  }

  return value;
}

function coerceStringArray(value: unknown, field: string, slug: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Guide "${slug}" is missing a valid "${field}" string array.`);
  }

  return value.map((item) => item.trim()).filter(Boolean);
}

function parseGuideFrontmatter(slug: string, data: Record<string, unknown>): GuideFrontmatter {
  const phaseSlug = data.phaseSlug;

  if (phaseSlug !== undefined && typeof phaseSlug !== "string") {
    throw new Error(`Guide "${slug}" has an invalid "phaseSlug" value.`);
  }

  if (phaseSlug && !hasPhaseSlug(phaseSlug)) {
    throw new Error(`Guide "${slug}" references an unknown phaseSlug "${phaseSlug}".`);
  }

  return {
    title: coerceString(data.title, "title", slug),
    description: coerceString(data.description, "description", slug),
    episode: coerceNumber(data.episode, "episode", slug),
    roleName: coerceString(data.roleName, "roleName", slug),
    phaseSlug: phaseSlug?.trim() || undefined,
    order: coerceNumber(data.order, "order", slug),
    keyTakeaways: coerceStringArray(data.keyTakeaways, "keyTakeaways", slug),
  };
}

function stripMdx(input: string) {
  return input
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_>#-]/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingTime(source: string) {
  const cjk = (source.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (source.match(/[A-Za-z0-9_]+/g) || []).length;
  return Math.max(4, Math.ceil((cjk + latin) / 260));
}

function extractHeadings(source: string) {
  const slugger = new GithubSlugger();
  const headings: TocEntry[] = [];
  const lines = source.split("\n");
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      continue;
    }

    const match = /^(#{2,3})\s+(.+)$/.exec(line);

    if (!match) {
      continue;
    }

    const text = stripMdx(match[2]);

    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length,
    });
  }

  return headings;
}

function removeTopHeading(source: string) {
  return source.replace(/^#\s+.*$/m, "").trim();
}

function toGuideEntry(source: GuideSource): GuideEntry {
  return {
    slug: source.slug,
    title: source.frontmatter.title,
    summary: source.frontmatter.description,
    episode: source.frontmatter.episode,
    order: source.frontmatter.order,
    roleName: source.frontmatter.roleName,
    readingTime: source.readingTime,
    toc: source.toc,
    keyTakeaways: source.frontmatter.keyTakeaways,
    phaseSlug: source.frontmatter.phaseSlug,
    ...getGuideMedia(source.slug),
  };
}

const getGuideSources = cache(async (locale: Locale) => {
  const files = getGuideFiles(locale);

  const guides = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(getGuidesDir(locale), fileName), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = parseGuideFrontmatter(slug, data);

    return {
      slug,
      body: content.trim(),
      frontmatter,
      toc: extractHeadings(content),
      readingTime: estimateReadingTime(content),
    } satisfies GuideSource;
  });

  return guides.sort((left, right) => left.frontmatter.order - right.frontmatter.order);
});

async function renderGuideContent(source: GuideSource) {
  const compiled = await compile(removeTopHeading(source.body), {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });
  const module = (await run(compiled, jsxRuntime)) as RuntimeModule;
  const Content = module.default;

  return <Content components={guideMdxComponents} />;
}

export const getAllGuides = cache(async (locale: Locale) => {
  const guides = await getGuideSources(locale);
  return guides.map(toGuideEntry);
});

export const getGuideBySlug = cache(async (locale: Locale, slug: string) => {
  const guides = await getAllGuides(locale);
  return guides.find((guide) => guide.slug === slug) || null;
});

export const getGuidePageBySlug = cache(async (locale: Locale, slug: string) => {
  const guides = await getGuideSources(locale);
  const source = guides.find((guide) => guide.slug === slug);

  if (!source) {
    return null;
  }

  return {
    ...toGuideEntry(source),
    content: await renderGuideContent(source),
  } satisfies GuidePageEntry;
});

export const getGuideNavigation = cache(async (locale: Locale, slug: string) => {
  const guides = await getAllGuides(locale);
  const currentIndex = guides.findIndex((guide) => guide.slug === slug);

  return {
    previous: currentIndex > 0 ? guides[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < guides.length - 1
        ? guides[currentIndex + 1]
        : null,
  };
});

export async function getGuideIndexData(locale: Locale) {
  const guides = await getAllGuides(locale);
  const guide = guides.find((entry) => entry.slug === GUIDE_LESSON_SLUG);
  const phases = getPhases(locale).map((phase) => ({
    ...phase,
    lesson: guides.find((entry) => entry.slug === phase.lessonSlug) || null,
  }));

  return {
    guide: guide || null,
    phases,
  } satisfies {
    guide: GuideEntry | null;
    phases: GuidePhaseEntry[];
  };
}
