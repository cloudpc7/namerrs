/**
 * MagnetDesigner.test.jsx — Magnet designer layout and tabs.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MagnetDesigner from '../src/features/designers/MagnetDesigner';
import { MAGNET_PANEL } from '../src/features/designers/magnet/constants';
import { createDefaultMagnetDesign } from '../src/features/designers/magnet/designModel';

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

describe('MagnetDesigner', () => {
  it('renders tabbed panels when onTabChange is provided', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();

    render(
      <MagnetDesigner
        design={createDefaultMagnetDesign()}
        onChange={jest.fn()}
        activeTab={MAGNET_PANEL.TEXT}
        onTabChange={onTabChange}
      />
    );

    expect(screen.getByRole('navigation', { name: /designer options/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/short company name/i)).toHaveClass('form-input');
    expect(screen.queryByRole('button', { name: /upload graphic/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /^image$/i }));
    expect(onTabChange).toHaveBeenCalledWith(MAGNET_PANEL.IMAGE);
  });

  it('shows image upload tools on the image tab', () => {
    render(
      <MagnetDesigner
        design={{ ...createDefaultMagnetDesign(), inputMode: 'image' }}
        onChange={jest.fn()}
        activeTab={MAGNET_PANEL.IMAGE}
      />
    );

    expect(screen.getByRole('button', { name: /upload graphic/i })).toHaveClass('card-designer__tool');
  });

  it('shows background color swatches on the color tab', () => {
    render(
      <MagnetDesigner
        design={createDefaultMagnetDesign()}
        onChange={jest.fn()}
        activeTab={MAGNET_PANEL.COLOR}
      />
    );

    expect(screen.getByRole('button', { name: 'Navy' })).toHaveClass('magnet-designer__swatch');
  });
});