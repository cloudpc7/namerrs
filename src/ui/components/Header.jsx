/**
 * Header.jsx — Site header wiring Redux state into the navigation bar.
 */

import { useSelector } from 'react-redux';
import { Navbar } from './nav';
import { NAV_LINKS } from '../../constants/navigation.constants';
import { DEFAULT_SOCIAL_LINKS, LOGO_PATH } from '../../constants/social.constants';
import { selectSocialLinks } from '../../redux/slices/content.slice';
import { selectCartCount } from '../../redux/slices/cart.slice';
import { selectProductSearch } from '../../redux/slices/ui.slice';

const Header = ({ onCartClick = () => {}, onSearch = () => {} }) => {
  const cartCount = useSelector(selectCartCount);
  const searchValue = useSelector(selectProductSearch);
  const socialFromStore = useSelector(selectSocialLinks);
  const socialLinks = Object.keys(socialFromStore || {}).length
    ? socialFromStore
    : DEFAULT_SOCIAL_LINKS;

  return (
    <Navbar
      logoSrc={LOGO_PATH}
      logoAlt="Namerrs Signs and Printing"
      links={NAV_LINKS}
      socialLinks={socialLinks}
      showSearch
      searchValue={searchValue}
      onSearch={onSearch}
      onCartClick={onCartClick}
      cartCount={cartCount}
    />
  );
};

export default Header;