/**
 * colorUtils.js — Hex normalization helpers for color pickers and validation.
 */

const HEX_SHORT = /^#([0-9a-fA-F]{3})$/;
const HEX_FULL = /^#([0-9a-fA-F]{6})$/;

export const normalizeHexColor = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  if (HEX_FULL.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  if (HEX_SHORT.test(trimmed)) {
    const [, short] = trimmed.match(HEX_SHORT);
    return `#${short
      .split('')
      .map((char) => char + char)
      .join('')}`.toLowerCase();
  }

  return null;
};

export const toColorInputValue = (value, fallback = '#000000') =>
  normalizeHexColor(value) || fallback;