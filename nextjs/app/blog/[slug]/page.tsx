import { notFound } from "next/navigation";
import { loadAllPostsSync, renderPost } from "@/lib/content";
import { enrichPost } from "@/lib/posts";
import { BlogPostLayout } from "@/components/BlogPostLayout";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPosts = loadAllPostsSync().map(enrichPost);
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    ...(post.frontmatter.canonical && {
      alternates: { canonical: post.frontmatter.canonical },
    }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPosts = loadAllPostsSync().map(enrichPost);
  const index = allPosts.findIndex((p) => p.slug === slug);

  if (index === -1) notFound();

  const renderedPost = await renderPost(allPosts[index]);
  const enrichedRendered = { ...allPosts[index], content: renderedPost.content };

  // Posts sorted newest first: previous = older = index+1, next = newer = index-1
  const previousPost = index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const nextPost = index > 0 ? allPosts[index - 1] : null;

  return (
    <BlogPostLayout
      post={enrichedRendered}
      previousPost={previousPost}
      nextPost={nextPost}
    />
  );
}
