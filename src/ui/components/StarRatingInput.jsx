/**
 * StarRatingInput.jsx — Interactive star rating picker for review forms.
 */

const StarRatingInput = ({ id, value, onChange, max = 5 }) => {
  const handleKeyDown = (event, starValue) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      onChange(Math.max(1, value - 1));
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      onChange(Math.min(max, value + 1));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      onChange(1);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      onChange(max);
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onChange(starValue);
    }
  };

  return (
    <div>
      <span id={`${id}-label`} className="block text-sm font-medium text-[var(--color-text-primary)]">
        Rating
      </span>
      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        className="mt-2 flex items-center gap-1"
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= value;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={value === starValue}
              aria-label={`${starValue} star${starValue === 1 ? '' : 's'}`}
              tabIndex={value === starValue ? 0 : -1}
              onClick={() => onChange(starValue)}
              onKeyDown={(event) => handleKeyDown(event, starValue)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-md text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] ${
                filled ? 'text-[#f59e0b]' : 'text-[var(--color-border)] hover:text-[#fcd34d]'
              }`}
            >
              ★
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarRatingInput;