/**
 * assets.constants.js — Static image paths (from cloudpc7/namerrs GitHub assets).
 */

export const LOGO_PATH = '/assets/logo.png';
export const LOGO_SVG_PATH = '/assets/logo.svg';
/** Transparent Namerrs mark for dark backgrounds (namerrsOriginal.png is opaque black). */
export const FOOTER_LOGO_PATH = '/assets/images/namerrsOriginal-footer.png';

export const HERO_IMAGE_PATH = '/assets/images/namerrsHero.png';

/** Shared product card / catalog image for all products. */
export const PRODUCT_CARD_IMAGE_PATH = '/assets/images/namerrs-black.png';

export const PRODUCT_IMAGE_PATHS = {
  businessCards: PRODUCT_CARD_IMAGE_PATH,
  tshirts: PRODUCT_CARD_IMAGE_PATH,
  banners: PRODUCT_CARD_IMAGE_PATH,
  hats: PRODUCT_CARD_IMAGE_PATH,
  magnets: PRODUCT_CARD_IMAGE_PATH,
  memorial: PRODUCT_CARD_IMAGE_PATH,
};

export const getProductImageUrl = (productId) =>
  PRODUCT_IMAGE_PATHS[productId] || PRODUCT_CARD_IMAGE_PATH;