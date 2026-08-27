# Malay Tech Journal

Bilingual (Bahasa Melayu / English) blog on cloud security, AI guardrails,
and regional defence tech. Built via prompt-driven development — multiple
CLI coding agents and harnesses, no manual IDE edits.

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

## Quickstart

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # → dist/
bun run preview  # serve dist/ (search only works here, not in dev)
```

## Content

Posts: `src/content/posts/<locale>/<slug>.md` (`ms` default, `en` at
`/en/`), paired across locales by `translationKey`. New posts can also
come from the `/write-post` agent pipeline (research → draft → PR,
`draft: true`). Full schema and i18n reference: [AGENTS.md](./AGENTS.md).

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

Every PR runs full CI; merging always deploys via Wrangler, but a content
PR only goes _live_ if it carried the `publish` label first. Setup:
[AGENTS.md](./AGENTS.md#cloudflare-pages-one-time-setup).

## More

- [AGENTS.md](./AGENTS.md) — architecture, config, and content schema
- [CONTRIBUTING.md](./CONTRIBUTING.md) · [SECURITY.md](./SECURITY.md) · [LICENSE](./LICENSE) (MIT)
