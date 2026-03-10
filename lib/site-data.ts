import type { Locale } from "@/lib/i18n";

type LocalizedValue<T> = Record<Locale, T>;

export type ResourceCategory =
  | "official"
  | "deployment"
  | "video"
  | "community"
  | "skills"
  | "updates";

export type ResourceLanguage = Locale;

export type PhaseEntry = {
  slug: string;
  label: string;
  title: string;
  shortTitle: string;
  description: string;
  goals: string[];
  lessonSlug: string;
  roadmapPoints: string[];
  accent: string;
};

export type ResourceEntry = {
  slug: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: ResourceCategory;
  language: ResourceLanguage;
  featured: boolean;
  tags: string[];
  phaseSlug?: string;
};

type PhaseDefinition = {
  slug: string;
  label: string;
  title: LocalizedValue<string>;
  shortTitle: LocalizedValue<string>;
  description: LocalizedValue<string>;
  goals: LocalizedValue<string[]>;
  lessonSlug: string;
  roadmapPoints: LocalizedValue<string[]>;
  accent: string;
};

type ResourceDefinition = {
  slug: string;
  title: LocalizedValue<string>;
  summary: LocalizedValue<string>;
  url: string;
  source: string;
  category: ResourceCategory;
  language: ResourceLanguage;
  featured: boolean;
  tags: LocalizedValue<string[]>;
  phaseSlug?: string;
};

function pickLocale<T>(value: LocalizedValue<T>, locale: Locale) {
  return value[locale];
}

export const SITE_NAME = "OpenClaw101";
export const SITE_URL =
  process.env.NEXT_PUBLIC_WEB_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://openclaw101.xyz";

export const GUIDE_LESSON_SLUG = "01-what-is-openclaw";

const SITE_DESCRIPTIONS: LocalizedValue<string> = {
  zh: "用一条清晰学习路线，从 0 到真正上手 OpenClaw。",
  en: "A clear learning path for getting from zero to a working OpenClaw setup.",
};

const DEFAULT_SITE_TITLES: LocalizedValue<string> = {
  zh: `${SITE_NAME} | OpenClaw 新手入门站`,
  en: `${SITE_NAME} | OpenClaw starter guide`,
};

const RESOURCE_CATEGORY_LABELS: Record<Locale, Record<ResourceCategory, string>> = {
  zh: {
    official: "官方",
    deployment: "部署",
    video: "视频",
    community: "社区",
    skills: "技能",
    updates: "更新",
  },
  en: {
    official: "Official",
    deployment: "Deployment",
    video: "Video",
    community: "Community",
    skills: "Skills",
    updates: "Updates",
  },
};

const RESOURCE_LANGUAGE_LABELS: Record<Locale, Record<ResourceLanguage, string>> = {
  zh: {
    zh: "中文",
    en: "英文",
  },
  en: {
    zh: "Chinese",
    en: "English",
  },
};

