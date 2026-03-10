import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { getHtmlLang } from "@/lib/i18n";
import { getLayoutMetadata, SITE_NAME, SITE_URL } from "@/lib/site-data";
import { getRequestLocale } from "@/lib/request-locale";
import Script from "next/script";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const sans = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const serif = Noto_Serif_SC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

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
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        {shouldLoadGa ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaTrackingId}');`}
            </Script>
          </>
        ) : null}
        {shouldLoadClarity ? (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityProjectId}");`}
          </Script>
        ) : null}
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
