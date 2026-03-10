import { getHtmlLang } from "@/lib/i18n";
import { buildSiteLayoutMetadata } from "@/lib/site-layout-metadata";

import { RootLayoutShell } from "@/components/root-layout-shell";

import "../globals.css";

export const metadata = buildSiteLayoutMetadata("zh");

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={getHtmlLang("zh")}>
      <body>
        <RootLayoutShell locale="zh">{children}</RootLayoutShell>
      </body>
    </html>
  );
}
