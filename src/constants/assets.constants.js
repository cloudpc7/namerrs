/**
 * assets.constants.js — Static image paths (from cloudpc7/namerrs GitHub assets).
 */

export const LOGO_PATH = '/assets/logo.png';
export const LOGO_SVG_PATH = '/assets/logo.svg';

export const HERO_IMAGE_PATH = '/assets/images/namerrsHero.png';

export const PRODUCT_IMAGE_PATHS = {
  businessCards: '/assets/images/businesscards.png',
  tshirts: '/assets/images/tshirts.png',
  banners: '/assets/images/billboard.png',
  hats: '/assets/images/namerrs-black.png',
  magnets: '/assets/images/namerrsOriginal.png',
  memorial: '/assets/images/namerrsHero.png',
};

export const getProductImageUrl = (productId, product) =>
  product?.imageUrl || PRODUCT_IMAGE_PATHS[productId] || null;