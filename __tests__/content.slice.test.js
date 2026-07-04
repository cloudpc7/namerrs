/**
 * content.slice.test.js — Redux content slice async state tests.
 */

import { configureStore } from '@reduxjs/toolkit';
import contentReducer, {
  fetchContent,
  fetchProductById,
  selectContentStatus,
  selectPageContent,
  selectProductContent,
  selectSocialLinks,
  selectPricing,
} from '../src/redux/slices/content.slice';

jest.mock('../src/utils/apiClient', () => ({
  apiGet: jest.fn(),
}));

import { apiGet } from '../src/utils/apiClient';

const mockPayload = {
  content: {
    pages: {
      home: {
        hero: { title: 'Namerrs Signs & Printing', slogan: 'Quality Products.' },
      },
    },
    products: {
      businessCards: { name: 'Business Cards', minQuantity: 500 },
    },
    social: {
      phone: '(951) 350-0270',
      email: 'NameRRs@gmail.com',
    },
    seo: {
      root: { route: '/', title: 'Namerrs' },
    },
  },
  pricing: {
    businessCards: 0,
    tshirts: 0,
  },
};

const createTestStore = () =>
  configureStore({
    reducer: { content: contentReducer },
  });

describe('content slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchContent.pending sets status to loading', async () => {
    apiGet.mockImplementation(() => new Promise(() => {}));
    const store = createTestStore();

    store.dispatch(fetchContent());

    expect(selectContentStatus(store.getState())).toBe('loading');
  });

  it('fetchContent.fulfilled stores pages, products, social, seo, and pricing', async () => {
    apiGet.mockResolvedValue(mockPayload);
    const store = createTestStore();

    await store.dispatch(fetchContent());

    const state = store.getState().content;
    expect(state.status).toBe('succeeded');
    expect(state.error).toBeNull();
    expect(selectPageContent(store.getState(), 'home')).toEqual(mockPayload.content.pages.home);
    expect(selectProductContent(store.getState(), 'businessCards')).toEqual(
      mockPayload.content.products.businessCards
    );
    expect(selectSocialLinks(store.getState())).toEqual(mockPayload.content.social);
    expect(selectPricing(store.getState())).toEqual(mockPayload.pricing);
  });

  it('fetchProductById.fulfilled merges a single product into state', async () => {
    apiGet.mockResolvedValue({
      name: 'Business Cards',
      minQuantity: 500,
      options: [{ id: 'sides', label: 'Sides', type: 'radio', choices: [] }],
    });

    const store = createTestStore();
    await store.dispatch(fetchProductById('businessCards'));

    expect(apiGet).toHaveBeenCalledWith('/content/products/businessCards');
    expect(selectProductContent(store.getState(), 'businessCards')).toMatchObject({
      name: 'Business Cards',
      minQuantity: 500,
    });
  });

  it('fetchContent.rejected stores error details from API client', async () => {
    apiGet.mockRejectedValue({
      message: 'Something went wrong on our end.',
      status: 500,
      code: 'INTERNAL_ERROR',
      retryable: true,
    });

    const store = createTestStore();
    await store.dispatch(fetchContent());

    const state = store.getState().content;
    expect(state.status).toBe('failed');
    expect(state.httpStatus).toBe(500);
    expect(state.error).toBe('Something went wrong on our end.');
    expect(state.retryable).toBe(true);
  });
});