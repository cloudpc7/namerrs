/**
 * MagnetQuantityStep.jsx — Magnet quantity presets (1, 2, 3).
 */

import { formatPrice } from '../../../utils/formatPrice';

const PRESETS = [1, 2, 3];

const MagnetQuantityStep = ({ quantity, onQuantityChange, lineTotal, error }) => (
  <div className="card-designer__panel" aria-label="Magnet quantity">
    <div className="form-field">
      <p className="form-label" id="magnet-quantity-label">
        Quantity
      </p>
      <div className="designer-quantity__presets" aria-labelledby="magnet-quantity-label">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            aria-pressed={quantity === preset}
            onClick={() => onQuantityChange(preset)}
            className={`designer-quantity__preset${
              quantity === preset ? ' designer-quantity__preset--active' : ''
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>

    {error && (
      <p className="form-error" role="alert">
        {error}
      </p>
    )}

    <p className="form-hint">Line total: {formatPrice(lineTotal)}</p>
  </div>
);

export default MagnetQuantityStep;