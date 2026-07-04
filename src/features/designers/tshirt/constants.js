/**
 * constants.js — T-shirt designer specs per Feature 7 brief.
 */

export const FIT_OPTIONS = [
  { id: 'male', label: 'Male / unisex' },
  { id: 'female', label: 'Female' },
];

export const SIZES_BY_FIT = {
  male: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  female: ['S', 'M', 'L', 'XL', '2XL'],
};

export const SHIRT_COLOR_PRESETS = [
  { id: 'black', label: 'Black', hex: '#000000' },
  { id: 'white', label: 'White', hex: '#ffffff' },
  { id: 'navy', label: 'Navy', hex: '#1e3a5f' },
  { id: 'red', label: 'Red', hex: '#dc2626' },
  { id: 'royal-blue', label: 'Royal Blue', hex: '#2563eb' },
  { id: 'gray', label: 'Gray', hex: '#6b7280' },
  { id: 'maroon', label: 'Maroon', hex: '#7f1d1d' },
  { id: 'forest-green', label: 'Forest Green', hex: '#166534' },
];

export const PRINT_PLACEMENT_OPTIONS = [
  { id: 'front-chest', label: 'Front chest (default)' },
  { id: 'full-front', label: 'Full front' },
];

export const PRINT_COLOR_OPTIONS = [
  { id: '1-color', label: '1-color' },
  { id: '2-color', label: '2-color' },
  { id: '3-color', label: '3-color' },
  { id: 'full-color', label: 'Full color' },
];

export const TEXT_FIELDS = [
  { key: 'line1', label: 'Line 1 (name/team)', maxLength: 30, placeholder: 'Team Namerrs' },
  { key: 'line2', label: 'Line 2 (tagline)', maxLength: 40, placeholder: 'Signs & Printing' },
  { key: 'line3', label: 'Line 3 (optional)', maxLength: 40, placeholder: '' },
];

export const PRINT_AREA_BY_PLACEMENT = {
  'front-chest': { top: 22, left: 28, width: 44, height: 36 },
  'full-front': { top: 14, left: 12, width: 76, height: 62 },
};

export const MAX_IMAGES_ON_FRONT = 2;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const DEFAULT_ELEMENT_SIZE = {
  text: { width: 80, height: 8 },
  image: { width: 32, height: 32 },
};