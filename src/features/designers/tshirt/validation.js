/**
 * validation.js — T-shirt field and design validation.
 */

import {
  validateColor as validateCardColor,
  validateImageFile as validateCardImageFile,
  hasLowContrast as cardHasLowContrast,
} from '../businessCard/validation';
import { TEXT_FIELDS } from './constants';

const TEXT_PATTERN = /^[a-zA-Z0-9\s.&'\-]*$/;

export const validateColor = validateCardColor;
export const validateImageFile = validateCardImageFile;
export const hasLowContrast = cardHasLowContrast;

export const validateTextValue = (fieldKey, value) => {
  const field = TEXT_FIELDS.find((item) => item.key === fieldKey);
  if (!field) {
    return null;
  }

  if (value.length > field.maxLength) {
    return `Keep ${field.label.toLowerCase()} under ${field.maxLength} characters.`;
  }

  if (!TEXT_PATTERN.test(value)) {
    return 'This field allows letters, numbers, and basic punctuation only.';
  }

  return null;
};

export const validateTshirtDesign = (design) => {
  const errors = [];

  if (!design.fit) {
    errors.push('Select a fit (male/unisex or female).');
  }

  if (!design.shirtColor) {
    errors.push('Select a shirt color.');
  } else if (validateColor(design.shirtColor)) {
    errors.push('Enter a valid shirt color.');
  }

  if (!design.selectedSizes?.length) {
    errors.push('Select at least one size.');
  }

  const hasText = design.elements?.some((el) => el.type === 'text' && el.content?.trim());
  const hasImage = design.elements?.some((el) => el.type === 'image');

  if (!hasText && !hasImage) {
    errors.push('Add text or upload an image for your design.');
  }

  return errors;
};