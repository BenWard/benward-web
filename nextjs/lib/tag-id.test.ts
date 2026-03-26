import { generateTagId } from "./tag-id";

describe("generateTagId", () => {
  it("uses benward.uk for posts from 2018+", () => {
    const result = generateTagId(
      "2022-12-07T00:22:52-08:00",
      "/blog/some-post"
    );
    expect(result).toBe("tag:benward.uk,2022-12-07:/blog/some-post");
  });

  it("uses benward.me for posts before 2018", () => {
    const result = generateTagId(
      "2009-02-15T09:10:19+0000",
      "/blog/old-post"
    );
    expect(result).toBe("tag:benward.me,2009-02-15:/blog/old-post");
  });

  it("includes the clean URL path", () => {
    const result = generateTagId(
      "2020-01-01T00:00:00+00:00",
      "/blog/hello-world"
    );
    expect(result).toContain("/blog/hello-world");
  });
});
