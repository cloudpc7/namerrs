/**
 * EmptyState.jsx — Centered empty content with title, description, and optional action.
 */

const EmptyState = ({ title, description, children, className = '' }) => (
  <div className={`empty-state ${className}`.trim()}>
    <p className="empty-state__title">{title}</p>
    {description && <p className="empty-state__desc">{description}</p>}
    {children}
  </div>
);

export default EmptyState;