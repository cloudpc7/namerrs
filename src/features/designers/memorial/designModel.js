/**
 * designModel.js — Memorial customizer state helpers.
 */

import { SIZES_BY_TYPE } from './constants';

export const createDefaultMemorialDesign = () => ({
  version: 1,
  inputMode: 'text',
  productType: 'print',
  sizeId: '8x10',
  name: '',
  datesMessage: '',
  textColor: '#111111',
  backgroundColor: '#ffffff',
  imageSrc: '',
  imageFileName: '',
});

export const normalizeMemorialDesign = (design) => {
  if (design?.version === 1) {
    return { ...createDefaultMemorialDesign(), ...design };
  }
  return createDefaultMemorialDesign();
};

export const getSelectedSize = (design) => {
  const sizes = SIZES_BY_TYPE[design.productType] || SIZES_BY_TYPE.print;
  return sizes.find((s) => s.id === design.sizeId) || sizes[0];
};

export const buildMemorialPreviewLabel = (design) => {
  const size = getSelectedSize(design);
  const sizeNote = size?.label ? `, ${size.label}` : '';

  if (design.inputMode === 'text') {
    const name = design.name || 'name';
    const dates = design.datesMessage ? `, ${design.datesMessage}` : '';
    return `Memorial preview, text layout: ${name}${dates}${sizeNote}`;
  }

  if (design.imageSrc) {
    const file = design.imageFileName || 'uploaded photo';
    return `Memorial preview, photo layout: ${file}${sizeNote}`;
  }

  return `Memorial preview, photo layout, no photo yet${sizeNote}`;
};