import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

import { GUIDE_LESSON_SLUG, LESSON_PHASE_MAP, PHASES } from "@/lib/site-data";

export type TocEntry = {
  id: string;
  text: string;
  level: number;
};

export type TutorialEntry = {
  slug: string;
  title: string;
  episode: number;
  roleName: string;
  summary: string;
  readingTime: number;
  html: string;
  toc: TocEntry[];
  keyTakeaways: string[];
  phaseSlug?: string;
};

const tutorialDir = path.join(
  process.cwd(),
  "tutorials",
  "openclaw-cong-ling-pei-pao",
);

function getMarkdownFiles() {
  return fs
    .readdirSync(tutorialDir)
    .filter((file) => /^\d{2}-.*\.md$/.test(file))
    .sort();
}

function stripMarkdown(input: string) {
  return input
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingTime(markdown: string) {
  const cjk = (markdown.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (markdown.match(/[A-Za-z0-9_]+/g) || []).length;
  return Math.max(4, Math.ceil((cjk + latin) / 260));
}

function extractSummary(content: string) {
  const quote = content.match(/^>\s+(.+)$/m);
  if (quote) {
    return stripMarkdown(quote[1]);
  }

  const blocks = content.split(/\n\s*\n/);
  for (const block of blocks) {
    const value = block.trim();
    if (
      !value ||
      value.startsWith("#") ||
      value.startsWith("-") ||
      value.startsWith("|") ||
      value.startsWith(">") ||
      value.startsWith("```")
    ) {
      continue;
    }

    return stripMarkdown(value);
  }

  return "从零开始，按顺序跑通 OpenClaw 的关键主线。";
}

function extractHeadings(content: string) {
  const slugger = new GithubSlugger();
  const headings: TocEntry[] = [];
  const pattern = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(content))) {
    const level = match[1].length;
    const text = stripMarkdown(match[2]);
    headings.push({
      id: slugger.slug(text),
      text,
      level,
    });
  }

  return headings;
}

function extractKeyTakeaways(content: string) {
  const match = content.match(
    /^##\s+Key Takeaways\s*([\s\S]*?)(?=^##\s|\Z)/m,
  );

  if (!match) {
    return [];
  }

  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => stripMarkdown(line.slice(2)));
}

function removeTopHeading(content: string) {
  return content.replace(/^#\s+.*$/m, "").trim();
}

async function renderMarkdown(content: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        ariaLabel: "Jump to section",
      },
    })
    .use(rehypeStringify)
    .process(content);

  return String(file);
}

export async function getAllTutorials() {
  const files = getMarkdownFiles();

  const tutorials = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(tutorialDir, fileName), "utf8");
      const { data, content } = matter(raw);
      const html = await renderMarkdown(removeTopHeading(content));

      return {
        slug,
        title: String(data.title),
        episode: Number(data.episode),
        roleName: String(data.role_name || "虾滑"),
        summary: extractSummary(content),
        readingTime: estimateReadingTime(content),
        html,
        toc: extractHeadings(content),
        keyTakeaways: extractKeyTakeaways(content),
        phaseSlug:
          slug === GUIDE_LESSON_SLUG ? undefined : LESSON_PHASE_MAP.get(slug),
      } satisfies TutorialEntry;
    }),
  );

  return tutorials.sort((left, right) => left.episode - right.episode);
}

export async function getTutorialBySlug(slug: string) {
  const tutorials = await getAllTutorials();
  return tutorials.find((tutorial) => tutorial.slug === slug) || null;
}

export async function getSeriesReadmeHtml() {
  const readmePath = path.join(tutorialDir, "README.md");
  const readme = fs.readFileSync(readmePath, "utf8");
  return renderMarkdown(readme.replace(/^#\s+.*$/m, "").trim());
}

export async function getTutorialNavigation(slug: string) {
  const tutorials = await getAllTutorials();
  const currentIndex = tutorials.findIndex((tutorial) => tutorial.slug === slug);

  return {
    previous: currentIndex > 0 ? tutorials[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < tutorials.length - 1
        ? tutorials[currentIndex + 1]
        : null,
  };
}

export async function getRoadmapData() {
  const tutorials = await getAllTutorials();
  const guide = tutorials.find((tutorial) => tutorial.slug === GUIDE_LESSON_SLUG);

  const phases = PHASES.map((phase) => ({
    ...phase,
    lesson: tutorials.find((tutorial) => tutorial.slug === phase.lessonSlug)!,
  }));

  return {
    guide,
    phases,
  };
}
