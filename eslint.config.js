import tsEslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default tsEslint.config({
    files: [
        './src/**/*.ts',
        // '**/*.tsx',
        // '**/*.js',
        // '**/*.jsx',
    ],
    extends: [...tsEslint.configs.recommended],
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
            ecmaFeatures: {
                jsx: true,
            },
            project: ['./tsconfig.json'],
        },
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'eol-last': 'error',
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'max-len': ['error', { code: 120, tabWidth: 4, comments: 120 }],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-cond-assign': 'error',
        'no-trailing-spaces': 'error',
        'no-var': 'error',
        semi: 'error',
    },
});
