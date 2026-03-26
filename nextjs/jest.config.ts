import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  // Transform ESM-only node_modules packages.
  // Only keep truly CJS packages in the ignore list.
  transformIgnorePatterns: [
    "node_modules/(?!(unified|remark-.*|rehype-.*|hast-.*|hastscript|mdast-.*|micromark.*|unist-.*|vfile.*|bail|ccount|character-entities.*|comma-separated-tokens|decode-named-character-reference|devlop|html-void-elements|html-escaper|is-plain-obj|nanoid|parse5|property-information|psl|space-separated-tokens|stringify-entities|trim-lines|trough|web-namespaces|zwitch)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.module\\.css$": "<rootDir>/lib/test/css-module-mock.ts",
    "\\.css$": "<rootDir>/lib/test/css-mock.ts",
  },
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
};

export default config;
