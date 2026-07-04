/**
 * checkout.constants.js — Redux slice name and checkout flow states.
 */

export const CHECKOUT_SLICE_NAME = 'checkout';

export const PAYMENT_STATUS = {
  IDLE: 'idle',
  INTENT_LOADING: 'intent_loading',
  INTENT_READY: 'intent_ready',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};