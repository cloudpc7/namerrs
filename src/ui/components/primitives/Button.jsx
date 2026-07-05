/**
 * Button.jsx — Shared button styles for marketing and commerce UI.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleHashHref, parseHashHref } from '../../../utils/hashNavigation';

const VARIANTS = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  ghost: 'btn--ghost',
  dark: 'btn--dark',
};

const SIZES = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  href,
  to,
  children,
  onClick,
  ...props
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = `btn ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`.trim();
  const { sectionId } = href ? parseHashHref(href) : { sectionId: null };

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  if (href && sectionId) {
    return (
      <a
        href={href}
        className={classes}
        onClick={(event) => {
          event.preventDefault();
          handleHashHref(href, { pathname: location.pathname, navigate });
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;