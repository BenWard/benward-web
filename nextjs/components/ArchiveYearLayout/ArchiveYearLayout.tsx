import type { YearArchive } from "@/lib/archives";
import { formatDisplay, formatTime } from "@/lib/dates";
import { ArchiveNavigation } from "@/components/ArchiveNavigation";
import styles from "./ArchiveYearLayout.module.css";

interface ArchiveYearLayoutProps {
  archive: YearArchive;
}

export function ArchiveYearLayout({ archive }: ArchiveYearLayoutProps) {
  const { period, months } = archive;

  return (
    <section className="h-feed archives annual">
      <header className={styles.headerFooter}>
        <ArchiveNavigation navigation={archive} isAnnual />
      </header>
      <h1>
        Posts from <time>{period.year}</time>
      </h1>
      {months.map(({ month, name, posts: monthPosts }) => (
        <section key={month} className={styles.monthSection}>
          <h2>{name}</h2>
          <ul>
            {monthPosts.map((post) => (
              <li key={post.slug}>
                <article className="p-entry h-entry">
                  <h3>
                    <a
                      className="u-url"
                      rel="bookmark"
                      href={
                        post.frontmatter.canonical || post.cleanUrl
                      }
                    >
                      {post.frontmatter.title}
                    </a>
                  </h3>
                  <p className="dateline">
                    <time
                      className="dt-published"
                      dateTime={post.globalDate}
                      title={formatDisplay(post.globalDate)}
                    >
                      {post.dateTitle
                        ? formatTime(post.globalDate)
                        : formatDisplay(post.globalDate)}
                    </time>
                  </p>
                  {post.excerpt && (
                    <div
                      className="e-summary"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <footer className={styles.footer}>
        <ArchiveNavigation navigation={archive} isAnnual />
      </footer>
    </section>
  );
}
