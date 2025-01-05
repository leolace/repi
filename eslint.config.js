// @ts-check

import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/.tsx", "**/*.ts"],
    ignores: ["**/dist", "**/build"],
    rules: {
      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      curly: ["error", "multi"],
      "comma-dangle": ["error", "never"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],
    },
  }
  //   reacteslint.configs.recommended
);

// export default [
//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     ignores: ["**/*.d.ts"],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         sourceType: "module",
//       },
//     },
//     ...typescript.configs.eslintRecommended,
//     rules: {
//       "no-console": "warn",
//       "@typescript-eslint/no-unused-vars": "error",
//       semi: ["error", "always"],
//       quotes: ["error", "double"],
//       curly: ["error", "multi-line"],
//       "comma-dangle": ["error", "never"],
//       "eol-last": ["warn", "always"],
//       "no-multiple-empty-lines": ["error", { max: 1 }],
//       "object-curly-spacing": ["error", "always"],
//       "array-bracket-spacing": ["error", "never"],
//       ...typescript.configs.eslintRecommended.rules,
//     },
//   },
//   {
//     files: ["**/*.tsx"],
//     plugins: { react },
//   },
// ];
