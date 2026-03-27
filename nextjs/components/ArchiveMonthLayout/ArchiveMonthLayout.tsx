import type { MonthArchive } from "@/lib/archives";
import { monthName } from "@/lib/dates";
import { ArchiveNavigation } from "@/components/ArchiveNavigation";
import { PostSummary } from "@/components/PostSummary";
import styles from "./ArchiveMonthLayout.module.css";

interface ArchiveMonthLayoutProps {
  archive: MonthArchive;
}

export function ArchiveMonthLayout({ archive }: ArchiveMonthLayoutProps) {
  const { period, posts } = archive;
  const displayMonth = period.month ? monthName(period.month) : "";
  const dateTime = `${period.year}-${String(period.month).padStart(2, "0")}`;

  return (
    <section className="h-feed archives monthly">
      <header className={styles.headerFooter}>
        <ArchiveNavigation navigation={archive} />
      </header>
      <h1>
        Posts from{" "}
        <time dateTime={dateTime}>
          {displayMonth} {period.year}
        </time>
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <PostSummary post={post} />
          </li>
        ))}
      </ul>
      <footer className={styles.footer}>
        <ArchiveNavigation navigation={archive} />
      </footer>
    </section>
  );
}
