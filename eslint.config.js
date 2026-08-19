import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TS files are backstopped by `tsc`/`astro check`; `no-undef` predates
      // module resolution and false-positives on global lib types (e.g.
      // `HeadersInit`) that only exist in type position. Standard
      // typescript-eslint guidance is to turn it off for `.ts`/`.tsx`.
      'no-undef': 'off',
      // The base rule doesn't know about `^_` as an intentional-unused
      // marker, so it double-reports anything the TS-aware rule below
      // already allows. Let @typescript-eslint own this for .ts/.tsx.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // Root-level Node scripts (config, build tooling) run outside any
    // bundler, so they need Node globals declared explicitly — flat
    // config's `js.configs.recommended` doesn't assume an environment.
    files: ['*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        globalThis: 'readonly',
      },
    },
  },
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      // Matches the TS block's convention; also avoids false positives on
      // TS-only constructs (e.g. interface method params) that the base
      // `no-unused-vars` rule doesn't understand inside .astro frontmatter.
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/_pagefind/**'],
  },
];
