/**
 * NavLinks.jsx — Desktop navigation link row.
 */

import NavLink from './NavLink';

const NavLinks = ({ links, className = '' }) => (
  <nav className={`nav-links ${className}`.trim()} aria-label="Main navigation">
    {links.map((link) => (
      <NavLink key={link.href} link={link} />
    ))}
  </nav>
);

export default NavLinks;