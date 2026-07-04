/**
 * NavCta.jsx — Primary navbar CTA (purple + cyan, original Namerrs brand).
 */

import { NAV_CTA } from '../../../constants/navigation.constants';

const NavCta = ({ className = '', onClick, size = 'sm' }) => (
  <a
    href={NAV_CTA.href}
    className={`nav-cta btn btn--nav-cta btn--${size} ${className}`.trim()}
    onClick={onClick}
  >
    {NAV_CTA.label}
  </a>
);

export default NavCta;