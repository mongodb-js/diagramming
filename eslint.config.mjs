import prettierPlugin from 'eslint-plugin-prettier';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import * as emotionPlugin from '@emotion/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: parser,
    },
    plugins: {
      prettier: prettierPlugin,
      react: reactPlugin,
      emotion: emotionPlugin,
      import: importPlugin,
      '@typescript-eslint': eslintPlugin,
      'react-hooks': reactHooksPlugin,
      'testing-library': testingLibraryPlugin,
    },
    rules: {
      ...testingLibraryPlugin.configs.react.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...eslintPlugin.configs.stylistic.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-unexpected-multiline': 'error',
      'no-console': 'error',
      'prefer-arrow-callback': 'warn',
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
