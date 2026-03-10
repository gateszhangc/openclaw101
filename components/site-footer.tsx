import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-white/60 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-serif)] text-xl text-white">OpenClaw101</p>
          <p className="max-w-2xl leading-7">
            Guide 负责告诉你下一步学什么，Resources 负责在你卡住时把官方、社区、源码和 Skills
            入口快速拉回来。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Link href="/guide" className="transition hover:text-white">
            Guide
          </Link>
          <Link href="/resources" className="transition hover:text-white">
            Resources
          </Link>
          <Link href="/roadmap" className="transition hover:text-white">
            Stages
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
