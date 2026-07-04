/**
 * businessCard.validation.test.js — Business card validation helpers.
 */

import {
  validateTextValue,
  validateColor,
  validateImageFile,
  hasLowContrast,
} from '../src/features/designers/businessCard/validation';

describe('business card validation', () => {
  it('validateTextValue enforces max length', () => {
    const longName = 'a'.repeat(41);
    expect(validateTextValue('name', longName)).toMatch(/under 40 characters/i);
  });

  it('validateColor accepts hex and rejects invalid values', () => {
    expect(validateColor('#111111')).toBeNull();
    expect(validateColor('rgb(17, 24, 39)')).toBeNull();
    expect(validateColor('not-a-color')).toMatch(/valid/i);
  });

  it('validateImageFile rejects unsupported types', () => {
    const file = { type: 'application/pdf', size: 1000 };
    expect(validateImageFile(file)).toMatch(/jpg, png, or webp/i);
  });

  it('hasLowContrast detects poor contrast', () => {
    expect(hasLowContrast('#ffffff', '#f9fafb')).toBe(true);
    expect(hasLowContrast('#111111', '#ffffff')).toBe(false);
  });
});