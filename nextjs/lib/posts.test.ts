import { cleanUrl, githubSourceUrl, generateTitle, getExcerpt, enrichPost } from "./posts";
import type { Post } from "./content";

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    slug: "test-post",
    filePath: "/path/to/post.md",
    relativePath: "_posts/blog/2022/2022-12-07-test-post.md",
    frontmatter: {
      layout: "blog",
      category: "blog",
      title: "Test Post",
      date: "2022-12-07T00:22:52-08:00",
      tags: ["test"],
    },
    content: "",
    rawContent: "# Test",
    format: "markdown",
    ...overrides,
  };
}

describe("cleanUrl", () => {
  it("generates clean URL from category and slug", () => {
    const post = makePost();
    expect(cleanUrl(post)).toBe("/blog/test-post");
  });

  it("defaults to /blog/ when no category", () => {
    const post = makePost({
      frontmatter: { ...makePost().frontmatter, category: "" },
    });
    // Falls back to "blog" default in cleanUrl
    expect(cleanUrl(post)).toBe("/blog/test-post");
  });
});

describe("githubSourceUrl", () => {
  it("generates correct GitHub URL", () => {
    const post = makePost();
    const url = githubSourceUrl(post);
    expect(url).toBe(
      "https://github.com/BenWard/benward-web/tree/main/jekyll/_posts/blog/2022/2022-12-07-test-post.md"
    );
  });
});

describe("generateTitle", () => {
  it("generates title from date", () => {
    expect(generateTitle("2022-12-07T00:22:52-08:00")).toBe(
      "December 7, 2022"
    );
  });

  it("returns 'Post' for invalid date", () => {
    expect(generateTitle("invalid")).toBe("Post");
  });
});

describe("getExcerpt", () => {
  it("uses summary frontmatter if present", () => {
    const post = makePost({
      frontmatter: {
        ...makePost().frontmatter,
        summary: "My summary",
      },
    });
    expect(getExcerpt(post)).toBe("My summary");
  });

  it("returns empty string when no summary", () => {
    const post = makePost();
    expect(getExcerpt(post)).toBe("");
  });
});

describe("enrichPost", () => {
  it("adds all computed properties", () => {
    const post = makePost();
    const enriched = enrichPost(post);
    expect(enriched.cleanUrl).toBe("/blog/test-post");
    expect(enriched.githubSourceUrl).toContain("github.com");
    expect(enriched.globalDate).toBe("2022-12-07T00:22:52-08:00");
    expect(enriched.dateTitle).toBe(false);
  });

  it("auto-generates title for untitled posts", () => {
    const post = makePost({
      frontmatter: {
        ...makePost().frontmatter,
        title: undefined,
      },
    });
    const enriched = enrichPost(post);
    expect(enriched.frontmatter.title).toBe("December 7, 2022");
    expect(enriched.dateTitle).toBe(true);
  });
});
