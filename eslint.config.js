import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactlint from "eslint-plugin-react";
import reacthookslint from "eslint-plugin-react-hooks"
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["**/postcss.config.cjs", "**/dist", "**/build"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.tsx", "**/*.ts"],
    ignores: ["**/dist", "**/build"],
    plugins: {
      react: reactlint,
      "react-hooks": reacthookslint
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-console": "warn",
      semi: "error",
      quotes: ["error", "double"],
      curly: ["error", "multi"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],
    },
  },
  prettier,
);
