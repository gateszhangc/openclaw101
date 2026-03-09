export type ResourceCategory =
  | "官方"
  | "部署"
  | "视频"
  | "社区"
  | "技能"
  | "更新";

export type ResourceLanguage = "中文" | "英文";

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

export const SITE_NAME = "OpenClaw101";
export const SITE_DESCRIPTION =
  "用一条清晰学习路线，从 0 到真正上手 OpenClaw。";
export const SITE_URL =
  process.env.NEXT_PUBLIC_WEB_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://openclaw101.xyz";

export const GUIDE_LESSON_SLUG = "01-what-is-openclaw";

export const PHASES: PhaseEntry[] = [
  {
    slug: "phase-install",
    label: "Phase 1",
    title: "安装与启动",
    shortTitle: "安装与启动",
    description: "把环境、安装、Gateway 和第一次对话一次讲清楚。",
    goals: [
      "完成环境准备",
      "成功安装 OpenClaw",
      "确认 Gateway 正常工作",
      "在 Dashboard 完成第一次对话",
    ],
    lessonSlug: "02-install-and-dashboard",
    roadmapPoints: ["环境选择", "onboard 流程", "Dashboard 第一条消息"],
    accent: "from-orange-500/35 to-rose-500/10",
  },
  {
    slug: "phase-models",
    label: "Phase 2",
    title: "模型与认证",
    shortTitle: "模型与认证",
    description: "把 Provider、Model、Auth 三件事拆开，解决最常见的玄学感。",
    goals: [
      "理解 Provider 和 Model 的区别",
      "理清登录与认证方式",
      "选定一条默认模型路线",
      "减少首次配置排错成本",
    ],
    lessonSlug: "03-models-and-auth",
    roadmapPoints: ["Provider 是谁", "Model 怎么选", "Auth 为什么常出错"],
    accent: "from-cyan-500/30 to-sky-500/10",
  },
  {
    slug: "phase-channels",
    label: "Phase 3",
    title: "工具与连接",
    shortTitle: "工具与连接",
    description: "把聊天渠道接上，让助手从浏览器真正进入你的工作入口。",
    goals: [
      "理解 Gateway 和 Channel 的关系",
      "配置第一条外部渠道",
      "完成 Telegram pairing",
      "解决机器人在线但不回复的高频问题",
    ],
    lessonSlug: "04-telegram-and-channels",
    roadmapPoints: ["渠道入口", "Telegram pairing", "首次外部对话"],
    accent: "from-violet-500/30 to-fuchsia-500/10",
  },
  {
    slug: "phase-memory",
    label: "Phase 4",
    title: "Skills 与人格扩展",
    shortTitle: "人格与记忆",
    description: "通过人格文件和长期记忆，把模板 AI 养成像你的人。",
    goals: [
      "理解 SOUL、USER、IDENTITY、AGENTS 的职责",
      "写出会影响行为的设定",
      "建立长期记忆边界",
      "让助手更像团队成员而不是客服",
    ],
    lessonSlug: "05-soul-and-memory",
    roadmapPoints: ["SOUL.md", "USER.md", "IDENTITY.md", "AGENTS.md"],
    accent: "from-amber-400/35 to-orange-500/10",
  },
  {
    slug: "phase-automation",
    label: "Phase 5",
    title: "自动化进阶",
    shortTitle: "自动化进阶",
    description: "安装 Skills、理解 ClawHub、打开 Heartbeat 和 Cron，让它开始主动干活。",
    goals: [
      "理解 Skills 和工具实现的关系",
      "学会浏览和安装 Skills",
      "分清 Heartbeat 和 Cron 的职责",
      "搭出最小自动化骨架",
    ],
    lessonSlug: "06-skills-and-automation",
    roadmapPoints: ["ClawHub", "Heartbeat", "Cron", "最小自动化骨架"],
    accent: "from-emerald-500/30 to-teal-500/10",
  },
];

export const LESSON_PHASE_MAP = new Map(
  PHASES.map((phase) => [phase.lessonSlug, phase.slug]),
);

export const HOME_REASONS = [
  {
    title: "少踩坑",
    copy: "把第一次上手最容易卡住的地方提前讲明白，不让你在配置项里兜圈子。",
  },
  {
    title: "按阶段学习",
    copy: "先跑通，再理解，再扩展。每个阶段只盯住一个关键结果。",
  },
  {
    title: "聚合高质量资源",
    copy: "把官方文档、仓库、社区和技能生态整理到一个入口里，减少来回切换。",
  },
];

export const THREE_STEPS = [
  {
    step: "先跑通",
    copy: "先在 Dashboard 完成第一次对话，确认系统真的能工作。",
  },
  {
    step: "再接入口",
    copy: "接上模型、认证和 Telegram，把 AI 从浏览器带到你真正会打开的聊天入口里。",
  },
  {
    step: "再养成助手",
    copy: "写人格、装 Skills、开自动化，让它开始像你的助手，而不是通用机器人。",
  },
];

