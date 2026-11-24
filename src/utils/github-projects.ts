/**
 * Build-time GitHub project list for the Projects page.
 *
 * The page fetches the owner's public repositories from the GitHub REST API
 * on every build, so new repositories, renames, languages and activity dates
 * show up without editing this file. The deploy workflow rebuilds on a daily
 * schedule to keep the data fresh.
 *
 * Hand-written outcome lines (`PROJECT_HIGHLIGHTS`) replace the raw GitHub
 * description for the repositories that have one. If the API cannot be
 * reached, the build falls back to `FALLBACK_REPOSITORIES` instead of failing.
 */
import type { Locale } from '~/config';
import type { LocalizedText } from '~/types/config';

/** The subset of the GitHub repository payload the page uses. */
export interface GitHubRepository {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string | null;
}

export interface Project {
  name: string;
  url: string;
  /** Outcome line when curated, otherwise the GitHub description. */
  summary: string;
  language: string;
  /** Live demo or docs site, when the repository sets one. */
  homepage?: string;
  topics: string[];
  /** Last push; absent in the offline fallback list. */
  pushedAt?: Date;
  featured: boolean;
}

/**
 * One outcome-focused line per repository: the problem, what was built and
 * the result. Keys are repository names (case-insensitive). The order of this
 * object is the display order of featured projects.
 */
export const PROJECT_HIGHLIGHTS: Record<string, LocalizedText> = {
  'AI-Agent-Guardrails-Hub': {
    en: 'Stops risky CI/CD pipeline changes and coding-agent actions before they merge: OPA policy-as-code rules tested on every PR, plus a fail-closed loop that auto-fixes and escalates.',
    ms: 'Menyekat perubahan pipeline CI/CD dan tindakan coding agent yang berisiko sebelum merge: peraturan OPA policy-as-code yang diuji pada setiap PR, serta loop fail-closed yang auto-fix dan escalate.',
  },
  'grounded-ai-guardrails': {
    en: 'Makes AI guardrail policies auditable: every vendor-backed value is tied to a quote on an official page and confirmed by a judge model from another family before it is used.',
    ms: 'Menjadikan polisi AI guardrail boleh diaudit: setiap nilai daripada vendor diikat pada petikan di halaman rasmi dan disahkan oleh model hakim dari keluarga lain sebelum digunakan.',
  },
  'agent-code-search': {
    en: 'Lets AI coding agents find code by meaning and trace real call graphs without code leaving the machine: a CLI and MCP server on local Ollama embeddings and tree-sitter.',
    ms: 'Membolehkan coding agent mencari kod ikut makna dan menjejak call graph sebenar tanpa kod keluar dari mesin: CLI dan pelayan MCP atas embedding Ollama tempatan dan tree-sitter.',
  },
  'rust-agentic-sandbox': {
    en: 'Puts AI coding and security agents behind one deterministic gate: a Rust orchestrator sandboxes every proposed write and shell command, and a non-LLM verdict engine decides.',
    ms: 'Meletakkan coding agent dan security agent di belakang satu gate deterministik: orkestrator Rust men-sandbox setiap write dan arahan shell, dan enjin keputusan bukan-LLM yang memutuskan.',
  },
  'PenTest-AI-Agent-Swarm': {
    en: 'Multi-agent web pentesting confined to local test apps: agents hand off work through a Postgres blackboard and every request passes a code-enforced Safety Gateway.',
    ms: 'Pentest web multi-agent yang terhad kepada aplikasi ujian tempatan: agent menyerahkan kerja melalui blackboard Postgres dan setiap request melalui Safety Gateway yang dikuatkuasakan dalam kod.',
  },
  GuardAgent_PenTest_Guardrail: {
    en: 'Checks that guardrails for Copilot CLI, Claude Code and custom agents block poisoned prompts, offline and in CI on every change, without executing anything.',
    ms: 'Menguji sama ada guardrail untuk Copilot CLI, Claude Code dan agent custom menyekat prompt beracun, secara offline dan dalam CI pada setiap perubahan, tanpa melaksanakan apa-apa.',
  },
  'shift-left-cloud-sandbox': {
    en: 'Practises shift-left cloud security without a real cloud account: AWS and Azure emulators where every terraform apply is gated by a tfsec scan with planted misconfigurations to catch.',
    ms: 'Latihan shift-left cloud security tanpa akaun cloud sebenar: emulator AWS dan Azure di mana setiap terraform apply digate oleh imbasan tfsec, dengan misconfiguration sengaja untuk ditangkap.',
  },
  'deliverableqa-agent': {
    en: 'Cuts hours of manual QA on long consulting deliverables: four Claude-on-Bedrock agents review consistency, brand, tone and structure in parallel and rank the findings.',
    ms: 'Menjimatkan berjam-jam QA manual pada deliverable konsultasi yang panjang: empat agent Claude di Bedrock menyemak konsistensi, jenama, nada dan struktur secara selari dan menyusun dapatan.',
  },
  'malay-tech-journal': {
    en: 'This site: a bilingual cloud-security publication on Astro and Cloudflare Pages with PR quality gates, i18n SEO and auto-generated share images.',
    ms: 'Laman ini: penerbitan cloud security dwibahasa atas Astro dan Cloudflare Pages, dengan quality gate PR, SEO i18n dan imej perkongsian automatik.',
  },
  'cyber-pujangga': {
    en: 'A bilingual home for essays and poems: plain-Markdown content with build-time translation-pair validation, generated social images and Playwright smoke tests.',
    ms: 'Rumah dwibahasa untuk esei dan puisi: kandungan Markdown biasa dengan validasi pasangan terjemahan semasa build, imej sosial automatik dan smoke test Playwright.',
  },
};

