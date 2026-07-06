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
import BusinessCardDesigner from '../src/features/designers/BusinessCardDesigner';
import TshirtDesigner from '../src/features/designers/TshirtDesigner';
import BannerDesigner from '../src/features/designers/BannerDesigner';
import HatDesigner from '../src/features/designers/HatDesigner';
import MagnetDesigner from '../src/features/designers/MagnetDesigner';
import MemorialDesigner from '../src/features/designers/MemorialDesigner';
import { createDefaultBusinessCardDesign } from '../src/features/designers/businessCard/designModel';
import { BUSINESS_CARD_PANEL } from '../src/features/designers/businessCard/constants';
import { createDefaultTshirtDesign } from '../src/features/designers/tshirt/designModel';
import { TSHIRT_PANEL } from '../src/features/designers/tshirt/constants';
import { createDefaultBannerDesign } from '../src/features/designers/banner/designModel';
import { BANNER_PANEL } from '../src/features/designers/banner/constants';
import { createDefaultHatDesign } from '../src/features/designers/hat/designModel';
import { HAT_PANEL } from '../src/features/designers/hat/constants';
import { createDefaultMagnetDesign } from '../src/features/designers/magnet/designModel';
import { MAGNET_PANEL } from '../src/features/designers/magnet/constants';
import { createDefaultMemorialDesign } from '../src/features/designers/memorial/designModel';
import { MEMORIAL_PANEL } from '../src/features/designers/memorial/constants';
import Modal from '../src/ui/components/Modal';
import Offcanvas from '../src/ui/components/Offcanvas';
import { DesignerTabBar } from '../src/ui/components/primitives';
import NotFoundPage from '../src/pages/NotFoundPage';

expect.extend(toHaveNoViolations);

jest.mock('../src/hooks/useSeo', () => ({
  useSeo: jest.fn(),
}));

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

jest.mock('@react-spring/web', () => ({
  useSpring: (config) => (typeof config === 'function' ? config() : config),
  animated: {
    div: ({ children, style, ...props }) => (
      <div style={style} {...props}>
        {children}
      </div>
    ),
    button: ({ children, style, ...props }) => (
      <button type="button" style={style} {...props}>
        {children}
      </button>
    ),
    aside: ({ children, style, ...props }) => (
      <aside style={style} {...props}>
        {children}
      </aside>
    ),
  },
}));

const designerDefaults = {
  onChange: jest.fn(),
  onTabChange: jest.fn(),
};

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

  it('BusinessCardDesigner has no detectable violations', async () => {
    const { container } = render(
      <BusinessCardDesigner
        {...designerDefaults}
        design={createDefaultBusinessCardDesign()}
        activeTab={BUSINESS_CARD_PANEL.TEXT}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('TshirtDesigner has no detectable violations', async () => {
    const { container } = render(
      <TshirtDesigner
        {...designerDefaults}
        design={createDefaultTshirtDesign()}
        activeTab={TSHIRT_PANEL.TEXT}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('BannerDesigner has no detectable violations', async () => {
    const { container } = render(
      <BannerDesigner
        {...designerDefaults}
        design={createDefaultBannerDesign()}
        activeTab={BANNER_PANEL.IMAGE}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('HatDesigner has no detectable violations', async () => {
    const { container } = render(
      <HatDesigner
        {...designerDefaults}
        design={createDefaultHatDesign()}
        activeTab={HAT_PANEL.TEXT}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('MagnetDesigner has no detectable violations', async () => {
    const { container } = render(
      <MagnetDesigner
        {...designerDefaults}
        design={createDefaultMagnetDesign()}
        activeTab={MAGNET_PANEL.TEXT}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('MemorialDesigner has no detectable violations', async () => {
    const { container } = render(
      <MemorialDesigner
        {...designerDefaults}
        design={createDefaultMemorialDesign()}
        activeTab={MEMORIAL_PANEL.TEXT}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Modal has no detectable violations when open', async () => {
    const { container } = render(
      <Modal isOpen onClose={jest.fn()} title="Leave a review">
        <p>Review form content</p>
      </Modal>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Offcanvas has no detectable violations when open', async () => {
    const { container } = render(
      <Offcanvas isOpen onClose={jest.fn()} title="Hat designer">
        <p>Designer workspace</p>
      </Offcanvas>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('DesignerTabBar exposes an accessible tablist with linked tabs', () => {
    const tabs = [
      { id: 'text', label: 'Text' },
      { id: 'color', label: 'Color' },
    ];
    const { getByRole } = render(
      <DesignerTabBar tabs={tabs} activeTab="text" onChange={jest.fn()} />
    );

    const textTab = getByRole('tab', { name: 'Text' });
    expect(textTab).toHaveAttribute('aria-selected', 'true');
    expect(textTab).toHaveAttribute('aria-controls', 'designer-tabpanel-text');
    expect(getByRole('tab', { name: 'Color' })).toHaveAttribute('aria-selected', 'false');
  });
});