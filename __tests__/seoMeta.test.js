/**
 * seoMeta.test.js — Canonical URL and meta helper coverage.
 */

import { buildCanonicalUrl, resolveOgImageUrl } from '../src/utils/seoMeta';

describe('seoMeta helpers', () => {
  it('builds canonical home URL without trailing path slash duplication', () => {
    expect(buildCanonicalUrl('/')).toMatch(/\/$/);
    expect(buildCanonicalUrl('/')).not.toMatch(/\/\/$/);
  });

  it('builds canonical URLs for nested paths', () => {
    const url = buildCanonicalUrl('/privacy');
    expect(url).toMatch(/\/privacy$/);
  });

  it('resolves relative OG image paths against the site URL', () => {
    const imageUrl = resolveOgImageUrl('/assets/images/namerrsHero.png');
    expect(imageUrl).toContain('/assets/images/namerrsHero.png');
    expect(imageUrl).toMatch(/^https?:\/\//);
  });

  it('preserves absolute OG image URLs', () => {
    expect(resolveOgImageUrl('https://cdn.example.com/hero.png')).toBe(
      'https://cdn.example.com/hero.png'
    );
  });
});