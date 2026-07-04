/**
 * ProductSection.test.jsx — Expandable product accordion on landing page.
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../src/redux/slices/content.slice';
import uiReducer from '../src/redux/slices/ui.slice';
import { CONTENT_STATUS } from '../src/redux/constants/content.constants';
import ProductsSection from '../src/ui/components/ProductsSection';

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
    description: 'Custom business cards with dynamic paper, color, and double-sided design options.',
    minQuantity: 500,
    specs: [{ label: 'Minimum order', value: '500 cards' }],
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

const createStore = (contentState) =>
  configureStore({
    reducer: { content: contentReducer, ui: uiReducer },
    preloadedState: {
      content: contentState,
      ui: {
        httpStatus: null,
        errorMessage: null,
        code: null,
        retryable: false,
        productSearch: '',
      },
    },
  });

const renderProducts = (contentState, props = {}) => {
  const store = createStore(contentState);
  return render(
    <Provider store={store}>
      <ProductsSection {...props} />
    </Provider>
  );
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

  it('expands a product panel with description, pricing, and action buttons', async () => {
    const user = userEvent.setup();
    renderProducts(baseContentState);

    const businessCardsButton = screen.getByRole('button', { name: /business cards/i });
    await user.click(businessCardsButton);

    expect(businessCardsButton).toHaveAttribute('aria-expanded', 'true');

    const panel = document.getElementById(businessCardsButton.getAttribute('aria-controls'));
    expect(panel).toBeInTheDocument();
    expect(within(panel).getByText(/custom business cards/i)).toBeInTheDocument();
    expect(within(panel).getByText('$0.00')).toHaveClass('text-[var(--color-text-disabled)]');
    expect(within(panel).getByRole('button', { name: /add to order/i })).toBeInTheDocument();
    expect(within(panel).getByRole('button', { name: /edit design/i })).toBeInTheDocument();
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

  it('calls onDesignerOpen when Add or Edit is clicked', async () => {
    const user = userEvent.setup();
    const onDesignerOpen = jest.fn();
    renderProducts(baseContentState, { onDesignerOpen });

    const businessCardsButton = screen.getByRole('button', { name: /business cards/i });
    await user.click(businessCardsButton);

    const panel = document.getElementById(businessCardsButton.getAttribute('aria-controls'));
    await user.click(within(panel).getByRole('button', { name: /add to order/i }));
    expect(onDesignerOpen).toHaveBeenCalledWith('businessCards', 'add');

    await user.click(within(panel).getByRole('button', { name: /edit design/i }));
    expect(onDesignerOpen).toHaveBeenCalledWith('businessCards', 'edit');
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