const PHASE_DEFINITIONS: PhaseDefinition[] = [
  {
    slug: "phase-install",
    label: "Phase 1",
    title: {
      zh: "安装与启动",
      en: "Install and Launch",
    },
    shortTitle: {
      zh: "安装与启动",
      en: "Install and Launch",
    },
    description: {
      zh: "把环境、安装、Gateway 和第一次对话一次讲清楚。",
      en: "Explain environment setup, installation, Gateway, and the first conversation in one pass.",
    },
    goals: {
      zh: ["完成环境准备", "成功安装 OpenClaw", "确认 Gateway 正常工作", "在 Dashboard 完成第一次对话"],
      en: [
        "Prepare the environment",
        "Install OpenClaw successfully",
        "Confirm Gateway is healthy",
        "Finish the first conversation in Dashboard",
      ],
    },
    lessonSlug: "02-install-and-dashboard",
    roadmapPoints: {
      zh: ["环境选择", "onboard 流程", "Dashboard 第一条消息"],
      en: ["Environment choice", "Onboarding flow", "The first Dashboard message"],
    },
    accent: "from-orange-500/35 to-rose-500/10",
  },
  {
    slug: "phase-models",
    label: "Phase 2",
    title: {
      zh: "模型与认证",
      en: "Models and Authentication",
    },
    shortTitle: {
      zh: "模型与认证",
      en: "Models and Auth",
    },
    description: {
      zh: "把 Provider、Model、Auth 三件事拆开，解决最常见的玄学感。",
      en: "Untangle Provider, Model, and Auth so the most common confusion stops feeling mysterious.",
    },
    goals: {
      zh: ["理解 Provider 和 Model 的区别", "理清登录与认证方式", "选定一条默认模型路线", "减少首次配置排错成本"],
      en: [
        "Understand the difference between Provider and Model",
        "Clarify login and authentication paths",
        "Pick one default model path",
        "Reduce first-time debugging cost",
      ],
    },
    lessonSlug: "03-models-and-auth",
    roadmapPoints: {
      zh: ["Provider 是谁", "Model 怎么选", "Auth 为什么常出错"],
      en: ["Who the provider is", "How to pick a model", "Why auth breaks so often"],
    },
    accent: "from-cyan-500/30 to-sky-500/10",
  },
  {
    slug: "phase-channels",
    label: "Phase 3",
    title: {
      zh: "工具与连接",
      en: "Channels and Connections",
    },
    shortTitle: {
      zh: "工具与连接",
      en: "Channels",
    },
    description: {
      zh: "把聊天渠道接上，让助手从浏览器真正进入你的工作入口。",
      en: "Connect chat channels so the assistant leaves the browser and enters your real workflow entry points.",
    },
    goals: {
      zh: ["理解 Gateway 和 Channel 的关系", "配置第一条外部渠道", "完成 Telegram pairing", "解决机器人在线但不回复的高频问题"],
      en: [
        "Understand the relationship between Gateway and Channel",
        "Configure the first external channel",
        "Complete Telegram pairing",
        "Fix the common case where the bot is online but silent",
      ],
    },
    lessonSlug: "04-telegram-and-channels",
    roadmapPoints: {
      zh: ["渠道入口", "Telegram pairing", "首次外部对话"],
      en: ["Channel entry points", "Telegram pairing", "The first external conversation"],
    },
    accent: "from-violet-500/30 to-fuchsia-500/10",
  },
  {
    slug: "phase-memory",
    label: "Phase 4",
    title: {
      zh: "Skills 与人格扩展",
      en: "Identity and Memory",
    },
    shortTitle: {
      zh: "人格与记忆",
      en: "Identity and Memory",
    },
    description: {
      zh: "通过人格文件和长期记忆，把模板 AI 养成像你的人。",
      en: "Use identity files and long-term memory to turn a generic AI into something that feels like your own teammate.",
    },
    goals: {
      zh: ["理解 SOUL、USER、IDENTITY、AGENTS 的职责", "写出会影响行为的设定", "建立长期记忆边界", "让助手更像团队成员而不是客服"],
      en: [
        "Understand the responsibilities of SOUL, USER, IDENTITY, and AGENTS",
        "Write settings that actually change behavior",
        "Define boundaries for long-term memory",
        "Make the assistant feel more like a teammate than support staff",
      ],
    },
    lessonSlug: "05-soul-and-memory",
    roadmapPoints: {
      zh: ["SOUL.md", "USER.md", "IDENTITY.md", "AGENTS.md"],
      en: ["SOUL.md", "USER.md", "IDENTITY.md", "AGENTS.md"],
    },
    accent: "from-amber-400/35 to-orange-500/10",
  },
  {
    slug: "phase-automation",
    label: "Phase 5",
    title: {
      zh: "自动化进阶",
      en: "Automation",
    },
    shortTitle: {
      zh: "自动化进阶",
      en: "Automation",
    },
    description: {
      zh: "安装 Skills、理解 ClawHub、打开 Heartbeat 和 Cron，让它开始主动干活。",
      en: "Install Skills, understand ClawHub, turn on Heartbeat and Cron, and let the assistant start doing work proactively.",
    },
    goals: {
      zh: ["理解 Skills 和工具实现的关系", "学会浏览和安装 Skills", "分清 Heartbeat 和 Cron 的职责", "搭出最小自动化骨架"],
      en: [
        "Understand how Skills relate to tool implementations",
        "Browse and install Skills confidently",
        "Separate the jobs of Heartbeat and Cron",
        "Build a minimal automation skeleton",
      ],
    },
    lessonSlug: "06-skills-and-automation",
    roadmapPoints: {
      zh: ["ClawHub", "Heartbeat", "Cron", "最小自动化骨架"],
      en: ["ClawHub", "Heartbeat", "Cron", "Minimal automation skeleton"],
    },
    accent: "from-emerald-500/30 to-teal-500/10",
  },
];

