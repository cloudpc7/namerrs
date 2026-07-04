/**
 * productOptions.test.js — Product option helpers for RTDB-driven config.
 */

import {
  buildDefaultOptionValues,
  buildInitialDesignFromOptions,
  getReadOnlySpecs,
} from '../src/utils/productOptions';

describe('productOptions helpers', () => {
  const product = {
    options: [
      {
        id: 'paperType',
        label: 'Paper options',
        choices: [{ value: 'glossy', label: 'Glossy' }],
        defaultValue: 'glossy',
      },
      {
        id: 'sides',
        label: 'Sides',
        choices: [{ value: 'double', label: 'Double-sided' }],
      },
    ],
    specs: [
      { label: 'Paper options', value: 'static' },
      { label: 'Size', value: '3.5 x 2' },
    ],
  };

  it('builds default option values from RTDB config', () => {
    expect(buildDefaultOptionValues(product)).toEqual({
      paperType: 'glossy',
      sides: 'double',
    });
  });

  it('maps business card options into initial designer state', () => {
    expect(
      buildInitialDesignFromOptions('businessCards', {
        paperType: 'uncoated',
        sides: 'single',
      })
    ).toEqual({
      paperType: 'uncoated',
      sides: 'single',
    });
  });

  it('filters specs that duplicate interactive options', () => {
    expect(getReadOnlySpecs(product)).toEqual([{ label: 'Size', value: '3.5 x 2' }]);
  });
});