# Malay Tech Journal

Source for **Malay Tech Journal** — a Bahasa Malaysia technical blog
covering cloud security, AI guardrail engineering, and military
AI/defence topics for Malaysian engineers.

🌐 **Live site:** https://malay-tech-journal.pages.dev/

---

## About

This is a bilingual technical journal built for Malaysian engineers,
with a focus on:

- Cloud security (CSPM, CWPP, IAM hardening, multi-cloud posture)
- AI guardrail engineering and red-teaming (prompt injection, jailbreak
  defenses)
- Military AI and regional defence tech (drone warfare, JADC2,
  Malaysia/ASEAN defence policy)

## Inspired by

Astro v7 theme created by [kannansuresh](https://github.com/kannansuresh).
The theme provided the original Astro + Tailwind + daisyUI foundation
(i18n routing, Pagefind search, Giscus comments, KaTeX, Expressive
Code), which I have since modified and customized myself for Malay
Tech Journal's agentic web development content, branding, and
deployment pipeline.

## Tech stack

- Astro v7
- Tailwind CSS v4
- Bun / TypeScript
- Cloudflare Pages / Wrangler CLI for hosting
- Custom cover image generation (Python + Pillow) — see parent
  `tech-journal/` tooling folder

## Workflow

```mermaid
flowchart TD
    A[💻 Local Development<br/>Debian/WSL + Local Harness Agent] --> B

    subgraph B[Build & Styling Stack]
        direction LR
        B1[🚀 Astro v7<br/>Routing & Content]
        B2[🎨 Tailwind v4<br/>Utility Styling]
        B3[🔤 Font Pipeline]
    end

    B --> C[📦 npm run build → dist/]
    C --> D[☁️ Cloudflare Pages<br/>Wrangler CLI + API Deploy]
    D --> E[🌐 Live Site<br/>malay-tech-journal.pages.dev]

    classDef devNode fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#f1f5f9
    classDef buildNode fill:#0f172a,stroke:#818cf8,stroke-width:2px,color:#f1f5f9
    classDef deployNode fill:#1e293b,stroke:#f472b6,stroke-width:2px,color:#f1f5f9
    classDef liveNode fill:#052e16,stroke:#4ade80,stroke-width:3px,color:#f1f5f9

    class A devNode
    class B1,B2,B3 buildNode
    class C,D deployNode
    class E liveNode
```

## Getting started

```bash
bun install
bun run dev
```

## Building

```bash
bun run build
```

## Deployment

Deployed to Cloudflare Pages. Build, deploy, and cleanup are handled
by helper scripts one level up in the parent `tech-journal/` folder
(`deploy.sh`, `new-post.sh`, `cover_gen.py`).

## License

MIT — see [LICENSE](./LICENSE). Original theme also MIT-licensed by
kannansuresh.

## Acknowledgements

This project's underlying theme, chirping-astro, was itself inspired
by the [Chirpy Jekyll theme](https://chirpy.cotes.page/) for its
design language.
