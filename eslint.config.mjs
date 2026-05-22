import eslint from "@eslint/js";

import typescript from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...typescript.configs.recommended,
  {
    ignores: [".wrangler/*", "**/*.d.ts"],
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
