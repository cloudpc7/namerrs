/**
 * StepIndicator.jsx — Multi-step flow progress labels.
 */

const StepIndicator = ({ steps = [], currentStep, className = '' }) => (
  <div className={`step-indicator ${className}`.trim()} aria-label="Progress">
    {steps.map((step) => (
      <span
        key={step}
        className={step === currentStep ? 'step-indicator__step--active' : ''}
      >
        {step}
      </span>
    ))}
  </div>
);

export default StepIndicator;