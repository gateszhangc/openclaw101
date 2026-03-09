import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
            OC
          </span>
          <div className="leading-tight">
            <p className="font-[family-name:var(--font-serif)] text-lg font-semibold text-white">
              OpenClaw101
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Starter Route</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <Link href="/tutorials" className="transition hover:text-white">
            教程页
          </Link>
          <Link href="/roadmap" className="transition hover:text-white">
            教程路线
          </Link>
          <Link href="/resources" className="transition hover:text-white">
            资源聚合
          </Link>
          <Link href="/#faq" className="transition hover:text-white">
            FAQ
          </Link>
          <Link
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/tutorials"
            className="hidden rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_40px_rgba(255,90,54,0.35)] transition hover:bg-[var(--color-accent-strong)] md:inline-flex"
          >
            开始学习
          </Link>
        </div>
      </div>
    </header>
  );
}
