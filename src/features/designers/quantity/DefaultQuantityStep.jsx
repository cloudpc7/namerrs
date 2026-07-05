/**
 * DefaultQuantityStep.jsx — Generic quantity step for products with a single qty field.
 */

import { useEffect, useRef, useState } from 'react';
import { formatPrice } from '../../../utils/formatPrice';

const parseQuantityDraft = (draft) => {
  if (draft === '') {
    return null;
  }

  const parsed = Number.parseInt(draft, 10);
  return Number.isFinite(parsed) ? parsed : null;
};

const resolveQuantity = (draft, minQty) => {
  const parsed = parseQuantityDraft(draft);

  if (parsed === null || parsed < minQty) {
    return Math.max(minQty, parsed ?? minQty);
  }

  return parsed;
};

const DefaultQuantityStep = ({
  product,
  quantity,
  onQuantityChange,
  unitPrice,
  lineTotal,
  error,
}) => {
  const minQty = product?.minQuantity || 1;
  const [draft, setDraft] = useState(String(quantity));
  const draftRef = useRef(draft);
  const onQuantityChangeRef = useRef(onQuantityChange);
  const minQtyRef = useRef(minQty);

  useEffect(() => {
    setDraft(String(quantity));
  }, [quantity]);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    onQuantityChangeRef.current = onQuantityChange;
    minQtyRef.current = minQty;
  }, [onQuantityChange, minQty]);

  const commitQuantity = (value = draftRef.current) => {
    const nextQuantity = resolveQuantity(value, minQtyRef.current);
    setDraft(String(nextQuantity));
    onQuantityChangeRef.current(nextQuantity);
  };

  useEffect(() => () => commitQuantity(draftRef.current), []);

  const handleChange = (event) => {
    const next = event.target.value;
    if (next === '' || /^\d+$/.test(next)) {
      setDraft(next);
    }
  };

  const previewQuantity = parseQuantityDraft(draft);
  const previewTotal =
    previewQuantity !== null && previewQuantity >= minQty
      ? (unitPrice || 0) * previewQuantity
      : lineTotal;

  return (
    <div className="card-designer__panel" aria-label="Order quantity">
      <div className="form-field">
        <label htmlFor="designer-quantity" className="form-label">
          Quantity
        </label>
        <input
          id="designer-quantity"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draft}
          onChange={handleChange}
          onBlur={() => commitQuantity()}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commitQuantity();
            }
          }}
          className="form-input"
          aria-describedby={product?.minQuantity > 1 ? 'designer-quantity-min' : undefined}
        />
        {product?.minQuantity > 1 && (
          <p id="designer-quantity-min" className="form-hint">
            Minimum order: {product.minQuantity}
          </p>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <p className="form-hint">Line total: {formatPrice(previewTotal)}</p>
      </div>
    </div>
  );
};

export default DefaultQuantityStep;