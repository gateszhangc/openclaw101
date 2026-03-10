import type { Metadata } from "next";

import { localizeHref, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site-data";

export const SITE_SOCIAL_IMAGE = "/branding/site-og.png";

function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function buildPageMetadata(
  locale: Locale,
  pathname: string,
  title: string,
  description: string,
  imagePath: string = SITE_SOCIAL_IMAGE,
): Metadata {
  const canonicalPath = localizeHref(locale, pathname);
  const zhPath = localizeHref("zh", pathname);
  const enPath = localizeHref("en", pathname);
  const socialImage = absoluteUrl(imagePath);

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
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function toAbsoluteUrl(pathname: string) {
  return absoluteUrl(pathname);
}
