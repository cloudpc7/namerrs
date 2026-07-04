/**
 * ui.slice.js — Global UI state for HTTP errors and retryable banners.
 */

import { createSlice } from '@reduxjs/toolkit';
import { UI_SLICE_NAME } from '../constants/ui.constants';

const initialState = {
  httpStatus: null,
  errorMessage: null,
  code: null,
  retryable: false,
  productSearch: '',
};

const uiSlice = createSlice({
  name: UI_SLICE_NAME,
  initialState,
  reducers: {
    setHttpError: (state, action) => {
      state.httpStatus = action.payload.httpStatus;
      state.errorMessage = action.payload.errorMessage;
      state.code = action.payload.code || null;
      state.retryable = Boolean(action.payload.retryable);
    },
    clearHttpError: (state) => {
      state.httpStatus = null;
      state.errorMessage = null;
      state.code = null;
      state.retryable = false;
    },
    setProductSearch: (state, action) => {
      state.productSearch = action.payload;
    },
    clearProductSearch: (state) => {
      state.productSearch = '';
    },
  },
});

export const { setHttpError, clearHttpError, setProductSearch, clearProductSearch } =
  uiSlice.actions;

export const selectHttpError = (state) => state.ui;
export const selectProductSearch = (state) => state.ui.productSearch;

export default uiSlice.reducer;