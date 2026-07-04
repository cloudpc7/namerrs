/**
 * MagnetQuantityStep.jsx — Magnet quantity presets (1, 2, 3).
 */

import { formatPrice } from '../../../utils/formatPrice';

const PRESETS = [1, 2, 3];

const MagnetQuantityStep = ({ quantity, onQuantityChange, lineTotal, error }) => (
  <div className="space-y-3" aria-label="Magnet quantity">
    <p className="text-sm font-medium text-[#374151]">Quantity</p>
    <div className="flex gap-2">
      {PRESETS.map((preset) => (
        <button
          key={preset}
          type="button"
          aria-pressed={quantity === preset}
          onClick={() => onQuantityChange(preset)}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            quantity === preset
              ? 'bg-[#1d4ed8] text-white'
              : 'border border-[#e5e7eb] text-[#374151]'
          }`}
        >
          {preset}
        </button>
      ))}
    </div>
    {error && (
      <p className="text-sm text-red-600" role="alert">{error}</p>
    )}
    <p className="text-sm text-[#d1d5db]">Line total: {formatPrice(lineTotal)}</p>
  </div>
);

export default MagnetQuantityStep;