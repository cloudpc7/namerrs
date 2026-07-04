/**
 * productOptions.js — Helpers for RTDB-driven product option defaults and design mapping.
 */

export const buildDefaultOptionValues = (product) => {
  const options = product?.options || [];

  return options.reduce((acc, option) => {
    const fallback = option.choices?.[0]?.value ?? '';
    acc[option.id] = option.defaultValue ?? fallback;
    return acc;
  }, {});
};

export const buildInitialDesignFromOptions = (productId, optionValues = {}) => {
  if (productId === 'businessCards') {
    return {
      paperType: optionValues.paperType || 'standard-matte',
      sides: optionValues.sides || 'double',
    };
  }

  return {};
};

export const getReadOnlySpecs = (product) => {
  const optionLabels = new Set(
    (product?.options || []).map((option) => option.label?.toLowerCase())
  );

  return (product?.specs || []).filter((spec) => {
    const label = spec.label?.toLowerCase() || '';
    return !optionLabels.has(label);
  });
};