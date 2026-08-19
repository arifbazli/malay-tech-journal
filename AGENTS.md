<!-- markdownlint-disable-file -->

# Agents.md — Malay Tech Journal

> Agentic development guide for `arifbazli/malay-tech-journal`: a personal
> bilingual (Bahasa Melayu / English) blog on cloud security, AI guardrail
> engineering, and regional defence tech. Built solo via prompt-driven
> development — no manual IDE edits.

This repo started as a fork of the upstream [`chirping-astro`](https://github.com/kannansuresh/chirping-astro)
theme, rebranded in place. It is **not** that theme's template repo — there
is no starter-sync mechanism and no obligation to stay generic. Optimize for
this blog, not for reuse by others.

| Dimension | Value |
| --- | --- |
| Framework | Astro v7 (static output) |
| Package manager | **Bun ≥ 1.1.0** only — lockfile is `bun.lock`. Never generate `package-lock.json`. |
| Styling | Tailwind CSS v4, dark-only, custom design tokens. No daisyUI / UI framework dependency. |
| Languages | TypeScript (strict), Astro, MDX, CSS |
| Locales | `en`, `ms` — default `ms` (no URL prefix); `en` prefixed `/en/` |
| Search | Pagefind (static index, built after `astro build`) |
| Comments | Giscus (optional, GitHub Discussions) |
| Math | KaTeX, opt-in per post (`math: true`) |
| Diagrams | Mermaid, client-hydrated; `render-diagrams.mjs` pre-renders SVGs for build-time checks |
| CI | `pr-checks.yml`, `deploy-cloudflare.yml` (canonical), `deploy.yml` (GitHub Pages, non-publishing), `weekly.yml`, `bun-update-monitor.yml`, `auto-merge-dependabot.yml`, `auto-merge-imgbot.yml`, `labels.yml` |

---

## Repository Layout

```text
.
├── astro.config.mjs      # Astro + integrations, i18n, markdown pipeline
├── render-diagrams.mjs   # Pre-renders Mermaid diagrams in posts to SVG
├── .env.example          # All recognised env vars, documented inline
├── public/               # Static assets served as-is
└── src/
    ├── config.ts          # SITE, NAV, SOCIALS, GISCUS, PAGEFIND
    ├── content.config.ts  # Zod schema for posts + pages
    ├── types/config.ts    # SiteConfig / NavItem / SocialLink / GiscusConfig
    ├── components/
    │   ├── islands/  # BackToTop, Giscus, LanguageSwitcher, MermaidLoader,
    │   │             # SearchButton, TableOfContents (client-hydrated)
    │   ├── layout/   # Footer, Logo, Topbar
    │   ├── post/     # PostList, PostMeta, PostNav, post-card/PostCardItem
    │   ├── seo/      # MathStyles, SEO
    │   └── ui/       # Callout, Pagination, Panel, SmartImage, VideoEmbed
    ├── content/
    │   ├── pages/<locale>/  # about.md, privacy.md
    │   └── posts/<locale>/  # Blog posts (.md / .mdx)
    ├── i18n/
    │   ├── ui.ts      # Per-locale UI string dictionaries
    │   ├── utils.ts   # localePrefix(), localizedPath(), formatDate(), etc.
    │   └── index.ts
    ├── plugins/
    │   ├── remark-alert.ts      # `alert` fenced block -> custom .mtj-alert-* HTML
    │   ├── remark-ashtml.ts     # `ashtml` fenced block -> raw HTML
    │   └── rehype-base-links.ts # Rewrites internal links for BASE_PATH
    ├── layouts/
    │   ├── BaseLayout.astro  # Shell: topbar, footer, no-FOUC script
    │   ├── PageLayout.astro  # Static pages
    │   └── PostLayout.astro  # Posts (TOC, Giscus, series nav)
    ├── pages/
    │   ├── 404.astro             # Root, locale-independent
    │   ├── og/[...slug].png.ts   # Satori OG image endpoint
    │   └── [...locale]/          # ALL routes for EVERY locale — see i18n below
    ├── styles/global.css
    └── utils/
        ├── posts.ts         # Collection helpers: sort, filter, paginate
        ├── reading-time.ts
        ├── seo.ts
        ├── slugify.ts       # Unicode-aware tag/category slugifier
        ├── og-image.ts      # Satori render helper
        └── github-repo.ts   # /projects page live GitHub stats
```

---

## Routing model

There is **one** dynamic route tree: `src/pages/[...locale]/`. Astro's i18n
routing (`astro.config.mjs`, `routing.prefixDefaultLocale: false`) resolves
which locale a request belongs to and whether a prefix is present — there
are **no** separate mirrored folders per locale. `src/pages/404.astro` and
`src/pages/og/[...slug].png.ts` sit outside `[...locale]/` and are
locale-independent.

> **No-Prefix Invariant:** the default locale (`SITE.defaultLocale` in
> `src/config.ts`, currently `ms`) always serves at the URL root. This is
> enforced by `prefixDefaultLocale: false` and `localePrefix()` in
> `src/i18n/utils.ts` returning `''` for the default locale. Never hard-code
> a `/ms` or `/en` prefix — always go through `localizedPath()`.

| Scenario | URL pattern |
| --- | --- |
| Default locale (`ms`) | `/`, `/posts/<slug>`, `/tags/…` (no prefix) |
| Non-default locale (`en`) | `/en/`, `/en/posts/<slug>`, `/en/tags/…` |
| RSS | `/rss.xml`, `/en/rss.xml` |
| Search | `/search`, `/en/search` |

### General rules

- All internal links go through `localizedPath()` from `src/i18n/utils.ts` —
  never write a bare `<a href="/foo">`.
- UI strings live in `src/i18n/ui.ts`; TypeScript enforces every key exists
  in every locale.
- The language switcher hides itself on a post with no sibling translation
  (no dead-end 404s). `hreflang` alternates emit only for locales that have
  a sibling; `x-default` only when the default locale has one.
- Locale is inferred from the content file path (`posts/<locale>/…`). Don't
  add a `lang:` frontmatter override unless intentional.

### Adding a locale (e.g. `de`)

1. Add `'de'` to `locales` in `src/config.ts`.
2. Add a `de` block to `src/i18n/ui.ts` with every existing key (TypeScript
   will flag anything missing).
3. Add `de` cases to `localeLabel()` and `htmlLang()` in `src/i18n/utils.ts`,
   and a locale branch in `formatDate()` if it needs custom formatting.
4. Add `src/content/posts/de/` and `src/content/pages/de/`.
5. Run `bun run build` and check `/de/...` routes render.

### Changing the default locale

Breaking, atomic change — do it in one commit:

1. `src/config.ts` → `defaultLocale: 'en'` (e.g.).
2. Confirm `prefixDefaultLocale: false` is unchanged in `astro.config.mjs`
   (it reads `SITE.defaultLocale` already — no other edit needed there).
3. `localePrefix()` / `localizedPath()` in `src/i18n/utils.ts` derive from
   `SITE.defaultLocale` automatically — verify with a build, don't assume.
4. Rebuild and check: old default's URLs now carry a prefix, new default's
   don't, canonical/hreflang tags follow, RSS/sitemap/Pagefind regenerate.

---

## Environment Variables

Reference: `.env.example`. Never commit `.env`. `PUBLIC_*` vars are
intentionally public — set them as GitHub **Variables**, not Secrets.
Secrets are reserved for deploy tokens.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | Recommended | Canonical origin, no trailing slash. Falls back to the Cloudflare Pages URL. |
| `BASE_PATH` | GitHub Pages only | Sub-path prefix; auto-detected by `deploy.yml`. Cloudflare Pages serves from root — never set here. |
| `PUBLIC_GITHUB_HANDLE` / `PUBLIC_GITHUB_REPO` | Optional | This site's own repo slug; used as a fallback for `PROJECTS_REPO`. |
| `PUBLIC_TWITTER_HANDLE` | Optional | Unused by the current `SOCIALS` list (see below); reserved. |
| `PUBLIC_CONTACT_EMAIL` | Optional | Email social link + mailto target. |
| `PUBLIC_AUTHOR_NAME` / `PUBLIC_AUTHOR_URL` | Optional | Overrides `SITE.author` and the LinkedIn social link. |
| `PROJECTS_REPO` | Optional | Repo the `/projects` page fetches live GitHub stats for (via `github-repo.ts`) — not necessarily this repo. |
| `GITHUB_TOKEN` / `GH_TOKEN` | Optional | Raises the GitHub API rate limit for `github-repo.ts` at build time. |
| `PUBLIC_GISCUS_ENABLED` + `PUBLIC_GISCUS_*` | Optional (Giscus) | Master switch + giscus.app values. |
| `CI_SKIP_AUTO_OG_IMAGE` / `CI_SKIP_RSS_SITEMAP` / `CI_SKIP_CONTENT_COLLECTIONS` | CI only | Fast-build mode for PRs. Never set locally. |

---

## Configuration (`src/config.ts`)

Single source of truth for site identity — never hard-code URLs in
components; read from `SITE`, `NAV`, `SOCIALS`, `GISCUS`, or `PAGEFIND`.

```ts
SITE.title / description / author // identity + meta
SITE.defaultOgImage // fallback OG image
SITE.postsPerPage // listing page size
SITE.isoDates // ISO dates vs. locale-formatted
SITE.showFeaturedImages / boxedArticles / dynamicPostCardHeight // listing/article presentation
SITE.autoOgImage // Satori OG generation on/off (default false)
SITE.showPrivacyPolicy // footer privacy link
SITE.footer.{leftText,rightText,showPrivacyPolicy,showThemeCredits,themeName,themeUrl}
SITE.url // canonical origin (see env table)
SITE.locales / defaultLocale / multilingual // see Routing model above

NAV      // top-bar links: home, categories, projects, about
SOCIALS  // literal SocialLink[] — currently LinkedIn + Email, env-driven hrefs
GISCUS   // mirrors PUBLIC_GISCUS_* env vars
PAGEFIND // { bundlePath, pageSize } — runtime search settings
```

---

## Content Schema (`src/content.config.ts`)

Zod-validated at build time. Locale is inferred from the file path — don't
add `lang:` unless overriding.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | — | 1–140 chars |
| `description` | string | — | 1–280 chars |
| `pubDate` | date | — | Required on posts; optional on pages |
| `updatedDate` | date | — | Shows an "updated" label |
| `tags` / `categories` | string[] | `[]` | Drive `/tags/` and `/categories/` |
| `draft` | boolean | `false` | Excluded from prod build + RSS |
| `heroImage` / `heroImageAlt` | string | — | Asset path, `/public` path, or allow-listed remote URL |
| `showFeaturedImage` | boolean | — | Per-post override of `SITE.showFeaturedImages` |
| `dynamicPostCardHeight` | boolean | — | Per-post override of `SITE.dynamicPostCardHeight` |
| `canonicalURL` | URL | — | Overrides the computed canonical |
| `comments` | boolean | — | `false` disables Giscus on this post |
| `toc` | boolean | `true` | Sticky table of contents |
| `pinned` | boolean | `false` | Float to top of listings |
| `postType` | enum | — | `essay` \| `case-study` \| `field-note` \| `series-index` |
| `math` | boolean | `false` | Loads KaTeX CSS on this page only |
| `translationKey` | string | slug | Pairs the same post across locales |
| `unlisted` | boolean | `false` | Hidden from listings/RSS/sitemap; URL still resolves |
| `unlistedHideFromSeo` | boolean | `true` if `unlisted` | Emits `noindex, nofollow` |

Pages additionally support `showInNav` (boolean, default `false`) and treat
`pubDate` as optional.

---

## Styling

- Tailwind v4 entry: `src/styles/global.css`. Dark-only — fixed
  `data-theme="chirpy-dark"` on `<html>` (`src/layouts/BaseLayout.astro`).
  There is no light theme or toggle. If ever renaming `chirpy-dark`, update
  it atomically in: `global.css`, `BaseLayout.astro`, `Giscus.astro` (theme
  sync), `Pagination.astro`, and `astro.config.mjs` (`themeCssSelector`).
- Fonts: **Inter** (body/UI), **Space Grotesk** (headings/display),
  **JetBrains Mono** (code) — all via Astro's local Font Providers API in
  `astro.config.mjs`, loaded through `<Font cssVariable="..." />` in
  `BaseLayout.astro`. Don't add `<link>` Google Fonts tags or `@import` font CSS.
- Alerts: `remark-alert.ts` emits `.mtj-alert-*` classes (a from-scratch
  replacement for daisyUI's `.alert-*`, kept for markup familiarity only —
  there is no daisyUI dependency in this project).
- SVG optimization is `experimental.svgOptimizer` in `astro.config.mjs`
  (Astro 7.x has not stabilized this key yet — don't move it to top-level).

---

## Hydration Islands (`src/components/islands/`)

| Island | Loads when |
| --- | --- |
| `BackToTop` | Every page (tiny) |
| `LanguageSwitcher` | Pure CSS — no JS |
| `SearchButton` | Pagefind bundle, lazy-loaded on modal open |
| `TableOfContents` | Posts with headings + `toc: true` |
| `MermaidLoader` | Posts containing a `mermaid` fenced block |
| `Giscus` | Posts with `comments: true` (and `GISCUS.enabled`) |

Don't add client-side JS outside an island, except the no-FOUC inline theme
script in `BaseLayout.astro`.

---

## Bun Scripts

```bash
bun run dev          # http://localhost:4321
bun run build        # astro build -> pagefind index in dist/
bun run preview      # serve dist/ (search only works here, not in dev)
bun run test         # bun test (src/utils/posts.test.ts, etc.)
bun run typecheck    # astro check
bun run lint         # ESLint, zero warnings
bun run format       # Prettier — write
bun run format:check # Prettier — check only (CI gate)
bun run pagefind     # Re-run Pagefind only, after astro build
```

---

## CI / GitHub Actions

| Workflow | Trigger | Notes |
| --- | --- | --- |
| `deploy-cloudflare.yml` | Push to `main` | **Canonical live deploy.** `bunx wrangler pages deploy` using `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets. Cloudflare's own Git integration must stay disabled. |
| `deploy.yml` | Push to `main` | GitHub Pages build-health check; only publishes if Pages is enabled (currently isn't). |
| `pr-checks.yml` | PR + push to `main` | Change-detected lint/format/markdownlint, typecheck, test, build. PRs build in fast mode (`CI_SKIP_*` env vars). |
| `weekly.yml` | Mon 06:17 UTC + manual | Full lint/typecheck/build/test smoke on a clean runner. |
| `bun-update-monitor.yml` | Mon 08:00 UTC + manual | Advisory only — warns + opens an issue if pinned Bun trails latest; never fails the run. |
| `auto-merge-dependabot.yml` / `auto-merge-imgbot.yml` | Bot PRs | Auto-merge for Dependabot / Imgbot PRs. |
| `labels.yml` | Manual dispatch | Applies `.github/labels.yml`. |

### Cloudflare Pages one-time setup

Only needed once per Cloudflare account/repo pairing:

1. Create the Pages project named `malay-tech-journal` (must match
   `--project-name` in `deploy-cloudflare.yml`).
2. Disable the project's own Git integration (**Settings → Builds &
   deployments**) — leaving it on double-deploys every push.
3. Create an API token scoped to **Account → Cloudflare Pages → Edit**.
4. Set repo secrets:
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN --repo arifbazli/malay-tech-journal
   gh secret set CLOUDFLARE_ACCOUNT_ID --repo arifbazli/malay-tech-journal
   ```
5. Push to `main` (or `gh workflow run deploy-cloudflare.yml`) to deploy.

Never paste a token into an issue, PR, chat, or commit — treat any exposed
token as compromised and roll it immediately.

---

## Common Agent Tasks

- **Add a post:** create `src/content/posts/<locale>/<slug>.md`, required
  frontmatter `title`, `description`, `pubDate`. Pair translations with a
  shared `translationKey`.
- **Unlist a post:** add `unlisted: true`. It's excluded from every listing,
  RSS, and sitemap, still reachable by direct URL, and `noindex, nofollow`
  by default (`unlistedHideFromSeo: false` to keep it indexable).
- **Add a nav link:** append to `NAV` in `src/config.ts`, add the matching
  `nav.<key>` string to every locale in `src/i18n/ui.ts`, then add the route
  under `src/pages/[...locale]/`.
- **Add a social icon:** append a literal `SocialLink` to `SOCIALS` in
  `src/config.ts`. Array order = sidebar order.
- **Change brand colour:** edit the CSS tokens in `src/styles/global.css`.
- **Enable math on a post:** `math: true` in frontmatter (loads KaTeX ~29 kB
  on that page only).
- **Toggle Giscus:** `PUBLIC_GISCUS_ENABLED` env var (global) or
  `comments: false` in frontmatter (per post).
- **Toggle auto OG images:** `SITE.autoOgImage` in `src/config.ts`; posts
  with a `heroImage` never use the generated one.

---

## Constraints & Pitfalls

| Constraint | Detail |
| --- | --- |
| Bun only | Never generate `package-lock.json` / `pnpm-lock.yaml`. |
| No bare `/` links | Always route through `localizedPath()`. |
| Default locale = no prefix, always | Hard architectural rule (`prefixDefaultLocale: false`). |
| Changing default locale is atomic | One commit; see "Changing the default locale" above. |
| Locale inferred from path | Don't add `lang:` unless intentionally overriding. |
| Pagefind needs a build | Search doesn't work in `bun run dev` — use `build` + `preview`. |
| Zero ESLint warnings | `bun run lint` must pass clean before merging. |
| Math is opt-in | Never load KaTeX globally. |
| `draft: true` | Excluded from prod builds/RSS/sitemap, visible in `bun run dev`. |
| `unlisted: true` | Excluded from listings/RSS/sitemap, URL still resolves; not in prev/next nav. |

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Search modal: "index not available" | Run `bun run build` — the Pagefind index only exists in `dist/`. |
| Giscus not rendering | Check `PUBLIC_GISCUS_*` env vars and that Discussions are enabled on the repo. |
| New locale routes 404 in dev | Restart `bun run dev` after adding content under a new locale folder. |
| `astro check` fails on `astro:content` | Run `bun run dev` or `build` once to generate `.astro/types.d.ts`. |
| `pubDate: Required` build error | A post is missing `pubDate` — the error names the file. |
| Non-Latin tag/category 404s | `slugify.ts` must keep its Unicode property escapes (`\p{L}\p{N}\p{M}`). |

---

## Agent Self-Maintenance

Outdated docs are worse than none. If you change architecture, config
shape, content schema, or CI, update this file **in the same commit**. Also
update [README.md](./README.md) for anything user-facing, and write or
update a demo post under `src/content/posts/<locale>/` if the change is
visible to readers.

Before committing:

```text
[ ] bun run typecheck / lint / format:check / build   — all clean
[ ] AGENTS.md updated for any architecture/config change
[ ] README.md updated for any user-facing change
```

*Last updated: 2026-08-18.*
