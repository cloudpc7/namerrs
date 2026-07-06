/**
 * accessibility.test.jsx — WCAG checks on key marketing surfaces (jest-axe).
 */

import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../src/redux/slices/content.slice';
import uiReducer from '../src/redux/slices/ui.slice';
import cartReducer from '../src/redux/slices/cart.slice';
import designReducer from '../src/redux/slices/design.slice';
import productDetailReducer from '../src/redux/slices/productDetail.slice';
import reviewsReducer from '../src/redux/slices/reviews.slice';
import contactReducer from '../src/redux/slices/contact.slice';
import checkoutReducer from '../src/redux/slices/checkout.slice';
import { CONTENT_STATUS } from '../src/redux/constants/content.constants';
import HeroSection from '../src/ui/components/HeroSection';
import ProductsSection from '../src/ui/components/ProductsSection';
import FaqSection from '../src/ui/components/FaqSection';
import ContactSection from '../src/ui/components/ContactSection';
import StarRatingInput from '../src/ui/components/StarRatingInput';
import NotFoundPage from '../src/pages/NotFoundPage';

expect.extend(toHaveNoViolations);

jest.mock('../src/hooks/useSeo', () => ({
  useSeo: jest.fn(),
}));

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

const baseContentState = {
  status: CONTENT_STATUS.SUCCEEDED,
  httpStatus: null,
  error: null,
  retryable: false,
  pages: {
    home: {
      hero: {
        title: 'Namerrs Signs & Printing',
        slogan: 'Quality Products. Best Prices Around. Done Fast.',
      },
      faq: [{ question: 'Test question?', answer: 'Test answer.' }],
    },
  },
  products: {
    hats: {
      name: 'Hats',
      description: 'Vinyl-printed hats with short company name or logo.',
    },
  },
  seo: {},
  social: {},
  pricing: { hats: 0 },
};

const createStore = (contentState = baseContentState) =>
  configureStore({
    reducer: {
      content: contentReducer,
      ui: uiReducer,
      cart: cartReducer,
      design: designReducer,
      productDetail: productDetailReducer,
      reviews: reviewsReducer,
      contact: contactReducer,
      checkout: checkoutReducer,
    },
    preloadedState: {
      content: contentState,
      ui: {
        httpStatus: null,
        errorMessage: null,
        code: null,
        retryable: false,
        productSearch: '',
        toast: { message: null, type: 'info', id: null },
        isReviewModalOpen: false,
      },
      cart: {
        items: [],
        total: 0,
        checkoutStep: 'cart',
        lastOrder: null,
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
      reviews: {
        items: [],
        fetchStatus: 'idle',
        submitStatus: 'idle',
        error: null,
        submitError: null,
      },
      contact: {
        submitStatus: 'idle',
        error: null,
      },
      checkout: {
        clientSecret: null,
        customer: { name: '', email: '', phone: '', notes: '' },
        paymentStatus: 'idle',
        error: null,
      },
    },
  });

const renderWithStore = (ui, store = createStore()) =>
  render(<Provider store={store}>{ui}</Provider>);

describe('Accessibility (jest-axe)', () => {
  it('HeroSection has no detectable violations', async () => {
    const { container } = renderWithStore(<HeroSection />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('ProductsSection has no detectable violations', async () => {
    const { container } = renderWithStore(<ProductsSection />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('FaqSection has no detectable violations', async () => {
    const { container } = renderWithStore(<FaqSection />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('ContactSection has no detectable violations', async () => {
    const { container } = renderWithStore(<ContactSection />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('NotFoundPage has no detectable violations', async () => {
    const { container } = render(<NotFoundPage />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('StarRatingInput exposes an accessible radiogroup', () => {
    const { getByRole } = render(
      <StarRatingInput id="test-rating" value={3} onChange={jest.fn()} />
    );

    expect(getByRole('radiogroup', { name: /rating/i })).toBeInTheDocument();
    expect(getByRole('radio', { name: /3 stars/i })).toHaveAttribute('aria-checked', 'true');
  });
});