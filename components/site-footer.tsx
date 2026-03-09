import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-white/60 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-serif)] text-xl text-white">OpenClaw101</p>
          <p className="max-w-2xl leading-7">
            用一条清晰学习路线，把 OpenClaw 从第一次聊天一路带到技能和自动化。教程是主线，资源页负责把高价值入口收拢到一起。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Link href="/tutorials" className="transition hover:text-white">
            教程页
          </Link>
          <Link href="/roadmap" className="transition hover:text-white">
            路线图
          </Link>
          <Link href="/resources" className="transition hover:text-white">
            资源页
          </Link>
          <Link
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
