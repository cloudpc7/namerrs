/**
 * formatPrice.test.js — Currency formatting helper tests.
 */

import { formatPrice } from '../src/utils/formatPrice';

describe('formatPrice', () => {
  it('formats zero as $0.00', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats decimal amounts with two places', () => {
    expect(formatPrice(12.5)).toBe('$12.50');
  });

  it('defaults invalid values to $0.00', () => {
    expect(formatPrice(undefined)).toBe('$0.00');
  });
});