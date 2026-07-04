/**
 * checkout.slice.js — Checkout form, Stripe payment intent, and order placement state.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPost } from '../../utils/apiClient';
import { toRejectValue } from '../../utils/apiThunk';
import { getSessionId } from '../../utils/sessionId';
import { mapStripeError } from '../../utils/stripeErrors';
import { PAYMENT_STATUS, CHECKOUT_SLICE_NAME } from '../constants/checkout.constants';

export const createPaymentIntent = createAsyncThunk(
  `${CHECKOUT_SLICE_NAME}/createPaymentIntent`,
  async ({ amount, currency = 'usd' }, { rejectWithValue }) => {
    try {
      const response = await apiPost('/create-payment-intent', {
        amount,
        currency,
        sessionId: getSessionId(),
      });
      return response.clientSecret;
    } catch (error) {
      return rejectWithValue({
        ...toRejectValue(error),
        friendlyMessage: mapStripeError(error),
      });
    }
  }
);

export const placeOrder = createAsyncThunk(
  `${CHECKOUT_SLICE_NAME}/placeOrder`,
  async ({ customer, items, total, paymentIntentId }, { rejectWithValue }) => {
    try {
      const response = await apiPost('/orders', {
        customer,
        items,
        total,
        paymentIntentId,
        sessionId: getSessionId(),
      });
      return response.order;
    } catch (error) {
      return rejectWithValue({
        ...toRejectValue(error),
        friendlyMessage: mapStripeError(error),
      });
    }
  }
);

const initialCustomer = {
  name: '',
  email: '',
  phone: '',
  notes: '',
  smsOptIn: false,
};

const initialState = {
  customer: initialCustomer,
  clientSecret: '',
  paymentStatus: PAYMENT_STATUS.IDLE,
  error: null,
  httpStatus: null,
  retryable: false,
};

const checkoutSlice = createSlice({
  name: CHECKOUT_SLICE_NAME,
  initialState,
  reducers: {
    setCheckoutCustomer: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
    },
    resetCheckoutFlow: () => initialState,
    clearCheckoutError: (state) => {
      state.error = null;
      state.httpStatus = null;
      state.retryable = false;
    },
    setCheckoutError: (state, action) => {
      state.error = action.payload;
      state.paymentStatus = PAYMENT_STATUS.FAILED;
    },
    setPaymentProcessing: (state) => {
      state.paymentStatus = PAYMENT_STATUS.PROCESSING;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.paymentStatus = PAYMENT_STATUS.INTENT_LOADING;
        state.error = null;
        state.clientSecret = '';
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.paymentStatus = PAYMENT_STATUS.INTENT_READY;
        state.clientSecret = action.payload;
        state.error = null;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.paymentStatus = PAYMENT_STATUS.FAILED;
        state.error =
          action.payload?.friendlyMessage ||
          action.payload?.message ||
          'Payment service unavailable. Try again in a moment.';
        state.httpStatus = action.payload?.status || null;
        state.retryable = Boolean(action.payload?.retryable);
      })
      .addCase(placeOrder.pending, (state) => {
        state.paymentStatus = PAYMENT_STATUS.PROCESSING;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.paymentStatus = PAYMENT_STATUS.SUCCEEDED;
        state.error = null;
        state.clientSecret = '';
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.paymentStatus = PAYMENT_STATUS.FAILED;
        state.error =
          action.payload?.friendlyMessage ||
          action.payload?.message ||
          'Order could not be created.';
        state.httpStatus = action.payload?.status || null;
        state.retryable = Boolean(action.payload?.retryable);
      });
  },
});

export const {
  setCheckoutCustomer,
  resetCheckoutFlow,
  clearCheckoutError,
  setCheckoutError,
  setPaymentProcessing,
} = checkoutSlice.actions;

export const selectCheckoutCustomer = (state) => state.checkout.customer;
export const selectCheckoutClientSecret = (state) => state.checkout.clientSecret;
export const selectCheckoutPaymentStatus = (state) => state.checkout.paymentStatus;
export const selectCheckoutError = (state) => state.checkout.error;
export const selectCheckoutHttpError = (state) => ({
  httpStatus: state.checkout.httpStatus,
  errorMessage: state.checkout.error,
  retryable: state.checkout.retryable,
});

export default checkoutSlice.reducer;