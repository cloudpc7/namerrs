/**
 * store.js — Redux store configuration for Namerrs app state.
 */

import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/content.slice';
import cartReducer from './slices/cart.slice';
import designReducer from './slices/design.slice';
import uiReducer from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    cart: cartReducer,
    design: designReducer,
    ui: uiReducer,
  },
});

export default store;