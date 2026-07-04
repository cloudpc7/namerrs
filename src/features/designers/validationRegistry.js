/**
 * validationRegistry.js — Design-step validation per product.
 */

import { validateTshirtDesign } from './tshirt/validation';
import { validateBusinessCardDesign } from './businessCard/validation';
import { validateBannerDesign } from './banner/validation';
import { validateHatDesign } from './hat/validation';
import { validateMagnetDesign } from './magnet/validation';
import { validateMemorialDesign } from './memorial/validation';

const VALIDATORS = {
  tshirts: validateTshirtDesign,
  businessCards: validateBusinessCardDesign,
  banners: validateBannerDesign,
  hats: validateHatDesign,
  magnets: validateMagnetDesign,
  memorial: validateMemorialDesign,
};

export const validateDesignStep = (productId, design) => {
  const validator = VALIDATORS[productId];
  if (!validator) {
    return [];
  }
  return validator(design);
};