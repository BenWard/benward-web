import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { PostSummary } from "./PostSummary";
import type { EnrichedPost } from "@/lib/posts";

function makePost(overrides: Partial<EnrichedPost> = {}): EnrichedPost {
  return {
    slug: "test-post",
    filePath: "",
    relativePath: "",
    frontmatter: {
      layout: "blog",
      category: "blog",
      title: "Test Post Title",
      date: "2022-12-07T00:22:52-08:00",
      tags: ["test"],
    },
    content: "",
    rawContent: "",
    format: "markdown",
    cleanUrl: "/blog/test-post",
    githubSourceUrl: "",
    globalDate: "2022-12-07T00:22:52-08:00",
    dateTitle: false,
    excerpt: "",
    ...overrides,
  };
}

describe("PostSummary", () => {
  it("renders h-entry microformat", () => {
    const { container } = render(<PostSummary post={makePost()} />);
    expect(container.querySelector(".h-entry")).toBeTruthy();
  });

  it("renders post title as link", () => {
    const { container } = render(<PostSummary post={makePost()} />);
    const link = container.querySelector("a.u-url");
    expect(link?.textContent).toBe("Test Post Title");
    expect(link?.getAttribute("href")).toBe("/blog/test-post");
  });

  it("uses canonical URL when available", () => {
    const post = makePost({
      frontmatter: {
        ...makePost().frontmatter,
        canonical: "https://example.com/review",
      },
    });
    const { container } = render(<PostSummary post={post} />);
    const link = container.querySelector("a.u-url");
    expect(link?.getAttribute("href")).toBe("https://example.com/review");
  });

  it("renders dt-published time", () => {
    const { container } = render(<PostSummary post={makePost()} />);
    const time = container.querySelector(".dt-published");
    expect(time).toBeTruthy();
    expect(time?.getAttribute("datetime")).toBe("2022-12-07T00:22:52-08:00");
  });

  it("renders excerpt when present", () => {
    const post = makePost({ excerpt: "A brief summary" });
    const { container } = render(<PostSummary post={post} />);
    expect(container.querySelector(".e-summary")?.textContent).toBe(
      "A brief summary"
    );
  });

  it("omits excerpt div when empty", () => {
    const { container } = render(<PostSummary post={makePost()} />);
    expect(container.querySelector(".e-summary")).toBeNull();
  });
});
