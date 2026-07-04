/**
 * store.js — Redux store configuration for Namerrs app state.
 */

import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/content.slice';
import cartReducer from './slices/cart.slice';
import designReducer from './slices/design.slice';
import uiReducer from './slices/ui.slice';
import reviewsReducer from './slices/reviews.slice';
import contactReducer from './slices/contact.slice';
import checkoutReducer from './slices/checkout.slice';
import productDetailReducer from './slices/productDetail.slice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    cart: cartReducer,
    design: designReducer,
    ui: uiReducer,
    reviews: reviewsReducer,
    contact: contactReducer,
    checkout: checkoutReducer,
    productDetail: productDetailReducer,
  },
});

export default store;