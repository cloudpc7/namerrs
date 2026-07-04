/**
 * MobileNav.jsx — Slide-over drawer with CTA, links, search, and social footer.
 */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from '@react-spring/web';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import SocialIcons from '../SocialIcons';
import { IconButton } from '../primitives';
import NavBrand from './NavBrand';
import NavCta from './NavCta';
import NavLink from './NavLink';
import NavSearch from './NavSearch';

const formatPhoneHref = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits ? `tel:${digits}` : null;
};

const MobileNav = ({
  isOpen,
  onClose,
  logoSrc,
  logoAlt,
  links,
  socialLinks = {},
  showSearch,
  searchValue,
  onSearch,
}) => {
  const panelRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFocusTrap(isOpen, panelRef, onClose);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const backdropSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    immediate: prefersReducedMotion,
  });

  const panelSpring = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
    opacity: isOpen ? 1 : 0,
    immediate: prefersReducedMotion,
  });

  if (!isOpen && prefersReducedMotion) {
    return null;
  }

  const phoneHref = formatPhoneHref(socialLinks?.phone);

  const drawer = (
    <div className={`nav-drawer-host${isOpen ? '' : ' nav-drawer-host--closed'}`} aria-hidden={!isOpen}>
      <animated.button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        style={backdropSpring}
        className="nav-drawer-host__backdrop"
        tabIndex={isOpen ? 0 : -1}
      />

      <animated.aside
        ref={panelRef}
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={panelSpring}
        className="nav-drawer"
      >
        <header className="nav-drawer__header">
          <NavBrand logoSrc={logoSrc} logoAlt={logoAlt} onNavigate={onClose} />
          <IconButton label="Close menu" onClick={onClose}>
            <X size={22} aria-hidden="true" />
          </IconButton>
        </header>

        <div className="nav-drawer__cta">
          <NavCta className="w-full" size="md" onClick={onClose} />
        </div>

        <nav className="nav-drawer__links" aria-label="Mobile navigation">
          {links.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              className="nav-drawer__link"
              onNavigate={onClose}
            />
          ))}
        </nav>

        {showSearch && (
          <div className="nav-drawer__search">
            <NavSearch
              value={searchValue}
              onSearch={onSearch}
              variant="drawer"
              onCloseMenu={onClose}
            />
          </div>
        )}

        <footer className="nav-drawer__footer">
          <p className="nav-drawer__footer-label">Connect with us</p>
          <SocialIcons links={socialLinks} dark className="nav-drawer__social" />
          <div className="nav-drawer__contact">
            {phoneHref && (
              <a href={phoneHref} className="nav-drawer__contact-link">
                {socialLinks.phone}
              </a>
            )}
            {socialLinks?.email && (
              <a href={`mailto:${socialLinks.email}`} className="nav-drawer__contact-link">
                {socialLinks.email}
              </a>
            )}
          </div>
        </footer>
      </animated.aside>
    </div>
  );

  return createPortal(drawer, document.body);
};

export default MobileNav;