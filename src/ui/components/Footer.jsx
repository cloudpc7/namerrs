/**
 * Footer.jsx — Site footer with logo, NAP, navigation, and social links.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SocialIcons from './SocialIcons';
import { FOOTER_LINKS, POWERED_BY } from '../../constants/navigation.constants';
import { DEFAULT_SOCIAL_LINKS, LOGO_PATH } from '../../constants/social.constants';
import { selectSocialLinks } from '../../redux/slices/content.slice';
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  BUSINESS_LOCATION_LABEL,
} from '../../constants/business.constants';

const formatPhoneHref = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
};

const Footer = () => {
  const socialFromStore = useSelector(selectSocialLinks);
  const socialLinks = Object.keys(socialFromStore || {}).length
    ? socialFromStore
    : DEFAULT_SOCIAL_LINKS;
  const year = new Date().getFullYear();
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <Link to="/" className="site-nav__brand">
              {LOGO_PATH && !logoFailed ? (
                <img
                  src={LOGO_PATH}
                  alt="Namerrs Signs and Printing"
                  className="site-nav__logo"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="site-nav__brand-text" style={{ color: '#fff' }}>
                  Namerrs Signs & Printing
                </span>
              )}
            </Link>
            <p className="site-footer__brand-desc">
              Custom signs, printing, and apparel in {BUSINESS_LOCATION_LABEL}. Design online and
              schedule your order completion in one place.
            </p>
            <div className="site-footer__meta">
              <p>
                {BUSINESS_ADDRESS.street}
                <br />
                {BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.state} {BUSINESS_ADDRESS.zip}
              </p>
              {socialLinks.phone && (
                <p>
                  <a href={formatPhoneHref(socialLinks.phone)}>{socialLinks.phone}</a>
                </p>
              )}
              {socialLinks.email && (
                <p>
                  <a href={`mailto:${socialLinks.email}`}>{socialLinks.email}</a>
                </p>
              )}
              <p>{BUSINESS_HOURS}</p>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="site-footer__heading">Sitemap</p>
            <div className="site-footer__links">
              {FOOTER_LINKS.map((link) =>
                link.href.startsWith('/#') ? (
                  <a key={link.href} href={link.href} className="site-footer__link">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} to={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </nav>

          <div>
            <p className="site-footer__heading">Connect</p>
            <SocialIcons links={socialLinks} dark className="site-footer__social" />
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {year} Namerrs Signs & Printing. All rights reserved.</p>
          <p>{POWERED_BY}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;