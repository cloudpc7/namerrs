/**
 * PriceDisplay.jsx — De-emphasized pricing per Refactoring UI (greyed $0.00).
 */

import { formatPrice } from '../../../utils/formatPrice';

const PriceDisplay = ({
  amount = 0,
  size = 'sm',
  className = '',
}) => (
  <div className={className}>
    <p className={`price${size === 'lg' ? ' price--lg' : ''}`}>{formatPrice(amount)}</p>
  </div>
);

export default PriceDisplay;