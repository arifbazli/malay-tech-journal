/* global process, Buffer, URL */
/**
 * Share-image (Open Graph) generator using Satori + Resvg.
 *
 * Produces a 1200×630 PNG in the site's dark style: series-coloured glow
 * and pill, large title, short description, and the terminal-prompt brand
 * mark. Used for posts without a `heroImage`, so every post gets a unique
 * share card instead of reusing one generic cover.
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '../config';
import { seriesInfo, type SeriesTone } from './taxonomy';

export interface OgImageData {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
}

const WIDTH = 1200;
const HEIGHT = 630;

/** Mirrors the CSS tokens in global.css (Satori cannot read CSS variables). */
const COLORS = {
  bg: '#0f1117',
  surface: '#16181f',
  border: '#2a2d3e',
  text: '#e2e4ef',
  muted: '#8b91b3',
  accent: '#5b8fff',
  accent2: '#a78bfa',
} as const;

const TONES: Record<SeriesTone, string> = {
  ground: '#5b8fff',
  ai: '#a78bfa',
  mil: '#34d399',
  cloud: '#38bdf8',
  neutral: '#8b91b3',
};

// Load font files from @fontsource/inter (bundled locally, no network needed).
const fontsDir = join(process.cwd(), 'node_modules/@fontsource/inter/files');
const fontRegular = readFileSync(join(fontsDir, 'inter-latin-400-normal.woff'));
const fontBold = readFileSync(join(fontsDir, 'inter-latin-700-normal.woff'));

type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };

function el(type: string, style: Record<string, unknown>, children?: unknown): Node {
  return { type, props: { style: { display: 'flex', ...style }, children } };
}

/** Shorten to `max` characters, cutting at a word boundary (never mid-word). */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const head = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${head.replace(/[\s,.;:—–-]+$/u, '')}…`;
}

/**
 * Generate a themed share image as a PNG buffer.
 */
export async function generateOgImage(data: OgImageData): Promise<Buffer> {
  const series = data.category ? seriesInfo(data.category) : undefined;
  const tone = TONES[series?.tone ?? 'neutral'];
  const title = truncate(data.title, 90);
  const desc = data.description ? truncate(data.description, 140) : '';
  const titleSize = title.length > 70 ? 50 : title.length > 45 ? 58 : 66;

  const topRow = el('div', { justifyContent: 'space-between', alignItems: 'center' }, [
    series
      ? el(
          'div',
          {
            alignItems: 'center',
            gap: '12px',
            fontSize: '22px',
            fontWeight: 700,
            color: tone,
            padding: '10px 22px',
            borderRadius: '999px',
            border: `2px solid ${tone}55`,
            backgroundColor: `${tone}1a`,
          },
          series.name,
        )
      : el('div', {}, ''),
    el('div', { fontSize: '22px', color: COLORS.muted }, data.date ?? ''),
  ]);

  const middle = el(
    'div',
    { flexDirection: 'column', gap: '22px' },
    [
      el(
        'div',
        {
          fontSize: `${titleSize}px`,
          fontWeight: 700,
          color: COLORS.text,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
        },
        title,
      ),
      desc ? el('div', { fontSize: '26px', color: COLORS.muted, lineHeight: 1.4 }, desc) : null,
    ].filter(Boolean),
  );

  const brandMark = el(
    'div',
    {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1d212c',
      border: `2px solid ${COLORS.border}`,
      fontSize: '24px',
      fontWeight: 700,
    },
    [el('span', { color: COLORS.accent }, '>'), el('span', { color: COLORS.accent2 }, '_')],
  );

  const bottomRow = el(
    'div',
    {
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: `2px solid ${COLORS.border}`,
      paddingTop: '28px',
    },
    [
      el('div', { alignItems: 'center', gap: '16px' }, [
        brandMark,
        el('div', { fontSize: '26px', fontWeight: 700, color: COLORS.text }, SITE.title),
      ]),
      el('div', { fontSize: '22px', color: COLORS.muted }, new URL(SITE.url).hostname),
    ],
  );

  const markup = el(
    'div',
    {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px 56px',
      backgroundColor: COLORS.bg,
      backgroundImage: `radial-gradient(circle at 0% 0%, ${tone}40 0%, ${COLORS.bg} 55%), radial-gradient(circle at 100% 100%, ${COLORS.accent2}26 0%, ${COLORS.bg} 50%)`,
      borderTop: `8px solid ${tone}`,
    },
    [topRow, middle, bottomRow],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(markup as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}
