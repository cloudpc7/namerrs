/**
 * registry.js — Maps product IDs to designer components.
 */

import BusinessCardDesigner from './BusinessCardDesigner';
import TshirtDesigner from './TshirtDesigner';
import BannerDesigner from './BannerDesigner';
import HatDesigner from './HatDesigner';
import MagnetDesigner from './MagnetDesigner';
import MemorialDesigner from './MemorialDesigner';

export const DESIGNER_REGISTRY = {
  businessCards: BusinessCardDesigner,
  tshirts: TshirtDesigner,
  banners: BannerDesigner,
  hats: HatDesigner,
  magnets: MagnetDesigner,
  memorial: MemorialDesigner,
};

export const getDesignerComponent = (productId) => DESIGNER_REGISTRY[productId] || null;