/**
 * IconButton.jsx — Accessible round icon-only control.
 */

const IconButton = ({
  label,
  className = '',
  children,
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    aria-label={label}
    className={`icon-btn ${className}`.trim()}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;