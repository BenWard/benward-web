import {
  getYearPeriods,
  getMonthPeriods,
  getYearArchive,
  getMonthArchive,
  archiveUrl,
  formatArchivePeriod,
} from "./archives";
import type { EnrichedPost } from "./posts";

function makeEnrichedPost(
  date: string,
  slug: string = "test"
): EnrichedPost {
  return {
    slug,
    filePath: "",
    relativePath: "",
    frontmatter: {
      layout: "blog",
      category: "blog",
      title: `Post ${slug}`,
      date,
      tags: [],
    },
    content: "",
    rawContent: "",
    format: "markdown",
    cleanUrl: `/blog/${slug}`,
    githubSourceUrl: "",
    globalDate: date,
    dateTitle: false,
    excerpt: "",
  };
}

const posts: EnrichedPost[] = [
  makeEnrichedPost("2022-12-07T00:00:00+00:00", "dec-post"),
  makeEnrichedPost("2022-06-15T00:00:00+00:00", "jun-post"),
  makeEnrichedPost("2021-03-01T00:00:00+00:00", "mar-post"),
  makeEnrichedPost("2020-01-10T00:00:00+00:00", "jan-post"),
];

describe("getYearPeriods", () => {
  it("returns unique years sorted ascending", () => {
    const periods = getYearPeriods(posts);
    expect(periods).toEqual([{ year: 2020 }, { year: 2021 }, { year: 2022 }]);
  });
});

describe("getMonthPeriods", () => {
  it("returns unique year-month pairs sorted ascending", () => {
    const periods = getMonthPeriods(posts);
    expect(periods).toEqual([
      { year: 2020, month: 1 },
      { year: 2021, month: 3 },
      { year: 2022, month: 6 },
      { year: 2022, month: 12 },
    ]);
  });
});

describe("getYearArchive", () => {
  it("returns archive for a valid year", () => {
    const archive = getYearArchive(posts, 2022);
    expect(archive).not.toBeNull();
    expect(archive!.posts).toHaveLength(2);
    expect(archive!.months).toHaveLength(2);
  });

  it("has correct navigation", () => {
    const archive = getYearArchive(posts, 2021);
    expect(archive!.previousPeriod).toEqual({ year: 2020 });
    expect(archive!.nextPeriod).toEqual({ year: 2022 });
  });

  it("first year has no previous", () => {
    const archive = getYearArchive(posts, 2020);
    expect(archive!.previousPeriod).toBeNull();
    expect(archive!.nextPeriod).toEqual({ year: 2021 });
  });

  it("last year has no next", () => {
    const archive = getYearArchive(posts, 2022);
    expect(archive!.nextPeriod).toBeNull();
  });

  it("returns null for non-existent year", () => {
    expect(getYearArchive(posts, 2019)).toBeNull();
  });

  it("groups posts by month", () => {
    const archive = getYearArchive(posts, 2022);
    expect(archive!.months[0].name).toBe("June");
    expect(archive!.months[1].name).toBe("December");
  });
});

describe("getMonthArchive", () => {
  it("returns archive for a valid month", () => {
    const archive = getMonthArchive(posts, 2022, 12);
    expect(archive).not.toBeNull();
    expect(archive!.posts).toHaveLength(1);
  });

  it("has correct navigation", () => {
    const archive = getMonthArchive(posts, 2022, 6);
    expect(archive!.previousPeriod).toEqual({ year: 2021, month: 3 });
    expect(archive!.nextPeriod).toEqual({ year: 2022, month: 12 });
  });

  it("returns null for non-existent month", () => {
    expect(getMonthArchive(posts, 2022, 3)).toBeNull();
  });
});

describe("archiveUrl", () => {
  it("formats year-only period", () => {
    expect(archiveUrl({ year: 2022 })).toBe("/2022");
  });

  it("formats year-month period with zero-padded month", () => {
    expect(archiveUrl({ year: 2022, month: 6 })).toBe("/2022/06");
    expect(archiveUrl({ year: 2022, month: 12 })).toBe("/2022/12");
  });
});

describe("formatArchivePeriod", () => {
  it("formats year-only", () => {
    expect(formatArchivePeriod({ year: 2022 })).toBe("2022");
  });

  it("formats year-month", () => {
    expect(formatArchivePeriod({ year: 2022, month: 6 })).toBe("June 2022");
  });
});
