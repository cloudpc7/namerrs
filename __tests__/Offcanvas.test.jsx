/**
 * Offcanvas.test.jsx — Sliding panel accessibility and close behavior.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Offcanvas from '../src/ui/components/Offcanvas';

jest.mock('@react-spring/web', () => ({
  useSpring: (config) => (typeof config === 'function' ? config() : config),
  animated: {
    button: ({ children, style, ...props }) => (
      <button type="button" style={style} {...props}>
        {children}
      </button>
    ),
    div: ({ children, style, ...props }) => (
      <div style={style} {...props}>
        {children}
      </div>
    ),
  },
}));

describe('Offcanvas', () => {
  it('renders dialog content when open', () => {
    render(
      <Offcanvas isOpen onClose={jest.fn()} title="Business Cards Designer">
        <p>Designer workspace</p>
      </Offcanvas>
    );

    expect(screen.getByRole('dialog', { name: /business cards designer/i })).toBeInTheDocument();
    expect(screen.getByText('Designer workspace')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Offcanvas isOpen onClose={onClose} title="Cart">
        <p>Cart body</p>
      </Offcanvas>
    );

    await user.click(screen.getAllByRole('button', { name: /close panel/i })[1]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Offcanvas isOpen onClose={onClose} title="Cart">
        <p>Cart body</p>
      </Offcanvas>
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});