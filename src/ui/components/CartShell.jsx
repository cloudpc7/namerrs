/**
 * CartShell.jsx — Cart list, item management, and checkout entry.
 */

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeCartItem,
  resetCheckout,
  selectCartItems,
  selectCartTotal,
  selectCheckoutStep,
  selectLastOrder,
  setCheckoutStep,
} from '../../redux/slices/cart.slice';
import { closePanel } from '../../redux/slices/design.slice';
import { CHECKOUT_STEP } from '../../redux/constants/cart.constants';
import { formatDateLabel } from '../../utils/businessDays';
import { formatPrice } from '../../utils/formatPrice';
import {
  Button,
  Card,
  EmptyState,
  PriceDisplay,
  Stack,
} from './primitives';
import CheckoutPanel from './CheckoutPanel';

const CartShell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const checkoutStep = useSelector(selectCheckoutStep);
  const lastOrder = useSelector(selectLastOrder);

  if (checkoutStep === CHECKOUT_STEP.CONFIRMATION && lastOrder) {
    return (
      <Card padding="md" aria-label="Order confirmation">
        <Stack gap="md">
          <h3 className="panel-header__title">Order confirmed!</h3>
          <p className="form-hint" style={{ fontSize: '0.875rem' }}>
            Thank you, {lastOrder.customer?.name}. Your order #{lastOrder.id} has been received.
          </p>
          <p className="form-hint" style={{ fontSize: '0.875rem' }}>
            Total: {formatPrice(lastOrder.total)} — we&apos;ll send confirmation to{' '}
            {lastOrder.customer?.email}.
          </p>
          <Button
            onClick={() => {
              dispatch(resetCheckout());
              dispatch(closePanel());
              navigate('/');
            }}
          >
            Return to home
          </Button>
        </Stack>
      </Card>
    );
  }

  if (checkoutStep === CHECKOUT_STEP.CHECKOUT) {
    return (
      <CheckoutPanel onBack={() => dispatch(setCheckoutStep(CHECKOUT_STEP.CART))} />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Expand a product on the home page, design your order, and add it here."
        aria-label="Shopping cart"
      >
        <Button href="/#products" className="mt-6" onClick={() => dispatch(closePanel())}>
          Browse products
        </Button>
      </EmptyState>
    );
  }

  return (
    <Stack gap="md" aria-label="Shopping cart">
      <ul className="stack stack--sm" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.id}>
            <Card padding="md">
              <div className="cart-item">
                <div>
                  <p className="cart-item__name">{item.productName}</p>
                  <p className="cart-item__meta">
                    Qty {item.quantity} · {formatPrice(item.lineTotal)}
                  </p>
                  {item.completionDate && (
                    <p className="cart-item__date">Due {formatDateLabel(item.completionDate)}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeCartItem(item.id))}
                  aria-label={`Remove ${item.productName}`}
                  className="cart-item__remove"
                >
                  Remove
                </button>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <Card padding="md">
        <PriceDisplay amount={total} size="lg" showHelper />
        <Button
          className="mt-4 w-full"
          onClick={() => dispatch(setCheckoutStep(CHECKOUT_STEP.CHECKOUT))}
        >
          Proceed to checkout
        </Button>
      </Card>
    </Stack>
  );
};

export default CartShell;