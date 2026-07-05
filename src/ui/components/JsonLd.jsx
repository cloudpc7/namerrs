/**
 * JsonLd.jsx — Local print shop structured data for SEO.
 */

import { useSelector } from 'react-redux';
import { selectSocialLinks } from '../../redux/slices/content.slice';
import { BUSINESS_ADDRESS } from '../../constants/business.constants';
import { DEFAULT_SOCIAL_LINKS } from '../../constants/social.constants';
import {
  BUSINESS_GEO,
  DEFAULT_OG_IMAGE_PATH,
  LOCAL_BUSINESS_DESCRIPTION,
  OPENING_HOURS_SPECIFICATION,
  SITE_LOGO_URL,
  getOgImageUrl,
  getSiteUrl,
} from '../../constants/site.constants';

const JsonLd = () => {
  const socialFromStore = useSelector(selectSocialLinks);
  const social = Object.keys(socialFromStore || {}).length
    ? socialFromStore
    : DEFAULT_SOCIAL_LINKS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PrintShop',
    '@id': `${getSiteUrl()}/#business`,
    name: 'Namerrs Signs & Printing',
    description: LOCAL_BUSINESS_DESCRIPTION,
    url: getSiteUrl(),
    image: getOgImageUrl(DEFAULT_OG_IMAGE_PATH),
    logo: SITE_LOGO_URL(),
    telephone: social.phone,
    email: social.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.city,
      addressRegion: BUSINESS_ADDRESS.state,
      postalCode: BUSINESS_ADDRESS.zip,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    geo: BUSINESS_GEO,
    areaServed: {
      '@type': 'City',
      name: 'San Jacinto',
      containedInPlace: {
        '@type': 'State',
        name: 'California',
      },
    },
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
    sameAs: [social.instagram, social.facebook, social.x, social.youtube, social.yelp].filter(
      Boolean
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;