/**
 * designModel.js — Magnet customizer (12" × 24" vehicle magnet).
 */

import { createDefaultHatDesign, normalizeHatDesign } from '../hat/designModel';

export const MAGNET_SIZE = { width: 12, height: 24, label: '12" × 24"' };

export const createDefaultMagnetDesign = () => ({
  ...createDefaultHatDesign(),
  productType: 'magnet',
  magnetSize: MAGNET_SIZE,
  hatColor: '#ffffff',
  textColor: '#000000',
});

export const normalizeMagnetDesign = (design) => {
  if (design?.version === 1) {
    return { ...createDefaultMagnetDesign(), ...design };
  }
  return createDefaultMagnetDesign();
};

export const buildMagnetPreviewLabel = (design) => {
  const colorNote = design.hatColor ? ` on ${design.hatColor} background` : '';

  if (design.inputMode === 'text') {
    const text = design.companyName || 'your text';
    return `Vehicle magnet preview, text mode: ${text}${colorNote}`;
  }

  if (design.imageSrc) {
    const file = design.imageFileName || 'uploaded graphic';
    return `Vehicle magnet preview, image mode: ${file}${colorNote}`;
  }

  return `Vehicle magnet preview, image mode, no graphic yet${colorNote}`;
};