import type { Metadata } from "next";
import { getHtmlLang } from "@/lib/i18n";
import { DEFAULT_OPEN_GRAPH_ASSET, DEFAULT_TWITTER_ASSET } from "@/lib/site-assets";
import { getLayoutMetadata, SITE_NAME, SITE_URL } from "@/lib/site-data";
import { getRequestLocale } from "@/lib/request-locale";

import { DeferredAnalytics } from "@/components/deferred-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const layoutMetadata = getLayoutMetadata(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: layoutMetadata.defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: layoutMetadata.description,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: [{ url: "/favicon.ico" }],
    },
    openGraph: {
      title: layoutMetadata.defaultTitle,
      description: layoutMetadata.description,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "zh_CN",
      type: "website",
      images: [
        {
          url: DEFAULT_OPEN_GRAPH_ASSET.path,
          width: DEFAULT_OPEN_GRAPH_ASSET.width,
          height: DEFAULT_OPEN_GRAPH_ASSET.height,
          alt: layoutMetadata.defaultTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: layoutMetadata.defaultTitle,
      description: layoutMetadata.description,
      images: [
        {
          url: DEFAULT_TWITTER_ASSET.path,
          width: DEFAULT_TWITTER_ASSET.width,
          height: DEFAULT_TWITTER_ASSET.height,
          alt: layoutMetadata.defaultTitle,
        },
      ],
    },
  };
}

const gaTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const shouldLoadGa = Boolean(
  gaTrackingId &&
    /^G-[A-Z0-9]+$/i.test(gaTrackingId) &&
    !/pending|placeholder/i.test(gaTrackingId),
);
const shouldLoadClarity = Boolean(
  clarityProjectId &&
    !/pending|placeholder/i.test(clarityProjectId),
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html lang={getHtmlLang(locale)}>
      <body>
        <DeferredAnalytics
          gaTrackingId={shouldLoadGa ? gaTrackingId : undefined}
          clarityProjectId={shouldLoadClarity ? clarityProjectId : undefined}
        />
        <div className="site-shell">
          <div className="site-grid" />
          <div className="hero-wash" />
          <SiteHeader locale={locale} />
          <main className="relative z-10 min-h-[calc(100vh-10rem)]">{children}</main>
          <SiteFooter locale={locale} />
        </div>
      </body>
    </html>
  );
}
