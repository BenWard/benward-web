/**
 * Rendering comparison tests: verify Next.js output matches Jekyll expectations
 * for specific blog posts.
 */

import { describe, it, expect, beforeAll } from "vitest";
import path from "path";
import { loadPostSync, renderPost } from "./content";
import { enrichPost } from "./posts";
import { formatDisplay, formatISO, formatArchivePath, formatMonthYear } from "./dates";
import { shortlink } from "./base60";
import { generateTagId } from "./tag-id";
import { siteConfig } from "@/config/site";

const JEKYLL_BASE = path.join(process.cwd(), "..", "jekyll");

describe("Markdown post rendering: top-5-2017", () => {
  const filePath = path.join(
    JEKYLL_BASE,
    "_posts",
    "blog",
    "2018",
    "2018-01-02-top-5-2017.md"
  );

  let post: ReturnType<typeof enrichPost>;
  let renderedContent: string;

  beforeAll(async () => {
    const raw = loadPostSync(filePath)!;
    post = enrichPost(raw);
    const rendered = await renderPost(post);
    renderedContent = rendered.content;
  });

  describe("frontmatter", () => {
    it("has correct title", () => {
      expect(post.frontmatter.title).toBe("Parboiled Kettle: Ben's 5 for 2017");
    });

    it("has correct category", () => {
      expect(post.frontmatter.category).toBe("blog");
    });

    it("has correct date", () => {
      expect(post.frontmatter.date).toBe("2018-01-02T12:00:00-08:00");
    });

    it("has canonical URL", () => {
      expect(post.frontmatter.canonical).toBe(
        "https://bff.fm/posts/by/benward/1904"
      );
    });

    it("has geo data", () => {
      expect(post.frontmatter.geo?.name).toBe(
        "San Francisco, United States"
      );
      expect(post.frontmatter.geo?.xy).toBe("37.751,-122.436");
    });

    it("has tags", () => {
      expect(post.frontmatter.tags).toEqual(["music", "lists", "bffdotfm"]);
    });

    it("has summary/excerpt", () => {
      expect(post.excerpt).toContain("In 2017, Simon, myself");
    });
  });

  describe("enriched properties", () => {
    it("generates clean URL", () => {
      // Jekyll permalink: /:categories/:title.html -> /blog/top-5-2017
      expect(post.cleanUrl).toBe("/blog/top-5-2017");
    });

    it("generates GitHub source URL", () => {
      expect(post.githubSourceUrl).toBe(
        "https://github.com/BenWard/benward-web/tree/main/jekyll/_posts/blog/2018/2018-01-02-top-5-2017.md"
      );
    });

    it("preserves global date with timezone", () => {
      expect(post.globalDate).toBe("2018-01-02T12:00:00-08:00");
    });

    it("is not a date-titled post", () => {
      expect(post.dateTitle).toBe(false);
    });
  });

  describe("date formatting (matching Jekyll strftime)", () => {
    it("formatDisplay matches Jekyll dateformat", () => {
      // Jekyll: "%b %e %Y, %k:%M (%z)" -> "Jan  2 2018, 12:00 (-08:00)"
      expect(formatDisplay(post.globalDate)).toBe("Jan  2 2018, 12:00 (-08:00)");
    });

    it("formatISO matches Jekyll isodateformat", () => {
      // Jekyll: "%FT%T%:z" -> "2018-01-02T12:00:00-08:00"
      expect(formatISO(post.globalDate)).toBe("2018-01-02T12:00:00-08:00");
    });

    it("archivePath matches Jekyll date: '%Y/%m'", () => {
      expect(formatArchivePath(post.globalDate)).toBe("2018/01");
    });

    it("monthYear matches Jekyll date: '%B %Y'", () => {
      expect(formatMonthYear(post.globalDate)).toBe("January 2018");
    });
  });

  describe("shortlink", () => {
    it("generates base60-encoded shortlink", () => {
      const short = shortlink(post.globalDate, siteConfig.shortdomain);
      expect(short).toMatch(/^https:\/\/bnwrd\.me\/.+$/);
    });
  });

  describe("tag ID", () => {
    it("generates tag URI with benward.uk (post is 2018+)", () => {
      const tagId = generateTagId(post.globalDate, post.cleanUrl);
      expect(tagId).toBe("tag:benward.uk,2018-01-02:/blog/top-5-2017");
    });
  });

  describe("rendered content", () => {
    it("renders non-empty content", () => {
      expect(renderedContent.length).toBeGreaterThan(0);
    });

    it("renders paragraphs", () => {
      expect(renderedContent).toContain("<p>");
    });

    it("preserves raw HTML iframes", () => {
      expect(renderedContent).toContain("<iframe");
      expect(renderedContent).toContain("youtube-nocookie.com");
    });

    it("preserves figure elements", () => {
      expect(renderedContent).toContain("<figure");
      expect(renderedContent).toContain("creek-media");
    });

    it("renders bold text", () => {
      expect(renderedContent).toContain("<strong>Kelly Lee Owens</strong>");
    });

    it("renders italic text", () => {
      expect(renderedContent).toContain("<em>");
    });

    it("preserves inline HTML links", () => {
      expect(renderedContent).toContain('href="http://bff.fm/shows/eclectic-kettle"');
    });
  });
});

