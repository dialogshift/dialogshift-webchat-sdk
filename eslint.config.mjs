import jsdoc from "eslint-plugin-jsdoc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [{
    plugins: {
        jsdoc,
        "@typescript-eslint": typescriptEslint,
        "@stylistic": stylistic,
    },

    files: ["**/*.ts"],

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {
        "@stylistic/indent": ["error", 2, {
            FunctionDeclaration: {
                parameters: "first",
            },

            FunctionExpression: {
                parameters: "first",
            },
        }],

        "@typescript-eslint/member-delimiter-style": ["off", {
            multiline: {
                delimiter: "none",
                requireLast: true,
            },

            singleline: {
                delimiter: "semi",
                requireLast: false,
            },
        }],

        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

        "@stylistic/quotes": ["error", "single", {
            avoidEscape: true,
        }],

        "@typescript-eslint/semi": ["off", null],
        "arrow-parens": ["off", "always"],

        "comma-dangle": ["error", {
            objects: "always-multiline",
            arrays: "always-multiline",
            functions: "always-multiline",
        }],

        curly: ["error", "multi-line"],
        "eol-last": "error",
        eqeqeq: ["error", "smart"],
        "id-denylist": "error",
        "id-match": "error",
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "error",

        "jsdoc/tag-lines": ["error", "any", {
            startLines: 1,
        }],

        "no-array-constructor": "error",
        "no-duplicate-imports": "error",
        "no-eval": "error",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-param-reassign": "error",
        "no-trailing-spaces": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "one-var": ["error", "never"],
        "prefer-const": "error",
        "prefer-template": "error",
        "quote-props": ["error", "as-needed"],
        radix: "error",
        semi: "off",

        "space-before-function-paren": ["error", {
            anonymous: "always",
            named: "never",
        }],

        "spaced-comment": ["error", "always", {
            markers: ["/"],
        }],
    },
}];
