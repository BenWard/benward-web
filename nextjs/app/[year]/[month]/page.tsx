import { notFound } from "next/navigation";
import { loadAllPostsSync } from "@/lib/content";
import { enrichPost } from "@/lib/posts";
import { getMonthArchive } from "@/lib/archives";
import { monthName } from "@/lib/dates";
import { ArchiveMonthLayout } from "@/components/ArchiveMonthLayout";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const m = parseInt(month, 10);
  const label = m >= 1 && m <= 12 ? `${monthName(m)} ${year}` : `${year}/${month}`;
  return { title: label };
}

export default async function MonthArchivePage({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year: yearStr, month: monthStr } = await params;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) notFound();

  const allPosts = loadAllPostsSync().map(enrichPost);
  const archive = getMonthArchive(allPosts, year, month);

  if (!archive) notFound();

  return <ArchiveMonthLayout archive={archive} />;
}
