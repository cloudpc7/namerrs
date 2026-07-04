/**
 * cart.slice.test.js — Shopping cart state tests.
 */

import cartReducer, {
  addCartItem,
  removeCartItem,
  setCheckoutStep,
  setLastOrder,
  selectCartCount,
  selectCartTotal,
} from '../src/redux/slices/cart.slice';
import { CHECKOUT_STEP } from '../src/redux/constants/cart.constants';

const initialState = {
  items: [],
  checkoutStep: CHECKOUT_STEP.CART,
  lastOrder: null,
};

describe('cart slice', () => {
  it('addCartItem appends a line item', () => {
    const nextState = cartReducer(
      initialState,
      addCartItem({
        productId: 'businessCards',
        productName: 'Business Cards',
        quantity: 500,
        lineTotal: 0,
      })
    );

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].productName).toBe('Business Cards');
  });

  it('removeCartItem removes by id', () => {
    const withItem = cartReducer(
      initialState,
      addCartItem({ productId: 'tshirts', productName: 'T-Shirts', quantity: 1, lineTotal: 0 })
    );
    const itemId = withItem.items[0].id;
    const nextState = cartReducer(withItem, removeCartItem(itemId));

    expect(nextState.items).toHaveLength(0);
  });

  it('setLastOrder clears cart and moves to confirmation', () => {
    const withItem = cartReducer(
      initialState,
      addCartItem({ productId: 'hats', productName: 'Hats', quantity: 1, lineTotal: 0 })
    );
    const order = { id: 'order_1', total: 0 };
    const nextState = cartReducer(withItem, setLastOrder(order));

    expect(nextState.items).toHaveLength(0);
    expect(nextState.checkoutStep).toBe(CHECKOUT_STEP.CONFIRMATION);
    expect(nextState.lastOrder).toEqual(order);
  });

  it('selectors compute count and total', () => {
    const state = {
      cart: {
        items: [
          { id: '1', lineTotal: 0 },
          { id: '2', lineTotal: 12.5 },
        ],
        checkoutStep: CHECKOUT_STEP.CART,
        lastOrder: null,
      },
    };

    expect(selectCartCount(state)).toBe(2);
    expect(selectCartTotal(state)).toBe(12.5);
  });

  it('setCheckoutStep updates checkout view', () => {
    const nextState = cartReducer(
      initialState,
      setCheckoutStep(CHECKOUT_STEP.CHECKOUT)
    );
    expect(nextState.checkoutStep).toBe(CHECKOUT_STEP.CHECKOUT);
  });
});