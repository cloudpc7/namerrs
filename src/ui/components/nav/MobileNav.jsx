/**
 * MobileNav.jsx — Slide-over mobile navigation drawer with focus trap.
 */

import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { Button, IconButton } from '../primitives';
import CartButton from './CartButton';
import NavLink from './NavLink';
import NavSearch from './NavSearch';

const formatPhoneHref = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits ? `tel:${digits}` : null;
};

const MobileNav = ({
  isOpen,
  onClose,
  links,
  socialLinks,
  showSearch,
  searchValue,
  onSearch,
  onCartClick,
  cartCount,
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
    immediate: prefersReducedMotion,
  });

  if (!isOpen && prefersReducedMotion) {
    return null;
  }

  const phoneHref = formatPhoneHref(socialLinks?.phone);

  return (
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
          <span className="nav-drawer__title">Menu</span>
          <IconButton label="Close menu" onClick={onClose}>
            <X size={22} aria-hidden="true" />
          </IconButton>
        </header>

        <div className="nav-drawer__cta">
          <Button href="/#products" className="w-full" onClick={onClose}>
            Start your order
          </Button>
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

        <div className="nav-drawer__utilities">
          <CartButton
            count={cartCount}
            onClick={() => {
              onClose();
              onCartClick();
            }}
            showLabel
          />

          {showSearch && (
            <NavSearch
              value={searchValue}
              onSearch={onSearch}
              variant="drawer"
              onCloseMenu={onClose}
            />
          )}
        </div>

        <footer className="nav-drawer__footer">
          {phoneHref && (
            <a href={phoneHref} className="nav-drawer__footer-link">
              {socialLinks.phone}
            </a>
          )}
          {socialLinks?.email && (
            <a href={`mailto:${socialLinks.email}`} className="nav-drawer__footer-link">
              {socialLinks.email}
            </a>
          )}
        </footer>
      </animated.aside>
    </div>
  );
};

export default MobileNav;