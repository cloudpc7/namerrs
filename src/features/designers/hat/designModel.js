/**
 * designModel.js — Hat customizer state helpers.
 */

export const createDefaultHatDesign = () => ({
  version: 1,
  inputMode: 'text',
  hatColor: '#000000',
  hatType: 'structured-6-panel',
  companyName: '',
  textColor: '#ffffff',
  imageSrc: '',
  imageFileName: '',
  imageX: 25,
  imageY: 30,
  imageWidth: 50,
  imageHeight: 35,
});

export const normalizeHatDesign = (design) => {
  if (design?.version === 1) {
    return { ...createDefaultHatDesign(), ...design };
  }
  return createDefaultHatDesign();
};

export const buildHatPreviewLabel = (design) => {
  if (design.inputMode === 'text' && design.companyName) {
    return `Hat preview: ${design.companyName}`;
  }
  if (design.inputMode === 'image' && design.imageFileName) {
    return `Hat preview: ${design.imageFileName}`;
  }
  return 'Hat preview';
};