const RESOURCE_DEFINITIONS: ResourceDefinition[] = [
  {
    slug: "official-getting-started",
    title: {
      zh: "官方入门指南",
      en: "Official Getting Started Guide",
    },
    summary: {
      zh: "最权威的起点，适合和教程并行阅读，核对安装命令与基础流程。",
      en: "The most authoritative starting point. Best read alongside the guide to verify install commands and the core flow.",
    },
    url: "https://docs.openclaw.ai/zh-CN/start/getting-started",
    source: "OpenClaw Docs",
    category: "official",
    language: "zh",
    featured: true,
    tags: {
      zh: ["入门", "安装"],
      en: ["getting started", "install"],
    },
    phaseSlug: "phase-install",
  },
  {
    slug: "official-onboarding",
    title: {
      zh: "官方新手引导",
      en: "Official Onboarding Guide",
    },
    summary: {
      zh: "适合第一次跑通 Dashboard 和 onboarding 流程时对照查看。",
      en: "Useful when you are first getting Dashboard and onboarding working end to end.",
    },
    url: "https://docs.openclaw.ai/zh-CN/start/onboarding",
    source: "OpenClaw Docs",
    category: "deployment",
    language: "zh",
    featured: true,
    tags: {
      zh: ["onboarding", "初次配置"],
      en: ["onboarding", "initial setup"],
    },
    phaseSlug: "phase-install",
  },
  {
    slug: "official-providers",
    title: {
      zh: "模型提供商总览",
      en: "Provider Overview",
    },
    summary: {
      zh: "理清 Provider、Model 和接入方式，适合搭配第 3 篇教程使用。",
      en: "A good reference for understanding Providers, Models, and integration paths alongside lesson three.",
    },
    url: "https://docs.openclaw.ai/zh-CN/providers",
    source: "OpenClaw Docs",
    category: "official",
    language: "zh",
    featured: false,
    tags: {
      zh: ["provider", "model"],
      en: ["provider", "model"],
    },
    phaseSlug: "phase-models",
  },
  {
    slug: "official-channels",
    title: {
      zh: "聊天渠道总览",
      en: "Channel Overview",
    },
    summary: {
      zh: "官方渠道能力总览，适合确认 Telegram 之外还可以接哪些入口。",
      en: "An overview of official channel support so you can see what exists beyond Telegram.",
    },
    url: "https://docs.openclaw.ai/zh-CN/channels",
    source: "OpenClaw Docs",
    category: "official",
    language: "zh",
    featured: false,
    tags: {
      zh: ["channels", "telegram"],
      en: ["channels", "telegram"],
    },
    phaseSlug: "phase-channels",
  },
  {
    slug: "github-repo",
    title: {
      zh: "GitHub 仓库",
      en: "GitHub Repository",
    },
    summary: {
      zh: "看源码、Issue、版本节奏和社区反馈的第一入口。",
      en: "The first place to inspect source code, issues, release pace, and community feedback.",
    },
    url: "https://github.com/openclaw/openclaw",
    source: "GitHub",
    category: "updates",
    language: "en",
    featured: true,
    tags: {
      zh: ["源码", "issue", "更新"],
      en: ["source", "issues", "updates"],
    },
  },
  {
    slug: "clawhub",
    title: {
      zh: "ClawHub 技能生态",
      en: "ClawHub Skill Ecosystem",
    },
    summary: {
      zh: "浏览、安装和理解 Skills 的入口，适合进入自动化阶段后集中使用。",
      en: "The place to browse, install, and understand Skills once you move into automation.",
    },
    url: "https://clawhub.ai",
    source: "ClawHub",
    category: "skills",
    language: "en",
    featured: true,
    tags: {
      zh: ["skills", "ecosystem"],
      en: ["skills", "ecosystem"],
    },
    phaseSlug: "phase-automation",
  },
  {
    slug: "discord-community",
    title: {
      zh: "Discord 社区",
      en: "Discord Community",
    },
    summary: {
      zh: "遇到安装、渠道或版本问题时，社区讨论能补足官方文档没有写细的地方。",
      en: "Community discussions often fill the gaps when the docs do not go deep enough on install, channels, or version issues.",
    },
    url: "https://discord.com/invite/openclaw",
    source: "Discord",
    category: "community",
    language: "en",
    featured: false,
    tags: {
      zh: ["community", "support"],
      en: ["community", "support"],
    },
  },
  {
    slug: "bilibili-search",
    title: {
      zh: "B 站 OpenClaw 视频搜索",
      en: "Bilibili OpenClaw Search",
    },
    summary: {
      zh: "适合偏视频学习的用户，快速补上安装演示和实机感知。",
      en: "Useful for video-first learners who want installation demos and a more concrete feel for the product.",
    },
    url: "https://search.bilibili.com/all?keyword=OpenClaw",
    source: "Bilibili",
    category: "video",
    language: "zh",
    featured: true,
    tags: {
      zh: ["视频", "中文"],
      en: ["video", "chinese"],
    },
  },
  {
    slug: "github-discussions",
    title: {
      zh: "GitHub Discussions",
      en: "GitHub Discussions",
    },
    summary: {
      zh: "适合看真实使用问题、迁移经验和社区方案比较。",
      en: "A good place to read real-world usage problems, migration experience, and community comparisons.",
    },
    url: "https://github.com/openclaw/openclaw/discussions",
    source: "GitHub",
    category: "community",
    language: "en",
    featured: false,
    tags: {
      zh: ["community", "qa"],
      en: ["community", "qa"],
    },
  },
  {
    slug: "github-releases",
    title: {
      zh: "GitHub Releases",
      en: "GitHub Releases",
    },
    summary: {
      zh: "快速了解版本更新、修复项和升级节奏，适合上线后持续关注。",
      en: "The fastest way to track releases, fixes, and upgrade cadence after the initial setup.",
    },
    url: "https://github.com/openclaw/openclaw/releases",
    source: "GitHub",
    category: "updates",
    language: "en",
    featured: false,
    tags: {
      zh: ["release", "changelog"],
      en: ["release", "changelog"],
    },
  },
];