/** Used only when the GitHub API is unreachable at build time. */
export const FALLBACK_REPOSITORIES: GitHubRepository[] = Object.keys(PROJECT_HIGHLIGHTS).map(
  (name) => ({
    name,
    html_url: `https://github.com/arifbazli/${name}`,
    description: null,
    language: null,
    homepage: null,
    topics: [],
    fork: false,
    archived: false,
    private: false,
    pushed_at: null,
  }),
);

const highlightOrder = Object.keys(PROJECT_HIGHLIGHTS).map((name) => name.toLowerCase());

function highlightFor(name: string): LocalizedText | undefined {
  const key = Object.keys(PROJECT_HIGHLIGHTS).find((k) => k.toLowerCase() === name.toLowerCase());
  return key ? PROJECT_HIGHLIGHTS[key] : undefined;
}

/**
 * Turns raw repositories into display projects: drops forks, archived and
 * private repositories and the profile README repository, prefers curated
 * outcome lines, lists featured projects in curated order, then the rest by
 * most recent push.
 */
export function buildProjects(
  repositories: readonly GitHubRepository[],
  owner: string,
  locale: Locale,
): Project[] {
  const projects = repositories
    .filter((r) => !r.fork && !r.archived && !r.private)
    .filter((r) => r.name.toLowerCase() !== owner.toLowerCase())
    .map((r): Project => {
      const highlight = highlightFor(r.name);
      return {
        name: r.name,
        url: r.html_url,
        summary: highlight?.[locale] ?? r.description?.trim() ?? '',
        language: r.language ?? '',
        homepage: r.homepage?.trim() || undefined,
        topics: r.topics ?? [],
        pushedAt: r.pushed_at ? new Date(r.pushed_at) : undefined,
        featured: highlight !== undefined,
      };
    });

  const rank = (p: Project) => {
    const index = highlightOrder.indexOf(p.name.toLowerCase());
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.featured) return rank(a) - rank(b);
    return (b.pushedAt?.getTime() ?? 0) - (a.pushedAt?.getTime() ?? 0);
  });
}

let cache: Promise<GitHubRepository[]> | undefined;

/**
 * Fetches the owner's public repositories once per build. Uses
 * `GITHUB_TOKEN` when present (CI) to avoid the 60 requests/hour
 * anonymous limit. Never throws: on any failure it logs a warning and
 * returns `FALLBACK_REPOSITORIES`.
 */
export function fetchRepositories(owner: string): Promise<GitHubRepository[]> {
  cache ??= (async () => {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'malay-tech-journal-build',
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&type=owner&sort=pushed`,
        { headers, signal: AbortSignal.timeout(10_000) },
      );
      if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);
      const repositories = (await response.json()) as GitHubRepository[];
      if (!Array.isArray(repositories) || repositories.length === 0) {
        throw new Error('GitHub API returned no repositories');
      }
      return repositories;
    } catch (error) {
      console.warn(
        `[projects] Using fallback project list: ${error instanceof Error ? error.message : String(error)}`,
      );
      return FALLBACK_REPOSITORIES;
    }
  })();
  return cache;
}
