import type { Metadata } from "next";
import { getHtmlLang } from "@/lib/i18n";
import { SITE_SOCIAL_IMAGE, toAbsoluteUrl } from "@/lib/metadata";
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
      icon: [{ url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
      shortcut: [{ url: "/icon.png", type: "image/png" }],
    },
    openGraph: {
      title: layoutMetadata.defaultTitle,
      description: layoutMetadata.description,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "en" ? "en_US" : "zh_CN",
      images: [
        {
          url: toAbsoluteUrl(SITE_SOCIAL_IMAGE),
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: layoutMetadata.defaultTitle,
      description: layoutMetadata.description,
      images: [toAbsoluteUrl(SITE_SOCIAL_IMAGE)],
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
