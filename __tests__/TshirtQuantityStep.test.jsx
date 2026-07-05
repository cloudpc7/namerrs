/**
 * TshirtQuantityStep.test.jsx — Per-size quantity input behavior.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TshirtQuantityStep from '../src/features/designers/quantity/TshirtQuantityStep';
import { createDefaultTshirtDesign } from '../src/features/designers/tshirt/designModel';

describe('TshirtQuantityStep', () => {
  const design = {
    ...createDefaultTshirtDesign(),
    selectedSizes: ['M'],
    shirtColor: '#ffffff',
  };

  it('allows clearing zero while typing and commits on blur', async () => {
    const user = userEvent.setup();
    const onSizeQuantitiesChange = jest.fn();

    render(
      <TshirtQuantityStep
        design={design}
        sizeQuantities={{ M: 0 }}
        onSizeQuantitiesChange={onSizeQuantitiesChange}
        configuredUnitPrice={null}
        error=""
      />
    );

    const input = screen.getByLabelText('M');
    expect(input).toHaveValue('0');

    await user.clear(input);
    expect(input).toHaveValue('');
    expect(onSizeQuantitiesChange).not.toHaveBeenCalled();

    await user.type(input, '12');
    expect(input).toHaveValue('12');
    expect(onSizeQuantitiesChange).not.toHaveBeenCalled();

    await user.tab();
    expect(onSizeQuantitiesChange).toHaveBeenCalledWith({ M: 12 });
  });

  it('commits size quantity when the input unmounts', async () => {
    const user = userEvent.setup();
    const onSizeQuantitiesChange = jest.fn();

    const { unmount } = render(
      <TshirtQuantityStep
        design={design}
        sizeQuantities={{ M: 0 }}
        onSizeQuantitiesChange={onSizeQuantitiesChange}
        configuredUnitPrice={null}
        error=""
      />
    );

    const input = screen.getByLabelText('M');
    await user.clear(input);
    await user.type(input, '8');
    unmount();

    expect(onSizeQuantitiesChange).toHaveBeenLastCalledWith({ M: 8 });
  });

  it('renders with designer panel styling', () => {
    render(
      <TshirtQuantityStep
        design={design}
        sizeQuantities={{ M: 1 }}
        onSizeQuantitiesChange={jest.fn()}
        configuredUnitPrice={10}
        error=""
      />
    );

    expect(screen.getByLabelText('T-shirt quantity')).toHaveClass('card-designer__panel');
    expect(screen.getByLabelText('M')).toHaveClass('form-input');
  });
});