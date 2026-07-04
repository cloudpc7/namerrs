/**
 * Surface.jsx — Muted background panel for grouped content.
 */

const PADDING = {
  none: '',
  md: 'surface--padding-md',
  lg: 'surface--padding-lg',
};

const Surface = ({ padding = 'md', className = '', children, ...props }) => {
  const classes = ['surface', PADDING[padding] || '', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Surface;