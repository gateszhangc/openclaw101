import type { MetadataRoute } from "next";

import { getAllGuides } from "@/lib/guides";
import { getAllPhaseSlugs, SITE_URL } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [zhGuides, enGuides] = await Promise.all([getAllGuides("zh"), getAllGuides("en")]);
  const phaseSlugs = getAllPhaseSlugs();

  return [
    "",
    "/guide",
    "/roadmap",
    "/resources",
    "/en",
    "/en/guide",
    "/en/roadmap",
    "/en/resources",
    ...phaseSlugs.flatMap((phaseSlug) => [`/phases/${phaseSlug}`, `/en/phases/${phaseSlug}`]),
    ...zhGuides.map((guide) => `/guide/${guide.slug}`),
    ...enGuides.map((guide) => `/en/guide/${guide.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
