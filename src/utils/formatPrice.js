/**
 * formatPrice.js — Currency display helper for product pricing.
 */

export const formatPrice = (amount) => {
  const value = Number(amount) || 0;
  return `$${value.toFixed(2)}`;
};