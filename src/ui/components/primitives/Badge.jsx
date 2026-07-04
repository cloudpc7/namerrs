/**
 * Badge.jsx — Pill label for eyebrows and inline highlights.
 */

const Badge = ({ className = '', children, ...props }) => (
  <span className={`badge ${className}`.trim()} {...props}>
    {children}
  </span>
);

export default Badge;