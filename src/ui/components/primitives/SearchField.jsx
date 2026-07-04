/**
 * SearchField.jsx — Labeled search input for navbar and filters.
 */

import { Search } from 'lucide-react';

const SearchField = ({
  id,
  label = 'Search products',
  value,
  onChange,
  onSubmit,
  className = '',
  inputClassName = '',
  hideLabel = true,
}) => (
  <form onSubmit={onSubmit} className={`form-field ${className}`.trim()}>
    <label htmlFor={id} className={hideLabel ? 'sr-only' : 'form-label'}>
      {label}
    </label>
    <div className="search-field">
      <Search size={16} className="search-field__icon" aria-hidden="true" />
      <input
        id={id}
        type="search"
        placeholder="Search products"
        value={value}
        onChange={onChange}
        className={`form-input form-input--search ${inputClassName}`.trim()}
      />
    </div>
  </form>
);

export default SearchField;