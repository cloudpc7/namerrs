/**
 * HatDesigner.test.jsx — Hat designer layout and tabs.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HatDesigner from '../src/features/designers/HatDesigner';
import { HAT_PANEL } from '../src/features/designers/hat/constants';
import { createDefaultHatDesign } from '../src/features/designers/hat/designModel';

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

describe('HatDesigner', () => {
  it('renders tabbed panels when onTabChange is provided', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();

    render(
      <HatDesigner
        design={createDefaultHatDesign()}
        onChange={jest.fn()}
        activeTab={HAT_PANEL.TEXT}
        onTabChange={onTabChange}
      />
    );

    expect(screen.getByRole('navigation', { name: /designer options/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /hat preview/i })).toHaveAttribute('tabindex', '0');
    expect(screen.getByLabelText(/short company name/i)).toHaveClass('form-input');
    expect(screen.queryByRole('button', { name: /upload logo/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /^image$/i }));
    expect(onTabChange).toHaveBeenCalledWith(HAT_PANEL.IMAGE);
  });

  it('shows image upload tools on the image tab', () => {
    render(
      <HatDesigner
        design={{ ...createDefaultHatDesign(), inputMode: 'image' }}
        onChange={jest.fn()}
        activeTab={HAT_PANEL.IMAGE}
      />
    );

    expect(screen.getByRole('button', { name: /upload logo/i })).toHaveClass('card-designer__tool');
  });

  it('shows hat color swatches on the color tab', () => {
    render(
      <HatDesigner
        design={createDefaultHatDesign()}
        onChange={jest.fn()}
        activeTab={HAT_PANEL.COLOR}
      />
    );

    expect(screen.getByRole('button', { name: 'Navy' })).toHaveClass('hat-designer__swatch');
  });
});