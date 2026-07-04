/**
 * constants.js — Memorial customizer specs (Feature 12).
 */

export const PRODUCT_TYPES = [
  { id: 'print', label: 'Memorial print' },
  { id: 'sticker', label: 'Memorial sticker' },
];

export const SIZES_BY_TYPE = {
  print: [
    { id: '8x10', label: '8" × 10"', aspect: 8 / 10 },
    { id: '11x14', label: '11" × 14"', aspect: 11 / 14 },
    { id: '12x18', label: '12" × 18"', aspect: 12 / 18 },
  ],
  sticker: [
    { id: '4x6', label: '4" × 6"', aspect: 4 / 6 },
    { id: '6x9', label: '6" × 9"', aspect: 6 / 9 },
  ],
};

export const MAX_NAME_LENGTH = 40;
export const MAX_MESSAGE_LENGTH = 60;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];