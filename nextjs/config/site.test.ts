import { siteConfig } from "./site";

describe("siteConfig", () => {
  it("has required site metadata", () => {
    expect(siteConfig.title).toBe("Ben Ward");
    expect(siteConfig.url).toBe("https://benward.uk");
    expect(siteConfig.shortdomain).toBe("https://bnwrd.me");
  });

  it("has author info", () => {
    expect(siteConfig.author.name).toBe("Ben Ward");
    expect(siteConfig.author.twitter).toBe("benward");
  });

  it("has GitHub configuration", () => {
    expect(siteConfig.githubSlug).toBe("BenWard/benward-web");
    expect(siteConfig.gitBase).toBe("jekyll");
  });

  it("has date format strings", () => {
    expect(siteConfig.dateFormats.iso).toBeDefined();
    expect(siteConfig.dateFormats.display).toBeDefined();
    expect(siteConfig.dateFormats.time).toBeDefined();
  });
});
