/**
 * tshirt.validation.test.js — T-shirt validation helpers.
 */

import {
  validateTextValue,
  validateColor,
  validateImageFile,
  validateTshirtDesign,
} from '../src/features/designers/tshirt/validation';
import { createDefaultTshirtDesign } from '../src/features/designers/tshirt/designModel';

describe('tshirt validation', () => {
  it('validateTextValue enforces max length for line 1', () => {
    const longLine = 'a'.repeat(31);
    expect(validateTextValue('line1', longLine)).toMatch(/under 30 characters/i);
  });

  it('validateTextValue rejects invalid characters', () => {
    expect(validateTextValue('line2', 'Hello@world')).toMatch(/basic punctuation/i);
  });

  it('validateColor accepts hex and rejects invalid values', () => {
    expect(validateColor('#ffffff')).toBeNull();
    expect(validateColor('hsl(0, 0%, 100%)')).toBeNull();
    expect(validateColor('bad')).toMatch(/valid/i);
  });

  it('validateImageFile rejects unsupported types', () => {
    const file = { type: 'application/pdf', size: 1000 };
    expect(validateImageFile(file)).toMatch(/jpg, png, or webp/i);
  });

  it('validateTshirtDesign requires fit, color, size, and content', () => {
    const empty = {
      ...createDefaultTshirtDesign(),
      fit: '',
      shirtColor: '',
      selectedSizes: [],
      elements: [],
    };

    const errors = validateTshirtDesign(empty);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/fit/i),
        expect.stringMatching(/shirt color/i),
        expect.stringMatching(/size/i),
        expect.stringMatching(/text or upload/i),
      ])
    );
  });

  it('validateTshirtDesign passes with text content', () => {
    const design = createDefaultTshirtDesign();
    design.elements[0].content = 'Namerrs';

    expect(validateTshirtDesign(design)).toEqual([]);
  });
});