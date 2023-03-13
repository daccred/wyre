const eslintPresets = require("./eslint-preset");

/** @type {import("eslint").Linter.Config} */
const config = {
  ...eslintPresets,
  extends: ["next", "prettier", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended", "plugin:@calcom/eslint/recommended"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          // TODO: enable this once prettier supports it
          // fixStyle: "inline-type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: false,
        },
      ],
    },
  ],
};

module.exports = config;
