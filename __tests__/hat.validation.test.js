/**
 * hat.validation.test.js — Hat customizer validation.
 */

import { validateHatDesign, validateHatText } from '../src/features/designers/hat/validation';
import { createDefaultHatDesign } from '../src/features/designers/hat/designModel';

describe('hat validation', () => {
  it('validateHatText enforces max length', () => {
    expect(validateHatText('a'.repeat(26))).toMatch(/under 25/i);
  });

  it('validateHatDesign requires text or image', () => {
    const design = createDefaultHatDesign();
    expect(validateHatDesign(design).some((e) => /company|name/i.test(e))).toBe(true);
  });

  it('validateHatDesign passes with company name', () => {
    const design = { ...createDefaultHatDesign(), companyName: 'Namerrs' };
    expect(validateHatDesign(design)).toEqual([]);
  });
});