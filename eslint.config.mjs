import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import typescript from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...typescript.configs.recommended,
  ...astro.configs.recommended,
  {
    ignores: [".dist/*", "**/*.d.ts"],
  },
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
