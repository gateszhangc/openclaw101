import type { MetadataRoute } from "next";

import { getAllGuides } from "@/lib/guides";
import { PHASES, SITE_URL } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getAllGuides();

  return [
    "",
    "/guide",
    "/roadmap",
    "/resources",
    ...PHASES.map((phase) => `/phases/${phase.slug}`),
    ...guides.map((guide) => `/guide/${guide.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
