/**
 * TshirtQuantityStep.jsx — Per-size quantities with tier pricing (Feature 8).
 */

import { useEffect, useRef, useState } from 'react';
import { Surface } from '../../../ui/components/primitives';
import { formatPrice } from '../../../utils/formatPrice';
import {
  getTierForQuantity,
  getTshirtLineTotal,
  sumSizeQuantities,
} from '../../../utils/tshirtPricing';

const SizeQuantityInput = ({ size, quantity, onCommit }) => {
  const [draft, setDraft] = useState(String(quantity ?? 0));
  const draftRef = useRef(draft);
  const onCommitRef = useRef(onCommit);

  useEffect(() => {
    setDraft(String(quantity ?? 0));
  }, [quantity]);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    onCommitRef.current = onCommit;
  }, [onCommit]);

  const commitDraft = (value = draftRef.current) => {
    const qty = Math.max(0, Number(value) || 0);
    setDraft(String(qty));
    onCommitRef.current(qty);
  };

  useEffect(() => () => commitDraft(draftRef.current), []);

  const handleChange = (event) => {
    const { value } = event.target;
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    setDraft(value);
  };

  const handleBlur = () => {
    commitDraft();
  };

  return (
    <div className="designer-quantity__size-row">
      <label htmlFor={`qty-${size}`} className="designer-quantity__size-label">
        {size}
      </label>
      <input
        id={`qty-${size}`}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={draft}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-input designer-quantity__size-input"
      />
    </div>
  );
};

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
  const fitLabel = design.fit === 'female' ? 'Female' : 'Male / unisex';

  const handleCommit = (size, qty) => {
    onSizeQuantitiesChange({ ...sizeQuantities, [size]: qty });
  };

  return (
    <div className="card-designer__panel" aria-label="T-shirt quantity">
      <p className="form-hint">
        Fit: <strong>{fitLabel}</strong>
        {' · '}
        Color: <strong>{design.shirtColor}</strong>
      </p>

      <div className="form-field">
        <p className="form-label" id="tshirt-qty-per-size">
          Quantity per size
        </p>
        <div className="designer-quantity__sizes" aria-labelledby="tshirt-qty-per-size">
          {sizes.map((size) => (
            <SizeQuantityInput
              key={size}
              size={size}
              quantity={sizeQuantities[size] ?? 0}
              onCommit={(qty) => handleCommit(size, qty)}
            />
          ))}
        </div>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <Surface padding="md" className="designer-quantity__summary">
        <div className="designer-quantity__summary-row">
          <span>Total shirts</span>
          <strong>{totalQuantity}</strong>
        </div>
        <div className="designer-quantity__summary-row">
          <span>
            Tier {tier.min}–{tier.max === Infinity ? '∞' : tier.max}
          </span>
          <span className={pricingEnabled ? '' : 'designer-quantity__muted'}>
            {pricingEnabled
              ? `${formatPrice(tier.unitPrice)} each`
              : '$0.00 each (pricing pending)'}
          </span>
        </div>
        <div className="designer-quantity__summary-row designer-quantity__summary-total">
          <span>Subtotal</span>
          <strong className={pricingEnabled ? '' : 'designer-quantity__muted'}>
            {formatPrice(lineTotal)}
          </strong>
        </div>
      </Surface>
    </div>
  );
};

export default TshirtQuantityStep;