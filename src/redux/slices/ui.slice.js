/**
 * ui.slice.js — Global UI state for HTTP errors, search, toasts, and modals.
 */

import { createSlice } from '@reduxjs/toolkit';
import { UI_SLICE_NAME, TOAST_TYPE } from '../constants/ui.constants';

const initialState = {
  httpStatus: null,
  errorMessage: null,
  code: null,
  retryable: false,
  productSearch: '',
  toast: {
    message: null,
    type: TOAST_TYPE.INFO,
    id: null,
  },
  isReviewModalOpen: false,
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
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || TOAST_TYPE.INFO,
        id: Date.now(),
      };
    },
    clearToast: (state) => {
      state.toast = { message: null, type: TOAST_TYPE.INFO, id: null };
    },
    openReviewModal: (state) => {
      state.isReviewModalOpen = true;
    },
    closeReviewModal: (state) => {
      state.isReviewModalOpen = false;
    },
  },
});

export const {
  setHttpError,
  clearHttpError,
  setProductSearch,
  clearProductSearch,
  showToast,
  clearToast,
  openReviewModal,
  closeReviewModal,
} = uiSlice.actions;

export const selectHttpError = (state) => state.ui;
export const selectProductSearch = (state) => state.ui.productSearch;
export const selectToast = (state) => state.ui.toast;
export const selectIsReviewModalOpen = (state) => state.ui.isReviewModalOpen;

export default uiSlice.reducer;