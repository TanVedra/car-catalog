import importPlugin from "eslint-plugin-import";
import stylisticPlugin from "@stylistic/eslint-plugin";
import functionalPlugin from "eslint-plugin-functional";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    files: ["src/**/*.ts", "cli/**/*.ts"],
    languageOptions: { 
      parser: typescriptParser,  
      parserOptions: {  
        ecmaFeatures: { 
          modules: true
        },
        ecmaVersion: "latest",
        project: "./tsconfig.json",  
      },
    },  
    plugins: {  
      functionalPlugin,      
      import: importPlugin,  
      "@stylistic-eslint": stylisticPlugin,
      "@typescript-eslint": typescriptPlugin,
    },    
    settings: {
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {  
      ...typescriptPlugin.configs["recommended"].rules,
      "semi": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "import/no-unresolved": "error",
      "no-underscore-dangle": "off",
      "no-plusplus": "off",
      "no-await-in-loop": "off",
      "import/no-cycle": "off",
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "quotes": ["error", "double"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "_",
          "varsIgnorePattern": "_",
          "caughtErrorsIgnorePattern": "_"
        }
      ],
      "no-var": "error",
      "no-irregular-whitespace": ["error", { "skipComments": true }],
      "indent": ["error", 2],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
      "no-use-before-define": ["error", {
        "functions": true,
        "classes": true,
        "variables": true,
      }],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "keyword-spacing": ["error", { "before": true }],
      "space-infix-ops": "error",
      "one-var": ["error", { let: "never", const: "never" }],
      "curly": "error",
      "max-statements-per-line": ["error", { "max": 1 }],
      "key-spacing": ["error", {
        "align": {
          "beforeColon": true,
          "afterColon": true,
          "on": "colon",
        },
      }],
      "@stylistic-eslint/no-extra-semi": "error",
      "@stylistic-eslint/type-annotation-spacing": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "parameter",
          "format": ["camelCase"],
        },
        {
          "selector": "parameter",
          "filter": {
            "regex": "^_$",
            "match": true
          },
          "format": ["camelCase"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": ["variableLike", "memberLike"],
          "format": ["camelCase", "UPPER_CASE", "snake_case"],
          "leadingUnderscore": "allow",
          "trailingUnderscore": "forbid",
        },
        {
          "selector": ["class"],
          "format": ["PascalCase"],
          "leadingUnderscore": "forbid",
          "trailingUnderscore": "forbid",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": {
            "memberTypes": [
              "signature",
              "field",
              "static-initialization",
              "constructor",
              ["get", "set"],
              ["public-method", "protected-method", "private-method"],
            ],
          },
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": "warn",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/parameter-properties": "error",
      "@typescript-eslint/prefer-includes": "warn",
      "@typescript-eslint/promise-function-async": "warn",
      "@typescript-eslint/restrict-plus-operands": "error",
      "default-param-last": "off",
      "@typescript-eslint/default-param-last": "warn",
      "no-extra-semi": "off",
      "no-invalid-this": "off",
      "@typescript-eslint/no-invalid-this": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "require-await": "off",
      "@typescript-eslint/require-await": "error",
      "no-return-await": "off",
      "@typescript-eslint/return-await": "error",
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "always-multiline",
      }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Built-in imports (come from NodeJS native) go first
            "external", // <- External imports
            "internal", // <- Absolute imports
            ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
            "index", // <- index imports
            "unknown", // <- unknown
          ],
          "newlines-between": "always",
          alphabetize: {
            /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
            order: "asc",
            /* ignore case. Options: [true, false] */
            caseInsensitive: true,
          },
        },
      ],
    },    
  },
];