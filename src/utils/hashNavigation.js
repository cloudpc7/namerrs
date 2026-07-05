/**
 * hashNavigation.js — SPA-safe scrolling for home-page section anchors.
 */

export const HOME_SECTION_IDS = ['products', 'about', 'faq', 'reviews', 'contact'];

export const scrollToTop = (behavior = 'auto') => {
  window.scrollTo({ top: 0, left: 0, behavior });
};

export const scrollToSection = (sectionId, behavior = 'smooth') => {
  if (!sectionId) {
    return false;
  }

  const element = document.getElementById(sectionId);
  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior, block: 'start' });
  return true;
};

const scrollToSectionWhenReady = (sectionId, attempts = 0) => {
  if (scrollToSection(sectionId, 'auto')) {
    return;
  }

  if (attempts < 12) {
    requestAnimationFrame(() => scrollToSectionWhenReady(sectionId, attempts + 1));
  }
};

export const parseHashHref = (href) => {
  const [pathPart, hashPart] = String(href).split('#');
  return {
    path: pathPart || '/',
    sectionId: hashPart || null,
  };
};

export const isHomeSectionHash = (hash) => {
  const sectionId = String(hash || '').replace('#', '');
  return HOME_SECTION_IDS.includes(sectionId);
};

export const handleHashHref = (href, { pathname, navigate }) => {
  const { path, sectionId } = parseHashHref(href);

  if (pathname === path) {
    if (sectionId && HOME_SECTION_IDS.includes(sectionId)) {
      window.history.pushState(null, '', `#${sectionId}`);
      scrollToSection(sectionId);
      return;
    }

    if (!sectionId) {
      window.history.replaceState(null, '', path);
      scrollToTop('auto');
    }
    return;
  }

  navigate(sectionId ? `${path}#${sectionId}` : path);
};

export const handleRouteScroll = (pathname, hash) => {
  if (pathname !== '/') {
    scrollToTop('auto');
    return;
  }

  if (!hash || !isHomeSectionHash(hash)) {
    scrollToTop('auto');
    return;
  }

  const sectionId = hash.replace('#', '');
  scrollToSectionWhenReady(sectionId);
};

/** @deprecated Use handleRouteScroll */
export const scrollToHashFromLocation = handleRouteScroll;