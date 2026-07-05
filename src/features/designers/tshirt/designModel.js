/**
 * designModel.js — T-shirt design state helpers.
 */

import {
  CENTERED_TEXT_LAYOUT,
  DEFAULT_ELEMENT_SIZE,
  FULL_BLEED_IMAGE_LAYOUT,
  TEXT_FIELDS,
} from './constants';

export const getPrintPlacementKey = (design, view = design.activeView || 'front') =>
  view === 'back' ? design.backPrintPlacement : design.frontPrintPlacement;

export const isFullPrintPlacement = (placementKey) =>
  placementKey === 'full-front' || placementKey === 'full-back';

const createId = () => `el_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const createDefaultTextElements = (side = 'front') => {
  const field = TEXT_FIELDS[0];

  return [
    {
      id: createId(),
      type: 'text',
      fieldKey: field.key,
      content: '',
      side,
      x: CENTERED_TEXT_LAYOUT.x,
      y: CENTERED_TEXT_LAYOUT.y,
      width: CENTERED_TEXT_LAYOUT.width,
      height: CENTERED_TEXT_LAYOUT.height,
      fontSize: 13,
      textAlign: 'center',
    },
  ];
};

export const createDefaultTshirtDesign = () => ({
  version: 1,
  activeView: 'front',
  fit: 'male',
  selectedSizes: ['M'],
  shirtColor: '#ffffff',
  frontPrintPlacement: 'front-chest',
  backPrintPlacement: 'back-upper',
  printColors: '1-color',
  textColor: '#111111',
  elements: createDefaultTextElements('front'),
});

const migrateLegacyPlacement = (design) => {
  if (design.frontPrintPlacement) {
    return design.frontPrintPlacement;
  }

  if (design.printPlacement === 'full-front') {
    return 'full-front';
  }

  return 'front-chest';
};

export const normalizeTshirtDesign = (design) => {
  if (design?.version === 1 && Array.isArray(design.elements)) {
    return {
      ...createDefaultTshirtDesign(),
      ...design,
      activeView: design.activeView || 'front',
      frontPrintPlacement: migrateLegacyPlacement(design),
      backPrintPlacement: design.backPrintPlacement || 'back-upper',
      selectedSizes: design.selectedSizes?.length ? design.selectedSizes : ['M'],
      elements: design.elements.map((element) => {
        const normalized = {
          ...element,
          side: element.side || 'front',
          textAlign: element.type === 'text' ? element.textAlign || 'center' : element.textAlign,
        };

        if (
          element.type === 'text' &&
          element.fieldKey === 'line1' &&
          !element.content &&
          (element.y === 18 || element.y === 4) &&
          (element.x === 8 || element.x === CENTERED_TEXT_LAYOUT.x)
        ) {
          return {
            ...normalized,
            x: CENTERED_TEXT_LAYOUT.x,
            y: CENTERED_TEXT_LAYOUT.y,
            width: CENTERED_TEXT_LAYOUT.width,
            height: CENTERED_TEXT_LAYOUT.height,
          };
        }

        return normalized;
      }),
    };
  }
  return createDefaultTshirtDesign();
};

export const getViewElements = (design, view = design.activeView || 'front') =>
  design.elements.filter((element) => (element.side || 'front') === view);

export const updateFit = (design, fit) => {
  const allowedSizeList =
    fit === 'female' ? ['S', 'M', 'L', 'XL', '2XL'] : ['S', 'M', 'L', 'XL', '2XL', '3XL'];
  const currentSize = design.selectedSizes?.[0] || 'M';
  const nextSize = allowedSizeList.includes(currentSize) ? currentSize : 'M';

  return {
    ...design,
    fit,
    selectedSizes: [nextSize],
  };
};

export const selectSize = (design, size) => ({
  ...design,
  selectedSizes: [size],
});

/** @deprecated Use selectSize */
export const toggleSize = selectSize;

export const addTextElement = (design, fieldKey, side = design.activeView || 'front') => {
  const field = TEXT_FIELDS.find((item) => item.key === fieldKey);
  if (!field) {
    return design;
  }

  const viewText = design.elements.filter(
    (element) => element.type === 'text' && (element.side || 'front') === side
  );

  if (viewText.some((element) => element.fieldKey === fieldKey)) {
    return design;
  }

  const nextIndex = viewText.length;

  return {
    ...design,
    elements: [
      ...design.elements,
      {
        id: createId(),
        type: 'text',
        fieldKey,
        content: '',
        side,
        x: CENTERED_TEXT_LAYOUT.x,
        y: CENTERED_TEXT_LAYOUT.y + nextIndex * 8,
        width: CENTERED_TEXT_LAYOUT.width,
        height: CENTERED_TEXT_LAYOUT.height,
        fontSize: field.key === 'line1' ? 13 : 11,
        textAlign: 'center',
      },
    ],
  };
};

export const addImageElement = (design, image, options = {}) => {
  const side = options.side ?? design.activeView ?? 'front';
  const placementKey = getPrintPlacementKey({ ...design, activeView: side }, side);
  const useFullBleed = options.fullBleed ?? isFullPrintPlacement(placementKey);

  const imageCount = design.elements.filter(
    (el) => el.type === 'image' && (el.side || 'front') === side
  ).length;

  if (imageCount >= 2) {
    return { design, error: `Max 2 images on ${side}.` };
  }

  const layout = useFullBleed
    ? FULL_BLEED_IMAGE_LAYOUT
    : {
        x: 30,
        y: 24,
        width: DEFAULT_ELEMENT_SIZE.image.width,
        height: DEFAULT_ELEMENT_SIZE.image.height,
        objectFit: 'contain',
      };

  const elementId = createId();

  return {
    design: {
      ...design,
      elements: [
        ...design.elements,
        {
          id: elementId,
          type: 'image',
          side,
          src: image.src,
          fileName: image.fileName,
          ...layout,
        },
      ],
    },
    error: null,
    elementId,
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

export const resizeElement = (design, elementId, width, height) => {
  const element = design.elements.find((item) => item.id === elementId);
  if (!element) {
    return design;
  }

  const maxWidth = 100 - element.x;
  const maxHeight = 100 - element.y;

  const minWidth = element.type === 'text' ? 20 : 12;
  const minHeight = element.type === 'text' ? 5 : 12;

  return updateElement(design, elementId, {
    width: Math.max(minWidth, Math.min(maxWidth, width)),
    height: Math.max(minHeight, Math.min(maxHeight, height)),
  });
};

export const buildTshirtPreviewLabel = (design) => {
  const view = design.activeView || 'front';
  const textBits = getViewElements(design, view)
    .filter((el) => el.type === 'text' && el.content)
    .map((el) => el.content)
    .slice(0, 2)
    .join(', ');

  return `${view} of shirt${textBits ? `: ${textBits}` : ''}`;
};

export const hasDesignContent = (design) => {
  const hasText = design.elements.some((el) => el.type === 'text' && el.content.trim());
  const hasImage = design.elements.some((el) => el.type === 'image');
  return hasText || hasImage;
};