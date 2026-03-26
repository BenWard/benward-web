import { encodeBase60, shortlink } from "./base60";

describe("encodeBase60", () => {
  it("encodes 0", () => {
    expect(encodeBase60(0)).toBe("0");
  });

  it("encodes small numbers", () => {
    expect(encodeBase60(1)).toBe("1");
    expect(encodeBase60(59)).toBe("z");
    expect(encodeBase60(60)).toBe("10");
  });

  it("encodes Unix timestamps", () => {
    // 2022-12-07T00:22:52-08:00 = 1670397772
    const result = encodeBase60(1670397772);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("only uses valid NewBase60 characters", () => {
    const valid = /^[0-9A-HJ-NP-Za-km-z_]+$/;
    expect(encodeBase60(1670397772)).toMatch(valid);
    expect(encodeBase60(999999999)).toMatch(valid);
  });
});

describe("shortlink", () => {
  it("generates shortlink from date and domain", () => {
    const result = shortlink("2022-12-07T00:22:52-08:00", "https://bnwrd.me");
    expect(result).toMatch(/^https:\/\/bnwrd\.me\//);
    expect(result.length).toBeGreaterThan("https://bnwrd.me/".length);
  });
});
