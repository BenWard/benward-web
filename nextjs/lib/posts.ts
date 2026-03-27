/**
 * Post enrichment utilities.
 * Port of the Jekyll jekyl_post.rb plugin.
 */

import { siteConfig } from "@/config/site";
import type { Post } from "./content";
import { formatTitleDate } from "./dates";

export interface EnrichedPost extends Post {
  cleanUrl: string;
  githubSourceUrl: string;
  globalDate: string;
  dateTitle: boolean;
  excerpt: string;
}

/**
 * Generate a clean URL (without .html) for a post.
 * Jekyll permalink: /:categories/:title.html -> /blog/slug
 */
export function cleanUrl(post: Post): string {
  const category = post.frontmatter.category || "blog";
  return `/${category}/${post.slug}`;
}

/**
 * Generate a GitHub source URL for a post.
 */
export function githubSourceUrl(post: Post): string {
  return `https://github.com/${siteConfig.githubSlug}/tree/main/${siteConfig.gitBase}/${post.relativePath}`;
}

/**
 * Auto-generate a title from the date for untitled posts (Tumblr imports).
 */
export function generateTitle(dateStr: string): string {
  try {
    return formatTitleDate(dateStr);
  } catch {
    return "Post";
  }
}

/**
 * Get the excerpt for a post: prefer `summary` frontmatter, otherwise empty.
 */
export function getExcerpt(post: Post): string {
  return post.frontmatter.summary || "";
}

/**
 * Enrich a post with computed properties.
 */
export function enrichPost(post: Post): EnrichedPost {
  const hasTitle = !!post.frontmatter.title;
  const title = hasTitle
    ? post.frontmatter.title!
    : generateTitle(post.frontmatter.date);

  return {
    ...post,
    frontmatter: {
      ...post.frontmatter,
      title,
    },
    cleanUrl: cleanUrl(post),
    githubSourceUrl: githubSourceUrl(post),
    globalDate: post.frontmatter.date,
    dateTitle: !hasTitle,
    excerpt: getExcerpt(post),
  };
}
