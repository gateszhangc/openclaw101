import { NotFoundPage } from "@/components/pages/not-found-page";
import { getRequestLocale } from "@/lib/request-locale";

export default async function NotFound() {
  const locale = await getRequestLocale();

  return <NotFoundPage locale={locale} />;
}
