import {
  handleHashHref,
  handleRouteScroll,
  parseHashHref,
  scrollToSection,
} from '../src/utils/hashNavigation';

describe('hashNavigation', () => {
  it('parses hash hrefs into path and section id', () => {
    expect(parseHashHref('/#products')).toEqual({ path: '/', sectionId: 'products' });
    expect(parseHashHref('/privacy')).toEqual({ path: '/privacy', sectionId: null });
  });

  it('scrolls to a section when already on the home page', () => {
    const element = document.createElement('div');
    element.id = 'products';
    element.scrollIntoView = jest.fn();
    document.body.appendChild(element);

    const navigate = jest.fn();
    handleHashHref('/#products', { pathname: '/', navigate });

    expect(navigate).not.toHaveBeenCalled();
    expect(window.location.hash).toBe('#products');
    expect(element.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    document.body.removeChild(element);
  });

  it('navigates to the home page when a hash link is clicked from another route', () => {
    const navigate = jest.fn();
    handleHashHref('/#contact', { pathname: '/privacy', navigate });

    expect(navigate).toHaveBeenCalledWith('/#contact');
  });

  it('returns false when the target section is missing', () => {
    expect(scrollToSection('missing-section')).toBe(false);
  });

  it('scrolls to top on home when there is no section hash', () => {
    window.scrollTo = jest.fn();

    handleRouteScroll('/', '');
    handleRouteScroll('/', '#main-content');

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
  });

  it('scrolls to top when home is clicked from the same route', () => {
    const replaceState = jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
    window.scrollTo = jest.fn();

    handleHashHref('/', { pathname: '/', navigate: jest.fn() });

    expect(replaceState).toHaveBeenCalledWith(null, '', '/');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });

    replaceState.mockRestore();
  });
});