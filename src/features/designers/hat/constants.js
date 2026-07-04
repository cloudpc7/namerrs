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