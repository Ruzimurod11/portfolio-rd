import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = [
    {
        ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
    },
    js.configs.recommended,
    ...nextCoreWebVitals,
    ...nextTypescript,
    prettier,
    {
        rules: {
            "react/no-unescaped-entities": "off",
            "no-irregular-whitespace": "off",
            "no-undef": "off",
            "react/prop-types": "off",
            "no-unused-vars": "off", // Turn off base rule
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    args: "after-used",
                },
            ],
            "@typescript-eslint/prefer-nullish-coalescing": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
        },
    },
];

export default eslintConfig;
