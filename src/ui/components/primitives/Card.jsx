/**
 * Card.jsx — Reusable elevated surface with padding and interaction variants.
 */

const PADDING = {
  none: '',
  sm: 'card--padding-sm',
  md: 'card--padding-md',
  lg: 'card--padding-lg',
};

const Card = ({
  as: Component = 'div',
  variant = 'default',
  padding = 'none',
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'card',
    variant === 'elevated' && 'card--elevated',
    variant === 'interactive' && 'card--interactive',
    variant === 'selected' && 'card--selected',
    PADDING[padding] || '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Card;