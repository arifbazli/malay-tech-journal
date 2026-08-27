# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows
[SemVer](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-08-27

### Added

- `/write-post` content pipeline: a research → draft → PR agent workflow
  for bilingual posts, always opened as `draft: true`.
- `publish-on-merge.yml`: flips `draft: false` on a merged content PR's
  post files when the `publish` label was applied, then pushes to `main`.
- Repo cleanup: removed dead upstream-theme cruft (starter-sync mechanism,
  stale audit docs, unused auto-merge/label-sync workflows), fixed
  ownership references (CODEOWNERS, FUNDING.yml, LICENSE, SECURITY.md).

### Fixed

- ESLint config bugs causing false positives across `.ts`/`.astro`/`.mjs`
  files; two real pre-existing typecheck bugs (missing i18n key, a stale
  prop passed to `Topbar`); 41 files of Prettier drift; markdownlint
  gaps across bilingual posts.
- Re-enabled `PR Checks` and `Deploy to GitHub Pages` (both had been
  disabled since 2026-08-09); rotated an expired Cloudflare API token.

## [1.1.0] - 2026-07-02

### Changed

- Upgraded to Astro v7 (`@astrojs/mdx`, `@astrojs/rss` bumped to match).
- Bumped `astro-expressive-code`, Tailwind CSS v4, `eslint-plugin-astro`, ESLint.
- Updated README, AGENTS.md, and source metadata for Astro v7.

## [1.0.0] - 2026-06-03

### Added

- Initial release: multilingual (i18n) post/page templates, Tailwind CSS v4
  styling, remark/rehype plugins for alerts, raw HTML, and KaTeX math.
- Client islands: language switcher, table of contents, search, Giscus
  comments, back-to-top.
