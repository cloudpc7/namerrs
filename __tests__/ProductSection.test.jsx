/**
 * ProductSection.test.jsx — Product grid and detail modal on landing page.
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../src/redux/slices/content.slice';
import uiReducer from '../src/redux/slices/ui.slice';
import designReducer from '../src/redux/slices/design.slice';
import productDetailReducer from '../src/redux/slices/productDetail.slice';
import { CONTENT_STATUS } from '../src/redux/constants/content.constants';
import ProductsSection from '../src/ui/components/ProductsSection';
import ProductDetailModal from '../src/ui/components/ProductDetailModal';

jest.mock('@react-spring/web', () => ({
  useSpring: (config) => (typeof config === 'function' ? config() : config),
  animated: {
    div: ({ children, style, ...props }) => (
      <div style={style} {...props}>
        {children}
      </div>
    ),
  },
}));

const mockProducts = {
  businessCards: {
    name: 'Business Cards',
    description: 'Paper finishes, colors, and layouts.\nSingle- or double-sided printing.',
    minQuantity: 500,
    options: [
      {
        id: 'paperType',
        label: 'Paper options',
        type: 'select',
        choices: [
          { value: 'standard-matte', label: 'Standard matte' },
          { value: 'glossy', label: 'Glossy' },
        ],
        defaultValue: 'standard-matte',
      },
      {
        id: 'sides',
        label: 'Sides',
        type: 'radio',
        choices: [
          { value: 'single', label: 'Single-sided' },
          { value: 'double', label: 'Double-sided' },
        ],
        defaultValue: 'double',
      },
    ],
    specs: [{ label: 'Size', value: '3.5" × 2" US standard' }],
  },
  tshirts: {
    name: 'T-Shirts',
    description: 'Custom-printed t-shirts with sizes, colors, and uploaded graphics.',
  },
  banners: { name: 'Banners', description: 'Digitally printed vinyl or digital banners in custom sizes.' },
  hats: { name: 'Hats', description: 'Vinyl-printed hats with short company name or logo.' },
  magnets: { name: 'Magnets', description: '12 x 24 full color digital vehicle magnets.' },
  memorial: { name: 'Memorial', description: 'Custom memorial prints and stickers.' },
};

const mockPricing = {
  businessCards: 0,
  tshirts: 0,
  banners: 0,
  hats: 0,
  magnets: 0,
  memorial: 0,
};

const defaultUiState = {
  httpStatus: null,
  errorMessage: null,
  code: null,
  retryable: false,
  productSearch: '',
  toast: { message: null, type: 'info', id: null },
  isReviewModalOpen: false,
};

const createStore = (contentState, uiState = {}) =>
  configureStore({
    reducer: {
      content: contentReducer,
      ui: uiReducer,
      design: designReducer,
      productDetail: productDetailReducer,
    },
    preloadedState: {
      content: contentState,
      ui: {
        ...defaultUiState,
        ...uiState,
      },
      design: {
        isOpen: false,
        panel: null,
        productId: null,
        mode: null,
        wizard: {
          step: 'design',
          design: {},
          quantity: 1,
          sizeQuantities: {},
          completionDate: '',
          designErrors: [],
          quantityError: '',
          scheduleError: '',
        },
      },
      productDetail: {
        isOpen: false,
        productId: null,
        status: 'idle',
        error: null,
        selectedOptions: {},
      },
    },
  });

const renderProducts = (contentState) => {
  const store = createStore(contentState);
  return {
    store,
    ...render(
      <Provider store={store}>
        <ProductsSection />
        <ProductDetailModal />
      </Provider>
    ),
  };
};

const baseContentState = {
  status: CONTENT_STATUS.SUCCEEDED,
  httpStatus: null,
  error: null,
  retryable: false,
  pages: {},
  products: mockProducts,
  seo: {},
  social: {},
  pricing: mockPricing,
};

describe('ProductsSection', () => {
  it('renders the products section anchor and all product headers', () => {
    renderProducts(baseContentState);

    expect(screen.getByRole('region', { name: /products/i })).toHaveAttribute('id', 'products');
    expect(screen.getByRole('button', { name: /business cards/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /t-shirts/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /banners/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hats/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /magnets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /memorial/i })).toBeInTheDocument();
  });

  it('opens a modal with interactive options and action buttons', async () => {
    const user = userEvent.setup();
    renderProducts(baseContentState);

    const businessCardsButton = screen.getByRole('button', { name: /business cards/i });
    await user.click(businessCardsButton);

    expect(businessCardsButton).toHaveAttribute('aria-expanded', 'true');

    const modal = screen.getByRole('dialog', { name: /business cards/i });
    expect(modal).toBeInTheDocument();
    expect(within(modal).queryByText(/paper finishes, colors, and layouts/i)).not.toBeInTheDocument();
    expect(screen.getByText(/paper finishes, colors, and layouts/i)).toBeInTheDocument();
    expect(within(modal).getByLabelText(/paper options/i)).toBeInTheDocument();
    expect(within(modal).getByLabelText(/single-sided/i)).toBeInTheDocument();
    expect(within(modal).queryByText('$0.00')).not.toBeInTheDocument();
    expect(within(modal).getByRole('button', { name: /add to order/i })).toBeInTheDocument();
    expect(within(modal).queryByRole('button', { name: /edit design/i })).not.toBeInTheDocument();
  });

  it('keeps only one product expanded at a time', async () => {
    const user = userEvent.setup();
    renderProducts(baseContentState);

    const businessCardsButton = screen.getByRole('button', { name: /business cards/i });
    const tshirtsButton = screen.getByRole('button', { name: /t-shirts/i });

    await user.click(businessCardsButton);
    expect(businessCardsButton).toHaveAttribute('aria-expanded', 'true');
    expect(tshirtsButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(tshirtsButton);
    expect(tshirtsButton).toHaveAttribute('aria-expanded', 'true');
    expect(businessCardsButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the designer with selected product options when Add is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderProducts(baseContentState);

    await user.click(screen.getByRole('button', { name: /business cards/i }));

    const modal = screen.getByRole('dialog', { name: /business cards/i });
    await user.click(within(modal).getByRole('button', { name: /add to order/i }));

    expect(store.getState().design.isOpen).toBe(true);
    expect(store.getState().design.productId).toBe('businessCards');
    expect(store.getState().design.wizard.design).toMatchObject({
      paperType: 'standard-matte',
      sides: 'double',
    });
    expect(store.getState().productDetail.isOpen).toBe(false);
  });

  it('filters products from search without auto-opening the detail modal', () => {
    const store = createStore(baseContentState, { productSearch: 'hats' });

    render(
      <Provider store={store}>
        <ProductsSection />
        <ProductDetailModal />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /hats/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /t-shirts/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/matching “hats”/i);
  });

  it('clears search from the products section and restores the full grid', async () => {
    const user = userEvent.setup();
    const store = createStore(baseContentState, { productSearch: 'hats' });

    render(
      <Provider store={store}>
        <ProductsSection />
        <ProductDetailModal />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /clear search/i }));

    expect(store.getState().ui.productSearch).toBe('');
    expect(screen.getByRole('button', { name: /t-shirts/i })).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows loading skeleton while content is loading', () => {
    renderProducts({
      ...baseContentState,
      status: CONTENT_STATUS.LOADING,
      products: {},
      pricing: {},
    });

    expect(screen.getByLabelText(/loading products/i)).toBeInTheDocument();
  });
});