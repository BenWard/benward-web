/**
 * Content loading and rendering pipeline.
 * Reads posts from the Jekyll _posts directory, parses frontmatter,
 * and renders Markdown and Textile to HTML.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import textile from "textile-js";

const POSTS_DIR = path.join(process.cwd(), "..", "jekyll", "_posts", "blog");
const PAGES_DIR = path.join(process.cwd(), "..", "jekyll");

export interface PostFrontmatter {
  layout: string;
  category: string;
  title?: string;
  date: string;
  updated?: string;
  summary?: string;
  tags?: string[];
  geo?: {
    name?: string;
    xy?: string;
  };
  canonical?: string;
  atomid?: string;
  original_service?: string;
  original_url?: string;
  tumblr_post_type?: string;
}

export interface Post {
  slug: string;
  filePath: string;
  relativePath: string;
  frontmatter: PostFrontmatter;
  content: string;
  rawContent: string;
  format: "markdown" | "textile";
}

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify);

export async function renderMarkdown(content: string): Promise<string> {
  const result = await markdownProcessor.process(content);
  return String(result);
}

export function renderTextile(content: string): string {
  return textile(content);
}

/**
 * Parse a post filename to extract date and slug.
 * Format: YYYY-MM-DD-slug.{md,textile}
 */
export function parsePostFilename(filename: string): {
  date: string;
  slug: string;
} | null {
  const match = filename.match(
    /^(\d{4}-\d{2}-\d{2})-(.+)\.(md|textile)$/
  );
  if (!match) return null;
  return { date: match[1], slug: match[2] };
}

/**
 * Recursively find all post files in the posts directory.
 */
function findPostFiles(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findPostFiles(fullPath));
    } else if (entry.name.match(/\.(md|textile)$/)) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Load and parse a single post file.
 */
export function loadPostSync(filePath: string): Post | null {
  const filename = path.basename(filePath);
  const parsed = parsePostFilename(filename);
  if (!parsed) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const format = filename.endsWith(".textile") ? "textile" : "markdown";
  const relativePath = path.relative(
    path.join(process.cwd(), "..", "jekyll"),
    filePath
  );

  return {
    slug: parsed.slug,
    filePath,
    relativePath,
    frontmatter,
    content: "", // rendered later
    rawContent: content,
    format,
  };
}

/**
 * Render the content of a post (Markdown or Textile).
 */
export async function renderPost(post: Post): Promise<Post> {
  const rendered =
    post.format === "textile"
      ? renderTextile(post.rawContent)
      : await renderMarkdown(post.rawContent);

  return { ...post, content: rendered };
}

/**
 * Load all posts, sorted by date descending.
 */
export function loadAllPostsSync(): Post[] {
  const files = findPostFiles(POSTS_DIR);
  const posts: Post[] = [];

  for (const file of files) {
    const post = loadPostSync(file);
    if (post) posts.push(post);
  }

  // Sort by date descending
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });

  return posts;
}

/**
 * Load a page file (about.html, network.md, etc.) from the Jekyll root.
 */
export function loadPage(filename: string): {
  frontmatter: Record<string, unknown>;
  content: string;
  format: "markdown" | "html";
} | null {
  const filePath = path.join(PAGES_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const format = filename.endsWith(".md") ? "markdown" : "html";

  return { frontmatter: data, content, format };
}

/**
 * Render a page's content.
 */
export async function renderPageContent(
  content: string,
  format: "markdown" | "html"
): Promise<string> {
  if (format === "markdown") {
    return renderMarkdown(content);
  }
  return content;
}
