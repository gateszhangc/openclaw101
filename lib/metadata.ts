import type { Metadata } from "next";

import { localizeHref, type Locale } from "@/lib/i18n";
import {
  DEFAULT_OPEN_GRAPH_ASSET,
  DEFAULT_TWITTER_ASSET,
  type StaticImageAsset,
} from "@/lib/site-assets";
import { SITE_URL } from "@/lib/site-data";

function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

type BuildPageMetadataOptions = {
  socialImage?: StaticImageAsset;
  twitterImage?: StaticImageAsset;
  imageAlt?: string;
};

export function buildPageMetadata(
  locale: Locale,
  pathname: string,
  title: string,
  description: string,
  options?: BuildPageMetadataOptions,
): Metadata {
  const canonicalPath = localizeHref(locale, pathname);
  const zhPath = localizeHref("zh", pathname);
  const enPath = localizeHref("en", pathname);
  const socialImage = options?.socialImage || DEFAULT_OPEN_GRAPH_ASSET;
  const twitterImage = options?.twitterImage || DEFAULT_TWITTER_ASSET;
  const imageAlt = options?.imageAlt || title;

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
          url: absoluteUrl(socialImage.path),
          width: socialImage.width,
          height: socialImage.height,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: absoluteUrl(twitterImage.path),
          width: twitterImage.width,
          height: twitterImage.height,
          alt: imageAlt,
        },
      ],
    },
  };
}

export function toAbsoluteUrl(pathname: string) {
  return absoluteUrl(pathname);
}
