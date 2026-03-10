import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideDetailPage } from "@/components/pages/guide-detail-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";

type GuidePageProps = {
  params: Promise<{
    guideSlug: string;
  }>;
};

export async function generateStaticParams() {
  const guides = await getAllGuides("zh");
  return guides.map((guide) => ({
    guideSlug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const guide = await getGuideBySlug("zh", guideSlug);

  if (!guide) {
    return {};
  }

  return buildPageMetadata("zh", `/guide/${guide.slug}`, guide.title, guide.summary);
}

export default async function Page({ params }: GuidePageProps) {
  const { guideSlug } = await params;
  const guide = await getGuideBySlug("zh", guideSlug);

  if (!guide) {
    notFound();
  }

  return <GuideDetailPage locale="zh" guideSlug={guideSlug} />;
}
