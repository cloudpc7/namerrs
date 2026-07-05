/**
 * constants.js — Hat customizer specs (Feature 10).
 */

export const HAT_COLORS = [
  { id: 'black', label: 'Black', hex: '#000000' },
  { id: 'white', label: 'White', hex: '#ffffff' },
  { id: 'navy', label: 'Navy', hex: '#1e3a5f' },
  { id: 'red', label: 'Red', hex: '#dc2626' },
  { id: 'khaki', label: 'Khaki', hex: '#c3b091' },
  { id: 'gray', label: 'Gray', hex: '#6b7280' },
];

export const HAT_TYPE = 'structured-6-panel';
export const MAX_TEXT_LENGTH = 25;
export const PRINT_AREA_ASPECT = 5 / 3;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const HAT_PANEL = {
  TEXT: 'text',
  IMAGE: 'image',
  COLOR: 'color',
};

export const HAT_WIZARD_TABS = [
  { id: HAT_PANEL.TEXT, label: 'Text' },
  { id: HAT_PANEL.IMAGE, label: 'Image' },
  { id: HAT_PANEL.COLOR, label: 'Color' },
  { id: 'quantity', label: 'Qty' },
  { id: 'schedule', label: 'Date' },
];

/** Front-view structured cap silhouette (viewBox 0 0 200 140). */
export const HAT_SHAPE_PATH =
  'M 26 102 C 26 96, 34 91, 44 89 C 40 84, 38 74, 44 60 C 52 36, 78 22, 100 22 C 122 22, 148 36, 156 60 C 162 74, 160 84, 156 89 C 166 91, 174 96, 174 102 C 174 112, 100 120, 26 102 Z';

/** Subtle stitch where crown meets brim (drawn on the cap surface). */
export const HAT_CROWN_BRIM_STITCH = 'M 44 89 Q 100 93 156 89';

export const HAT_PANEL_SEAMS = [
  'M 100 28 L 100 54',
  'M 100 28 L 76 64',
  'M 100 28 L 124 64',
];

export const HAT_BUTTON = { cx: 100, cy: 28, r: 3.5 };

/** Printable front-panel bounds (% of hat mockup). */
export const HAT_PRINT_SURFACE = {
  top: 36,
  left: 33,
  width: 34,
  height: 22,
};