import type { Metadata } from "next";
import { getHtmlLang } from "@/lib/i18n";
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
