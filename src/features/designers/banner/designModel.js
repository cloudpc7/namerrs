/**
 * designModel.js — Banner design state helpers.
 */

import { DEFAULT_ELEMENT_SIZE, PRESET_SIZES } from './constants';

const createId = () => `el_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const getDimensions = (design) => {
  if (design.sizePreset === 'custom') {
    return {
      width: Number(design.customWidth) || 0,
      height: Number(design.customHeight) || 0,
    };
  }
  const preset = PRESET_SIZES.find((item) => item.id === design.sizePreset);
  return { width: preset?.width || 0, height: preset?.height || 0 };
};

export const getSquareFeet = (design) => {
  const { width, height } = getDimensions(design);
  return width * height;
};

export const getAspectRatio = (design) => {
  const { width, height } = getDimensions(design);
  if (!width || !height) {
    return 2;
  }
  return width / height;
};

export const createDefaultBannerDesign = () => ({
  version: 1,
  bannerType: 'vinyl',
  sizePreset: 'small',
  customWidth: '',
  customHeight: '',
  description: '',
  backgroundColor: '#ffffff',
  textColor: '#111111',
  elements: [],
});

export const normalizeBannerDesign = (design) => {
  if (design?.version === 1) {
    return { ...createDefaultBannerDesign(), ...design };
  }
  return createDefaultBannerDesign();
};

export const addImageElement = (design, image) => {
  const imageCount = design.elements.filter((el) => el.type === 'image').length;
  if (imageCount >= 5) {
    return { design, error: 'Max 5 images on banner.' };
  }

  return {
    design: {
      ...design,
      elements: [
        ...design.elements,
        {
          id: createId(),
          type: 'image',
          src: image.src,
          fileName: image.fileName,
          x: 30,
          y: 35,
          width: DEFAULT_ELEMENT_SIZE.image.width,
          height: DEFAULT_ELEMENT_SIZE.image.height,
        },
      ],
    },
    error: null,
  };
};

export const updateElement = (design, elementId, updates) => ({
  ...design,
  elements: design.elements.map((element) =>
    element.id === elementId ? { ...element, ...updates } : element
  ),
});

export const removeElement = (design, elementId) => ({
  ...design,
  elements: design.elements.filter((element) => element.id !== elementId),
});

export const moveElement = (design, elementId, x, y) =>
  updateElement(design, elementId, {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  });

export const buildBannerPreviewLabel = (design) => {
  const { width, height } = getDimensions(design);
  return `Banner preview ${width} × ${height} ft`;
};