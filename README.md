# Malay Tech Journal

Bilingual (Bahasa Melayu / English) blog on cloud security, AI guardrail
engineering, and regional defence tech. Built solo via prompt-driven
development with the Claude Code CLI — no manual IDE edits.

🌐 **Live:** <https://malay-tech-journal.pages.dev/>

## Stack

| Layer     | Technology                 |
| --------- | -------------------------- |
| Framework | Astro v7 (static output)   |
| Styling   | Tailwind CSS v4, dark-only |
| Runtime   | Bun ≥ 1.1.0                |
| Language  | TypeScript (strict)        |
| Hosting   | Cloudflare Pages           |
| Search    | Pagefind (static index)    |
| Comments  | Giscus (optional)          |

Also: auto-generated OG images per post, opt-in KaTeX math and Mermaid
diagrams, per-locale RSS, and a zero-warning ESLint/Prettier/markdownlint CI gate.

## Quickstart

```bash
bun install
bun run dev        # http://localhost:4321
bun run build      # → dist/
bun run preview    # serve dist/ (search only works here, not in dev)
```

Architecture, config reference, and full contributor guide: [AGENTS.md](./AGENTS.md).

## Content

Posts live in `src/content/posts/<locale>/<slug>.md`, one folder per locale
(`ms` default, `en` at `/en/`):

```yaml
---
title: 'Post title'
description: 'One-sentence summary for listings and meta tags.'
pubDate: 2026-01-01
---
```

Pair translations with a matching `translationKey`. New posts can also come
from the `/write-post` agent pipeline (research → draft → PR, always
`draft: true`) — see [AGENTS.md](./AGENTS.md#content-pipeline-write-post).
Full i18n and frontmatter reference: [AGENTS.md](./AGENTS.md).

## Pipeline

```mermaid
flowchart LR
    subgraph author["✍️ Author"]
        direction LR
        A1["/write-post agent"]
        A2["Manual · Claude Code CLI"]
    end

    subgraph review["🔎 Review"]
        direction LR
        B(["Pull Request"])
        C{"pr-checks.yml"}
    end

    subgraph ship["🚀 Ship"]
        direction LR
        D(["Merge to main"])
        E{"publish<br/>label?"}
        F["publish-on-merge.yml<br/>draft → false"]
        G["deploy-cloudflare.yml"]
    end

    A1 --> B
    A2 --> B
    B --> C
    C -->|fail| A2
    C -->|pass| D
    D --> E
    E -->|yes| F --> G
    E -->|otherwise| G
    G --> H(["🌐 pages.dev"])

    classDef author fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    classDef check fill:#1e293b,stroke:#38bdf8,color:#e2e8f0
    classDef deploy fill:#052e2b,stroke:#34d399,color:#e2e8f0
    classDef live fill:#3b0764,stroke:#e879f9,color:#f5d0fe
    class A1,A2 author
    class B,C check
    class D,E,F,G deploy
    class H live
```

Every push runs `pr-checks.yml` (lint, format, markdownlint, typecheck,
test, build). Merging to `main` always builds and deploys via Wrangler
(`deploy-cloudflare.yml`, the canonical live deploy); a content PR only
goes live as a _visible_ post if it carried the `publish` label, which
`publish-on-merge.yml` uses to flip `draft: false` before that deploy runs.
`deploy.yml` builds the same site for GitHub Pages as a secondary health
check (not currently published). One-time Cloudflare setup:
[AGENTS.md](./AGENTS.md#cloudflare-pages-one-time-setup).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and PR expectations, and
[SECURITY.md](./SECURITY.md) to report vulnerabilities privately.

## License

MIT — see [LICENSE](./LICENSE). Original theme
([chirping-astro](https://github.com/kannansuresh/chirping-astro)) also
MIT-licensed.
