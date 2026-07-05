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

export const FRONT_PRINT_PLACEMENT_OPTIONS = [
  { id: 'front-chest', label: 'Front chest' },
  { id: 'full-front', label: 'Full front' },
];

export const BACK_PRINT_PLACEMENT_OPTIONS = [
  { id: 'back-upper', label: 'Back upper' },
  { id: 'full-back', label: 'Full back' },
];

/** @deprecated Use FRONT_PRINT_PLACEMENT_OPTIONS */
export const PRINT_PLACEMENT_OPTIONS = FRONT_PRINT_PLACEMENT_OPTIONS;

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

/** T-shirt body silhouette (matches the canvas SVG). */
export const SHIRT_SHAPE_PATH =
  'M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z';

/** Full shirt design surface (percent of the shirt silhouette). */
export const SHIRT_DESIGN_SURFACE = {
  top: 0,
  left: 0,
  width: 100,
  height: 100,
};

/** Placement guides shown on the Print tab (percent of shirt). */
export const PRINT_AREA_BY_PLACEMENT = {
  'front-chest': { top: 32, left: 32, width: 36, height: 24 },
  'full-front': { top: 22, left: 12, width: 76, height: 58 },
  'back-upper': { top: 32, left: 32, width: 36, height: 26 },
  'full-back': { top: 22, left: 12, width: 76, height: 58 },
};

export const FULL_BLEED_IMAGE_LAYOUT = {
  x: 8,
  y: 6,
  width: 84,
  height: 88,
  objectFit: 'contain',
};

export const TSHIRT_PANEL = {
  TEXT: 'text',
  COLOR: 'color',
  PRINT: 'print',
  IMAGE: 'image',
  SIZES: 'sizes',
};

export const TSHIRT_WIZARD_TABS = [
  { id: TSHIRT_PANEL.TEXT, label: 'Text' },
  { id: TSHIRT_PANEL.COLOR, label: 'Color' },
  { id: TSHIRT_PANEL.PRINT, label: 'Print' },
  { id: TSHIRT_PANEL.IMAGE, label: 'Image' },
  { id: TSHIRT_PANEL.SIZES, label: 'Sizes' },
  { id: 'quantity', label: 'Qty' },
  { id: 'schedule', label: 'Date' },
];

/** Default chest-centered text field (% of shirt design surface). */
export const CENTERED_TEXT_LAYOUT = {
  x: 31.25,
  y: 34,
  width: 40,
  height: 5,
};

export const MAX_IMAGES_ON_FRONT = 2;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const DEFAULT_ELEMENT_SIZE = {
  text: {
    width: CENTERED_TEXT_LAYOUT.width,
    height: CENTERED_TEXT_LAYOUT.height,
  },
  image: { width: 28, height: 28 },
};