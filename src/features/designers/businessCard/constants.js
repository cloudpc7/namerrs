/**
 * constants.js — Business card print specs and field limits (US standard 3.5 × 2 in).
 */

export const CARD_ASPECT_RATIO = 3.5 / 2;

export const PAPER_OPTIONS = [
  { id: 'standard-matte', label: 'Standard matte' },
  { id: 'glossy', label: 'Glossy' },
  { id: 'uncoated', label: 'Uncoated' },
];

export const TEXT_FIELDS = [
  { key: 'name', label: 'Name / business name', maxLength: 40, placeholder: 'Namerrs Signs' },
  { key: 'title', label: 'Title / tagline', maxLength: 60, placeholder: 'Signs & Printing' },
  { key: 'phone', label: 'Phone', maxLength: 20, placeholder: '(951) 350-0270' },
  { key: 'email', label: 'Email', maxLength: 80, placeholder: 'NameRRs@gmail.com' },
  { key: 'website', label: 'Website', maxLength: 80, placeholder: 'namerrs.com' },
  { key: 'address', label: 'Address', maxLength: 100, placeholder: '227 Main St, San Jacinto' },
  { key: 'freeText', label: 'Free text', maxLength: 120, placeholder: '' },
];

export const MAX_IMAGES_PER_SIDE = 3;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const DEFAULT_ELEMENT_SIZE = {
  text: { width: 55, height: 8 },
  image: { width: 28, height: 28 },
};