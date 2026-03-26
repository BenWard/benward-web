import { decodeBase60, buildShortlinkMap, resolveShortlink } from "./shortlinks";
import { encodeBase60 } from "./base60";

describe("decodeBase60", () => {
  it("decodes 0", () => {
    expect(decodeBase60("0")).toBe(0);
  });

  it("round-trips with encodeBase60", () => {
    const timestamps = [1670401372, 1514923200, 1120000937];
    for (const ts of timestamps) {
      const encoded = encodeBase60(ts);
      expect(decodeBase60(encoded)).toBe(ts);
    }
  });

  it("returns -1 for invalid characters", () => {
    expect(decodeBase60("!!!")).toBe(-1);
  });
});

describe("buildShortlinkMap", () => {
  it("returns a non-empty map", () => {
    const map = buildShortlinkMap();
    expect(map.size).toBeGreaterThan(0);
  });

  it("maps base60 IDs to URLs", () => {
    const map = buildShortlinkMap();
    for (const [id, url] of map) {
      expect(id.length).toBeGreaterThan(0);
      expect(url).toMatch(/^\//);
      break; // just check first entry
    }
  });
});

describe("resolveShortlink", () => {
  it("resolves a known post", () => {
    // Build the map to find a valid ID
    const map = buildShortlinkMap();
    const [firstId, firstUrl] = map.entries().next().value!;
    expect(resolveShortlink(firstId)).toBe(firstUrl);
  });

  it("returns null for unknown ID", () => {
    expect(resolveShortlink("ZZZZZZZZZZ")).toBeNull();
  });
});
