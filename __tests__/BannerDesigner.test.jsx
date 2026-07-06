/**
 * BannerDesigner.test.jsx — Banner designer layout and tabs.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BannerDesigner from '../src/features/designers/BannerDesigner';
import { BANNER_PANEL } from '../src/features/designers/banner/constants';
import { createDefaultBannerDesign } from '../src/features/designers/banner/designModel';

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

describe('BannerDesigner', () => {
  it('renders tabbed panels when onTabChange is provided', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();

    render(
      <BannerDesigner
        design={createDefaultBannerDesign()}
        onChange={jest.fn()}
        activeTab={BANNER_PANEL.IMAGE}
        onTabChange={onTabChange}
      />
    );

    expect(screen.getByRole('navigation', { name: /designer options/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upload artwork/i })).toHaveClass('card-designer__tool');
    expect(screen.queryByLabelText(/banner type/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /^size$/i }));
    expect(onTabChange).toHaveBeenCalledWith(BANNER_PANEL.SIZE);
  });

  it('shows size fields on the size tab', () => {
    render(
      <BannerDesigner
        design={createDefaultBannerDesign()}
        onChange={jest.fn()}
        activeTab={BANNER_PANEL.SIZE}
      />
    );

    expect(screen.getByLabelText(/banner type/i)).toHaveClass('form-input');
    expect(screen.getByLabelText(/^size$/i)).toHaveClass('form-input');
  });

  it('shows custom dimension fields when custom size is selected', () => {
    const design = {
      ...createDefaultBannerDesign(),
      sizePreset: 'custom',
      customWidth: 4,
      customHeight: 6,
    };

    render(
      <BannerDesigner
        design={design}
        onChange={jest.fn()}
        activeTab={BANNER_PANEL.SIZE}
      />
    );

    expect(screen.getByLabelText(/width \(ft\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height \(ft\)/i)).toBeInTheDocument();
  });

  it('shows brief fields on the brief tab', () => {
    render(
      <BannerDesigner
        design={createDefaultBannerDesign()}
        onChange={jest.fn()}
        activeTab={BANNER_PANEL.BRIEF}
      />
    );

    expect(screen.getByLabelText(/design description/i)).toHaveClass(
      'form-input',
      'form-input--textarea'
    );
  });
});