/**
 * CartButton.jsx — Cart icon button with optional item count badge.
 */

import { ShoppingCart } from 'lucide-react';
import { IconButton } from '../primitives';

const CartButton = ({ count = 0, onClick, className = '', showLabel = false }) => {
  const label = count > 0 ? `Open cart, ${count} items` : 'Open cart';

  if (showLabel) {
    return (
      <button type="button" onClick={onClick} aria-label={label} className={`nav-cart-row ${className}`.trim()}>
        <ShoppingCart size={18} aria-hidden="true" />
        <span>Cart{count > 0 ? ` (${count})` : ''}</span>
      </button>
    );
  }

  return (
    <div className={`nav-cart ${className}`.trim()}>
      <IconButton label={label} onClick={onClick}>
        <ShoppingCart size={20} aria-hidden="true" />
      </IconButton>
      {count > 0 && <span className="nav-cart__badge">{count}</span>}
    </div>
  );
};

export default CartButton;