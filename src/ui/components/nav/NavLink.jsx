/**
 * NavLink.jsx — Single navigation link with active state and aria-current.
 */

import { Link, useLocation } from 'react-router-dom';
import { isNavLinkActive, useNavHash } from './useNavActive';

const NavLink = ({ link, className = 'nav-link', onNavigate }) => {
  const location = useLocation();
  const hash = useNavHash();
  const active = isNavLinkActive(link.href, location.pathname, hash);
  const classes = `${className}${active ? ' nav-link--active' : ''}`;

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  if (link.href.includes('#')) {
    return (
      <a
        href={link.href}
        className={classes}
        aria-current={active ? 'page' : undefined}
        onClick={handleClick}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      to={link.href}
      className={classes}
      aria-current={active ? 'page' : undefined}
      onClick={handleClick}
    >
      {link.label}
    </Link>
  );
};

export default NavLink;