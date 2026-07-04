/**
 * TshirtQuantityStep.jsx — Per-size quantities with tier pricing (Feature 8).
 */

import { formatPrice } from '../../../utils/formatPrice';
import {
  getTierForQuantity,
  getTshirtLineTotal,
  sumSizeQuantities,
} from '../../../utils/tshirtPricing';

const TshirtQuantityStep = ({
  design,
  sizeQuantities,
  onSizeQuantitiesChange,
  configuredUnitPrice,
  error,
}) => {
  const sizes = design.selectedSizes || [];
  const totalQuantity = sumSizeQuantities(sizeQuantities);
  const tier = getTierForQuantity(totalQuantity);
  const lineTotal = getTshirtLineTotal(totalQuantity, configuredUnitPrice);
  const pricingEnabled = Boolean(configuredUnitPrice);

  const handleChange = (size, value) => {
    const qty = Math.max(0, Number(value) || 0);
    onSizeQuantitiesChange({ ...sizeQuantities, [size]: qty });
  };

  return (
    <div className="space-y-4" aria-label="T-shirt quantity">
      <p className="text-sm text-[#374151]">
        Fit: <span className="font-medium">{design.fit === 'female' ? 'Female' : 'Male / unisex'}</span>
        {' · '}
        Color: <span className="font-medium">{design.shirtColor}</span>
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium text-[#374151]">Quantity per size</p>
        {sizes.map((size) => (
          <div key={size} className="flex items-center gap-3">
            <label htmlFor={`qty-${size}`} className="w-12 text-sm text-[#374151]">
              {size}
            </label>
            <input
              id={`qty-${size}`}
              type="number"
              min={0}
              value={sizeQuantities[size] ?? 0}
              onChange={(event) => handleChange(size, event.target.value)}
              className="w-24 rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#374151]">
        <p>
          Total shirts: <span className="font-medium">{totalQuantity}</span>
        </p>
        <p className="mt-1">
          Tier: {tier.min}–{tier.max === Infinity ? '∞' : tier.max} shirts
          {pricingEnabled ? (
            <span>
              {' '}
              @ {formatPrice(tier.unitPrice)} each
            </span>
          ) : (
            <span className="text-[#d1d5db]"> @ $0.00 each (pricing pending)</span>
          )}
        </p>
        <p className={`mt-2 font-medium ${pricingEnabled ? 'text-[#374151]' : 'text-[#d1d5db]'}`}>
          Subtotal: {formatPrice(lineTotal)}
        </p>
      </div>
    </div>
  );
};

export default TshirtQuantityStep;