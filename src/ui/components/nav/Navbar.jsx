/**
 * Navbar.jsx — Sticky header with desktop links, actions, and mobile drawer.
 */

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { IconButton } from '../primitives';
import CartButton from './CartButton';
import NavActions from './NavActions';
import NavBrand from './NavBrand';
import NavLinks from './NavLinks';
import MobileNav from './MobileNav';

const Navbar = ({
  logoSrc,
  logoAlt,
  links,
  socialLinks = {},
  showSearch = false,
  onSearch = () => {},
  onCartClick = () => {},
  cartCount = 0,
  searchValue = '',
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);

  useEffect(() => {
    if (isDesktop && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isDesktop, isDrawerOpen]);

  return (
    <header className="nav-bar">
      <div className="nav-bar__inner">
        <NavBrand logoSrc={logoSrc} logoAlt={logoAlt} />

        {isDesktop && <NavLinks links={links} />}

        {isDesktop ? (
          <NavActions
            showSearch={showSearch}
            searchValue={searchValue}
            onSearch={onSearch}
            onCartClick={onCartClick}
            cartCount={cartCount}
          />
        ) : (
          <div className="nav-bar__mobile-actions">
            <CartButton count={cartCount} onClick={onCartClick} />
            <IconButton
              label="Open menu"
              onClick={openDrawer}
              className="nav-bar__menu-btn"
              aria-expanded={isDrawerOpen}
              aria-controls="nav-drawer"
            >
              <Menu size={24} aria-hidden="true" />
            </IconButton>
          </div>
        )}
      </div>

      <MobileNav
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        logoAlt={logoAlt}
        links={links}
        socialLinks={socialLinks}
        showSearch={showSearch}
        searchValue={searchValue}
        onSearch={onSearch}
      />
    </header>
  );
};

export default Navbar;