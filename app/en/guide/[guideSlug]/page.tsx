import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideDetailPage } from "@/components/pages/guide-detail-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { getGuideCoverAsset } from "@/lib/site-assets";

type GuidePageProps = {
  params: Promise<{
    guideSlug: string;
  }>;
};

export async function generateStaticParams() {
  const guides = await getAllGuides("en");
  return guides.map((guide) => ({
    guideSlug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const guide = await getGuideBySlug("en", guideSlug);

  if (!guide) {
    return {};
  }

  return buildPageMetadata("en", `/guide/${guide.slug}`, guide.title, guide.summary, {
    socialImage: getGuideCoverAsset(guide.slug),
    twitterImage: getGuideCoverAsset(guide.slug),
    imageAlt: guide.title,
  });
}

export default async function Page({ params }: GuidePageProps) {
  const { guideSlug } = await params;
  const guide = await getGuideBySlug("en", guideSlug);

  if (!guide) {
    notFound();
  }

  return <GuideDetailPage locale="en" guideSlug={guideSlug} />;
}
