/**
 * tshirtPricing.js — Quantity tier unit pricing for T-shirts (Feature 8).
 */

export const TSHIRT_TIERS = [
  { min: 1, max: 3, unitPrice: 25 },
  { min: 4, max: 5, unitPrice: 20 },
  { min: 6, max: 10, unitPrice: 15 },
  { min: 11, max: 20, unitPrice: 10 },
  { min: 21, max: 24, unitPrice: 8 },
  { min: 25, max: 50, unitPrice: 7 },
  { min: 51, max: 100, unitPrice: 6 },
  { min: 101, max: Infinity, unitPrice: 5 },
];

export const getTierForQuantity = (totalQuantity) =>
  TSHIRT_TIERS.find((tier) => totalQuantity >= tier.min && totalQuantity <= tier.max) ||
  TSHIRT_TIERS[TSHIRT_TIERS.length - 1];

export const getTshirtUnitPrice = (totalQuantity, configuredPrice) => {
  if (!configuredPrice) {
    return 0;
  }
  return getTierForQuantity(totalQuantity).unitPrice;
};

export const getTshirtLineTotal = (totalQuantity, configuredPrice) =>
  getTshirtUnitPrice(totalQuantity, configuredPrice) * totalQuantity;

export const sumSizeQuantities = (sizeQuantities = {}) =>
  Object.values(sizeQuantities).reduce((sum, qty) => sum + (Number(qty) || 0), 0);