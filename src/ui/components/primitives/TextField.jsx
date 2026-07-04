/**
 * TextField.jsx — Accessible labeled input/textarea for forms.
 */

const inputClass =
  'mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] shadow-sm transition-colors placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]';

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
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      )}
      <InputComponent
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={inputClass}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-[var(--color-text-secondary)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextField;