/**
 * Archive generation.
 * Port of the Jekyll archives.rb plugin.
 * Groups posts by year and month, with pagination between periods.
 */

import type { EnrichedPost } from "./posts";
import { monthName } from "./dates";

export interface ArchivePeriod {
  year: number;
  month?: number;
}

export interface ArchiveNavigation {
  period: ArchivePeriod;
  previousPeriod: ArchivePeriod | null;
  nextPeriod: ArchivePeriod | null;
  firstPeriod: ArchivePeriod | null;
  lastPeriod: ArchivePeriod | null;
}

export interface YearArchive extends ArchiveNavigation {
  posts: EnrichedPost[];
  months: { month: number; name: string; posts: EnrichedPost[] }[];
}

export interface MonthArchive extends ArchiveNavigation {
  posts: EnrichedPost[];
}

/**
 * Get year and month from a post's date string.
 */
function postYearMonth(post: EnrichedPost): { year: number; month: number } {
  const date = new Date(post.frontmatter.date);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

/**
 * Get all unique year periods, sorted ascending.
 */
export function getYearPeriods(posts: EnrichedPost[]): ArchivePeriod[] {
  const years = new Set<number>();
  for (const post of posts) {
    years.add(postYearMonth(post).year);
  }
  return Array.from(years)
    .sort((a, b) => a - b)
    .map((year) => ({ year }));
}

/**
 * Get all unique month periods, sorted ascending.
 */
export function getMonthPeriods(posts: EnrichedPost[]): ArchivePeriod[] {
  const seen = new Set<string>();
  const periods: ArchivePeriod[] = [];

  for (const post of posts) {
    const { year, month } = postYearMonth(post);
    const key = `${year}-${month}`;
    if (!seen.has(key)) {
      seen.add(key);
      periods.push({ year, month });
    }
  }

  return periods.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return (a.month || 0) - (b.month || 0);
  });
}

/**
 * Build navigation for a period within a sorted list.
 */
function buildNavigation(
  periods: ArchivePeriod[],
  index: number
): Omit<ArchiveNavigation, "period"> {
  return {
    previousPeriod: index > 0 ? periods[index - 1] : null,
    nextPeriod: index < periods.length - 1 ? periods[index + 1] : null,
    firstPeriod: periods[0] || null,
    lastPeriod: periods[periods.length - 1] || null,
  };
}

/**
 * Get the archive data for a specific year.
 */
export function getYearArchive(
  posts: EnrichedPost[],
  year: number
): YearArchive | null {
  const yearPosts = posts.filter(
    (p) => postYearMonth(p).year === year
  );
  if (yearPosts.length === 0) return null;

  const yearPeriods = getYearPeriods(posts);
  const index = yearPeriods.findIndex((p) => p.year === year);
  if (index === -1) return null;

  // Group by month
  const monthMap = new Map<number, EnrichedPost[]>();
  for (const post of yearPosts) {
    const { month } = postYearMonth(post);
    if (!monthMap.has(month)) monthMap.set(month, []);
    monthMap.get(month)!.push(post);
  }

  const months = Array.from(monthMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([month, monthPosts]) => ({
      month,
      name: monthName(month),
      posts: monthPosts,
    }));

  return {
    period: { year },
    ...buildNavigation(yearPeriods, index),
    posts: yearPosts,
    months,
  };
}

/**
 * Get the archive data for a specific month.
 */
export function getMonthArchive(
  posts: EnrichedPost[],
  year: number,
  month: number
): MonthArchive | null {
  const monthPosts = posts.filter((p) => {
    const ym = postYearMonth(p);
    return ym.year === year && ym.month === month;
  });
  if (monthPosts.length === 0) return null;

  const monthPeriods = getMonthPeriods(posts);
  const index = monthPeriods.findIndex(
    (p) => p.year === year && p.month === month
  );
  if (index === -1) return null;

  return {
    period: { year, month },
    ...buildNavigation(monthPeriods, index),
    posts: monthPosts,
  };
}

/**
 * Format an archive period as a URL path.
 */
export function archiveUrl(period: ArchivePeriod): string {
  if (period.month) {
    return `/${period.year}/${period.month.toString().padStart(2, "0")}`;
  }
  return `/${period.year}`;
}

/**
 * Format an archive period for display.
 */
export function formatArchivePeriod(period: ArchivePeriod): string {
  if (period.month) {
    return `${monthName(period.month)} ${period.year}`;
  }
  return `${period.year}`;
}
