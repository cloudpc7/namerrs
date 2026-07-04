/**
 * StepIndicator.jsx — Clickable multi-step progress for the designer wizard.
 */

const STEP_LABELS = {
  design: 'Design',
  quantity: 'Quantity',
  schedule: 'Schedule',
};

const StepIndicator = ({
  steps = [],
  currentStep,
  onStepClick,
  className = '',
}) => {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <nav className={`step-indicator ${className}`.trim()} aria-label="Designer steps">
      <ol className="step-indicator__list">
        {steps.map((step, index) => {
          const isActive = step === currentStep;
          const isComplete = index < currentIndex;
          const canNavigate = isComplete;

          return (
            <li key={step} className="step-indicator__item">
              <button
                type="button"
                className={`step-indicator__step${
                  isActive ? ' step-indicator__step--active' : ''
                }${isComplete ? ' step-indicator__step--complete' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                disabled={!canNavigate}
                onClick={() => canNavigate && onStepClick?.(step)}
              >
                <span className="step-indicator__label">
                  {STEP_LABELS[step] || step}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default StepIndicator;