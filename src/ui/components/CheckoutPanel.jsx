/**
 * CheckoutPanel.jsx — Checkout form with Stripe Payment Element via Redux checkout slice.
 */

import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ShieldCheck } from 'lucide-react';
import { mapStripeError } from '../../utils/stripeErrors';
import { STRIPE_PUBLISHABLE_KEY } from '../../config/stripe';
import { formatPrice } from '../../utils/formatPrice';
import {
  selectCartItems,
  selectCartTotal,
  setLastOrder,
} from '../../redux/slices/cart.slice';
import {
  clearCheckoutError,
  createPaymentIntent,
  placeOrder,
  resetCheckoutFlow,
  selectCheckoutClientSecret,
  selectCheckoutCustomer,
  selectCheckoutError,
  selectCheckoutPaymentStatus,
  setCheckoutCustomer,
  setCheckoutError,
} from '../../redux/slices/checkout.slice';
import { setHttpError } from '../../redux/slices/ui.slice';
import { PAYMENT_STATUS } from '../../redux/constants/checkout.constants';
import {
  Alert,
  Badge,
  Button,
  Card,
  PriceDisplay,
  Stack,
  Surface,
  TextField,
} from './primitives';

const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

const PaymentForm = ({ customer, items, total, onSuccess }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const paymentStatus = useSelector(selectCheckoutPaymentStatus);
  const isProcessing = paymentStatus === PAYMENT_STATUS.PROCESSING;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    dispatch(clearCheckoutError());

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      dispatch(setCheckoutError(mapStripeError(error)));
      return;
    }

    const result = await dispatch(
      placeOrder({
        customer,
        items,
        total,
        paymentIntentId: paymentIntent?.id,
      })
    );

    if (placeOrder.fulfilled.match(result)) {
      onSuccess(result.payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stack">
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
  const customer = useSelector(selectCheckoutCustomer);
  const clientSecret = useSelector(selectCheckoutClientSecret);
  const error = useSelector(selectCheckoutError);
  const paymentStatus = useSelector(selectCheckoutPaymentStatus);

  const isIntentLoading = paymentStatus === PAYMENT_STATUS.INTENT_LOADING;

  const handleOrderSuccess = (order) => {
    dispatch(setLastOrder(order));
    dispatch(resetCheckoutFlow());
  };

  const handleCustomerSubmit = async (event) => {
    event.preventDefault();

    if (total <= 0) {
      const result = await dispatch(
        placeOrder({
          customer,
          items,
          total,
        })
      );

      if (placeOrder.fulfilled.match(result)) {
        handleOrderSuccess(result.payload);
      }
      return;
    }

    const result = await dispatch(createPaymentIntent({ amount: total }));

    if (createPaymentIntent.rejected.match(result)) {
      dispatch(
        setHttpError({
          httpStatus: result.payload?.status || null,
          errorMessage: result.payload?.friendlyMessage || result.payload?.message,
          code: result.payload?.code || 'PAYMENT_ERROR',
          retryable: Boolean(result.payload?.retryable),
        })
      );
    }
  };

  const handleCustomerChange = (field) => (event) => {
    dispatch(setCheckoutCustomer({ [field]: event.target.value }));
  };

  if (!stripePromise && total > 0) {
    return <Alert variant="info">Stripe is not configured. Add VITE_STRIPE_PUBLISHABLE_KEY to your environment.</Alert>;
  }

  return (
    <Stack gap="md">
      <button type="button" onClick={() => { dispatch(resetCheckoutFlow()); onBack(); }} className="link-back">
        ← Back to cart
      </button>

      <Surface padding="md">
        <p className="form-label">Order summary</p>
        <ul className="checkout-summary">
          {items.map((item) => (
            <li key={item.id} className="checkout-summary__row">
              <span>{item.productName}</span>
              <span>{formatPrice(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-summary__total">
          <PriceDisplay amount={total} size="lg" showHelper />
        </div>
      </Surface>

      {!clientSecret ? (
        <form onSubmit={handleCustomerSubmit} className="stack">
          <h3 className="form-label" style={{ fontSize: '1rem' }}>Contact information</h3>
          <TextField
            id="checkout-name"
            label="Name"
            required
            value={customer.name}
            onChange={handleCustomerChange('name')}
          />
          <TextField
            id="checkout-email"
            label="Email"
            type="email"
            required
            value={customer.email}
            onChange={handleCustomerChange('email')}
          />
          <TextField
            id="checkout-phone"
            label="Phone"
            type="tel"
            required
            value={customer.phone}
            onChange={handleCustomerChange('phone')}
          />
          <TextField
            id="checkout-notes"
            label="Pickup / delivery notes (optional)"
            as="textarea"
            rows={2}
            value={customer.notes}
            onChange={handleCustomerChange('notes')}
          />
          {error && <Alert variant="error">{error}</Alert>}
          <Button type="submit" disabled={isIntentLoading} className="w-full">
            {isIntentLoading
              ? 'Processing…'
              : total <= 0
                ? 'Place order'
                : 'Continue to payment'}
          </Button>
        </form>
      ) : (
        <Stack gap="md">
          <Badge>
            <ShieldCheck size={14} aria-hidden="true" />
            Secure checkout powered by Stripe
          </Badge>
          {error && <Alert variant="error">{error}</Alert>}
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              customer={customer}
              items={items}
              total={total}
              onSuccess={handleOrderSuccess}
            />
          </Elements>
        </Stack>
      )}
    </Stack>
  );
};

export default CheckoutPanel;