import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center sm:px-6 lg:px-8">
      <p className="section-kicker">Not Found</p>
      <h1 className="font-[family-name:var(--font-serif)] text-4xl text-white">
        这个页面不存在
      </h1>
      <p className="max-w-xl text-lg leading-8 text-white/68">
        你可以回到首页继续走教程主线，或者直接进入资源聚合页。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
        >
          返回首页
        </Link>
        <Link
          href="/resources"
          className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80"
        >
          浏览资源
        </Link>
      </div>
    </div>
  );
}
