import { romanize } from "./romans";

describe("romanize", () => {
  it("converts simple years", () => {
    expect(romanize(2024)).toBe("MMXXIV");
    expect(romanize(2000)).toBe("MM");
    expect(romanize(1999)).toBe("MCMXCIX");
  });

  it("handles single-digit values", () => {
    expect(romanize(1)).toBe("I");
    expect(romanize(4)).toBe("IV");
    expect(romanize(9)).toBe("IX");
  });

  it("handles blog-relevant years", () => {
    expect(romanize(2005)).toBe("MMV");
    expect(romanize(2009)).toBe("MMIX");
    expect(romanize(2022)).toBe("MMXXII");
  });

  it("returns empty string for 0", () => {
    expect(romanize(0)).toBe("");
  });
});
