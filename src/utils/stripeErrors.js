/**
 * stripeErrors.js — Map Stripe/API payment errors to friendly messages.
 */

const STRIPE_MESSAGES = {
  card_declined: 'Your card was declined. Try a different card or contact your bank.',
  insufficient_funds: 'Insufficient funds. Try a different payment method.',
  expired_card: 'This card has expired.',
  processing_error: "Payment couldn't be processed. Please try again.",
  STRIPE_NOT_CONFIGURED: 'Payment is not configured yet. Please try again later.',
};

export const mapStripeError = (error) => {
  const code = error?.code || error?.decline_code;
  if (code && STRIPE_MESSAGES[code]) {
    return STRIPE_MESSAGES[code];
  }

  if (error?.status === 503 || error?.code === 'STRIPE_NOT_CONFIGURED') {
    return STRIPE_MESSAGES.STRIPE_NOT_CONFIGURED;
  }

  if (error?.retryable) {
    return 'Payment service unavailable. Try again in a moment.';
  }

  return error?.message || "Payment couldn't be processed. Please try again.";
};