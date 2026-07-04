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
import { formatPrice } from '../../utils/formatPrice';
import { formatDateLabel } from '../../utils/businessDays';
import { PRICING_HELPER_TEXT } from '../../constants/business.constants';
import CheckoutPanel from './CheckoutPanel';
import Button from './primitives/Button';

const CartShell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const checkoutStep = useSelector(selectCheckoutStep);
  const lastOrder = useSelector(selectLastOrder);

  if (checkoutStep === CHECKOUT_STEP.CONFIRMATION && lastOrder) {
    return (
      <div className="space-y-5 rounded-2xl bg-[var(--color-surface)] p-5 ring-1 ring-[var(--color-border)]" aria-label="Order confirmation">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">Order confirmed!</p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Thank you, {lastOrder.customer?.name}. Your order #{lastOrder.id} has been received.
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
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
      </div>
    );
  }

  if (checkoutStep === CHECKOUT_STEP.CHECKOUT) {
    return (
      <CheckoutPanel onBack={() => dispatch(setCheckoutStep(CHECKOUT_STEP.CART))} />
    );
  }

  if (items.length === 0) {
    return (
      <div
        className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center"
        aria-label="Shopping cart"
      >
        <p className="text-base font-semibold text-[var(--color-text-primary)]">Your cart is empty</p>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Expand a product on the home page, design your order, and add it here.
        </p>
        <Button
          href="/#products"
          className="mt-6"
          onClick={() => dispatch(closePanel())}
        >
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5" aria-label="Shopping cart">
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl bg-white p-4 ring-1 ring-[var(--color-border)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[var(--color-text-primary)]">{item.productName}</p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Qty {item.quantity} · {formatPrice(item.lineTotal)}
                </p>
                {item.completionDate && (
                  <p className="mt-1 text-xs text-[var(--color-text-disabled)]">
                    Due {formatDateLabel(item.completionDate)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dispatch(removeCartItem(item.id))}
                aria-label={`Remove ${item.productName}`}
                className="text-sm font-medium text-[var(--color-error)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-xl bg-[var(--color-surface)] p-4 ring-1 ring-[var(--color-border)]">
        <p className="text-base font-semibold text-[var(--color-text-primary)]">
          Total: <span className="text-[var(--color-text-disabled)]">{formatPrice(total)}</span>
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-disabled)]">{PRICING_HELPER_TEXT}</p>
        <Button
          className="mt-4 w-full"
          onClick={() => dispatch(setCheckoutStep(CHECKOUT_STEP.CHECKOUT))}
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default CartShell;