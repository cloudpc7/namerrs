/**
 * generate-sitemap.js — Build sitemap.xml from VITE_SITE_URL before production builds.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const siteUrl = (process.env.VITE_SITE_URL || 'https://namerrs.web.app').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.5' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.5' },
];

const urlEntries = routes
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${loc === '/' ? '/' : loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outputPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, `${xml}\n`, 'utf8');
console.log(`Wrote sitemap for ${siteUrl} -> ${outputPath}`);