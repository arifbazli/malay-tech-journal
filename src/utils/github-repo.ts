/**
 * GitHub repo data fetcher for the /projects page.
 *
 * Fetches live data from the GitHub REST API at *build time* (not per request),
 * then exposes a typed payload for the projects.astro page to render.
 *
 * Why build-time, not client-side fetch?
 *   - Unauthenticated GitHub API limit: 60 req/hour per IP. If the visitor
 *     fetches on every page load, we'd burn the rate limit in 30 minutes.
 *   - The data is "real-time" relative to the *publish event* (i.e. the most
 *     recent site deploy). This is exactly how GitHub Pages and most static
 *     portfolios work — the embed reflects data as of the last build.
 *   - No CORS or CSP gymnastics on the runtime.
 *
 * Cache strategy:
 *   - First call hits the API.
 *   - Subsequent calls within the same build use the in-memory cache.
 *   - On failure (rate limit, network), returns a "fallback" payload so the
 *     page still renders. The fallback is clearly marked as stale.
 *
 * Optional auth:
 *   - Set GITHUB_TOKEN env var to bump the rate limit to 5,000 req/hour.
 *   - Token is read at module load only; never written to disk or logs.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

// Repo handle/name sourced from env so the same build works for any
// deployment. Fallbacks mirror the upstream theme's defaults.
const REPO =
  process.env.PROJECTS_REPO ||
  (import.meta.env.PUBLIC_GITHUB_HANDLE && import.meta.env.PUBLIC_GITHUB_REPO
    ? `${import.meta.env.PUBLIC_GITHUB_HANDLE}/${import.meta.env.PUBLIC_GITHUB_REPO}`
    : 'arifbazli/malay-tech-journal');
const API = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

// Module-level cache so multiple calls in one build don't hit GitHub twice
let _cache: RepoSnapshot | null = null;

// Path to the on-disk cache (survives across builds for offline fallback)
const CACHE_PATH = join(process.cwd(), '.cache', 'github-repo.json');

export interface RepoCommit {
  sha: string;
  shortSha: string;
  message: string;
  date: string;
  author: string;
  url: string;
}

export interface RepoLanguage {
  name: string;
  bytes: number;
  percent: number;
  color: string;
}

export interface RepoContributor {
  login: string;
  contributions: number;
  avatarUrl: string;
  htmlUrl: string;
}

export interface RepoSnapshot {
  /** Repository full name, e.g. "arifbazli/cyberpujangga" */
  fullName: string;
  /** Public-facing description from the repo */
  description: string;
  /** Default branch name, typically "main" */
  defaultBranch: string;
  /** Total repo size on disk in KB */
  sizeKB: number;
  /** Visibility — usually "public" */
  visibility: string;
  /** Whether Issues are enabled */
  hasIssues: boolean;
  /** Whether Discussions are enabled */
  hasDiscussions: boolean;
  /** Star count (zero for personal brand-new repos is normal) */
  stars: number;
  /** Fork count */
  forks: number;
  /** Open issues count */
  openIssues: number;
  /** Subscriber (watcher) count */
  watchers: number;
  /** Most recent commit on the default branch */
  latestCommit: RepoCommit | null;
  /** Languages used, sorted by share descending */
  languages: RepoLanguage[];
  /** Top contributors */
  contributors: RepoContributor[];
  /** ISO timestamp of when this snapshot was generated */
  fetchedAt: string;
  /** True if this payload came from the disk cache because the API call failed */
  isStale: boolean;
}

/** Subset of the GitHub REST API's repo response actually consumed here. */
interface GitHubRepoApiResponse {
  full_name: string;
  description: string | null;
  default_branch: string;
  size: number;
  visibility: string;
  has_issues: boolean;
  has_discussions: boolean;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  subscribers_count: number;
}

interface GitHubCommitApiResponse {
  sha: string;
  html_url: string;
  commit?: { message?: string; author?: { date?: string; name?: string } };
}

