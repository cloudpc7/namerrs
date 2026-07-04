/**
 * constants.js — Banner designer specs (Feature 9).
 */

export const BANNER_TYPES = [
  { id: 'vinyl', label: 'Vinyl', ratePerSqFt: 3 },
  { id: 'digital', label: 'Digital', ratePerSqFt: 5 },
];

export const PRESET_SIZES = [
  { id: 'small', label: 'Small (2 × 4 ft)', width: 2, height: 4 },
  { id: 'medium', label: 'Medium (3 × 6 ft)', width: 3, height: 6 },
  { id: 'large', label: 'Large (4 × 8 ft)', width: 4, height: 8 },
  { id: 'xlarge', label: 'X-Large (6 × 10 ft)', width: 6, height: 10 },
  { id: 'custom', label: 'Custom', width: null, height: null },
];

export const MIN_DIMENSION_FT = 1;
export const MAX_WIDTH_FT = 10;
export const MAX_HEIGHT_FT = 145;

export const MAX_IMAGES = 5;
export const MAX_DESCRIPTION_LENGTH = 500;
export const MIN_DESCRIPTION_LENGTH = 10;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const DEFAULT_ELEMENT_SIZE = {
  image: { width: 40, height: 30 },
};