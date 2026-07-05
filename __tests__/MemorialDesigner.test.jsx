/**
 * MemorialDesigner.test.jsx — Memorial designer layout and tabs.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemorialDesigner from '../src/features/designers/MemorialDesigner';
import { MEMORIAL_PANEL } from '../src/features/designers/memorial/constants';
import { createDefaultMemorialDesign } from '../src/features/designers/memorial/designModel';

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

describe('MemorialDesigner', () => {
  it('renders tabbed panels when onTabChange is provided', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();

    render(
      <MemorialDesigner
        design={createDefaultMemorialDesign()}
        onChange={jest.fn()}
        activeTab={MEMORIAL_PANEL.TEXT}
        onTabChange={onTabChange}
      />
    );

    expect(screen.getByRole('navigation', { name: /designer options/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^name$/i)).toHaveClass('form-input');
    expect(screen.queryByRole('button', { name: /upload photo/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^photo$/i }));
    expect(onTabChange).toHaveBeenCalledWith(MEMORIAL_PANEL.PHOTO);
  });

  it('shows photo upload tools on the photo tab', () => {
    render(
      <MemorialDesigner
        design={{ ...createDefaultMemorialDesign(), inputMode: 'image' }}
        onChange={jest.fn()}
        activeTab={MEMORIAL_PANEL.PHOTO}
      />
    );

    expect(screen.getByRole('button', { name: /upload photo/i })).toHaveClass('card-designer__tool');
  });

  it('shows size controls on the size tab', () => {
    render(
      <MemorialDesigner
        design={createDefaultMemorialDesign()}
        onChange={jest.fn()}
        activeTab={MEMORIAL_PANEL.SIZE}
      />
    );

    expect(screen.getByLabelText(/product type/i)).toHaveClass('form-input');
    expect(screen.getByLabelText(/^size$/i)).toHaveClass('form-input');
  });

  it('shows background color swatches on the color tab', () => {
    render(
      <MemorialDesigner
        design={createDefaultMemorialDesign()}
        onChange={jest.fn()}
        activeTab={MEMORIAL_PANEL.COLOR}
      />
    );

    expect(screen.getByRole('button', { name: 'Ivory' })).toHaveClass('memorial-designer__swatch');
  });
});