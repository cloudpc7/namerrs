/**
 * SocialIcons.jsx — Accessible social and contact icon links for header and footer.
 */

import { Mail, Phone } from 'lucide-react';
import { DEFAULT_SOCIAL_LINKS } from '../../constants/social.constants';
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YelpIcon,
  YoutubeIcon,
} from './icons/SocialBrandIcons';

const ICON_SIZE = 20;

const SOCIAL_CONFIG = [
  { key: 'instagram', label: 'Visit us on Instagram', Icon: InstagramIcon },
  { key: 'facebook', label: 'Visit us on Facebook', Icon: FacebookIcon },
  { key: 'x', label: 'Visit us on X', Icon: XIcon },
  { key: 'youtube', label: 'Visit us on YouTube', Icon: YoutubeIcon },
  { key: 'yelp', label: 'Visit us on Yelp', Icon: YelpIcon },
];

const formatPhoneHref = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
};

const ContactIconLinks = ({ links, includeContact }) => {
  if (!includeContact) {
    return null;
  }

  return (
    <>
      {links?.phone && (
        <a
          href={formatPhoneHref(links.phone)}
          aria-label={`Call us at ${links.phone}`}
          className="social-icons__link"
        >
          <Phone size={ICON_SIZE} aria-hidden="true" />
        </a>
      )}

      {links?.email && (
        <a
          href={`mailto:${links.email}`}
          aria-label={`Email us at ${links.email}`}
          className="social-icons__link"
        >
          <Mail size={ICON_SIZE} aria-hidden="true" />
        </a>
      )}
    </>
  );
};

const SocialIcons = ({
  links = DEFAULT_SOCIAL_LINKS,
  className = '',
  dark = false,
  includeContact = true,
  contactFirst = false,
}) => (
  <div className={`social-icons${dark ? ' social-icons--dark' : ''} ${className}`.trim()}>
    {contactFirst && <ContactIconLinks links={links} includeContact={includeContact} />}

    {SOCIAL_CONFIG.map(({ key, label, Icon }) => {
      const href = links?.[key];
      if (!href) {
        return null;
      }

      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="social-icons__link"
        >
          <Icon size={ICON_SIZE} aria-hidden="true" />
        </a>
      );
    })}

    {!contactFirst && <ContactIconLinks links={links} includeContact={includeContact} />}
  </div>
);

export default SocialIcons;