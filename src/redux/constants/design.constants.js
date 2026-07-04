/**
 * design.constants.js — Redux slice name and panel types for offcanvas designer/cart.
 */

export const DESIGN_SLICE_NAME = 'design';

export const PANEL_TYPE = {
  DESIGNER: 'designer',
  CART: 'cart',
};

export const DESIGNER_MODE = {
  ADD: 'add',
  EDIT: 'edit',
};

export const WIZARD_STEP = {
  DESIGN: 'design',
  QUANTITY: 'quantity',
  SCHEDULE: 'schedule',
};

export const WIZARD_STEPS = [WIZARD_STEP.DESIGN, WIZARD_STEP.QUANTITY, WIZARD_STEP.SCHEDULE];