interface GitHubContributorApiResponse {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  Bash: '#89e051',
  'Open Policy Agent': '#7d4198',
  Rego: '#7d4198',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  YAML: '#cb171e',
  JSON: '#292929',
  Markdown: '#083fa1',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

function headers(): HeadersInit {
  const h: Record<string, string> = {
    'User-Agent': 'tech-journal-build',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: headers() });
    if (!res.ok) {
      console.warn(`[github-repo] ${url} → ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`[github-repo] ${url} → ${(e as Error).message}`);
    return null;
  }
}

/**
 * Try to load from the disk cache. Returns null if missing or malformed.
 */
function readDiskCache(): RepoSnapshot | null {
  if (!existsSync(CACHE_PATH)) return null;
  try {
    const raw = readFileSync(CACHE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as RepoSnapshot;
    // Mark stale so the UI can show "as of N days ago"
    return { ...parsed, isStale: true };
  } catch {
    return null;
  }
}

function writeDiskCache(snap: RepoSnapshot): void {
  try {
    mkdirSync(dirname(CACHE_PATH), { recursive: true });
    writeFileSync(CACHE_PATH, JSON.stringify(snap, null, 2));
  } catch (e) {
    console.warn(`[github-repo] cache write failed: ${(e as Error).message}`);
  }
}

function languageColor(name: string): string {
  return LANGUAGE_COLORS[name] || '#6b7194';
}

/**
 * Main entry: returns a RepoSnapshot. Cached at module + disk level.
 * Never throws — returns a minimal fallback if both API and disk cache fail.
 */
export async function loadRepoSnapshot(): Promise<RepoSnapshot> {
  if (_cache) return _cache;

  const repo = await fetchJson<GitHubRepoApiResponse>(`${API}/repos/${REPO}`);
  if (!repo) {
    const disk = readDiskCache();
    if (disk) {
      _cache = disk;
      return disk;
    }
    // Last-resort fallback so the page still renders
    _cache = {
      fullName: REPO,
      description: 'Deploy Cloud - AI Agents Guardrails',
      defaultBranch: 'main',
      sizeKB: 145,
      visibility: 'public',
      hasIssues: true,
      hasDiscussions: false,
      stars: 0,
      forks: 0,
      openIssues: 0,
      watchers: 0,
      latestCommit: null,
      languages: [
        { name: 'Open Policy Agent', bytes: 210786, percent: 68, color: '#7d4198' },
        { name: 'Python', bytes: 98130, percent: 32, color: '#3572A5' },
      ],
      contributors: [],
      fetchedAt: new Date().toISOString(),
      isStale: true,
    };
    return _cache;
  }

  // Fetch auxiliary data in parallel
  const [latestCommitRaw, languagesRaw, contributorsRaw] = await Promise.all([
    fetchJson<GitHubCommitApiResponse>(`${API}/repos/${REPO}/commits/${repo.default_branch}`),
    fetchJson<Record<string, number>>(`${API}/repos/${REPO}/languages`),
    fetchJson<GitHubContributorApiResponse[]>(`${API}/repos/${REPO}/contributors?per_page=5`),
  ]);

  // Languages → sorted, percent-calculated
  const langBytes = languagesRaw ?? {};
  const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0) || 1;
  const languages: RepoLanguage[] = Object.entries(langBytes)
    .sort(([, a], [, b]) => b - a)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / totalBytes) * 100),
      color: languageColor(name),
    }));

  const latestCommit: RepoCommit | null = latestCommitRaw
    ? {
        sha: latestCommitRaw.sha,
        shortSha: latestCommitRaw.sha.slice(0, 7),
        message: (latestCommitRaw.commit?.message ?? '').split('\n')[0],
        date: latestCommitRaw.commit?.author?.date ?? '',
        author: latestCommitRaw.commit?.author?.name ?? '',
        url: latestCommitRaw.html_url,
      }
    : null;

  const contributors: RepoContributor[] = (contributorsRaw ?? []).map((c) => ({
    login: c.login,
    contributions: c.contributions,
    avatarUrl: c.avatar_url,
    htmlUrl: c.html_url,
  }));

  const snap: RepoSnapshot = {
    fullName: repo.full_name,
    description: repo.description ?? '',
    defaultBranch: repo.default_branch,
    sizeKB: repo.size,
    visibility: repo.visibility,
    hasIssues: repo.has_issues,
    hasDiscussions: repo.has_discussions,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    watchers: repo.subscribers_count,
    latestCommit,
    languages,
    contributors,
    fetchedAt: new Date().toISOString(),
    isStale: false,
  };

  writeDiskCache(snap);
  _cache = snap;
  return snap;
}

/** Human-friendly "X ago" string. */
export function relativeTime(iso: string, now: Date = new Date()): string {
  if (!iso) return '—';
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  const yr = Math.floor(day / 365);
  return `${yr}y ago`;
}
