/**
 * seoMeta.js — Document title, canonical, description, Open Graph, and Twitter tags.
 */

import { SITE_NAME } from '../constants/navigation.constants';
import {
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_SEO,
  getOgImageUrl,
  getSiteUrl,
} from '../constants/site.constants';

const upsertMeta = (attr, key, content) => {
  if (!content) {
    return;
  }

  const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  if (!href) {
    return;
  }

  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

export const buildCanonicalUrl = (pathname = '/') => {
  const siteUrl = getSiteUrl();
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (normalizedPath === '/') {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${normalizedPath}`;
};

export const resolveOgImageUrl = (imagePath = DEFAULT_OG_IMAGE_PATH) => {
  if (!imagePath) {
    return getOgImageUrl();
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  return getOgImageUrl(imagePath);
};

export const applySeoMeta = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  pathname = '/',
  imagePath = DEFAULT_OG_IMAGE_PATH,
  type = 'website',
}) => {
  if (typeof document === 'undefined') {
    return;
  }

  const canonicalUrl = buildCanonicalUrl(pathname);
  const imageUrl = resolveOgImageUrl(imagePath);

  document.title = title;

  upsertMeta('name', 'description', description);
  upsertLink('canonical', canonicalUrl);

  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:image', imageUrl);
  upsertMeta('property', 'og:locale', 'en_US');

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', imageUrl);
};