/**
 * PriceDisplay.jsx — De-emphasized pricing per Refactoring UI (greyed $0.00).
 */

import { formatPrice } from '../../../utils/formatPrice';
import { PRICING_HELPER_TEXT } from '../../../constants/business.constants';

const PriceDisplay = ({
  amount = 0,
  size = 'sm',
  showHelper = false,
  helperText = PRICING_HELPER_TEXT,
  className = '',
}) => (
  <div className={className}>
    <p className={`price${size === 'lg' ? ' price--lg' : ''}`}>{formatPrice(amount)}</p>
    {showHelper && <p className="price-note">{helperText}</p>}
  </div>
);

export default PriceDisplay;