export const HOME_OUTCOMES = [
  "一个已经跑通的 OpenClaw",
  "一个能在 Telegram 里跟你说话的助手",
  "一套你自己写出来的人格与边界",
  "至少一个能工作的 Skill",
  "一套最小自动化骨架",
];

export const HOME_FAQS = [
  {
    question: "OpenClaw 是什么？",
    answer:
      "它不是另一个聊天框，而是一套把大模型变成长期开工助手的运行平台。",
  },
  {
    question: "新手最低门槛是什么？",
    answer:
      "你不需要先懂完全部架构，只需要愿意先跑通第一次对话，再按阶段理解后面的配置。",
  },
  {
    question: "必须会代码吗？",
    answer:
      "不用先是工程师才能开始，但会更适合愿意折腾工具、服务器和聊天渠道的人。",
  },
  {
    question: "先看教程还是先看官方文档？",
    answer:
      "先用教程建立主线，再用官方文档做查阅和校验，效率会更高。",
  },
];

export const RESOURCE_ENTRIES: ResourceEntry[] = [
  {
    slug: "official-getting-started",
    title: "官方入门指南",
    summary: "最权威的起点，适合和教程并行阅读，核对安装命令与基础流程。",
    url: "https://docs.openclaw.ai/zh-CN/start/getting-started",
    source: "OpenClaw Docs",
    category: "官方",
    language: "中文",
    featured: true,
    tags: ["入门", "安装"],
    phaseSlug: "phase-install",
  },
  {
    slug: "official-onboarding",
    title: "官方新手引导",
    summary: "适合第一次跑通 Dashboard 和 onboarding 流程时对照查看。",
    url: "https://docs.openclaw.ai/zh-CN/start/onboarding",
    source: "OpenClaw Docs",
    category: "部署",
    language: "中文",
    featured: true,
    tags: ["onboarding", "初次配置"],
    phaseSlug: "phase-install",
  },
  {
    slug: "official-providers",
    title: "模型提供商总览",
    summary: "理清 Provider、Model 和接入方式，适合搭配第 3 篇教程使用。",
    url: "https://docs.openclaw.ai/zh-CN/providers",
    source: "OpenClaw Docs",
    category: "官方",
    language: "中文",
    featured: false,
    tags: ["provider", "model"],
    phaseSlug: "phase-models",
  },
  {
    slug: "official-channels",
    title: "聊天渠道总览",
    summary: "官方渠道能力总览，适合确认 Telegram 之外还可以接哪些入口。",
    url: "https://docs.openclaw.ai/zh-CN/channels",
    source: "OpenClaw Docs",
    category: "官方",
    language: "中文",
    featured: false,
    tags: ["channels", "telegram"],
    phaseSlug: "phase-channels",
  },
  {
    slug: "github-repo",
    title: "GitHub 仓库",
    summary: "看源码、Issue、版本节奏和社区反馈的第一入口。",
    url: "https://github.com/openclaw/openclaw",
    source: "GitHub",
    category: "更新",
    language: "英文",
    featured: true,
    tags: ["源码", "issue", "更新"],
  },
  {
    slug: "clawhub",
    title: "ClawHub 技能生态",
    summary: "浏览、安装和理解 Skills 的入口，适合进入自动化阶段后集中使用。",
    url: "https://clawhub.ai",
    source: "ClawHub",
    category: "技能",
    language: "英文",
    featured: true,
    tags: ["skills", "ecosystem"],
    phaseSlug: "phase-automation",
  },
  {
    slug: "discord-community",
    title: "Discord 社区",
    summary: "遇到安装、渠道或版本问题时，社区讨论能补足官方文档没有写细的地方。",
    url: "https://discord.com/invite/openclaw",
    source: "Discord",
    category: "社区",
    language: "英文",
    featured: false,
    tags: ["community", "support"],
  },
  {
    slug: "bilibili-search",
    title: "B 站 OpenClaw 视频搜索",
    summary: "适合偏视频学习的用户，快速补上安装演示和实机感知。",
    url: "https://search.bilibili.com/all?keyword=OpenClaw",
    source: "Bilibili",
    category: "视频",
    language: "中文",
    featured: true,
    tags: ["视频", "中文"],
  },
  {
    slug: "github-discussions",
    title: "GitHub Discussions",
    summary: "适合看真实使用问题、迁移经验和社区方案比较。",
    url: "https://github.com/openclaw/openclaw/discussions",
    source: "GitHub",
    category: "社区",
    language: "英文",
    featured: false,
    tags: ["community", "qa"],
  },
  {
    slug: "github-releases",
    title: "GitHub Releases",
    summary: "快速了解版本更新、修复项和升级节奏，适合上线后持续关注。",
    url: "https://github.com/openclaw/openclaw/releases",
    source: "GitHub",
    category: "更新",
    language: "英文",
    featured: false,
    tags: ["release", "changelog"],
  },
];
