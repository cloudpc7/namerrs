/**
 * DefaultQuantityStep.jsx — Generic quantity step for products with a single qty field.
 */

import { formatPrice } from '../../../utils/formatPrice';

const DefaultQuantityStep = ({
  product,
  quantity,
  onQuantityChange,
  unitPrice,
  lineTotal,
  error,
}) => (
  <div className="space-y-3">
    <label htmlFor="designer-quantity" className="block text-sm font-medium text-[#374151]">
      Quantity
    </label>
    <input
      id="designer-quantity"
      type="number"
      min={product?.minQuantity || 1}
      value={quantity}
      onChange={(event) =>
        onQuantityChange(Math.max(product?.minQuantity || 1, Number(event.target.value)))
      }
      className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm focus:border-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd]"
    />
    {product?.minQuantity > 1 && (
      <p className="text-xs text-[#6b7280]">Minimum order: {product.minQuantity}</p>
    )}
    {error && (
      <p className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
    <p className={`text-sm ${unitPrice ? 'text-[#374151]' : 'text-[#d1d5db]'}`}>
      Line total: {formatPrice(lineTotal)}
    </p>
  </div>
);

export default DefaultQuantityStep;