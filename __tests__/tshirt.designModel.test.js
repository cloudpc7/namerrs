/**
 * tshirt.designModel.test.js — T-shirt design state helpers.
 */

import {
  addImageElement,
  addTextElement,
  createDefaultTshirtDesign,
  removeElement,
  selectSize,
  updateFit,
} from '../src/features/designers/tshirt/designModel';

describe('tshirt designModel', () => {
  it('createDefaultTshirtDesign includes one centered front text line', () => {
    const design = createDefaultTshirtDesign();
    expect(design.version).toBe(1);
    expect(design.activeView).toBe('front');
    expect(design.frontPrintPlacement).toBe('front-chest');
    expect(design.backPrintPlacement).toBe('back-upper');

    const textElements = design.elements.filter((el) => el.type === 'text');
    expect(textElements).toHaveLength(1);
    expect(textElements[0].fieldKey).toBe('line1');
    expect(textElements[0].side).toBe('front');
    expect(textElements[0].textAlign).toBe('center');
    expect(textElements[0].y).toBe(34);
    expect(textElements[0].width).toBe(40);
  });

  it('updateFit removes sizes not available for female fit', () => {
    const design = { ...createDefaultTshirtDesign(), selectedSizes: ['3XL'] };
    const next = updateFit(design, 'female');

    expect(next.fit).toBe('female');
    expect(next.selectedSizes).toEqual(['M']);
  });

  it('selectSize keeps only one size selected', () => {
    const design = createDefaultTshirtDesign();
    const withLarge = selectSize(design, 'L');
    expect(withLarge.selectedSizes).toEqual(['L']);

    const withExtraLarge = selectSize(withLarge, 'XL');
    expect(withExtraLarge.selectedSizes).toEqual(['XL']);
  });

  it('addTextElement restores a removed text line', () => {
    const design = createDefaultTshirtDesign();
    const line1 = design.elements.find((element) => element.fieldKey === 'line1');
    const withoutLine1 = removeElement(design, line1.id);
    const restored = addTextElement(withoutLine1, 'line1');

    expect(restored.elements.filter((element) => element.fieldKey === 'line1')).toHaveLength(1);
  });

  it('addImageElement enforces max 2 images', () => {
    let design = createDefaultTshirtDesign();
    design = addImageElement(design, { src: 'a', fileName: 'a.png' }).design;
    design = addImageElement(design, { src: 'b', fileName: 'b.png' }).design;

    const third = addImageElement(design, { src: 'c', fileName: 'c.png' });
    expect(third.error).toMatch(/max 2 images/i);
  });
});