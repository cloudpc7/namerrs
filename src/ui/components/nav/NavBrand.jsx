/**
 * NavBrand.jsx — Logo and brand link for header, drawer, and footer.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBrand = ({ logoSrc, logoAlt, className = '', onNavigate }) => {
  const [logoFailed, setLogoFailed] = useState(false);

  const handleClick = () => {
    onNavigate?.();
  };

  return (
    <Link
      to="/"
      className={`nav-brand ${className}`.trim()}
      aria-label={logoAlt}
      onClick={handleClick}
    >
      {logoSrc && !logoFailed ? (
        <img
          src={logoSrc}
          alt=""
          className="nav-brand__logo"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <span className="nav-brand__text">Namerrs</span>
      )}
    </Link>
  );
};

export default NavBrand;