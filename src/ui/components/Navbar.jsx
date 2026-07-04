/**
 * Navbar.jsx — Responsive top navigation with links, social icons, search, and cart.
 */

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import SocialIcons from './SocialIcons';
import Button from './primitives/Button';

const Navbar = ({
  logoSrc,
  logoAlt,
  links,
  socialLinks,
  showSearch = false,
  onSearch = () => {},
  onCartClick = () => {},
  cartCount = 0,
  searchValue = '',
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue]);

  const toggleMenu = () => setIsOpen((open) => !open);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
    setIsOpen(false);

    if (location.pathname !== '/') {
      window.location.href = `/#products`;
    } else {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActiveLink = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.slice(1);
    }
    return location.pathname === href;
  };

  const renderNavLink = (link) => {
    const isHashLink = link.href.includes('#');
    const active = isActiveLink(link.href);
    const className = `site-nav__link${active ? ' site-nav__link--active' : ''}`;

    if (isHashLink) {
      return (
        <a key={link.href} href={link.href} className={className}>
          {link.label}
        </a>
      );
    }

    return (
      <Link key={link.href} to={link.href} className={className}>
        {link.label}
      </Link>
    );
  };

  const phoneDigits = String(socialLinks?.phone || '').replace(/\D/g, '');

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand">
          {logoSrc && !logoFailed ? (
            <img
              src={logoSrc}
              alt={logoAlt}
              className="site-nav__logo"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="site-nav__brand-text">Namerrs</span>
          )}
        </Link>

        <div className="site-nav__links">{links.map(renderNavLink)}</div>

        <div className="site-nav__actions">
          <SocialIcons links={socialLinks} />

          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="site-nav__search">
              <label htmlFor="site-search" className="sr-only">
                Search products
              </label>
              <Search size={16} className="site-nav__search-icon" aria-hidden="true" />
              <input
                id="site-search"
                type="search"
                placeholder="Search products"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="site-nav__search-input"
              />
            </form>
          )}

          {phoneDigits && (
            <Button href={`tel:${phoneDigits}`} variant="secondary" size="sm" className="site-nav__call-btn">
              Call now
            </Button>
          )}

          <button
            type="button"
            onClick={onCartClick}
            aria-label={cartCount ? `Open cart, ${cartCount} items` : 'Open cart'}
            className="site-nav__cart-btn"
          >
            <ShoppingCart size={20} aria-hidden="true" />
            {cartCount > 0 && <span className="site-nav__cart-badge">{cartCount}</span>}
          </button>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="site-nav__menu-btn"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="site-nav__mobile-menu">
          {links.map((link) => (
            <div key={link.href} onClick={() => setIsOpen(false)}>
              {renderNavLink(link)}
            </div>
          ))}

          {showSearch && (
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="site-search-mobile" className="sr-only">
                Search products
              </label>
              <input
                id="site-search-mobile"
                type="search"
                placeholder="Search products"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="site-nav__mobile-search"
              />
            </form>
          )}

          <SocialIcons links={socialLinks} />
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onCartClick();
            }}
            aria-label={cartCount ? `Open cart, ${cartCount} items` : 'Open cart'}
            className="site-nav__mobile-cart"
          >
            <ShoppingCart size={18} aria-hidden="true" />
            Cart{cartCount > 0 ? ` (${cartCount})` : ''}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;