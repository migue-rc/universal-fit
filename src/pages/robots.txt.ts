import { siteConfig } from '../lib/siteConfig';

export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.publicBaseUrl}/sitemap-index.xml\n`);
}
