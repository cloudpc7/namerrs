/**
 * designModel.js — T-shirt design state helpers.
 */

import { DEFAULT_ELEMENT_SIZE, TEXT_FIELDS } from './constants';

const createId = () => `el_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const createDefaultTextElements = () =>
  TEXT_FIELDS.map((field, index) => ({
    id: createId(),
    type: 'text',
    fieldKey: field.key,
    content: '',
    x: 10,
    y: 12 + index * 14,
    width: DEFAULT_ELEMENT_SIZE.text.width,
    height: DEFAULT_ELEMENT_SIZE.text.height,
    fontSize: field.key === 'line1' ? 18 : 14,
  }));

export const createDefaultTshirtDesign = () => ({
  version: 1,
  fit: 'male',
  selectedSizes: ['M'],
  shirtColor: '#ffffff',
  printPlacement: 'front-chest',
  printColors: '1-color',
  textColor: '#111111',
  elements: createDefaultTextElements(),
});

export const normalizeTshirtDesign = (design) => {
  if (design?.version === 1 && Array.isArray(design.elements)) {
    return {
      ...createDefaultTshirtDesign(),
      ...design,
      selectedSizes: design.selectedSizes?.length ? design.selectedSizes : ['M'],
    };
  }
  return createDefaultTshirtDesign();
};

export const updateFit = (design, fit) => {
  const allowedSizes = design.selectedSizes.filter((size) =>
    (fit === 'female' ? ['S', 'M', 'L', 'XL', '2XL'] : ['S', 'M', 'L', 'XL', '2XL', '3XL']).includes(
      size
    )
  );

  return {
    ...design,
    fit,
    selectedSizes: allowedSizes.length ? allowedSizes : ['M'],
  };
};

export const toggleSize = (design, size) => {
  const isSelected = design.selectedSizes.includes(size);
  const nextSizes = isSelected
    ? design.selectedSizes.filter((item) => item !== size)
    : [...design.selectedSizes, size];

  return {
    ...design,
    selectedSizes: nextSizes.length ? nextSizes : [size],
  };
};

export const addImageElement = (design, image) => {
  const imageCount = design.elements.filter((el) => el.type === 'image').length;

  if (imageCount >= 2) {
    return { design, error: 'Max 2 images on front.' };
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
          x: 34,
          y: 28,
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

export const buildTshirtPreviewLabel = (design) => {
  const textBits = design.elements
    .filter((el) => el.type === 'text' && el.content)
    .map((el) => el.content)
    .slice(0, 2)
    .join(', ');

  return `T-shirt preview${textBits ? `: ${textBits}` : ''}`;
};

export const hasDesignContent = (design) => {
  const hasText = design.elements.some((el) => el.type === 'text' && el.content.trim());
  const hasImage = design.elements.some((el) => el.type === 'image');
  return hasText || hasImage;
};