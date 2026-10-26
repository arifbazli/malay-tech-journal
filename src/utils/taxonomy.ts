/**
 * Single source of truth for series (first category) and post-type
 * presentation: display names, short labels, colour tone and localized
 * type labels.
 *
 * Previously this logic was copy-pasted into index.astro, PostCardItem.astro
 * and SearchButton.astro with drifting results (e.g. "Cloud Security" on the
 * bento vs "Cloud Sec" on cards, and Cloud Security sharing Ground Truth's
 * colour). Keep every listing surface on these helpers.
 */
import type { Locale } from '../config';

export type SeriesTone = 'ground' | 'ai' | 'mil' | 'cloud' | 'neutral';

export interface SeriesInfo {
  /** Full display name, e.g. "Cloud Security Engineering". */
  name: string;
  /** Short label for tight spaces (pills on cards). */
  short: string;
  /** Colour tone; maps to `.mtj-pill--<tone>`. */
  tone: SeriesTone;
}

const KNOWN: Array<{ match: (s: string) => boolean; info: SeriesInfo }> = [
  {
    match: (s) => s.includes('ground') || s.includes('truth'),
    info: { name: 'Ground Truth', short: 'Ground Truth', tone: 'ground' },
  },
  {
    match: (s) => s.includes('guardrail'),
    info: { name: 'AI Guardrail Engineering', short: 'AI Guardrail', tone: 'ai' },
  },
  {
    match: (s) => s.includes('military') || s.includes('defence') || s.includes('defense'),
    info: { name: 'Military AI & Defence', short: 'Military AI', tone: 'mil' },
  },
  {
    match: (s) => s.includes('cloud') && s.includes('security'),
    info: { name: 'Cloud Security Engineering', short: 'Cloud Security', tone: 'cloud' },
  },
];

/** Resolve presentation info for a series/category name. */
export function seriesInfo(series: string): SeriesInfo {
  const s = series.toLowerCase();
  const hit = KNOWN.find((k) => k.match(s));
  return hit ? hit.info : { name: series, short: series, tone: 'neutral' };
}

/** The series of a post is its first category (empty string if none). */
export function postSeries(post: { data: { categories?: string[] } }): string {
  return post.data.categories?.[0] ?? '';
}

const TYPE_LABELS: Record<string, { en: string; ms: string; enLong?: string; msLong?: string }> = {
  essay: { en: 'Essay', ms: 'Esei' },
  'case-study': { en: 'Case Study', ms: 'Kajian Kes' },
  'field-note': { en: 'Field Note', ms: 'Nota Lapangan' },
  'series-index': { en: 'Series Index', ms: 'Indeks Siri' },
};

/**
 * Localized post-type label. Returns '' for unknown/absent types.
 * Pass `includeIndex: true` to label series-index pages (post header only).
 */
export function postTypeLabel(
  type: string | undefined,
  locale: Locale,
  { includeIndex = false }: { includeIndex?: boolean } = {},
): string {
  if (!type) return '';
  if (type === 'series-index' && !includeIndex) return '';
  const entry = TYPE_LABELS[type];
  if (!entry) return type;
  return locale === 'ms' ? entry.ms : entry.en;
}

/** Localized "N min read". */
export function readTimeLabel(minutes: number, locale: Locale): string {
  return locale === 'ms' ? `${minutes} min baca` : `${minutes} min read`;
}
