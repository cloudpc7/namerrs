/**
 * OffcanvasHost.test.jsx — Global offcanvas host opens designer and cart panels.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../src/redux/slices/content.slice';
import cartReducer from '../src/redux/slices/cart.slice';
import designReducer, { openDesigner, openCart } from '../src/redux/slices/design.slice';
import uiReducer from '../src/redux/slices/ui.slice';
import { CONTENT_STATUS } from '../src/redux/constants/content.constants';
import { DESIGNER_MODE } from '../src/redux/constants/design.constants';
import OffcanvasHost from '../src/ui/components/OffcanvasHost';

jest.mock('@react-spring/web', () => ({
  useSpring: (config) => (typeof config === 'function' ? config() : config),
  animated: {
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
    div: ({ children, style, ...props }) => (
      <div style={style} {...props}>
        {children}
      </div>
    ),
  },
}));

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

const createStore = (preloadedDesign = {}) =>
  configureStore({
    reducer: { content: contentReducer, cart: cartReducer, design: designReducer, ui: uiReducer },
    preloadedState: {
      content: {
        status: CONTENT_STATUS.SUCCEEDED,
        httpStatus: null,
        error: null,
        retryable: false,
        pages: {},
        products: {
          businessCards: {
            name: 'Business Cards',
            description: 'Custom business cards.',
          },
        },
        seo: {},
        social: {},
        pricing: { businessCards: 0 },
      },
      design: {
        isOpen: false,
        panel: null,
        productId: null,
        mode: null,
        ...preloadedDesign,
      },
      ui: {
        httpStatus: null,
        errorMessage: null,
        code: null,
        retryable: false,
      },
    },
  });

const renderHost = (store) =>
  render(
    <Provider store={store}>
      <OffcanvasHost />
    </Provider>
  );

describe('OffcanvasHost', () => {
  it('opens designer panel with product title and workspace', () => {
    const store = createStore({
      isOpen: true,
      panel: 'designer',
      productId: 'businessCards',
      mode: DESIGNER_MODE.ADD,
    });

    renderHost(store);

    expect(screen.getByRole('dialog', { name: /business cards designer/i })).toBeInTheDocument();
    expect(screen.getByText(/add to order/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/front of card/i)).toBeInTheDocument();
  });

  it('opens cart panel when cart state is active', () => {
    const store = createStore({
      isOpen: true,
      panel: 'cart',
      productId: null,
      mode: null,
    });

    renderHost(store);

    expect(screen.getByRole('dialog', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('closes panel when close button is clicked', async () => {
    const user = userEvent.setup();
    const store = createStore();
    store.dispatch(openDesigner({ productId: 'businessCards', mode: DESIGNER_MODE.ADD }));

    renderHost(store);
    await user.click(screen.getAllByRole('button', { name: /close panel/i })[1]);

    expect(store.getState().design.isOpen).toBe(false);
  });

  it('switches from cart to designer when designer is opened', () => {
    const store = createStore();
    store.dispatch(openCart());
    store.dispatch(openDesigner({ productId: 'businessCards', mode: DESIGNER_MODE.EDIT }));

    renderHost(store);

    expect(screen.getByRole('dialog', { name: /business cards designer/i })).toBeInTheDocument();
    expect(screen.getByText(/edit design/i)).toBeInTheDocument();
  });
});