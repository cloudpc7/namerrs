/**
 * design.slice.js — Offcanvas panel state for product designers and cart.
 */

import { createSlice } from '@reduxjs/toolkit';
import {
  DESIGN_SLICE_NAME,
  PANEL_TYPE,
  DESIGNER_MODE,
} from '../constants/design.constants';

const initialState = {
  isOpen: false,
  panel: null,
  productId: null,
  mode: null,
};

const designSlice = createSlice({
  name: DESIGN_SLICE_NAME,
  initialState,
  reducers: {
    openDesigner: (state, action) => {
      state.isOpen = true;
      state.panel = PANEL_TYPE.DESIGNER;
      state.productId = action.payload.productId;
      state.mode = action.payload.mode || DESIGNER_MODE.ADD;
    },
    openCart: (state) => {
      state.isOpen = true;
      state.panel = PANEL_TYPE.CART;
      state.productId = null;
      state.mode = null;
    },
    closePanel: () => initialState,
  },
});

export const { openDesigner, openCart, closePanel } = designSlice.actions;

export const selectPanelState = (state) => state.design;
export const selectIsPanelOpen = (state) => state.design.isOpen;
export const selectPanelType = (state) => state.design.panel;
export const selectDesignerProductId = (state) => state.design.productId;
export const selectDesignerMode = (state) => state.design.mode;

export default designSlice.reducer;