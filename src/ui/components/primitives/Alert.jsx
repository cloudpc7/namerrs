/**
 * Alert.jsx — Calm, specific inline status messages.
 */

const VARIANTS = {
  error: 'alert--error',
  success: 'alert--success',
  info: 'alert--info',
};

const Alert = ({ variant = 'info', className = '', children, ...props }) => (
  <p
    className={`alert ${VARIANTS[variant] || VARIANTS.info} ${className}`.trim()}
    role={variant === 'error' ? 'alert' : 'status'}
    {...props}
  >
    {children}
  </p>
);

export default Alert;