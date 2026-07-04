/**
 * designModel.js — Business card design state helpers.
 */

import { DEFAULT_ELEMENT_SIZE, TEXT_FIELDS } from './constants';

const createId = () => `el_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const createEmptySide = () => ({
  backgroundColor: '#ffffff',
  textColor: '#111111',
  elements: [],
});

export const createDefaultBusinessCardDesign = () => ({
  version: 1,
  activeSide: 'front',
  paperType: 'standard-matte',
  sides: 'double',
  front: {
    ...createEmptySide(),
    elements: [
      {
        id: createId(),
        type: 'text',
        fieldKey: 'name',
        content: '',
        x: 8,
        y: 28,
        width: DEFAULT_ELEMENT_SIZE.text.width,
        height: DEFAULT_ELEMENT_SIZE.text.height,
        fontSize: 16,
      },
      {
        id: createId(),
        type: 'text',
        fieldKey: 'title',
        content: '',
        x: 8,
        y: 42,
        width: DEFAULT_ELEMENT_SIZE.text.width,
        height: DEFAULT_ELEMENT_SIZE.text.height,
        fontSize: 12,
      },
    ],
  },
  back: createEmptySide(),
});

export const normalizeBusinessCardDesign = (design) => {
  if (design?.version === 1 && design.front && design.back) {
    return design;
  }
  return createDefaultBusinessCardDesign();
};

export const getActiveSideKey = (design) => design.activeSide || 'front';

export const getSideState = (design, side = getActiveSideKey(design)) =>
  design[side] || createEmptySide();

export const updateSide = (design, side, updater) => ({
  ...design,
  [side]: updater(getSideState(design, side)),
});

export const copyFrontToBack = (design) => ({
  ...design,
  back: {
    ...design.front,
    elements: design.front.elements.map((element) => ({
      ...element,
      id: createId(),
    })),
  },
});

export const addTextElement = (design, fieldKey) => {
  const field = TEXT_FIELDS.find((item) => item.key === fieldKey);
  if (!field) {
    return design;
  }

  const side = getActiveSideKey(design);
  return updateSide(design, side, (current) => ({
    ...current,
    elements: [
      ...current.elements,
      {
        id: createId(),
        type: 'text',
        fieldKey,
        content: '',
        x: 8,
        y: 60,
        width: DEFAULT_ELEMENT_SIZE.text.width,
        height: DEFAULT_ELEMENT_SIZE.text.height,
        fontSize: 12,
      },
    ],
  }));
};

export const addImageElement = (design, image) => {
  const side = getActiveSideKey(design);
  const sideState = getSideState(design, side);
  const imageCount = sideState.elements.filter((el) => el.type === 'image').length;

  if (imageCount >= 3) {
    return { design, error: 'Max 3 images per side.' };
  }

  return {
    design: updateSide(design, side, (current) => ({
      ...current,
      elements: [
        ...current.elements,
        {
          id: createId(),
          type: 'image',
          src: image.src,
          fileName: image.fileName,
          x: 62,
          y: 18,
          width: DEFAULT_ELEMENT_SIZE.image.width,
          height: DEFAULT_ELEMENT_SIZE.image.height,
        },
      ],
    })),
    error: null,
  };
};

export const updateElement = (design, elementId, updates) => {
  const side = getActiveSideKey(design);
  return updateSide(design, side, (current) => ({
    ...current,
    elements: current.elements.map((element) =>
      element.id === elementId ? { ...element, ...updates } : element
    ),
  }));
};

export const removeElement = (design, elementId) => {
  const side = getActiveSideKey(design);
  return updateSide(design, side, (current) => ({
    ...current,
    elements: current.elements.filter((element) => element.id !== elementId),
  }));
};

export const moveElement = (design, elementId, x, y) =>
  updateElement(design, elementId, {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  });

export const buildCardPreviewLabel = (design) => {
  const side = getActiveSideKey(design);
  const sideState = getSideState(design, side);
  const textBits = sideState.elements
    .filter((el) => el.type === 'text' && el.content)
    .map((el) => el.content)
    .slice(0, 2)
    .join(', ');

  return `${side} of card${textBits ? `: ${textBits}` : ''}`;
};