/**
 * banner.validation.test.js — Banner validation helpers.
 */

import { validateDescription, validateBannerDesign } from '../src/features/designers/banner/validation';
import { createDefaultBannerDesign } from '../src/features/designers/banner/designModel';

describe('banner validation', () => {
  it('validateDescription requires minimum length', () => {
    expect(validateDescription('short')).toMatch(/at least 10/i);
  });

  it('validateBannerDesign requires description and dimensions', () => {
    const design = createDefaultBannerDesign();
    const errors = validateBannerDesign(design);
    expect(errors.some((e) => /description/i.test(e))).toBe(true);
  });

  it('validateBannerDesign passes with valid design', () => {
    const design = {
      ...createDefaultBannerDesign(),
      description: 'Birthday party banner for Main Street event.',
    };
    expect(validateBannerDesign(design)).toEqual([]);
  });
});