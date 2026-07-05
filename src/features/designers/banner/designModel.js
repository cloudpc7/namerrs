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

  const elementId = createId();

  return {
    design: {
      ...design,
      elements: [
        ...design.elements,
        {
          id: elementId,
          type: 'image',
          src: image.src,
          fileName: image.fileName,
          x: 30,
          y: 35,
          width: DEFAULT_ELEMENT_SIZE.image.width,
          height: DEFAULT_ELEMENT_SIZE.image.height,
          objectFit: 'contain',
        },
      ],
    },
    elementId,
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

export const moveElement = (design, elementId, x, y) => {
  const element = design.elements.find((item) => item.id === elementId);
  if (!element) {
    return design;
  }

  const maxX = Math.max(0, 100 - element.width);
  const maxY = Math.max(0, 100 - element.height);

  return updateElement(design, elementId, {
    x: Math.max(0, Math.min(maxX, x)),
    y: Math.max(0, Math.min(maxY, y)),
  });
};

export const resizeElement = (design, elementId, width, height) => {
  const element = design.elements.find((item) => item.id === elementId);
  if (!element) {
    return design;
  }

  const maxWidth = 100 - element.x;
  const maxHeight = 100 - element.y;
  const minSize = 8;

  return updateElement(design, elementId, {
    width: Math.max(minSize, Math.min(maxWidth, width)),
    height: Math.max(minSize, Math.min(maxHeight, height)),
  });
};

export const fillBannerImage = (design, elementId) =>
  updateElement(design, elementId, {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    objectFit: 'cover',
  });

export const buildBannerPreviewLabel = (design) => {
  const { width, height } = getDimensions(design);
  return `Banner preview ${width} × ${height} ft`;
};