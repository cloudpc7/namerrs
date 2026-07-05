/**
 * constants.js — Magnet designer specs (12" × 24" vehicle magnet).
 */

export const MAGNET_COLORS = [
  { id: 'white', label: 'White', hex: '#ffffff' },
  { id: 'black', label: 'Black', hex: '#000000' },
  { id: 'navy', label: 'Navy', hex: '#1e3a5f' },
  { id: 'red', label: 'Red', hex: '#dc2626' },
  { id: 'yellow', label: 'Yellow', hex: '#facc15' },
  { id: 'gray', label: 'Gray', hex: '#6b7280' },
];

export const MAGNET_PANEL = {
  TEXT: 'text',
  IMAGE: 'image',
  COLOR: 'color',
};

export const MAGNET_WIZARD_TABS = [
  { id: MAGNET_PANEL.TEXT, label: 'Text' },
  { id: MAGNET_PANEL.IMAGE, label: 'Image' },
  { id: MAGNET_PANEL.COLOR, label: 'Color' },
  { id: 'quantity', label: 'Qty' },
  { id: 'schedule', label: 'Date' },
];