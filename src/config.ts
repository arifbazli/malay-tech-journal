import process from 'node:process';
import avatarImg from './assets/images/site/avatar.svg';
import ogDefaultImg from './assets/images/site/og-default.png';
import type { AuthorProfile, GiscusConfig, NavItem, SiteConfig, SocialLink } from './types/config';

/**
 * Global site + theme configuration.
 * Edit values here to rebrand the theme. All values are typed and consumed
 * across layouts, components, RSS, sitemap, and SEO.
 */

// Export imported site images for use in components
export const SITE_IMAGES = {
  avatar: avatarImg,
  ogDefault: ogDefaultImg,
} as const;

export const locales = ['en', 'ms'] as const;
export type Locale = (typeof locales)[number];

/**
 * Author + social handles. Filled in from env vars (see `.env.example`)
 * so identifiers never need to be hard-coded into source.
 *
 * Leave any handle as an empty string to drop it from the sidebar
 * automatically — the entry won't render and no broken `your-handle`
 * URL is exposed.
 */
const GITHUB_HANDLE = import.meta.env.PUBLIC_GITHUB_HANDLE ?? 'arifbazli';
const GITHUB_REPO = import.meta.env.PUBLIC_GITHUB_REPO ?? 'malay-tech-journal';
const THEME_REPO_URL = 'https://github.com/kannansuresh/chirping-astro';

/**
 * Public GitHub coordinates of the deployed source. Useful for custom links
 * and integrations that need a repository URL. When
 * `PUBLIC_GITHUB_HANDLE` is unset, `url` falls back to a safe default so
 * generated links never point at a 404.
 */
export const REPO = {
  handle: GITHUB_HANDLE,
  name: GITHUB_REPO,
  url: GITHUB_HANDLE ? `https://github.com/${GITHUB_HANDLE}/${GITHUB_REPO}` : 'https://github.com',
} as const;

export const SITE: SiteConfig = {
  // ==========================================
  // ✅ SAFE TO EDIT (Content & Presentation)
  // ==========================================

  /** Default site title used as homepage <title> and meta. */
  title: 'Malay Tech Journal',
  /** Site tagline / description. */
  description:
    'Field notes on cloud security, AI guardrails and defence tech, written for engineers who build and defend production systems.',
  /** Author/handle shown in footer + meta. */
  author: {
    name: import.meta.env.PUBLIC_AUTHOR_NAME ?? 'Arif Bazli',
    url:
      import.meta.env.PUBLIC_AUTHOR_URL ??
      'https://www.linkedin.com/in/muhammad-arif-bazli-abu-bakar-9aa605171',
    avatar: avatarImg,
  },
  /** Default OG image. */
  defaultOgImage: ogDefaultImg.src,
  /** Number of posts per page on listings. */
  postsPerPage: 10,
  /** Display ISO 8601 date format if true, otherwise locale-aware. */
  isoDates: false,
  /** Site-wide default for whether posts should display their featured image. */
  showFeaturedImages: true,
  /** Wrap the article body of posts and pages in a bordered, card-like container. */
  boxedArticles: false,
  /** Allow listing cards to grow when title/description content is longer. */
  dynamicPostCardHeight: false,
  /** Automatically generate Open Graph images for posts that don't have a `heroImage`. */
  autoOgImage: true,
  /** Show a link to the Privacy Policy page in the footer. */
  showPrivacyPolicy: true,
  /** Footer text/link controls. */
  footer: {
    /**
     * Optional full override for the left footer line. Supports {year} and {author}.
     * Default when undefined: "© {year} {author}. All rights reserved." (+ Privacy Policy link if enabled).
     */
    leftText: undefined,
    /**
     * Optional custom text before the theme link on the right footer line.
     * Default when undefined: "Powered by Astro · Theme <themeName>".
     */
    rightText: undefined,
    /** Whether to show the Privacy Policy link in the footer. */
    showPrivacyPolicy: true,
    /** Whether to show theme credits in the footer right side. Theme <themeName> */
    showThemeCredits: false,
    /** Label for the theme repository link in the right footer line. */
    themeName: 'Chirping Astro',
    /** Default upstream theme repository. */
    themeUrl: THEME_REPO_URL,
  },

  // ==========================================
  // ❗ CAN BREAK THINGS (EDIT WITH CAUTION)
  // ==========================================

  /** Public URL of the deployed site, no trailing slash. Breaks SEO/RSS if incorrect. */
  // `||` (not `??`) so an explicitly empty `SITE_URL=` in `.env` also
  // falls back to the default. Astro requires `site` to be a valid URL.
  url: process.env.SITE_URL || 'https://malay-tech-journal.pages.dev',
  /** Supported locales. Changing this requires adding/removing locale folders, content, and i18n entries. */
  locales: locales,
  /** Default locale. Changing this is a breaking, atomic, multi-file operation. */
  defaultLocale: 'ms',
  /** Show the language switcher and link to translated pages. */
  multilingual: true,
};

