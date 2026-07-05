/**
 * DefaultQuantityStep.test.jsx — Quantity field editing behavior.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DefaultQuantityStep from '../src/features/designers/quantity/DefaultQuantityStep';

describe('DefaultQuantityStep', () => {
  it('allows clearing and replacing the quantity', async () => {
    const user = userEvent.setup();
    const onQuantityChange = jest.fn();

    render(
      <DefaultQuantityStep
        product={{ minQuantity: 500 }}
        quantity={500}
        onQuantityChange={onQuantityChange}
        unitPrice={10}
        lineTotal={5000}
        error=""
      />
    );

    const input = screen.getByRole('textbox', { name: 'Quantity' });
    await user.clear(input);
    await user.type(input, '750');
    await user.tab();

    expect(onQuantityChange).toHaveBeenLastCalledWith(750);
    expect(input).toHaveValue('750');
  });

  it('commits draft quantity when the step unmounts', async () => {
    const user = userEvent.setup();
    const onQuantityChange = jest.fn();

    const { unmount } = render(
      <DefaultQuantityStep
        product={{ minQuantity: 500 }}
        quantity={500}
        onQuantityChange={onQuantityChange}
        unitPrice={10}
        lineTotal={5000}
        error=""
      />
    );

    const input = screen.getByRole('textbox', { name: 'Quantity' });
    await user.clear(input);
    await user.type(input, '750');
    unmount();

    expect(onQuantityChange).toHaveBeenLastCalledWith(750);
  });

  it('clamps to minimum on blur when value is too low', async () => {
    const user = userEvent.setup();
    const onQuantityChange = jest.fn();

    render(
      <DefaultQuantityStep
        product={{ minQuantity: 500 }}
        quantity={500}
        onQuantityChange={onQuantityChange}
        unitPrice={10}
        lineTotal={5000}
        error=""
      />
    );

    const input = screen.getByRole('textbox', { name: 'Quantity' });
    await user.clear(input);
    await user.type(input, '100');
    await user.tab();

    expect(onQuantityChange).toHaveBeenLastCalledWith(500);
    expect(input).toHaveValue('500');
  });
});