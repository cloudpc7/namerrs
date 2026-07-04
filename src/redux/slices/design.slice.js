/**
 * design.slice.js — Offcanvas panel state and multi-step designer wizard state.
 */

import { createSlice } from '@reduxjs/toolkit';
import {
  DESIGN_SLICE_NAME,
  PANEL_TYPE,
  DESIGNER_MODE,
  WIZARD_STEP,
} from '../constants/design.constants';

const initialWizardState = {
  step: WIZARD_STEP.DESIGN,
  design: {},
  quantity: 1,
  sizeQuantities: {},
  completionDate: '',
  designErrors: [],
  quantityError: '',
  scheduleError: '',
};

const initialState = {
  isOpen: false,
  panel: null,
  productId: null,
  mode: null,
  wizard: initialWizardState,
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
      state.wizard = {
        ...initialWizardState,
        quantity: action.payload.minQuantity || 1,
      };
    },
    openCart: (state) => {
      state.isOpen = true;
      state.panel = PANEL_TYPE.CART;
      state.productId = null;
      state.mode = null;
    },
    closePanel: () => initialState,
    setWizardStep: (state, action) => {
      state.wizard.step = action.payload;
    },
    updateWizardDesign: (state, action) => {
      state.wizard.design = { ...state.wizard.design, ...action.payload };
      state.wizard.designErrors = [];
    },
    setWizardQuantity: (state, action) => {
      state.wizard.quantity = action.payload;
      state.wizard.quantityError = '';
    },
    setWizardSizeQuantities: (state, action) => {
      state.wizard.sizeQuantities = action.payload;
      state.wizard.quantityError = '';
    },
    setWizardCompletionDate: (state, action) => {
      state.wizard.completionDate = action.payload;
      state.wizard.scheduleError = '';
    },
    setWizardDesignErrors: (state, action) => {
      state.wizard.designErrors = action.payload;
    },
    setWizardQuantityError: (state, action) => {
      state.wizard.quantityError = action.payload;
    },
    setWizardScheduleError: (state, action) => {
      state.wizard.scheduleError = action.payload;
    },
    resetWizard: (state) => {
      state.wizard = {
        ...initialWizardState,
        quantity: state.wizard.quantity,
      };
    },
  },
});

export const {
  openDesigner,
  openCart,
  closePanel,
  setWizardStep,
  updateWizardDesign,
  setWizardQuantity,
  setWizardSizeQuantities,
  setWizardCompletionDate,
  setWizardDesignErrors,
  setWizardQuantityError,
  setWizardScheduleError,
  resetWizard,
} = designSlice.actions;

export const selectPanelState = (state) => state.design;
export const selectIsPanelOpen = (state) => state.design.isOpen;
export const selectPanelType = (state) => state.design.panel;
export const selectDesignerProductId = (state) => state.design.productId;
export const selectDesignerMode = (state) => state.design.mode;
export const selectWizardState = (state) => state.design.wizard;

export default designSlice.reducer;