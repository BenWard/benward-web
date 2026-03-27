import type { EnrichedPost } from "@/lib/posts";
import { formatDisplay, formatTime } from "@/lib/dates";
import styles from "./PostSummary.module.css";

interface PostSummaryProps {
  post: EnrichedPost;
}

export function PostSummary({ post }: PostSummaryProps) {
  const url = post.frontmatter.canonical || post.cleanUrl;
  const timeDisplay = post.dateTitle
    ? formatTime(post.globalDate)
    : formatDisplay(post.globalDate);

  return (
    <article className={`${styles.article} h-entry`}>
      <h2>
        <a className="u-url" rel="bookmark" href={url}>
          {post.frontmatter.title}
        </a>
      </h2>
      <p className={styles.dateline}>
        <time
          className="dt-published"
          dateTime={post.globalDate}
          title={formatDisplay(post.globalDate)}
        >
          {timeDisplay}
        </time>
      </p>
      {post.excerpt && (
        <div
          className="e-summary"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      )}
    </article>
  );
}
