/**
 * businessDays.test.js — Scheduling helper tests.
 */

import {
  getMinimumCompletionDate,
  isValidCompletionDate,
} from '../src/utils/businessDays';

describe('businessDays', () => {
  it('requires at least 5 business days lead time', () => {
    const from = new Date('2026-07-01T12:00:00');
    const minimum = getMinimumCompletionDate(from, 5);
    expect(isValidCompletionDate(minimum.toISOString().slice(0, 10), from, 5)).toBe(true);
  });

  it('rejects dates before minimum lead time', () => {
    const from = new Date('2026-07-01T12:00:00');
    expect(isValidCompletionDate('2026-07-02', from, 5)).toBe(false);
  });
});