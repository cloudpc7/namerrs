/**
 * colorUtils.test.js — Hex color normalization helpers.
 */

import { normalizeHexColor, toColorInputValue } from '../src/utils/colorUtils';

describe('colorUtils', () => {
  it('normalizes 6-digit hex values', () => {
    expect(normalizeHexColor('#AABBCC')).toBe('#aabbcc');
  });

  it('expands 3-digit hex shorthand', () => {
    expect(normalizeHexColor('#abc')).toBe('#aabbcc');
  });

  it('returns null for partial or invalid values', () => {
    expect(normalizeHexColor('#ab')).toBeNull();
    expect(normalizeHexColor('')).toBeNull();
    expect(normalizeHexColor('red')).toBeNull();
  });

  it('falls back for color input values', () => {
    expect(toColorInputValue('#112233')).toBe('#112233');
    expect(toColorInputValue('#abc')).toBe('#aabbcc');
    expect(toColorInputValue('partial', '#ffffff')).toBe('#ffffff');
  });
});