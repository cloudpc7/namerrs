import '../styles/components/spinners/Spinner.scss'

const Spinner = ({ size = 'md', color = 'primary', ariaLabel = 'Loading' }) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const colorClass = `spinner-${color}`;

  return (
    <div
      className={`spinner ${sizeClass} ${colorClass}`}
      role="status"
      aria-label={ariaLabel}
    >
      <span className="visually-hidden">{ariaLabel}</span>
    </div>
  );
};

export default Spinner;