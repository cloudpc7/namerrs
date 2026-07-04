/**
 * cart.slice.js — Shopping cart, checkout flow, and order confirmation state.
 */

import { createSlice } from '@reduxjs/toolkit';
import { CART_SLICE_NAME, CHECKOUT_STEP } from '../constants/cart.constants';

const initialState = {
  items: [],
  checkoutStep: CHECKOUT_STEP.CART,
  lastOrder: null,
};

const createCartItemId = () => `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const cartSlice = createSlice({
  name: CART_SLICE_NAME,
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.items.push({
        id: createCartItemId(),
        createdAt: Date.now(),
        ...action.payload,
      });
      state.checkoutStep = CHECKOUT_STEP.CART;
    },
    updateCartItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.checkoutStep = CHECKOUT_STEP.CART;
    },
    setCheckoutStep: (state, action) => {
      state.checkoutStep = action.payload;
    },
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
      state.checkoutStep = CHECKOUT_STEP.CONFIRMATION;
      state.items = [];
    },
    resetCheckout: (state) => {
      state.checkoutStep = CHECKOUT_STEP.CART;
      state.lastOrder = null;
    },
  },
});

export const {
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  setCheckoutStep,
  setLastOrder,
  resetCheckout,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;
export const selectCheckoutStep = (state) => state.cart.checkoutStep;
export const selectLastOrder = (state) => state.cart.lastOrder;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + (Number(item.lineTotal) || 0), 0);

export default cartSlice.reducer;