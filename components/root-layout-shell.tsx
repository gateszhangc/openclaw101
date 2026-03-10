import type { ReactNode } from "react";

import type { Locale } from "@/lib/i18n";

import { DeferredAnalytics } from "@/components/deferred-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type RootLayoutShellProps = {
  children: ReactNode;
  locale: Locale;
};

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

export function RootLayoutShell({ children, locale }: RootLayoutShellProps) {
  return (
    <>
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
    </>
  );
}
