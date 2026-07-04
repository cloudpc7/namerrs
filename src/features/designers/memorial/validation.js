/**
 * validation.js — Memorial customizer validation.
 */

import { validateColor, validateImageFile } from '../businessCard/validation';
import { MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH, SIZES_BY_TYPE } from './constants';

const NAME_PATTERN = /^[a-zA-Z0-9\s.'\-]*$/;
const MESSAGE_PATTERN = /^[a-zA-Z0-9\s.,'\-]*$/;

export { validateColor, validateImageFile };

export const validateMemorialName = (value) => {
  if (!value?.trim()) {
    return 'Enter a name.';
  }
  if (value.length > MAX_NAME_LENGTH) {
    return `Keep name under ${MAX_NAME_LENGTH} characters.`;
  }
  if (!NAME_PATTERN.test(value)) {
    return 'Name allows letters, numbers, and basic punctuation only.';
  }
  return null;
};

export const validateMemorialMessage = (value) => {
  if (value.length > MAX_MESSAGE_LENGTH) {
    return `Keep message under ${MAX_MESSAGE_LENGTH} characters.`;
  }
  if (value && !MESSAGE_PATTERN.test(value)) {
    return 'Message allows letters, numbers, and basic punctuation only.';
  }
  return null;
};

export const validateMemorialDesign = (design) => {
  const errors = [];

  if (!SIZES_BY_TYPE[design.productType]) {
    errors.push('Select a product type.');
  }

  const sizes = SIZES_BY_TYPE[design.productType];
  if (!sizes?.some((s) => s.id === design.sizeId)) {
    errors.push('Select a size.');
  }

  if (design.inputMode === 'text') {
    const nameError = validateMemorialName(design.name);
    if (nameError) errors.push(nameError);
    const msgError = validateMemorialMessage(design.datesMessage);
    if (msgError) errors.push(msgError);
  } else if (!design.imageSrc) {
    errors.push('Upload and crop a photo.');
  }

  return errors;
};