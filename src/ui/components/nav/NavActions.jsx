/**
 * NavActions.jsx — Desktop utility actions: search, cart, and primary CTA.
 */

import { Button } from '../primitives';
import CartButton from './CartButton';
import NavSearch from './NavSearch';

const NavActions = ({
  showSearch = false,
  searchValue = '',
  onSearch = () => {},
  onCartClick = () => {},
  cartCount = 0,
}) => (
  <div className="nav-actions">
    {showSearch && (
      <NavSearch value={searchValue} onSearch={onSearch} variant="desktop" />
    )}
    <CartButton count={cartCount} onClick={onCartClick} />
    <Button href="/#products" size="sm" className="nav-cta">
      Start order
    </Button>
  </div>
);

export default NavActions;