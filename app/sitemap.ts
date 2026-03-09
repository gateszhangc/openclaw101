import type { MetadataRoute } from "next";

import { getAllTutorials } from "@/lib/content";
import { PHASES, SITE_URL } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tutorials = await getAllTutorials();

  return [
    "",
    "/tutorials",
    "/roadmap",
    "/resources",
    ...PHASES.map((phase) => `/phases/${phase.slug}`),
    ...tutorials.map((tutorial) => `/tutorials/${tutorial.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
