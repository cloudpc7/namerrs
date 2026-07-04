/**
 * validation.js — Hat customizer validation.
 */

import { validateColor, validateImageFile } from '../businessCard/validation';
import { MAX_TEXT_LENGTH } from './constants';

const TEXT_PATTERN = /^[a-zA-Z0-9\s.&'\-]*$/;

export { validateColor, validateImageFile };

export const validateHatText = (value) => {
  if (!value?.trim()) {
    return 'Enter a short company or name.';
  }
  if (value.length > MAX_TEXT_LENGTH) {
    return `Keep text under ${MAX_TEXT_LENGTH} characters.`;
  }
  if (!TEXT_PATTERN.test(value)) {
    return 'Text allows letters, numbers, and basic punctuation only.';
  }
  return null;
};

export const validateHatDesign = (design) => {
  const errors = [];

  if (!design.hatColor) {
    errors.push('Select a hat color.');
  }

  if (design.inputMode === 'text') {
    const textError = validateHatText(design.companyName);
    if (textError) errors.push(textError);
  } else if (!design.imageSrc) {
    errors.push('Upload and crop a logo or image.');
  }

  return errors;
};