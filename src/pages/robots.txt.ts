/* global Response, URL */
/**
 * robots.txt, generated so the Sitemap line is an absolute URL built from
 * SITE.url (+ BASE_PATH). The sitemaps protocol requires a full URL; the
 * old static file used a relative path that crawlers may ignore.
 */
import { SITE } from '../config';
import { withBase } from '../i18n/utils';

export function GET() {
  const sitemap = new URL(withBase('/sitemap-index.xml'), SITE.url).toString();
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
