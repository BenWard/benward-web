import { loadAllPostsSync } from "@/lib/content";
import { enrichPost } from "@/lib/posts";
import { formatArchivePath } from "@/lib/dates";
import { Cover } from "@/components/Cover";
import { PostSummary } from "@/components/PostSummary";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const allPosts = loadAllPostsSync().map(enrichPost);
  const recentPosts = allPosts.slice(0, 10);
  const lastPost = recentPosts[recentPosts.length - 1];
  const lastDate = lastPost ? formatArchivePath(lastPost.globalDate) : "";

  return (
    <section className="h-feed recent">
      <Cover />
      <h1>Recent Posts</h1>
      <ol className="posts">
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <PostSummary post={post} />
          </li>
        ))}
      </ol>
      <footer>
        <nav>
          <a rel="parent" href={`/${lastDate}`}>
            ↑ Archive
          </a>{" "}
          <a href="/network">⇶ Elsewhere</a>
        </nav>
      </footer>
    </section>
  );
}
