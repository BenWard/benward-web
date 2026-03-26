import { notFound } from "next/navigation";
import { loadAllPostsSync } from "@/lib/content";
import { enrichPost } from "@/lib/posts";
import { getYearArchive } from "@/lib/archives";
import { ArchiveYearLayout } from "@/components/ArchiveYearLayout";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  return { title: year };
}

export default async function YearArchivePage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearStr } = await params;
  const year = parseInt(yearStr, 10);

  if (isNaN(year) || year < 2000 || year > 2100) notFound();

  const allPosts = loadAllPostsSync().map(enrichPost);
  const archive = getYearArchive(allPosts, year);

  if (!archive) notFound();

  return <ArchiveYearLayout archive={archive} />;
}
