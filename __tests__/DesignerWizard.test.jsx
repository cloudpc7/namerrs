/**
 * DesignerWizard.test.jsx — Wizard validation and quantity steps.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DesignerWizard from '../src/features/designers/DesignerWizard';
import contentReducer from '../src/redux/slices/content.slice';
import designReducer from '../src/redux/slices/design.slice';
import cartReducer from '../src/redux/slices/cart.slice';
import { PANEL_TYPE, DESIGNER_MODE, WIZARD_STEP } from '../src/redux/constants/design.constants';

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

const renderWizard = (productId) => {
  const store = configureStore({
    reducer: {
      content: contentReducer,
      design: designReducer,
      cart: cartReducer,
    },
    preloadedState: {
      content: {
        products: {
          tshirts: { id: 'tshirts', name: 'T-Shirts', minQuantity: 1 },
          banners: { id: 'banners', name: 'Banners', minQuantity: 1 },
          hats: { id: 'hats', name: 'Hats', minQuantity: 1 },
          magnets: { id: 'magnets', name: 'Magnets', minQuantity: 1 },
          memorial: { id: 'memorial', name: 'Memorial', minQuantity: 1 },
        },
        pricing: {},
        pages: {},
        seo: {},
        social: {},
        status: 'idle',
        error: null,
        httpStatus: null,
        retryable: false,
      },
      design: {
        isOpen: true,
        panel: PANEL_TYPE.DESIGNER,
        productId,
        mode: DESIGNER_MODE.ADD,
        wizard: {
          step: WIZARD_STEP.DESIGN,
          design: {},
          quantity: 1,
          sizeQuantities: {},
          completionDate: '',
          designErrors: [],
          quantityError: '',
          scheduleError: '',
        },
      },
    },
  });

  return render(
    <Provider store={store}>
      <DesignerWizard />
    </Provider>
  );
};

describe('DesignerWizard', () => {
  it('blocks qty tab when t-shirt design is incomplete', async () => {
    const user = userEvent.setup();
    renderWizard('tshirts');

    await user.click(screen.getByRole('tab', { name: /^qty$/i }));

    expect(screen.getByText(/add text or upload an image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/t-shirt designer/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^text$/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders banner designer tabs instead of step footer', () => {
    renderWizard('banners');

    expect(screen.getByLabelText(/banner designer/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^image$/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /^size$/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('renders hat designer tabs instead of step footer', () => {
    renderWizard('hats');

    expect(screen.getByLabelText(/hat designer/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^text$/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('renders magnet designer tabs instead of step footer', () => {
    renderWizard('magnets');

    expect(screen.getByLabelText(/magnet designer/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^text$/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('shows magnet quantity presets on quantity tab', async () => {
    const user = userEvent.setup();
    renderWizard('magnets');

    const companyInput = screen.getByLabelText(/short company name/i);
    await user.type(companyInput, 'Namerrs');
    await user.click(screen.getByRole('tab', { name: /^qty$/i }));

    expect(screen.getByLabelText(/magnet quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
  });

  it('renders memorial designer tabs instead of step footer', () => {
    renderWizard('memorial');

    expect(screen.getByLabelText(/memorial designer/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^text$/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /^size$/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('shows quantity field on memorial quantity tab', async () => {
    const user = userEvent.setup();
    renderWizard('memorial');

    const nameInput = screen.getByLabelText(/^name$/i);
    await user.type(nameInput, 'Jane Smith');
    await user.click(screen.getByRole('tab', { name: /^qty$/i }));

    expect(screen.getByLabelText(/^quantity$/i)).toBeInTheDocument();
  });
});