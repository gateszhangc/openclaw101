export const LOCALES = ["zh", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh";

export function getLocalePrefix(locale: Locale) {
  return locale === "en" ? "/en" : "";
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  const normalized = pathname.replace(/^\/en(?=\/|$)/, "");
  return normalized || "/";
}

export function localizeHref(locale: Locale, href: string) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const [pathname, query = ""] = href.split("?");
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const unprefixedPath = stripLocalePrefix(normalizedPath);
  const localizedPath =
    locale === "en" && unprefixedPath !== "/"
      ? `/en${unprefixedPath}`
      : locale === "en"
        ? "/en"
        : unprefixedPath;

  return query ? `${localizedPath}?${query}` : localizedPath;
}

export function getHtmlLang(locale: Locale) {
  return locale === "en" ? "en" : "zh-CN";
}
