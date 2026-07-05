/**
 * HashLink.jsx — Internal link that scrolls to home-page sections in the SPA.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleHashHref, parseHashHref } from '../../utils/hashNavigation';

const HashLink = ({ href, className = '', children, onClick, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { path, sectionId } = parseHashHref(href);

  if (!sectionId) {
    return (
      <Link to={path} className={className} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        handleHashHref(href, { pathname: location.pathname, navigate });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
};

export default HashLink;