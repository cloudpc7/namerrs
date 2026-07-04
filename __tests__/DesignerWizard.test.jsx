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
          magnets: { id: 'magnets', name: 'Magnets', minQuantity: 1 },
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
  it('blocks continue when t-shirt design is incomplete', async () => {
    const user = userEvent.setup();
    renderWizard('tshirts');

    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/fix these before continuing/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/t-shirt designer/i)).toBeInTheDocument();
  });

  it('shows magnet quantity presets on quantity step', async () => {
    const user = userEvent.setup();
    renderWizard('magnets');

    const companyInput = screen.getByLabelText(/short company name/i);
    await user.type(companyInput, 'Namerrs');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByLabelText(/magnet quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
  });
});