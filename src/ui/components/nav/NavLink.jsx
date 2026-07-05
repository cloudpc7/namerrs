/**
 * NavLink.jsx — Single navigation link with active state and aria-current.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleHashHref } from '../../../utils/hashNavigation';
import { isNavLinkActive, useNavHash } from './useNavActive';

const NavLink = ({ link, className = 'nav-link', onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = useNavHash();
  const active = isNavLinkActive(link.href, location.pathname, hash);
  const classes = `${className}${active ? ' nav-link--active' : ''}`;

  const handleClick = () => {
    onNavigate?.();
  };

  if (link.href.includes('#')) {
    return (
      <a
        href={link.href}
        className={classes}
        aria-current={active ? 'page' : undefined}
        onClick={(event) => {
          event.preventDefault();
          handleHashHref(link.href, { pathname: location.pathname, navigate });
          handleClick();
        }}
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
      onClick={(event) => {
        if (link.href === '/' && location.pathname === '/') {
          event.preventDefault();
          handleHashHref('/', { pathname: location.pathname, navigate });
        }
        handleClick();
      }}
    >
      {link.label}
    </Link>
  );
};

export default NavLink;