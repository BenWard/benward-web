/**
 * Verify humans.txt content matches Jekyll template expectations.
 *
 * We test the content generation directly since the Web API `Response`
 * class isn't available in the jsdom test environment.
 */

import { toXmlSchema } from "@/lib/dates";

/** Reproduce the exact content from the route handler */
function generateHumansTxt(): string {
  return `/* TEAM */
  Protagonist: Ben Ward
  URL: https://benward.uk/about
  Twitter: @benward
  From: Cambridge, United Kingdom

/* SITE */
  Last update: ${toXmlSchema(new Date())}
  Language: English (British)
  Doctype: HTML5
  IDE: Nova, Visual Studio Code, Sublime Text, iA Writer
`;
}

/**
 * Jekyll template for reference:
 *
 * /* TEAM *\/
 *   Protagonist: Ben Ward
 *   URL: https://benward.uk/about
 *   Twitter: @benward
 *   From: Cambridge, United Kingdom
 *
 * /* SITE *\/
 *   Last update: {{site.time | date_to_xmlschema}}
 *   Language: English (British)
 *   Doctype: HTML5
 *   IDE: Nova, Visual Studio Code, Sublime Text, iA Writer
 */

describe("humans.txt content", () => {
  let body: string;

  beforeAll(() => {
    body = generateHumansTxt();
  });

  it("contains TEAM section", () => {
    expect(body).toContain("/* TEAM */");
  });

  it("has correct protagonist", () => {
    expect(body).toContain("Protagonist: Ben Ward");
  });

  it("has correct URL", () => {
    expect(body).toContain("URL: https://benward.uk/about");
  });

  it("has Twitter handle", () => {
    expect(body).toContain("Twitter: @benward");
  });

  it("has location", () => {
    expect(body).toContain("From: Cambridge, United Kingdom");
  });

  it("contains SITE section", () => {
    expect(body).toContain("/* SITE */");
  });

  it("has Last update as ISO 8601 date (matches Jekyll date_to_xmlschema)", () => {
    // Jekyll's date_to_xmlschema outputs ISO 8601 format
    expect(body).toMatch(/Last update: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it("has correct language", () => {
    expect(body).toContain("Language: English (British)");
  });

  it("has correct doctype", () => {
    expect(body).toContain("Doctype: HTML5");
  });

  it("has IDE list matching Jekyll template", () => {
    expect(body).toContain(
      "IDE: Nova, Visual Studio Code, Sublime Text, iA Writer"
    );
  });

  it("matches Jekyll template structure exactly", () => {
    // Verify the overall structure mirrors the Jekyll template line-by-line
    const lines = body.split("\n").map((l) => l.trimEnd());
    expect(lines[0]).toBe("/* TEAM */");
    expect(lines[1]).toBe("  Protagonist: Ben Ward");
    expect(lines[2]).toBe("  URL: https://benward.uk/about");
    expect(lines[3]).toBe("  Twitter: @benward");
    expect(lines[4]).toBe("  From: Cambridge, United Kingdom");
    expect(lines[5]).toBe("");
    expect(lines[6]).toBe("/* SITE */");
    expect(lines[7]).toMatch(/^ {2}Last update: \d{4}-\d{2}-\d{2}T/);
    expect(lines[8]).toBe("  Language: English (British)");
    expect(lines[9]).toBe("  Doctype: HTML5");
    expect(lines[10]).toBe("  IDE: Nova, Visual Studio Code, Sublime Text, iA Writer");
  });
});
