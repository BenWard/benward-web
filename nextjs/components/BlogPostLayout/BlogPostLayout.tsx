import type { EnrichedPost } from "@/lib/posts";
import { formatDisplay, formatArchivePath, formatMonthYear } from "@/lib/dates";
import { Share } from "@/components/Share";
import styles from "./BlogPostLayout.module.css";

interface BlogPostLayoutProps {
  post: EnrichedPost;
  previousPost: EnrichedPost | null;
  nextPost: EnrichedPost | null;
}

export function BlogPostLayout({
  post,
  previousPost,
  nextPost,
}: BlogPostLayoutProps) {
  const archivePath = formatArchivePath(post.globalDate);
  const archiveLabel = formatMonthYear(post.globalDate);

  return (
    <article className="h-entry">
      <h1 className={`p-name ${styles.title}`}>{post.frontmatter.title}</h1>
      <div className={styles.dateline}>
        <p className="time">
          <time className="dt-published" dateTime={post.globalDate}>
            {formatDisplay(post.globalDate)}
          </time>
          .
          {post.frontmatter.updated && (
            <>
              {" "}
              Updated:{" "}
              <time className="dt-updated" dateTime={post.frontmatter.updated}>
                {formatDisplay(post.frontmatter.updated)}
              </time>
              .
            </>
          )}
        </p>
        {post.frontmatter.geo?.name && (
          <p className="place">
            {post.frontmatter.geo.xy && (
              <data className="p-geo h-geo" value={post.frontmatter.geo.xy} />
            )}
            <span className="p-adr">{post.frontmatter.geo.name}</span>
          </p>
        )}
      </div>
      <div
        className="e-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <ul className={styles.tags}>
          {post.frontmatter.tags.map((tag) => (
            <li key={tag}>
              <a className="p-category" rel="tag" href={`/tags/${tag}`}>
                {tag}
              </a>
            </li>
          ))}
        </ul>
      )}
      <Share
        cleanUrl={post.cleanUrl}
        globalDate={post.globalDate}
        githubSourceUrl={post.githubSourceUrl}
      />
      <footer className={styles.navFooter}>
        <nav className={styles.nav}>
          {previousPost ? (
            <a
              rel="prev"
              href={previousPost.cleanUrl}
              title={previousPost.frontmatter.title}
            >
              ← Older
            </a>
          ) : (
            <span />
          )}
          <a rel="parent" href={`/${archivePath}`}>
            ↑ {archiveLabel}
          </a>
          {nextPost ? (
            <a
              rel="next"
              href={nextPost.cleanUrl}
              title={nextPost.frontmatter.title}
            >
              Newer →
            </a>
          ) : (
            <span />
          )}
        </nav>
      </footer>
    </article>
  );
}
