/**
 * HeroSection.test.jsx — Hero section renders Redux-driven copy.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../src/redux/slices/content.slice';
import { CONTENT_STATUS } from '../src/redux/constants/content.constants';
import HeroSection from '../src/ui/components/HeroSection';

const createStore = (contentState) =>
  configureStore({
    reducer: { content: contentReducer },
    preloadedState: { content: contentState },
  });

const renderHero = (contentState) => {
  const store = createStore(contentState);
  return render(
    <Provider store={store}>
      <HeroSection />
    </Provider>
  );
};

describe('HeroSection', () => {
  it('renders hero title and slogan from Redux content', () => {
    renderHero({
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
        },
      },
      products: {},
      seo: {},
      social: {},
      pricing: {},
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Namerrs Signs & Printing'
    );
    expect(screen.getByText('Quality Products. Best Prices Around. Done Fast.')).toBeInTheDocument();
  });

  it('shows loading skeleton when content is loading', () => {
    renderHero({
      status: CONTENT_STATUS.LOADING,
      httpStatus: null,
      error: null,
      retryable: false,
      pages: {},
      products: {},
      seo: {},
      social: {},
      pricing: {},
    });

    expect(screen.getByLabelText(/loading hero content/i)).toBeInTheDocument();
  });
});