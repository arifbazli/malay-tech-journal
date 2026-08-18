# Malay Tech Journal

Bilingual (Bahasa Melayu / English) technical blog covering cloud security,
AI guardrail engineering, and regional defence tech. Built via prompt-driven
development with the Claude Code CLI — no manual IDE edits.

🌐 **Live:** <https://malay-tech-journal.pages.dev/>

## Features

- Dark-only theme with custom Tailwind design tokens (no UI framework dependency)
- Bilingual routing (`ms` default, `en` prefixed) with locale-aware dates and hreflang
- Pagefind static search — no external service
- Optional Giscus comments (GitHub Discussions)
- Auto-generated Open Graph images per post (Satori + resvg)
- Opt-in KaTeX math and Mermaid diagrams
- Reading time, tags, categories, series navigation, per-locale RSS
- Strict TypeScript, zero-warning ESLint, Prettier, markdownlint — all enforced in CI

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Astro v7 (static output) |
| Styling | Tailwind CSS v4 (dark-only) |
| Runtime | Bun ≥ 1.1.0 |
| Language | TypeScript (strict) |
| Hosting | Cloudflare Pages |
| Search | Pagefind |
| Comments | Giscus (optional) |

## Quickstart

```bash
bun install
bun run dev        # http://localhost:4321
bun run build      # → dist/
bun run preview    # serve dist/ (search only works here, not in dev)
bun run typecheck
bun run lint
bun run format
```

Full architecture, config reference, and contributor guide: [AGENTS.md](./AGENTS.md).

## i18n

| Locale | URL pattern |
| --- | --- |
| Bahasa Melayu — default | `/posts/my-post` |
| English | `/en/posts/my-post` |

Default locale is set by `SITE.defaultLocale` in `src/config.ts`. See
[AGENTS.md](./AGENTS.md#i18n) for adding a locale or changing the default.

## Writing a post

Add `src/content/posts/<locale>/<slug>.md` (or `.mdx`) with:

```yaml
---
title: 'Post title'
description: 'One-sentence summary for listings and meta tags.'
pubDate: 2026-01-01
---
```

Pair translations with a matching `translationKey`. Full frontmatter
reference: [AGENTS.md](./AGENTS.md#content-schema).

## Deployment

**Cloudflare Pages** is the canonical deploy, via
`.github/workflows/deploy-cloudflare.yml`: every push to `main` runs
`bun run build` and `wrangler pages deploy`, authenticated with the
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets. Cloudflare's
own Git integration must stay **disabled** (Pages → project → Settings →
Builds & deployments) — leaving it on would double-deploy every push.

A secondary `deploy.yml` workflow builds the same site for GitHub Pages on
every push; its publish step only runs if GitHub Pages is enabled on this
repo (currently isn't), so today it's a build-health check.

One-time Cloudflare setup: create the Pages project, disable its Git
integration, create an API token scoped to **Account → Cloudflare Pages →
Edit**, then:

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo arifbazli/malay-tech-journal
gh secret set CLOUDFLARE_ACCOUNT_ID --repo arifbazli/malay-tech-journal
```

Push to `main` (or `gh workflow run deploy-cloudflare.yml`) to trigger a
deploy. Never paste a token into an issue, PR, chat, or commit — treat any
exposed token as compromised and roll it immediately.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and PR expectations, and
[SECURITY.md](./SECURITY.md) to report vulnerabilities privately.

## License

MIT — see [LICENSE](./LICENSE). Original theme
([chirping-astro](https://github.com/kannansuresh/chirping-astro)) also
MIT-licensed.
