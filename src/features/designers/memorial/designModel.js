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
  if (design.name) {
    return `Memorial preview: ${design.name}`;
  }
  return 'Memorial preview';
};