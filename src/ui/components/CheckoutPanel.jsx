/**
 * CheckoutPanel.jsx — Checkout form with Stripe Payment Element.
 */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ShieldCheck } from 'lucide-react';
import { apiPost } from '../../utils/apiClient';
import { STRIPE_PUBLISHABLE_KEY } from '../../config/stripe';
import { mapStripeError } from '../../utils/stripeErrors';
import { getSessionId } from '../../utils/sessionId';
import { formatPrice } from '../../utils/formatPrice';
import {
  selectCartItems,
  selectCartTotal,
  setLastOrder,
} from '../../redux/slices/cart.slice';
import { setHttpError } from '../../redux/slices/ui.slice';
import { PRICING_HELPER_TEXT } from '../../constants/business.constants';
import TextField from './primitives/TextField';
import Button from './primitives/Button';

const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

const PaymentForm = ({ clientSecret, customer, items, total, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    onError('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      onError(mapStripeError(error));
      setIsProcessing(false);
      return;
    }

    try {
      const orderResponse = await apiPost('/orders', {
        customer,
        items,
        total,
        paymentIntentId: paymentIntent?.id,
        sessionId: getSessionId(),
      });
      onSuccess(orderResponse.order);
    } catch (orderError) {
      onError(orderError.message || 'Order could not be created.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isProcessing} className="w-full">
        {isProcessing ? 'Processing…' : `Pay ${formatPrice(total)}`}
      </Button>
    </form>
  );
};

const CheckoutPanel = ({ onBack }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', notes: '' });
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [loadingIntent, setLoadingIntent] = useState(false);

  const handleOrderSuccess = (order) => {
    dispatch(setLastOrder(order));
  };

  const handleCustomerSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoadingIntent(true);

    try {
      if (total <= 0) {
        const orderResponse = await apiPost('/orders', {
          customer,
          items,
          total,
          sessionId: getSessionId(),
        });
        handleOrderSuccess(orderResponse.order);
        return;
      }

      const response = await apiPost('/create-payment-intent', {
        amount: total,
        currency: 'usd',
        sessionId: getSessionId(),
      });
      setClientSecret(response.clientSecret);
    } catch (intentError) {
      const message = mapStripeError(intentError);
      setError(message);
      dispatch(
        setHttpError({
          httpStatus: intentError.status || null,
          errorMessage: message,
          code: intentError.code || 'PAYMENT_ERROR',
          retryable: Boolean(intentError.retryable),
        })
      );
    } finally {
      setLoadingIntent(false);
    }
  };

  if (!stripePromise && total > 0) {
    return (
      <div className="rounded-xl bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border)]">
        Stripe is not configured. Add VITE_STRIPE_PUBLISHABLE_KEY to your environment.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-[var(--color-accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] rounded"
      >
        ← Back to cart
      </button>

      <div className="rounded-xl bg-[var(--color-surface)] p-4 ring-1 ring-[var(--color-border)]">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">Order summary</p>
        <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>{item.productName}</span>
              <span>{formatPrice(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-[var(--color-border)] pt-3 text-base font-semibold text-[var(--color-text-primary)]">
          Total: <span className="text-[var(--color-text-disabled)]">{formatPrice(total)}</span>
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-disabled)]">{PRICING_HELPER_TEXT}</p>
      </div>

      {!clientSecret ? (
        <form onSubmit={handleCustomerSubmit} className="space-y-4">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Contact information</h3>
          <TextField
            id="checkout-name"
            label="Name"
            required
            value={customer.name}
            onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
          />
          <TextField
            id="checkout-email"
            label="Email"
            type="email"
            required
            value={customer.email}
            onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
          />
          <TextField
            id="checkout-phone"
            label="Phone"
            type="tel"
            required
            value={customer.phone}
            onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
          />
          <TextField
            id="checkout-notes"
            label="Pickup / delivery notes (optional)"
            as="textarea"
            rows={2}
            value={customer.notes}
            onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
          />
          {error && (
            <p className="text-sm text-[var(--color-error)]" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" disabled={loadingIntent} className="w-full">
            {loadingIntent
              ? 'Processing…'
              : total <= 0
                ? 'Place order'
                : 'Continue to payment'}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border)]">
            <ShieldCheck size={14} className="text-[var(--color-accent)]" aria-hidden="true" />
            Secure checkout powered by Stripe
          </div>
          {error && (
            <p className="text-sm text-[var(--color-error)]" role="alert">
              {error}
            </p>
          )}
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              clientSecret={clientSecret}
              customer={customer}
              items={items}
              total={total}
              onSuccess={handleOrderSuccess}
              onError={setError}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default CheckoutPanel;