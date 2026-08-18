# Contributing

Malay Tech Journal is a personal blog, developed solo via prompt-driven
development (no manual IDE edits). External contributions are still
welcome for bug fixes, accessibility, performance, and docs — please open
an issue first for anything larger than a small fix.

## Setup

```bash
bun install
bun run dev
```

## Before opening a PR

```bash
bun run typecheck
bun run lint
bun run format:check
bun run build
```

CI runs a fast build on PRs (skips OG image generation, RSS, sitemap, and
content-collection reads). If your change affects rendering, SEO, RSS, or
OG images, run a full local `bun run build` and note the result in the PR.

## PR expectations

- Keep PRs focused; avoid unrelated changes.
- Use clear commit messages (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- Update [AGENTS.md](./AGENTS.md) and/or [README.md](./README.md) if you
  change architecture, config, or user-facing behavior.
- If you add user-facing strings, update both locales in `src/i18n/ui.ts`.
- Include screenshots for UI changes.

## Security issues

Do not open a public issue. See [SECURITY.md](./SECURITY.md).

## License

Contributions are licensed under this project's [MIT license](./LICENSE).
