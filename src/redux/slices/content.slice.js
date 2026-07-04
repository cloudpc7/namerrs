/**
 * content.slice.js — Backend-driven site content state (pages, products, SEO, social, pricing).
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../../utils/apiClient';
import { CONTENT_SLICE_NAME, CONTENT_STATUS } from '../constants/content.constants';

export const fetchContent = createAsyncThunk(
  `${CONTENT_SLICE_NAME}/fetchContent`,
  async (_, { rejectWithValue }) => {
    try {
      return await apiGet('/content');
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
        code: error.code,
        retryable: error.retryable,
      });
    }
  }
);

const initialState = {
  status: CONTENT_STATUS.IDLE,
  httpStatus: null,
  error: null,
  retryable: false,
  pages: {},
  products: {},
  seo: {},
  social: {},
  pricing: {},
};

const contentSlice = createSlice({
  name: CONTENT_SLICE_NAME,
  initialState,
  reducers: {
    resetContent: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = CONTENT_STATUS.LOADING;
        state.error = null;
        state.httpStatus = null;
        state.retryable = false;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const { content = {}, pricing = {} } = action.payload;

        state.status = CONTENT_STATUS.SUCCEEDED;
        state.error = null;
        state.httpStatus = null;
        state.retryable = false;
        state.pages = content.pages || {};
        state.products = content.products || {};
        state.seo = content.seo || {};
        state.social = content.social || {};
        state.pricing = pricing;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = CONTENT_STATUS.FAILED;
        state.error = action.payload?.message || 'Failed to load content.';
        state.httpStatus = action.payload?.status || null;
        state.retryable = Boolean(action.payload?.retryable);
      });
  },
});

export const { resetContent } = contentSlice.actions;

export const selectContentStatus = (state) => state.content.status;
export const selectContentError = (state) => state.content.error;
export const selectPageContent = (state, slug) => state.content.pages[slug] || null;
export const selectProductContent = (state, productId) =>
  state.content.products[productId] || null;
export const selectAllProducts = (state) => state.content.products;
export const selectSeoContent = (state, routeKey) => state.content.seo[routeKey] || null;
export const selectSocialLinks = (state) => state.content.social;
export const selectPricing = (state) => state.content.pricing;

export default contentSlice.reducer;