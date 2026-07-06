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
  const colorNote = design.hatColor ? ` on ${design.hatColor} hat` : '';

  if (design.inputMode === 'text') {
    const text = design.companyName || 'your text';
    return `Hat preview, text mode: ${text}${colorNote}`;
  }

  if (design.imageSrc) {
    const file = design.imageFileName || 'uploaded logo';
    return `Hat preview, image mode: ${file}${colorNote}`;
  }

  return `Hat preview, image mode, no logo yet${colorNote}`;
};