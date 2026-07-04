/**
 * JsonLd.jsx — LocalBusiness structured data for SEO.
 */

import { useSelector } from 'react-redux';
import { selectSocialLinks } from '../../redux/slices/content.slice';
import { DEFAULT_SOCIAL_LINKS } from '../../constants/social.constants';

const JsonLd = () => {
  const socialFromStore = useSelector(selectSocialLinks);
  const social = Object.keys(socialFromStore || {}).length
    ? socialFromStore
    : DEFAULT_SOCIAL_LINKS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Namerrs Signs & Printing',
    url: 'https://namerrs.web.app',
    telephone: social.phone,
    email: social.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '227 Main Street',
      addressLocality: 'San Jacinto',
      addressRegion: 'CA',
      postalCode: '92583',
      addressCountry: 'US',
    },
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