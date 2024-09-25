const tsEslint = require('typescript-eslint');

module.exports = {
    extends: [...tsEslint.configs.recommended],
    files: [
        './src/**/*.ts',
        './src/**/*.tsx',
        './src/**/*.js',
        './src/**/*.jsx',
    ],
    
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
            ecmaVersion: {
                jsx: true
            },
            project: './tsconfig.json',
        },
    },
    plugin: [
        '@typescript-eslint',
    ],
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
        'semi': 'off',
    },


};
