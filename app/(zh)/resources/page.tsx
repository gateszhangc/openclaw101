import { ResourcesPage } from "@/components/pages/resources-page";

type ResourcesPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    query?: string | string[];
  }>;
};

function getFirstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value || "";
}

export default async function Page({ searchParams }: ResourcesPageProps) {
  const params = await searchParams;

  return (
    <ResourcesPage
      locale="zh"
      searchParams={Promise.resolve({
        category: getFirstValue(params.category),
        query: getFirstValue(params.query),
      })}
    />
  );
}
