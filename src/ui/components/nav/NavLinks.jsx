/**
 * NavLinks.jsx — Desktop link row with inline primary CTA.
 */

import NavCta from './NavCta';
import NavLink from './NavLink';

const NavLinks = ({ links, className = '' }) => (
  <nav className={`nav-links ${className}`.trim()} aria-label="Main navigation">
    {links.map((link) => (
      <NavLink key={link.href} link={link} />
    ))}
    <NavCta className="nav-links__cta" />
  </nav>
);

export default NavLinks;