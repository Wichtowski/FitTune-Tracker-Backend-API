// @ts-check

import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.strict,
    ...tsEslint.configs.stylistic,
    {
        files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
            sourceType: 'module', // Allows for the use of imports
            globals: {
                Buffer: 'readonly',
                console: 'readonly',
                fetch: 'readonly',
                document: 'readonly',
                window: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
            },
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            'eol-last': 'error',
            'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
            'max-len': ['error', { code: 120, tabWidth: 4, comments: 120 }],
            'new-parens': 'error',
            'no-bitwise': 'error',
            'no-cond-assign': 'error',
            'no-trailing-spaces': 'error',
            'no-var': 'error',
            semi: 'off',
        },
        ignores: ['**/node_modules/**', '**/dist/**', '**/legacy/**', '**/tests/**'],
    },
);

// import tsEslint from '@typescript-eslint/eslint-plugin';
// import type { Linter } from 'eslint';
// import js from '@eslint/js';

// export default [
//     js.configs.recommended,
//     {
//         files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.jsx'],
//         languageOptions: {
//             ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
//             sourceType: 'module', // Allows for the use of imports
//             globals: {
//                 Buffer: 'readonly',
//                 console: 'readonly',
//                 fetch: 'readonly',
//                 document: 'readonly',
//                 window: 'readonly',
//                 setTimeout: 'readonly',
//                 clearTimeout: 'readonly',
//             },
//             parserOptions: {
//                 project: './tsconfig.json',
//             },
//         },
//         plugins: ['@typescript-eslint'],
//         rules: {
//             '@typescript-eslint/no-explicit-any': 'error',
//             '@typescript-eslint/ban-ts-comment': 'off',
//             '@typescript-eslint/no-unused-vars': 'warn',
//             '@typescript-eslint/no-unsafe-call': 'error',
//             '@typescript-eslint/no-unsafe-return': 'error',
//             '@typescript-eslint/no-inferrable-types': 'error',
//             'eol-last': 'error',
//             'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
//             'max-len': ['error', { code: 120, tabWidth: 4, comments: 120 }],
//             'new-parens': 'error',
//             'no-bitwise': 'error',
//             'no-cond-assign': 'error',
//             'no-trailing-spaces': 'error',
//             'no-var': 'error',
//             semi: 'off',
//         },
//         ignores: ['**/node_modules/**', '**/dist/**', '**/legacy/**', '**/tests/**'],
//     },
// ] satisfies Linter.Config[];
