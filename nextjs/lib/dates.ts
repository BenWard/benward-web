/**
 * Timezone-preserving date formatting utilities.
 * Ports the Jekyll liquid_standard_filters.rb and jekyll_utils.rb plugins.
 *
 * Key principle: dates are kept as ISO 8601 strings to preserve timezone offsets.
 * We never convert to JS Date objects for display purposes, as that would lose
 * the original timezone.
 */

const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export interface ParsedDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  timezone: string;
}

/**
 * Parse an ISO 8601 date string preserving the timezone offset.
 */
export function parseDate(dateStr: string): ParsedDate {
  // Handle formats like: 2022-12-07T00:22:52-08:00, 2009-02-15T09:10:19+0000
  const match = dateStr.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([-+]\d{2}:?\d{2})$/
  );

  if (!match) {
    throw new Error(`Cannot parse date: ${dateStr}`);
  }

  let tz = match[7];
  // Normalize +0000 to +00:00
  if (tz.length === 5) {
    tz = tz.slice(0, 3) + ":" + tz.slice(3);
  }

  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    day: parseInt(match[3], 10),
    hour: parseInt(match[4], 10),
    minute: parseInt(match[5], 10),
    second: parseInt(match[6], 10),
    timezone: tz,
  };
}

/**
 * Format a date string in ISO 8601 format, preserving timezone.
 * Equivalent to strftime("%FT%T%:z")
 */
export function formatISO(dateStr: string): string {
  const d = parseDate(dateStr);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.year}-${pad(d.month)}-${pad(d.day)}T${pad(d.hour)}:${pad(d.minute)}:${pad(d.second)}${d.timezone}`;
}

/**
 * Format for display: "Dec  7 2022, 0:22 (-08:00)"
 * Equivalent to strftime("%b %e %Y, %k:%M (%z)")
 */
export function formatDisplay(dateStr: string): string {
  const d = parseDate(dateStr);
  const month = MONTHS_SHORT[d.month - 1];
  const day = d.day.toString().padStart(2, " ");
  const minute = d.minute.toString().padStart(2, "0");
  return `${month} ${day} ${d.year}, ${d.hour}:${minute} (${d.timezone})`;
}

/**
 * Format time only: "0:22 (-08:00)"
 * Equivalent to strftime("%k:%M (%z)")
 */
export function formatTime(dateStr: string): string {
  const d = parseDate(dateStr);
  const minute = d.minute.toString().padStart(2, "0");
  return `${d.hour}:${minute} (${d.timezone})`;
}

/**
 * Format as full month and year: "December 2022"
 */
export function formatMonthYear(dateStr: string): string {
  const d = parseDate(dateStr);
  return `${MONTHS_FULL[d.month - 1]} ${d.year}`;
}

/**
 * Format as full month name: "December"
 */
export function formatMonth(dateStr: string): string {
  const d = parseDate(dateStr);
  return MONTHS_FULL[d.month - 1];
}

/**
 * Get the full month name from a month number (1-12).
 */
export function monthName(month: number): string {
  return MONTHS_FULL[month - 1];
}

/**
 * Format as "YYYY/MM" for archive URLs.
 */
export function formatArchivePath(dateStr: string): string {
  const d = parseDate(dateStr);
  return `${d.year}/${d.month.toString().padStart(2, "0")}`;
}

/**
 * Format for Atom feed: "January 7, 2022"
 * Used for auto-generated titles on Tumblr imports.
 */
export function formatTitleDate(dateStr: string): string {
  const d = parseDate(dateStr);
  return `${MONTHS_FULL[d.month - 1]} ${d.day}, ${d.year}`;
}

/**
 * Get Unix timestamp from a date string.
 */
export function toUnixTimestamp(dateStr: string): number {
  return Math.floor(new Date(dateStr).getTime() / 1000);
}

/**
 * Get XML schema date format for Atom feeds.
 */
export function toXmlSchema(date: Date): string {
  return date.toISOString();
}
