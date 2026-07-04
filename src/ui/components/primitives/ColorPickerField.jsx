/**
 * ColorPickerField.jsx — Native color swatch with optional hex editing.
 */

import { useEffect, useId, useState } from 'react';
import { normalizeHexColor, toColorInputValue } from '../../../utils/colorUtils';

const ColorPickerField = ({
  label,
  value = '#ffffff',
  onChange,
  error = '',
  hint = '',
  className = '',
}) => {
  const pickerId = useId();
  const hexId = useId();
  const [hexDraft, setHexDraft] = useState(value);

  useEffect(() => {
    setHexDraft(value);
  }, [value]);

  const handlePickerChange = (event) => {
    const next = event.target.value;
    setHexDraft(next);
    onChange(next);
  };

  const handleHexChange = (event) => {
    const next = event.target.value;
    setHexDraft(next);

    const normalized = normalizeHexColor(next);
    if (normalized) {
      onChange(normalized);
    }
  };

  const handleHexBlur = () => {
    const normalized = normalizeHexColor(hexDraft);
    if (normalized) {
      setHexDraft(normalized);
      onChange(normalized);
      return;
    }

    setHexDraft(value);
  };

  return (
    <div className={`color-picker-field ${className}`.trim()}>
      <span className="color-picker-field__label">{label}</span>
      <div className="color-picker-field__control">
        <input
          id={pickerId}
          type="color"
          className="color-picker-field__swatch"
          value={toColorInputValue(hexDraft, toColorInputValue(value))}
          onChange={handlePickerChange}
          aria-label={`${label} color picker`}
        />
        <input
          id={hexId}
          type="text"
          className="color-picker-field__hex form-input"
          value={hexDraft}
          onChange={handleHexChange}
          onBlur={handleHexBlur}
          placeholder="#ffffff"
          aria-label={`${label} hex value`}
          spellCheck={false}
          autoComplete="off"
          inputMode="text"
        />
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {hint && <p className="form-hint">{hint}</p>}
    </div>
  );
};

export default ColorPickerField;