/**
 * tshirt.designModel.test.js — T-shirt design state helpers.
 */

import {
  addImageElement,
  createDefaultTshirtDesign,
  toggleSize,
  updateFit,
} from '../src/features/designers/tshirt/designModel';

describe('tshirt designModel', () => {
  it('createDefaultTshirtDesign includes three text lines', () => {
    const design = createDefaultTshirtDesign();
    expect(design.version).toBe(1);
    expect(design.elements.filter((el) => el.type === 'text')).toHaveLength(3);
  });

  it('updateFit removes sizes not available for female fit', () => {
    const design = { ...createDefaultTshirtDesign(), selectedSizes: ['3XL'] };
    const next = updateFit(design, 'female');

    expect(next.fit).toBe('female');
    expect(next.selectedSizes).toEqual(['M']);
  });

  it('toggleSize adds and removes sizes', () => {
    const design = createDefaultTshirtDesign();
    const withLarge = toggleSize(design, 'L');
    expect(withLarge.selectedSizes).toContain('L');

    const withoutMedium = toggleSize(withLarge, 'M');
    expect(withoutMedium.selectedSizes).not.toContain('M');
    expect(withoutMedium.selectedSizes).toContain('L');
  });

  it('addImageElement enforces max 2 images', () => {
    let design = createDefaultTshirtDesign();
    design = addImageElement(design, { src: 'a', fileName: 'a.png' }).design;
    design = addImageElement(design, { src: 'b', fileName: 'b.png' }).design;

    const third = addImageElement(design, { src: 'c', fileName: 'c.png' });
    expect(third.error).toMatch(/max 2 images/i);
  });
});