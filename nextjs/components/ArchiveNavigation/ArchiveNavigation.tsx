import type { ArchiveNavigation as ArchiveNav } from "@/lib/archives";
import { archiveUrl, formatArchivePeriod } from "@/lib/archives";
import styles from "./ArchiveNavigation.module.css";

interface ArchiveNavigationProps {
  navigation: ArchiveNav;
  isAnnual?: boolean;
}

export function ArchiveNavigation({
  navigation,
  isAnnual,
}: ArchiveNavigationProps) {
  const { period, previousPeriod, nextPeriod, firstPeriod, lastPeriod } =
    navigation;
  const isMonthly = !!period.month;

  return (
    <nav className={`${styles.nav} ${isAnnual ? styles.navAnnual : ""}`}>
      {previousPeriod ? (
        <a rel="prev" href={archiveUrl(previousPeriod)}>
          ← {formatArchivePeriod(previousPeriod)}
        </a>
      ) : lastPeriod ? (
        <a rel="last" href={archiveUrl(lastPeriod)}>
          ↳ {formatArchivePeriod(lastPeriod)}
        </a>
      ) : (
        <span />
      )}
      {isMonthly && (
        <a rel="parent" href={`/${period.year}`}>
          ↑ {period.year}
        </a>
      )}
      {nextPeriod ? (
        <a rel="next" href={archiveUrl(nextPeriod)}>
          {formatArchivePeriod(nextPeriod)} →
        </a>
      ) : firstPeriod ? (
        <a rel="first" href={archiveUrl(firstPeriod)}>
          {formatArchivePeriod(firstPeriod)} ↵
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}
