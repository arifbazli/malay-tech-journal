# Malay Tech Journal

A bilingual (Bahasa Melayu / English) blog on cloud security, AI guardrails and defence
tech, written for engineers who build and defend production systems.

**Live:** <https://malay-tech-journal.pages.dev/> · **Series:** Ground Truth · AI Guardrail
Engineering · Cloud Security Engineering · Military AI & Defence

## Stack

Astro 7 (static) · TypeScript · Tailwind CSS 4 · Bun · Pagefind search · Cloudflare Pages

## Quickstart

```bash
bun install
bun run dev       # http://localhost:4321
bun run build     # dist/ + Pagefind index
bun run preview   # serve dist/ (search works here, not in dev)
```

Before a PR: `bun run lint && bun run typecheck && bun run format:check && bun run build`

## Writing a post

Add `src/content/posts/<ms|en>/<slug>.md` with `title`, `description` and `pubDate`. Pair
translations with the same `translationKey`. Malay is the default locale (`/`); English is
served at `/en/`.

## Publishing

PR → `pr-checks.yml` → merge to `main` → `deploy-cloudflare.yml`. Draft posts go live only
when their PR carries the `publish` label (`publish-on-merge.yml` flips `draft: false`).

## Docs & licence

- [AGENTS.md](./AGENTS.md): architecture, config, content schema, writing voice, CI setup
- [CONTRIBUTING.md](./CONTRIBUTING.md) · [SECURITY.md](./SECURITY.md)
- Code: [MIT](./LICENSE) · Writing and covers: [CC BY 4.0](./LICENSE-CONTENT.md)
