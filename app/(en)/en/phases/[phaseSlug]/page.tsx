import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PhasePage, getPhaseStaticParams } from "@/components/pages/phase-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getPhaseBySlug } from "@/lib/site-data";

type PhasePageProps = {
  params: Promise<{
    phaseSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getPhaseStaticParams();
}

export async function generateMetadata({ params }: PhasePageProps): Promise<Metadata> {
  const { phaseSlug } = await params;
  const phase = getPhaseBySlug("en", phaseSlug);

  if (!phase) {
    return {};
  }

  return buildPageMetadata(
    "en",
    `/phases/${phase.slug}`,
    `${phase.label} ${phase.title}`,
    phase.description,
  );
}

export default async function Page({ params }: PhasePageProps) {
  const { phaseSlug } = await params;
  const phase = getPhaseBySlug("en", phaseSlug);

  if (!phase) {
    notFound();
  }

  return <PhasePage locale="en" phaseSlug={phaseSlug} />;
}
