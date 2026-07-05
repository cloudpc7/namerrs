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
  if (design.inputMode === 'text' && design.companyName) {
    return `Magnet preview: ${design.companyName}`;
  }
  return 'Vehicle magnet preview';
};