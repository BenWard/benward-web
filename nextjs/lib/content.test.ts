import {
  parsePostFilename,
  renderMarkdown,
  renderTextile,
  loadAllPostsSync,
  loadPostSync,
} from "./content";
import fs from "fs";
import path from "path";

describe("parsePostFilename", () => {
  it("parses markdown filenames", () => {
    const result = parsePostFilename("2022-12-07-my-post.md");
    expect(result).toEqual({ date: "2022-12-07", slug: "my-post" });
  });

  it("parses textile filenames", () => {
    const result = parsePostFilename("2005-01-04-old-post.textile");
    expect(result).toEqual({ date: "2005-01-04", slug: "old-post" });
  });

  it("handles slugs with hyphens", () => {
    const result = parsePostFilename(
      "2009-02-15-a-long-slug-name.md"
    );
    expect(result).toEqual({
      date: "2009-02-15",
      slug: "a-long-slug-name",
    });
  });

  it("returns null for invalid filenames", () => {
    expect(parsePostFilename("not-a-post.txt")).toBeNull();
    expect(parsePostFilename("readme.md")).toBeNull();
  });
});

describe("renderMarkdown", () => {
  it("renders basic markdown to HTML", async () => {
    const html = await renderMarkdown("# Hello\n\nA paragraph.");
    expect(html).toContain("<h1>Hello</h1>");
    expect(html).toContain("<p>A paragraph.</p>");
  });

  it("preserves raw HTML in markdown", async () => {
    const html = await renderMarkdown(
      '<div class="h-card">content</div>'
    );
    expect(html).toContain('<div class="h-card">content</div>');
  });

  it("renders links", async () => {
    const html = await renderMarkdown("[example](https://example.com)");
    expect(html).toContain('<a href="https://example.com">example</a>');
  });
});

describe("renderTextile", () => {
  it("renders basic textile to HTML", () => {
    const html = renderTextile("h1. Hello\n\nA paragraph.");
    expect(html).toContain("Hello");
    expect(html).toContain("A paragraph");
  });
});

describe("loadAllPostsSync", () => {
  it("loads posts from the Jekyll posts directory", () => {
    const posts = loadAllPostsSync();
    expect(posts.length).toBeGreaterThan(0);
  });

  it("posts are sorted by date descending", () => {
    const posts = loadAllPostsSync();
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1].frontmatter.date).getTime();
      const curr = new Date(posts[i].frontmatter.date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("includes both markdown and textile posts", () => {
    const posts = loadAllPostsSync();
    const formats = new Set(posts.map((p) => p.format));
    expect(formats.has("markdown")).toBe(true);
    expect(formats.has("textile")).toBe(true);
  });
});

describe("loadPostSync", () => {
  it("loads a real post file", () => {
    const postsDir = path.join(
      process.cwd(),
      "..",
      "jekyll",
      "_posts",
      "blog"
    );
    // Find any markdown file
    const years = fs.readdirSync(postsDir);
    let testFile: string | null = null;
    for (const year of years) {
      const yearDir = path.join(postsDir, year);
      const stat = fs.statSync(yearDir);
      if (!stat.isDirectory()) continue;
      const files = fs.readdirSync(yearDir);
      const mdFile = files.find((f: string) => f.endsWith(".md"));
      if (mdFile) {
        testFile = path.join(yearDir, mdFile);
        break;
      }
    }

    if (testFile) {
      const post = loadPostSync(testFile);
      expect(post).not.toBeNull();
      expect(post!.frontmatter.date).toBeDefined();
      expect(post!.slug).toBeTruthy();
    }
  });
});
