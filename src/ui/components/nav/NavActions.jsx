/**
 * NavActions.jsx — Desktop utilities: search and cart only.
 */

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
  </div>
);

export default NavActions;