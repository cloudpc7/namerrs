/**
 * Footer.jsx — Site footer with logo, NAP, navigation, and social links.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SocialIcons from './SocialIcons';
import HashLink from './HashLink';
import { NavBrand } from './nav';
import { FOOTER_LINKS, POWERED_BY } from '../../constants/navigation.constants';
import { DEFAULT_SOCIAL_LINKS } from '../../constants/social.constants';
import { FOOTER_LOGO_PATH } from '../../constants/assets.constants';
import { selectSocialLinks } from '../../redux/slices/content.slice';
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
} from '../../constants/business.constants';
import { handleHashHref, parseHashHref } from '../../utils/hashNavigation';

const FooterLink = ({ href, label }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { path, sectionId } = parseHashHref(href);

  if (sectionId) {
    return (
      <HashLink href={href} className="site-footer__link">
        {label}
      </HashLink>
    );
  }

  return (
    <Link
      to={href}
      className="site-footer__link"
      onClick={() => {
        if (location.pathname === path) {
          handleHashHref(href, { pathname: location.pathname, navigate });
        }
      }}
    >
      {label}
    </Link>
  );
};

const Footer = () => {
  const socialFromStore = useSelector(selectSocialLinks);
  const socialLinks = Object.keys(socialFromStore || {}).length
    ? socialFromStore
    : DEFAULT_SOCIAL_LINKS;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <NavBrand
              logoSrc={FOOTER_LOGO_PATH}
              logoAlt="Namerrs Signs and Printing"
              className="nav-brand--footer"
            />
            <p className="site-footer__brand-desc">
              <span className="site-footer__brand-desc-line">
                Custom signs, printing, and apparel in San Jacinto, CA.
              </span>
              <span className="site-footer__brand-desc-line">
                Design online and schedule your order in one place.
              </span>
            </p>
          </div>

          <div className="site-footer__visit">
            <p className="site-footer__heading">Visit us</p>
            <address className="site-footer__meta">
              <p className="site-footer__meta-line">
                {BUSINESS_ADDRESS.street}
                <br />
                {BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.state} {BUSINESS_ADDRESS.zip}
              </p>
              <p className="site-footer__meta-line site-footer__hours">{BUSINESS_HOURS}</p>
            </address>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <p className="site-footer__heading">Quick links</p>
            <ul className="site-footer__links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__connect">
            <p className="site-footer__heading">Connect</p>
            <p className="site-footer__connect-desc">Follow us for updates and inspiration.</p>
            <SocialIcons
              links={socialLinks}
              dark
              includeContact
              contactFirst
              className="site-footer__social"
            />
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