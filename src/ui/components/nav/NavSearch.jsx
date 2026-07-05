/**
 * NavSearch.jsx — Collapsible product search for the navbar.
 */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleHashHref } from '../../../utils/hashNavigation';
import { Search } from 'lucide-react';
import { IconButton, SearchField } from '../primitives';

const NavSearch = ({
  value = '',
  onSearch = () => {},
  variant = 'desktop',
  onCloseMenu,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(value);
  const [isExpanded, setIsExpanded] = useState(variant === 'drawer');

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
    setIsExpanded(false);
    onCloseMenu?.();

    handleHashHref('/#products', { pathname: location.pathname, navigate });
  };

  if (variant === 'drawer') {
    return (
      <SearchField
        id="nav-search-drawer"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onSubmit={handleSubmit}
        hideLabel
        className="nav-search nav-search--drawer"
      />
    );
  }

  return (
    <div className={`nav-search${isExpanded ? ' nav-search--expanded' : ''}`}>
      {isExpanded ? (
        <SearchField
          id="nav-search-desktop"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onSubmit={handleSubmit}
          className="nav-search__field"
        />
      ) : (
        <IconButton label="Search products" onClick={() => setIsExpanded(true)}>
          <Search size={20} aria-hidden="true" />
        </IconButton>
      )}
    </div>
  );
};

export default NavSearch;