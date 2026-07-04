/**
 * Header.test.jsx — Header renders navigation and cart affordance.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../src/redux/slices/content.slice';
import cartReducer from '../src/redux/slices/cart.slice';
import designReducer from '../src/redux/slices/design.slice';
import uiReducer from '../src/redux/slices/ui.slice';
import Header from '../src/ui/components/Header';

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
  },
}));

const mockDesktopViewport = () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === '(min-width: 1024px)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

const renderHeader = () => {
  const store = configureStore({
    reducer: { content: contentReducer, cart: cartReducer, design: designReducer, ui: uiReducer },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
};

describe('Header', () => {
  beforeEach(() => {
    mockDesktopViewport();
  });

  it('renders primary navigation links', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders cart button with accessible label', () => {
    renderHeader();

    expect(screen.getByRole('button', { name: /open cart/i })).toBeInTheDocument();
  });

  it('renders primary create a design CTA', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /create a design/i })).toBeInTheDocument();
  });
});