export const NAV: readonly NavItem[] = [
  { key: 'home', href: '/', icon: 'lucide:home' },
  { key: 'categories', href: '/categories', icon: 'lucide:pen-line' },
  { key: 'projects', href: '/projects', icon: 'lucide:folder-git-2' },
  { key: 'about', href: '/about', icon: 'lucide:info' },
] as const;

/**
 * Professional profile for the About page and the homepage byline.
 * Fill in `role`, `organization`, `yearsOfExperience` and `certifications`
 * with your real details; empty values are simply not rendered.
 */
export const AUTHOR_PROFILE: AuthorProfile = {
  role: { en: '', ms: '' },
  organization: 'Deloitte',
  yearsOfExperience: 0,
  location: { en: 'Kuala Lumpur, Malaysia', ms: 'Kuala Lumpur, Malaysia' },
  focusAreas: [
    { en: 'Cloud security posture (CSPM, ASPM)', ms: 'Cloud security posture (CSPM, ASPM)' },
    { en: 'AI guardrails and LLM security', ms: 'AI guardrail dan keselamatan LLM' },
    { en: 'Agentic AI security', ms: 'Keselamatan agentic AI' },
    { en: 'Policy-as-code and DevSecOps', ms: 'Policy-as-code dan DevSecOps' },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      url: 'https://www.credly.com/badges/8b08b2b3-c026-4729-ba03-4ddb823f8547',
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      url: 'https://www.credly.com/badges/45055a3a-4ce7-42bc-aa48-1aa6ca0f6d9f',
    },
  ],
};

const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL || 'arifbazli@gmail.com';

/**
 * SOCIALS is built from the env-driven handles above so users only edit
 * one place (`.env` or the constants at the top of this file). Empty
 * handles are filtered out automatically — the icon simply won't appear
 * in the sidebar. RSS is always present.
 *
 * Need a social network the theme doesn't ship with? Just append a
 * literal entry below — the type is `SocialLink`.
 */
export const SOCIALS: readonly SocialLink[] = [
  {
    label: 'LinkedIn',
    href:
      import.meta.env.PUBLIC_AUTHOR_URL ??
      'https://www.linkedin.com/in/muhammad-arif-bazli-abu-bakar-9aa605171',
    icon: 'simple-icons:linkedin',
  },
  // Email: PUBLIC_CONTACT_EMAIL (repository variable in CI, `.env` locally)
  // overrides the default address.
  ...(CONTACT_EMAIL
    ? [{ label: 'Email', href: `mailto:${CONTACT_EMAIL}`, icon: 'lucide:mail' }]
    : []),
] as const satisfies SocialLink[];

/**
 * Giscus comments. Set `enabled: false` to globally disable. Individual
 * posts may opt out via frontmatter `comments: false`.
 *
 * Generate values at https://giscus.app and either set them here or
 * (recommended) provide them via PUBLIC_GISCUS_* env vars at build time.
 */
export const GISCUS: GiscusConfig = {
  enabled: (import.meta.env.PUBLIC_GISCUS_ENABLED ?? 'false') === 'true',
  repo: import.meta.env.PUBLIC_GISCUS_REPO ?? '',
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID ?? '',
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY ?? 'Announcements',
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID ?? '',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  loading: 'lazy',
};

/**
 * Pagefind runtime settings. The index itself is generated by `bun run pagefind`
 * after `astro build` and written to `dist/_pagefind/`.
 */
export const PAGEFIND = {
  /** Public path where the Pagefind bundle is served. */
  bundlePath: '/_pagefind/',
  /** Number of results to render per locale. */
  pageSize: 10,
} as const;
