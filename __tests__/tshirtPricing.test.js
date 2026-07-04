/**
 * tshirtPricing.test.js — T-shirt tier pricing helpers.
 */

import {
  getTierForQuantity,
  getTshirtLineTotal,
  sumSizeQuantities,
} from '../src/utils/tshirtPricing';

describe('tshirtPricing', () => {
  it('getTierForQuantity returns correct tier', () => {
    expect(getTierForQuantity(2).unitPrice).toBe(25);
    expect(getTierForQuantity(10).unitPrice).toBe(15);
    expect(getTierForQuantity(100).unitPrice).toBe(6);
  });

  it('getTshirtLineTotal returns 0 when pricing not configured', () => {
    expect(getTshirtLineTotal(50, 0)).toBe(0);
  });

  it('getTshirtLineTotal calculates when pricing enabled', () => {
    expect(getTshirtLineTotal(10, 1)).toBe(150);
  });

  it('sumSizeQuantities totals per-size counts', () => {
    expect(sumSizeQuantities({ M: 2, L: 3 })).toBe(5);
  });
});