const RESOURCE_CATEGORY_ALIASES: Record<string, ResourceCategory> = {
  official: "official",
  deployment: "deployment",
  video: "video",
  community: "community",
  skills: "skills",
  updates: "updates",
  官方: "official",
  部署: "deployment",
  视频: "video",
  社区: "community",
  技能: "skills",
  更新: "updates",
};

export function getSiteDescription(locale: Locale) {
  return SITE_DESCRIPTIONS[locale];
}

export function getLayoutMetadata(locale: Locale) {
  return {
    defaultTitle: DEFAULT_SITE_TITLES[locale],
    description: SITE_DESCRIPTIONS[locale],
  };
}

export function getResourceCategoryLabel(locale: Locale, category: ResourceCategory) {
  return RESOURCE_CATEGORY_LABELS[locale][category];
}

export function getResourceLanguageLabel(locale: Locale, language: ResourceLanguage) {
  return RESOURCE_LANGUAGE_LABELS[locale][language];
}

export function normalizeResourceCategory(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const normalized = value.trim().toLowerCase();
  return RESOURCE_CATEGORY_ALIASES[normalized] || "";
}

export function getAllPhaseSlugs() {
  return PHASE_DEFINITIONS.map((phase) => phase.slug);
}

export function hasPhaseSlug(phaseSlug: string) {
  return PHASE_DEFINITIONS.some((phase) => phase.slug === phaseSlug);
}

export function getPhases(locale: Locale): PhaseEntry[] {
  return PHASE_DEFINITIONS.map((phase) => ({
    slug: phase.slug,
    label: phase.label,
    title: pickLocale(phase.title, locale),
    shortTitle: pickLocale(phase.shortTitle, locale),
    description: pickLocale(phase.description, locale),
    goals: pickLocale(phase.goals, locale),
    lessonSlug: phase.lessonSlug,
    roadmapPoints: pickLocale(phase.roadmapPoints, locale),
    accent: phase.accent,
  }));
}

export function getPhaseBySlug(locale: Locale, phaseSlug: string) {
  return getPhases(locale).find((phase) => phase.slug === phaseSlug) || null;
}

export function getResources(locale: Locale): ResourceEntry[] {
  return RESOURCE_DEFINITIONS.map((resource) => ({
    slug: resource.slug,
    title: pickLocale(resource.title, locale),
    summary: pickLocale(resource.summary, locale),
    url: resource.url,
    source: resource.source,
    category: resource.category,
    language: resource.language,
    featured: resource.featured,
    tags: pickLocale(resource.tags, locale),
    phaseSlug: resource.phaseSlug,
  }));
}
