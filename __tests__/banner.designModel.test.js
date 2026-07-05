/**
 * banner.designModel.test.js — Banner element layout helpers.
 */

import {
  addImageElement,
  createDefaultBannerDesign,
  fillBannerImage,
  moveElement,
  resizeElement,
} from '../src/features/designers/banner/designModel';

describe('banner designModel', () => {
  it('resizeElement clamps image size within the banner bounds', () => {
    const design = createDefaultBannerDesign();
    const { design: withImage, elementId } = addImageElement(design, {
      src: 'data:image/png;base64,abc',
      fileName: 'logo.png',
    });

    const resized = resizeElement(withImage, elementId, 120, 120);
    const element = resized.elements.find((item) => item.id === elementId);

    expect(element.width).toBeLessThanOrEqual(100 - element.x);
    expect(element.height).toBeLessThanOrEqual(100 - element.y);
    expect(element.width).toBeGreaterThanOrEqual(8);
    expect(element.height).toBeGreaterThanOrEqual(8);
  });

  it('fillBannerImage stretches the selected image across the preview', () => {
    const design = createDefaultBannerDesign();
    const { design: withImage, elementId } = addImageElement(design, {
      src: 'data:image/png;base64,abc',
      fileName: 'logo.png',
    });

    const filled = fillBannerImage(withImage, elementId);
    const element = filled.elements.find((item) => item.id === elementId);

    expect(element).toMatchObject({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      objectFit: 'cover',
    });
  });

  it('moveElement keeps the image inside the banner bounds', () => {
    const design = createDefaultBannerDesign();
    const { design: withImage, elementId } = addImageElement(design, {
      src: 'data:image/png;base64,abc',
      fileName: 'logo.png',
    });

    const moved = moveElement(withImage, elementId, 95, 95);
    const element = moved.elements.find((item) => item.id === elementId);

    expect(element.x).toBeLessThanOrEqual(100 - element.width);
    expect(element.y).toBeLessThanOrEqual(100 - element.height);
  });
});