describe("Textile post rendering: simple_microformats", () => {
  const filePath = path.join(
    JEKYLL_BASE,
    "_posts",
    "blog",
    "2005",
    "2005-06-29-simple_microformats.textile"
  );

  let post: ReturnType<typeof enrichPost>;
  let renderedContent: string;

  beforeAll(async () => {
    const raw = loadPostSync(filePath)!;
    post = enrichPost(raw);
    const rendered = await renderPost(post);
    renderedContent = rendered.content;
  });

  describe("frontmatter", () => {
    it("has correct title", () => {
      expect(post.frontmatter.title).toBe("First thoughts on Microformats");
    });

    it("has correct date with timezone", () => {
      expect(post.frontmatter.date).toBe("2005-06-29T00:02:17+01:00");
    });

    it("has tags", () => {
      expect(post.frontmatter.tags).toEqual(["all", "technology", "web_standards"]);
    });

    it("has atomid", () => {
      expect(post.frontmatter.atomid).toBe(
        "tag:benward.me,2005-06-29:/blog/simple_microformats"
      );
    });
  });

  describe("enriched properties", () => {
    it("generates clean URL", () => {
      expect(post.cleanUrl).toBe("/blog/simple_microformats");
    });

    it("generates GitHub source URL", () => {
      expect(post.githubSourceUrl).toContain(
        "2005-06-29-simple_microformats.textile"
      );
    });

    it("preserves timezone", () => {
      expect(post.globalDate).toBe("2005-06-29T00:02:17+01:00");
    });
  });

  describe("date formatting (matching Jekyll strftime)", () => {
    it("formatDisplay matches Jekyll dateformat", () => {
      // Jekyll: "%b %e %Y, %k:%M (%z)" -> "Jun 29 2005, 0:02 (+01:00)"
      expect(formatDisplay(post.globalDate)).toBe("Jun 29 2005, 0:02 (+01:00)");
    });

    it("formatISO preserves timezone", () => {
      expect(formatISO(post.globalDate)).toBe("2005-06-29T00:02:17+01:00");
    });

    it("archivePath is correct", () => {
      expect(formatArchivePath(post.globalDate)).toBe("2005/06");
    });
  });

  describe("tag ID", () => {
    it("uses atomid from frontmatter (not generated)", () => {
      // This post has an explicit atomid - the feed should use it
      expect(post.frontmatter.atomid).toBe(
        "tag:benward.me,2005-06-29:/blog/simple_microformats"
      );
    });

    it("would generate benward.me domain (pre-2018)", () => {
      const tagId = generateTagId(post.globalDate, post.cleanUrl);
      expect(tagId).toContain("benward.me");
    });
  });

  describe("rendered content (textile)", () => {
    it("renders non-empty content", () => {
      expect(renderedContent.length).toBeGreaterThan(0);
    });

    it("preserves HTML links from textile source", () => {
      expect(renderedContent).toContain("microformats.org");
    });

    it("preserves blockquote from textile source", () => {
      expect(renderedContent).toContain("<blockquote");
    });

    it("preserves inline HTML", () => {
      expect(renderedContent).toContain("<a href=");
    });
  });
});
