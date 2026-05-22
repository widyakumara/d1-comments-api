/** @type {import("prettier").Config} */

export default {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: "always",
  proseWrap: "preserve",
  endOfLine: "lf",
  singleAttributePerLine: false,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    { files: "*.json", options: { trailingComma: "none" } },
    { files: "*.astro", options: { parser: "astro" } },
  ],
};
