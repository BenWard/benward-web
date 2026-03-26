/**
 * Shortlink resolution: maps base60-encoded IDs back to post URLs.
 *
 * The shortlink ID is a base60 encoding of the post's Unix timestamp.
 * To resolve, we decode the ID to a timestamp and find the matching post.
 */

import { encodeBase60 } from "./base60";
import { loadAllPostsSync } from "./content";
import { enrichPost, type EnrichedPost } from "./posts";

const CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz";

export function decodeBase60(s: string): number {
  let result = 0;
  for (const char of s) {
    const val = CHARSET.indexOf(char);
    if (val === -1) return -1;
    result = result * 60 + val;
  }
  return result;
}

/**
 * Build a lookup map from base60 ID to post URL.
 */
export function buildShortlinkMap(): Map<string, string> {
  const posts = loadAllPostsSync().map(enrichPost);
  const map = new Map<string, string>();

  for (const post of posts) {
    const timestamp = Math.floor(new Date(post.frontmatter.date).getTime() / 1000);
    const id = encodeBase60(timestamp);
    const url = post.frontmatter.canonical || post.cleanUrl;
    map.set(id, url);
  }

  return map;
}

/**
 * Resolve a shortlink ID to a destination URL.
 * Returns the URL or null if not found.
 */
export function resolveShortlink(id: string): string | null {
  const map = buildShortlinkMap();
  return map.get(id) || null;
}
