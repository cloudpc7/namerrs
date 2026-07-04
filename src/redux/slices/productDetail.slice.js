/**
 * productDetail.slice.js — Product detail modal state and RTDB option selections.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildDefaultOptionValues } from '../../utils/productOptions';
import {
  PRODUCT_DETAIL_SLICE_NAME,
  PRODUCT_DETAIL_STATUS,
} from '../constants/productDetail.constants';
import { fetchProductById } from './content.slice';

export const ensureProductDetail = createAsyncThunk(
  `${PRODUCT_DETAIL_SLICE_NAME}/ensureProductDetail`,
  async (productId, { dispatch, getState, rejectWithValue }) => {
    const cached = getState().content.products[productId];

    if (cached?.options?.length) {
      return { productId, product: cached };
    }

    try {
      const result = await dispatch(fetchProductById(productId)).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isOpen: false,
  productId: null,
  status: PRODUCT_DETAIL_STATUS.IDLE,
  error: null,
  selectedOptions: {},
};

const productDetailSlice = createSlice({
  name: PRODUCT_DETAIL_SLICE_NAME,
  initialState,
  reducers: {
    openProductDetail: (state, action) => {
      const { productId, product } = action.payload;
      state.isOpen = true;
      state.productId = productId;
      state.status = PRODUCT_DETAIL_STATUS.SUCCEEDED;
      state.error = null;
      state.selectedOptions = buildDefaultOptionValues(product);
    },
    closeProductDetail: () => initialState,
    setProductOption: (state, action) => {
      const { optionId, value } = action.payload;
      state.selectedOptions[optionId] = value;
    },
    resetProductOptions: (state, action) => {
      state.selectedOptions = buildDefaultOptionValues(action.payload.product);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ensureProductDetail.pending, (state) => {
        state.status = PRODUCT_DETAIL_STATUS.LOADING;
        state.error = null;
      })
      .addCase(ensureProductDetail.fulfilled, (state, action) => {
        const { product } = action.payload;
        state.status = PRODUCT_DETAIL_STATUS.SUCCEEDED;
        state.error = null;

        if (!Object.keys(state.selectedOptions).length) {
          state.selectedOptions = buildDefaultOptionValues(product);
        }
      })
      .addCase(ensureProductDetail.rejected, (state, action) => {
        state.status = PRODUCT_DETAIL_STATUS.FAILED;
        state.error = action.payload?.message || 'Failed to load product details.';
      });
  },
});

export const {
  openProductDetail,
  closeProductDetail,
  setProductOption,
  resetProductOptions,
} = productDetailSlice.actions;

export const selectIsProductDetailOpen = (state) => state.productDetail.isOpen;
export const selectProductDetailId = (state) => state.productDetail.productId;
export const selectProductDetailStatus = (state) => state.productDetail.status;
export const selectProductDetailError = (state) => state.productDetail.error;
export const selectProductDetailOptions = (state) => state.productDetail.selectedOptions;

export default productDetailSlice.reducer;