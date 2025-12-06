import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      ".github/",
      ".husky/",
      "node_modules/",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/components/ui/**",
      "*.config.ts",
    ],
  },

  // Configuraciones base
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // Configuración principal
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      import: pluginImport,
      prettier: prettier,
      unicorn: unicorn,
      sonarjs: sonarjs,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // Prettier
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // File Naming
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["^.*\\.config\\.(js|ts|mjs)$", "^.*\\.d\\.ts$"],
        },
      ],

      // Custom Rules
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-useless-rename": "error",

      // Import/Export Rules
      "import/no-mutable-exports": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "{next,next/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/newline-after-import": "error",
      "import/no-unresolved": "off",
      "no-duplicate-imports": ["error", { includeExports: true }],
      "import/no-cycle": ["error", { maxDepth: 2 }],

      // Whitespace
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "space-in-parens": ["error", "never"],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "func-call-spacing": ["error", "never"],
      "computed-property-spacing": ["error", "never"],

      // Naming
      "no-underscore-dangle": ["error", { allow: ["_id", "__dirname", "__filename"] }],

      // Complexity
      complexity: ["warn", { max: 15 }],
      "max-lines": ["warn", { max: 400, skipBlankLines: true, skipComments: true }],
      "max-depth": ["error", 4],

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // SonarJS
      "sonarjs/no-commented-code": "warn",
    },
  },
);
