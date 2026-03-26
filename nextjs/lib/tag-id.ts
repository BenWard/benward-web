/**
 * Generate RFC 4151 tag URIs for Atom feed entries.
 * Port of the Jekyll tag_id.rb plugin.
 */

import { siteConfig } from "@/config/site";

export function generateTagId(dateStr: string, cleanUrl: string): string {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();

  const domain =
    year >= 2018 ? siteConfig.currentDomain : siteConfig.legacyDomain;

  const dateFormatted = dateStr.slice(0, 10); // YYYY-MM-DD

  return `tag:${domain},${dateFormatted}:${cleanUrl}`;
}
