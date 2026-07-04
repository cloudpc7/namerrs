/**
 * checkout.slice.test.js — Checkout and payment intent async state tests.
 */

import { configureStore } from '@reduxjs/toolkit';
import checkoutReducer, {
  createPaymentIntent,
  placeOrder,
  setCheckoutCustomer,
  selectCheckoutClientSecret,
  selectCheckoutCustomer,
  selectCheckoutError,
  selectCheckoutPaymentStatus,
} from '../src/redux/slices/checkout.slice';
import { PAYMENT_STATUS } from '../src/redux/constants/checkout.constants';

jest.mock('../src/utils/apiClient', () => ({
  apiPost: jest.fn(),
}));

jest.mock('../src/utils/sessionId', () => ({
  getSessionId: () => 'test-session',
}));

import { apiPost } from '../src/utils/apiClient';

const createTestStore = () =>
  configureStore({
    reducer: { checkout: checkoutReducer },
  });

describe('checkout slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setCheckoutCustomer merges customer fields', () => {
    const store = createTestStore();
    store.dispatch(setCheckoutCustomer({ name: 'Jane Doe', email: 'jane@example.com' }));

    expect(selectCheckoutCustomer(store.getState())).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '',
      notes: '',
      smsOptIn: false,
    });
  });

  it('createPaymentIntent.fulfilled stores client secret', async () => {
    apiPost.mockResolvedValue({ clientSecret: 'pi_test_secret' });
    const store = createTestStore();

    await store.dispatch(createPaymentIntent({ amount: 25 }));

    expect(selectCheckoutPaymentStatus(store.getState())).toBe(PAYMENT_STATUS.INTENT_READY);
    expect(selectCheckoutClientSecret(store.getState())).toBe('pi_test_secret');
  });

  it('createPaymentIntent.rejected stores friendly error', async () => {
    apiPost.mockRejectedValue({
      message: 'Payment service unavailable',
      status: 503,
      retryable: true,
    });
    const store = createTestStore();

    await store.dispatch(createPaymentIntent({ amount: 25 }));

    expect(selectCheckoutPaymentStatus(store.getState())).toBe(PAYMENT_STATUS.FAILED);
    expect(selectCheckoutError(store.getState())).toBeTruthy();
  });

  it('placeOrder.fulfilled marks payment succeeded', async () => {
    apiPost.mockResolvedValue({ order: { id: 'order_1', total: 0 } });
    const store = createTestStore();

    await store.dispatch(
      placeOrder({
        customer: { name: 'Jane', email: 'jane@example.com', phone: '9515550100' },
        items: [],
        total: 0,
      })
    );

    expect(selectCheckoutPaymentStatus(store.getState())).toBe(PAYMENT_STATUS.SUCCEEDED);
    expect(selectCheckoutClientSecret(store.getState())).toBe('');
  });
});