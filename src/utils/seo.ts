/* global URL */
import { REPO, SITE, type Locale } from '../config';
import { alternates, useTranslations, withBase } from '../i18n/utils';

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt?: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  locale: Locale;
  hreflangs: ReturnType<typeof alternates>;
  /**
   * When `true`, the SEO component emits
   * `<meta name="robots" content="noindex, nofollow">`.
   * Set automatically for unlisted posts/pages when
   * `unlistedHideFromSeo` is `true` (the default).
   */
  noindex?: boolean;
  /** Raw page/post title without the site suffix (JSON-LD headline). */
  headline?: string;
}

interface BuildSeoArgs {
  title?: string;
  description?: string;
  pathWithoutLocale: string;
  fullPath: string;
  locale: Locale;
  ogImage?: string;
  /** Accessible alt text for the og:image (used for `og:image:alt`). */
  ogImageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
  /**
   * Restrict hreflang alternates to a subset of locales. Used on post
   * pages where a translation may be missing.
   */
  availableLocales?: readonly Locale[];
  /** Emit `<meta name="robots" content="noindex, nofollow">`. */
  noindex?: boolean;
}

/** Build the SEO data block consumed by `<SEO />`. */
export function buildSeo(args: BuildSeoArgs): SeoMeta {
  return {
    title: args.title && args.title !== SITE.title ? `${args.title} — ${SITE.title}` : SITE.title,
    // Fall back to the locale's own site description so the Malay pages
    // don't advertise an English meta description.
    description: args.description ?? useTranslations(args.locale)('site.description'),
    canonical: new URL(args.fullPath, SITE.url).toString(),
    ogImage: new URL(withBase(args.ogImage ?? SITE.defaultOgImage), SITE.url).toString(),
    ogImageAlt: args.ogImageAlt,
    type: args.type ?? 'website',
    publishedTime: args.publishedTime?.toISOString(),
    modifiedTime: args.modifiedTime?.toISOString(),
    tags: args.tags,
    locale: args.locale,
    hreflangs: alternates(args.pathWithoutLocale, args.availableLocales),
    noindex: args.noindex,
    headline: args.title,
  };
}

/** schema.org Person for the site author (shared by every JSON-LD block). */
function authorJsonLd() {
  const sameAs = [SITE.author.url];
  if (REPO.handle) sameAs.push(`https://github.com/${REPO.handle}`);
  return {
    '@type': 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
    sameAs,
  };
}

/**
 * JSON-LD structured data describing the visible page: a `BlogPosting`
 * for articles, a `WebSite` for everything else. Only facts already shown
 * on the page are emitted.
 */
export function buildJsonLd(meta: SeoMeta): Record<string, unknown> {
  const inLanguage = meta.locale === 'ms' ? 'ms-MY' : 'en';
  const siteUrl = new URL(withBase('/'), SITE.url).toString();
  if (meta.type === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.headline ?? meta.title,
      description: meta.description,
      image: meta.ogImage,
      url: meta.canonical,
      mainEntityOfPage: { '@type': 'WebPage', '@id': meta.canonical },
      datePublished: meta.publishedTime,
      dateModified: meta.modifiedTime ?? meta.publishedTime,
      inLanguage,
      keywords: meta.tags?.length ? meta.tags.join(', ') : undefined,
      author: authorJsonLd(),
      publisher: { '@type': 'Person', name: SITE.author.name, url: SITE.author.url },
      isPartOf: { '@type': 'Blog', name: SITE.title, url: siteUrl },
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.title,
    url: siteUrl,
    description: meta.description,
    inLanguage,
    author: authorJsonLd(),
  };
}
