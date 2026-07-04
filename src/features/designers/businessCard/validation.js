/**
 * validation.js — Business card field and upload validation.
 */

import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES, TEXT_FIELDS } from './constants';

const TEXT_PATTERN = /^[a-zA-Z0-9\s.&'\-]*$/;
const PHONE_PATTERN = /^[0-9\s()+.\-]*$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9@._+\-]*$/;
const WEBSITE_PATTERN = /^[a-zA-Z0-9.:/\-]*$/;
const ADDRESS_PATTERN = /^[a-zA-Z0-9\s,.\#\-]*$/;

const PATTERNS = {
  name: TEXT_PATTERN,
  title: TEXT_PATTERN,
  phone: PHONE_PATTERN,
  email: EMAIL_PATTERN,
  website: WEBSITE_PATTERN,
  address: ADDRESS_PATTERN,
  freeText: TEXT_PATTERN,
};

export const validateTextValue = (fieldKey, value) => {
  const field = TEXT_FIELDS.find((item) => item.key === fieldKey);
  if (!field) {
    return null;
  }

  if (value.length > field.maxLength) {
    return `Keep ${field.label.toLowerCase()} under ${field.maxLength} characters.`;
  }

  const pattern = PATTERNS[fieldKey] || TEXT_PATTERN;
  if (!pattern.test(value)) {
    return 'This field allows letters, numbers, and basic punctuation only.';
  }

  return null;
};

export const validateColor = (value) => {
  if (!value) {
    return 'Enter a valid color code.';
  }

  const hex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const rgb = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
  const hsl = /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;

  if (hex.test(value) || rgb.test(value) || hsl.test(value)) {
    return null;
  }

  return 'Enter a valid hex, HSL, or RGBA color.';
};

export const validateImageFile = (file) => {
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

export const getLuminance = (hex) => {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;

  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const transform = (channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
};

export const hasLowContrast = (background, text) => {
  if (!background.startsWith('#') || !text.startsWith('#')) {
    return false;
  }

  const bg = getLuminance(background);
  const fg = getLuminance(text);
  const lighter = Math.max(bg, fg);
  const darker = Math.min(bg, fg);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return ratio < 4.5;
};

const sideHasContent = (sideState) => {
  if (!sideState) {
    return false;
  }
  const hasText = sideState.elements?.some((el) => el.type === 'text' && el.content?.trim());
  const hasImage = sideState.elements?.some((el) => el.type === 'image');
  return hasText || hasImage;
};

export const validateBusinessCardDesign = (design) => {
  const errors = [];

  if (!design.paperType) {
    errors.push('Select a card type / paper.');
  }

  if (!sideHasContent(design.front) && !sideHasContent(design.back)) {
    errors.push('Add text or an image to the front or back of the card.');
  }

  return errors;
};