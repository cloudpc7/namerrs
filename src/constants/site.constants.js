/**
 * site.constants.js — Canonical site URL, default SEO, and Open Graph defaults.
 */

import { HERO_IMAGE_PATH, LOGO_PATH } from './assets.constants';
export const DEFAULT_SITE_URL = 'https://namerrs.web.app';

export const getSiteUrl = () => {
  const configured = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
  return configured.replace(/\/$/, '');
};

export const DEFAULT_SEO = {
  title: 'Namerrs Signs & Printing | San Jacinto, CA',
  description:
    'Custom signs, printing, and apparel in San Jacinto, CA. Design business cards, shirts, banners, hats, magnets, and memorial prints online.',
};

export const DEFAULT_OG_IMAGE_PATH = HERO_IMAGE_PATH;

export const getOgImageUrl = (path = DEFAULT_OG_IMAGE_PATH) => `${getSiteUrl()}${path}`;

export const SITE_LOGO_URL = () => `${getSiteUrl()}${LOGO_PATH}`;

export const OPENING_HOURS_SPECIFICATION = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '10:00',
    closes: '16:00',
  },
];

/** Approximate coordinates for 227 Main St, San Jacinto, CA */
export const BUSINESS_GEO = {
  '@type': 'GeoCoordinates',
  latitude: 33.7838,
  longitude: -116.9586,
};

export const LOCAL_BUSINESS_DESCRIPTION =
  'Namerrs Signs & Printing is a San Jacinto print shop offering graphic design, signs, business cards, apparel, banners, and custom printing since 2008.';