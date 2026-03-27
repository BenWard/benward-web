import { describe, it, expect } from "vitest";
import {
  parseDate,
  formatISO,
  formatDisplay,
  formatTime,
  formatMonthYear,
  formatArchivePath,
  formatTitleDate,
  toUnixTimestamp,
  monthName,
} from "./dates";

describe("parseDate", () => {
  it("parses ISO date with colon in timezone", () => {
    const d = parseDate("2022-12-07T00:22:52-08:00");
    expect(d.year).toBe(2022);
    expect(d.month).toBe(12);
    expect(d.day).toBe(7);
    expect(d.hour).toBe(0);
    expect(d.minute).toBe(22);
    expect(d.second).toBe(52);
    expect(d.timezone).toBe("-08:00");
  });

  it("parses ISO date without colon in timezone", () => {
    const d = parseDate("2009-02-15T09:10:19+0000");
    expect(d.timezone).toBe("+00:00");
    expect(d.year).toBe(2009);
  });

  it("throws on invalid date", () => {
    expect(() => parseDate("not-a-date")).toThrow("Cannot parse date");
  });
});

describe("formatISO", () => {
  it("preserves timezone offset", () => {
    expect(formatISO("2022-12-07T00:22:52-08:00")).toBe(
      "2022-12-07T00:22:52-08:00"
    );
  });

  it("normalizes timezone without colon", () => {
    expect(formatISO("2009-02-15T09:10:19+0000")).toBe(
      "2009-02-15T09:10:19+00:00"
    );
  });
});

describe("formatDisplay", () => {
  it("formats like Jekyll dateformat", () => {
    const result = formatDisplay("2022-12-07T00:22:52-08:00");
    expect(result).toBe("Dec  7 2022, 0:22 (-08:00)");
  });
});

describe("formatTime", () => {
  it("formats time with timezone", () => {
    const result = formatTime("2022-12-07T00:22:52-08:00");
    expect(result).toBe("0:22 (-08:00)");
  });
});

describe("formatMonthYear", () => {
  it("formats full month and year", () => {
    expect(formatMonthYear("2022-12-07T00:22:52-08:00")).toBe("December 2022");
  });
});

describe("formatArchivePath", () => {
  it("formats as YYYY/MM", () => {
    expect(formatArchivePath("2022-12-07T00:22:52-08:00")).toBe("2022/12");
    expect(formatArchivePath("2009-02-15T09:10:19+0000")).toBe("2009/02");
  });
});

describe("formatTitleDate", () => {
  it("formats for auto-generated titles", () => {
    expect(formatTitleDate("2022-12-07T00:22:52-08:00")).toBe(
      "December 7, 2022"
    );
  });
});

describe("toUnixTimestamp", () => {
  it("converts to Unix timestamp", () => {
    const ts = toUnixTimestamp("2022-12-07T00:22:52-08:00");
    // 2022-12-07T00:22:52-08:00 = 2022-12-07T08:22:52Z
    expect(ts).toBe(1670401372);
  });
});

describe("monthName", () => {
  it("returns month name from number", () => {
    expect(monthName(1)).toBe("January");
    expect(monthName(12)).toBe("December");
  });
});
