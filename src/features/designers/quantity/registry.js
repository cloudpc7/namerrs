/**
 * registry.js — Product-specific quantity step components.
 */

import DefaultQuantityStep from './DefaultQuantityStep';
import MagnetQuantityStep from './MagnetQuantityStep';
import TshirtQuantityStep from './TshirtQuantityStep';

export const QUANTITY_STEP_REGISTRY = {
  tshirts: TshirtQuantityStep,
  magnets: MagnetQuantityStep,
};

export const getQuantityStepComponent = (productId) =>
  QUANTITY_STEP_REGISTRY[productId] || DefaultQuantityStep;