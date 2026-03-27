import type { Metadata } from "next";
import { loadPage, renderPageContent } from "@/lib/content";
import { ArticleLayout } from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "Everywhere Else",
};

export default async function NetworkPage() {
  const page = loadPage("network.md");
  if (!page) return <article><p>Page not found.</p></article>;

  const content = await renderPageContent(page.content, page.format);
  return <ArticleLayout content={content} />;
}
