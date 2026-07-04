/**
 * TextField.jsx — Accessible labeled input/textarea for forms.
 */

const TextField = ({
  id,
  label,
  as = 'input',
  error,
  hint,
  className = '',
  ...props
}) => {
  const InputComponent = as;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`form-field ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <InputComponent
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="form-input"
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="form-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextField;