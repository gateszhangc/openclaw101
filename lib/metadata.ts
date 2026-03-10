import type { Metadata } from "next";

import { localizeHref, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site-data";

function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function buildPageMetadata(
  locale: Locale,
  pathname: string,
  title: string,
  description: string,
): Metadata {
  const canonicalPath = localizeHref(locale, pathname);
  const zhPath = localizeHref("zh", pathname);
  const enPath = localizeHref("en", pathname);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "zh-CN": zhPath,
        en: enPath,
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: "OpenClaw101",
      locale: locale === "en" ? "en_US" : "zh_CN",
      type: "website",
    },
  };
}

export function toAbsoluteUrl(pathname: string) {
  return absoluteUrl(pathname);
}
