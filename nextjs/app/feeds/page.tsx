import type { Metadata } from "next";
import { loadPage, renderPageContent } from "@/lib/content";
import { ArticleLayout } from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "Feeds and Following",
};

export default async function FeedsPage() {
  const page = loadPage("feeds.md");
  if (!page) return <article><p>Page not found.</p></article>;

  const content = await renderPageContent(page.content, page.format);
  return <ArticleLayout content={content} />;
}
