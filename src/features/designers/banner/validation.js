/**
 * validation.js — Banner design validation.
 */

import { validateColor, validateImageFile } from '../businessCard/validation';
import {
  ALLOWED_IMAGE_TYPES,
  BANNER_TYPES,
  MAX_DESCRIPTION_LENGTH,
  MAX_HEIGHT_FT,
  MAX_UPLOAD_BYTES,
  MAX_WIDTH_FT,
  MIN_DESCRIPTION_LENGTH,
  MIN_DIMENSION_FT,
} from './constants';
import { getDimensions } from './designModel';

export { validateColor, validateImageFile };

const DESCRIPTION_PATTERN = /^[a-zA-Z0-9\s.,!?'&\-#\n\r]*$/;

export const validateDescription = (value) => {
  if (!value || value.trim().length < MIN_DESCRIPTION_LENGTH) {
    return `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`;
  }
  if (value.length > MAX_DESCRIPTION_LENGTH) {
    return `Keep description under ${MAX_DESCRIPTION_LENGTH} characters.`;
  }
  if (!DESCRIPTION_PATTERN.test(value)) {
    return 'Description allows letters, numbers, and basic punctuation only.';
  }
  return null;
};

export const validateDimensions = (design) => {
  const { width, height } = getDimensions(design);
  const errors = [];

  if (!width || !height) {
    errors.push('Enter width and height for your banner.');
    return errors;
  }

  if (width < MIN_DIMENSION_FT || height < MIN_DIMENSION_FT) {
    errors.push(`Minimum banner size is ${MIN_DIMENSION_FT} × ${MIN_DIMENSION_FT} ft.`);
  }
  if (width > MAX_WIDTH_FT) {
    errors.push(`Maximum width is ${MAX_WIDTH_FT} ft.`);
  }
  if (height > MAX_HEIGHT_FT) {
    errors.push(`Maximum height is ${MAX_HEIGHT_FT} ft.`);
  }

  return errors;
};

export const validateBannerDesign = (design) => {
  const errors = [];

  if (!BANNER_TYPES.some((type) => type.id === design.bannerType)) {
    errors.push('Select a banner type (Vinyl or Digital).');
  }

  errors.push(...validateDimensions(design));

  const descError = validateDescription(design.description);
  if (descError) {
    errors.push(descError);
  }

  if (!design.backgroundColor || validateColor(design.backgroundColor)) {
    errors.push('Enter a valid background color.');
  }

  return errors;
};

export const validateBannerImageFile = (file) => {
  if (!file) {
    return 'Upload failed. Check your connection and try again.';
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Use a JPG, PNG, or WebP image.';
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return 'Image must be under 10 MB.';
  }
  return null;
};