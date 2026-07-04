/**
 * Stack.jsx — Vertical flex layout with consistent spacing gaps.
 */

const GAPS = {
  sm: 'stack--sm',
  md: '',
  lg: 'stack--lg',
  xl: 'stack--xl',
};

const Stack = ({ gap = 'md', className = '', children, ...props }) => (
  <div className={`stack ${GAPS[gap] || ''} ${className}`.trim()} {...props}>
    {children}
  </div>
);

export default Stack;