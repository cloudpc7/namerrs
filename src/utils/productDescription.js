/**
 * productDescription.js — Format product copy for cards vs. detail views.
 */

export const getProductDescriptionLines = (description) =>
  description
    ?.split('\n')
    .map((line) => line.trim())
    .filter(Boolean) ?? [];

export const getProductDescriptionPlain = (description) =>
  getProductDescriptionLines(description).join(' ');