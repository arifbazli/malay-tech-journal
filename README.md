# Malay Tech Journal

**Malay Tech Journal is a bilingual (Bahasa Melayu / English) publication on cloud security, AI guardrails and defence tech, written for engineers who build and defend production systems.** Every claim links to a primary source.

[![Live site](https://img.shields.io/badge/live-malay--tech--journal.pages.dev-5b8fff)](https://malay-tech-journal.pages.dev)
[![PR Checks](https://github.com/arifbazli/malay-tech-journal/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/arifbazli/malay-tech-journal/actions/workflows/pr-checks.yml)
[![Astro 7](https://img.shields.io/badge/Astro-7-ff5d01?logo=astro&logoColor=white)](https://astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-f38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Code: MIT](https://img.shields.io/badge/code-MIT-34d399)](./LICENSE)
[![Writing: CC BY 4.0](https://img.shields.io/badge/writing-CC%20BY%204.0-a78bfa)](./LICENSE-CONTENT.md)

![Architecture: posts are written as bilingual Markdown, verified by pull-request checks on GitHub, built into a static site by Astro on Bun, and deployed to Cloudflare Pages on every merge and once a day](docs/assets/architecture.svg)

## What you'll find

| Series                                                                                                       | What it covers                                                                |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [Ground Truth](https://malay-tech-journal.pages.dev/en/categories/ground-truth/)                             | Research essays that check vendor and industry claims against primary sources |
| [AI Guardrail Engineering](https://malay-tech-journal.pages.dev/en/categories/ai-guardrail-engineering/)     | Designing, testing and breaking guardrails for LLM and agentic systems        |
| [Cloud Security Engineering](https://malay-tech-journal.pages.dev/en/categories/cloud-security-engineering/) | Posture, identity, shift-left and remediation                                 |
| [Military AI & Defence](https://malay-tech-journal.pages.dev/en/categories/military-ai-defence/)             | Military AI and defence tech, with a Malaysian lens                           |

Bahasa Melayu is served at [`/`](https://malay-tech-journal.pages.dev/) and English at [`/en/`](https://malay-tech-journal.pages.dev/en/). The [Projects](https://malay-tech-journal.pages.dev/en/projects/) page lists the open-source tools behind the writing.

## Features

- **Two languages, one post.** EN and MS files share a `translationKey`; the language switcher, `hreflang` links and per-locale RSS feeds follow from it.
- **Static and fast.** Astro renders every page at build time; client-side JavaScript is limited to small islands (search, language switcher, table of contents, diagrams).
- **Share cards for every post.** Satori generates a 1200×630 Open Graph image per post, so links look right on LinkedIn and X.
- **Self-updating Projects page.** Built from the GitHub API on each deploy, with hand-written outcome lines for featured repositories. A daily scheduled deploy keeps it current.
- **Search without a server.** Pagefind indexes the built site; queries run in the browser.
- **SEO and structured data.** Canonical URLs, sitemaps, JSON-LD (`BlogPosting`, `Person`), IndexNow key.
- **Hardened delivery.** Strict Content-Security-Policy, HSTS, Permissions-Policy and Referrer-Policy via [`public/_headers`](public/_headers).
- **No tracking.** No cookies, analytics or comments; see the [privacy policy](https://malay-tech-journal.pages.dev/en/privacy/).

## Tech stack

| Layer                     | Choice                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| Framework                 | [Astro 7](https://astro.build) (static output), TypeScript (strict), MDX                       |
| Styling                   | Tailwind CSS 4, custom dark design tokens                                                      |
| Content                   | Astro content collections with a Zod schema ([`src/content.config.ts`](src/content.config.ts)) |
| Extras                    | Expressive Code, Mermaid, KaTeX (opt-in), Satori + resvg for share images                      |
| Search                    | Pagefind                                                                                       |
| Runtime & package manager | Bun ≥ 1.1 (`bun.lock`)                                                                         |
| Quality                   | ESLint (incl. jsx-a11y), Prettier, `astro check`, `bun test`, Husky + lint-staged              |
| Hosting                   | Cloudflare Pages, deployed with Wrangler from GitHub Actions                                   |

## Quick start

Requires [Bun](https://bun.sh) 1.1 or later.

```bash
git clone https://github.com/arifbazli/malay-tech-journal.git
cd malay-tech-journal
bun install
bun run dev        # http://localhost:4321
```

| Command                                                                    | What it does                                                |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `bun run dev`                                                              | Dev server with hot reload (search is not available in dev) |
| `bun run build`                                                            | Static build to `dist/` plus the Pagefind index             |
| `bun run preview`                                                          | Serve `dist/` locally, search included                      |
| `bun run lint` · `bun run typecheck` · `bun run format:check` · `bun test` | The checks CI runs on every pull request                    |

## Writing a post

Create a pair of files with the same name, one per language:

```text
src/content/posts/ms/my-post.md   →  /posts/my-post/
src/content/posts/en/my-post.md   →  /en/posts/my-post/
```

```yaml
---
title: 'Identity is the new perimeter' # sentence case
description: 'One sentence, up to 160 characters, not a copy of the title.'
pubDate: 2026-11-24
categories: ['Ground Truth'] # first category = series
tags: [iam, cloud, security]
postType: essay # essay | case-study | field-note | series-index
translationKey: 'identity-perimeter' # same value in both files
draft: true
---
```

The schema rejects missing or invalid fields at build time. Leave `heroImage` out and a share card is generated for you. Writing conventions (voice, sourcing, covers) are in [AGENTS.md](AGENTS.md).

## Publishing

1. Open a pull request. **PR Checks** runs lint, format, types, tests and a build for what changed.
2. Merge to `main`. **Deploy to Cloudflare Pages** builds and ships the site.
3. Draft posts go live only when their pull request carries the `publish` label: **Publish on Merge** flips `draft: false` on that PR's posts and pushes to `main`, which deploys.

Posts drafted by the research pipeline always arrive as pull requests with `draft: true`; publishing stays a human decision.

## Automation

| Workflow                                                             | When                            | Purpose                                                       |
| -------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------- |
| [`pr-checks.yml`](.github/workflows/pr-checks.yml)                   | Pull requests, pushes to `main` | Change-aware lint, format, typecheck, tests and build         |
| [`deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml)   | Push to `main`, daily 02:23 UTC | Build and deploy the live site                                |
| [`publish-on-merge.yml`](.github/workflows/publish-on-merge.yml)     | PR merged with `publish` label  | Flip drafts to published                                      |
| [`weekly.yml`](.github/workflows/weekly.yml)                         | Mondays                         | Full smoke build on a clean runner                            |
| [`bun-update-monitor.yml`](.github/workflows/bun-update-monitor.yml) | Mondays                         | Opens an issue when the pinned Bun version falls behind       |
| [`deploy.yml`](.github/workflows/deploy.yml)                         | Push to `main`                  | GitHub Pages build check (publishes only if Pages is enabled) |
| Dependabot                                                           | Weekly                          | Grouped npm updates; major Astro upgrades left to a human     |

## Configuration

Site identity, navigation, social links and the author profile live in [`src/config.ts`](src/config.ts). Build-time environment variables:

| Variable               | Used for                                                      |
| ---------------------- | ------------------------------------------------------------- |
| `SITE_URL`             | Canonical URLs, RSS, sitemap (defaults to the live URL)       |
| `PUBLIC_CONTACT_EMAIL` | Overrides the contact address                                 |
| `PUBLIC_GISCUS_*`      | Optional comments (off by default)                            |
| `GITHUB_TOKEN`         | Raises the GitHub API limit for the Projects page (set in CI) |

Deploys need the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

## Project structure

```text
src/
├── content/          # posts/{ms,en}, pages/{ms,en} (About, Privacy)
├── pages/[...locale]/ # every route, rendered once per locale
├── components/       # layout, post, SEO and UI pieces; client islands
├── layouts/          # Base, Page and Post layouts
├── utils/            # posts, SEO, OG images, GitHub projects (+ tests)
├── i18n/             # UI strings for both locales
└── config.ts         # site, author profile, socials
public/               # _headers, _redirects, covers, feed/sitemap styles
docs/assets/          # README diagram
```

Architecture notes, routing, the content schema and CI details: [AGENTS.md](AGENTS.md).

## Contributing & security

Corrections and suggestions are welcome through issues or pull requests; see [CONTRIBUTING.md](CONTRIBUTING.md). Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## License

- Code: [MIT](LICENSE)
- Writing and cover images: [CC BY 4.0](LICENSE-CONTENT.md)

Built on the [Chirping Astro](https://github.com/kannansuresh/chirping-astro) theme.

---

Written by **[Arif Bazli](https://malay-tech-journal.pages.dev/en/about/)** · [LinkedIn](https://www.linkedin.com/in/muhammad-arif-bazli-abu-bakar-9aa605171) · [arifbazli@gmail.com](mailto:arifbazli@gmail.com)
