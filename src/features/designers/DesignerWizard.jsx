/**
 * DesignerWizard.jsx — Multi-step designer flow: design → quantity → schedule → cart.
 */

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/slices/cart.slice';
import {
  closePanel,
  openCart,
  selectDesignerProductId,
  selectWizardState,
  setWizardCompletionDate,
  setWizardDesignErrors,
  setWizardQuantity,
  setWizardQuantityError,
  setWizardScheduleError,
  setWizardSizeQuantities,
  setWizardStep,
  updateWizardDesign,
} from '../../redux/slices/design.slice';
import { selectPricing, selectProductContent } from '../../redux/slices/content.slice';
import { WIZARD_STEP, WIZARD_STEPS } from '../../redux/constants/design.constants';
import { Alert, StepIndicator, Stack } from '../../ui/components/primitives';
import {
  formatDateLabel,
  getMinimumCompletionDate,
  isValidCompletionDate,
} from '../../utils/businessDays';
import { getTshirtLineTotal, sumSizeQuantities } from '../../utils/tshirtPricing';
import { getDesignerComponent } from './registry';
import { getQuantityStepComponent } from './quantity/registry';
import { validateDesignStep } from './validationRegistry';

const buildInitialSizeQuantities = (design) => {
  const sizes = design?.selectedSizes || ['M'];
  return sizes.reduce((acc, size) => ({ ...acc, [size]: 1 }), {});
};

const DesignerWizard = () => {
  const dispatch = useDispatch();
  const productId = useSelector(selectDesignerProductId);
  const wizard = useSelector(selectWizardState);
  const product = useSelector((state) => selectProductContent(state, productId));
  const pricing = useSelector(selectPricing);
  const DesignerComponent = getDesignerComponent(productId);
  const QuantityStepComponent = getQuantityStepComponent(productId);

  const {
    step,
    design,
    quantity,
    sizeQuantities,
    completionDate,
    designErrors,
    quantityError,
    scheduleError,
  } = wizard;

  const configuredPrice = Number(pricing[productId]) || 0;
  const minDate = getMinimumCompletionDate().toISOString().slice(0, 10);

  const { totalQuantity, lineTotal, unitPrice } = useMemo(() => {
    if (productId === 'tshirts') {
      const total = sumSizeQuantities(sizeQuantities);
      const totalPrice = getTshirtLineTotal(total, configuredPrice);
      const unit = total > 0 && configuredPrice ? totalPrice / total : 0;
      return { totalQuantity: total, lineTotal: totalPrice, unitPrice: unit };
    }

    const unit = configuredPrice;
    return {
      totalQuantity: quantity,
      lineTotal: unit * quantity,
      unitPrice: unit,
    };
  }, [productId, sizeQuantities, quantity, configuredPrice]);

  const handleDesignChange = (updates) => {
    dispatch(updateWizardDesign(updates));

    if (productId === 'tshirts' && updates.selectedSizes) {
      const nextQty = {};
      updates.selectedSizes.forEach((size) => {
        nextQty[size] = sizeQuantities[size] ?? 1;
      });
      dispatch(setWizardSizeQuantities(nextQty));
    }
  };

  const validateQuantityStep = () => {
    if (productId === 'tshirts') {
      const total = sumSizeQuantities(sizeQuantities);
      if (total < 1) {
        return 'Order at least 1 shirt across your selected sizes.';
      }
      return '';
    }

    if (productId === 'magnets' && ![1, 2, 3].includes(quantity)) {
      return 'Magnets are available in quantities of 1, 2, or 3.';
    }

    const minQty = product?.minQuantity || 1;
    if (quantity < minQty) {
      return `Minimum order is ${minQty}.`;
    }

    return '';
  };

  const goNext = () => {
    const index = WIZARD_STEPS.indexOf(step);

    if (step === WIZARD_STEP.DESIGN) {
      const errors = validateDesignStep(productId, design);
      if (errors.length) {
        dispatch(setWizardDesignErrors(errors));
        return;
      }
      dispatch(setWizardDesignErrors([]));
      if (productId === 'tshirts' && !Object.keys(sizeQuantities).length) {
        dispatch(setWizardSizeQuantities(buildInitialSizeQuantities(design)));
      }
    }

    if (step === WIZARD_STEP.QUANTITY) {
      const error = validateQuantityStep();
      if (error) {
        dispatch(setWizardQuantityError(error));
        return;
      }
      dispatch(setWizardQuantityError(''));
    }

    if (index < WIZARD_STEPS.length - 1) {
      dispatch(setWizardStep(WIZARD_STEPS[index + 1]));
    }
  };

  const goBack = () => {
    const index = WIZARD_STEPS.indexOf(step);
    if (index > 0) {
      dispatch(setWizardStep(WIZARD_STEPS[index - 1]));
    }
  };

  const handleAddToCart = () => {
    if (!isValidCompletionDate(completionDate)) {
      dispatch(setWizardScheduleError('Please allow at least 5 business days for production.'));
      return;
    }

    dispatch(
      addCartItem({
        productId,
        productName: product?.name,
        quantity: totalQuantity,
        unitPrice,
        lineTotal,
        completionDate,
        design,
        ...(productId === 'tshirts' ? { sizeQuantities } : {}),
      })
    );
    dispatch(closePanel());
    dispatch(openCart());
  };

  if (!DesignerComponent) {
    return <Alert variant="info">Designer not available for this product.</Alert>;
  }

  return (
    <Stack gap="md">
      <StepIndicator steps={WIZARD_STEPS} currentStep={step} />

      {step === WIZARD_STEP.DESIGN && (
        <>
          <DesignerComponent design={design} onChange={handleDesignChange} product={product} />
          {designErrors.length > 0 && (
            <Alert variant="error">
              <strong>Fix these before continuing:</strong>
              <ul className="design-errors-list">
                {designErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
        </>
      )}

      {step === WIZARD_STEP.QUANTITY && (
        <QuantityStepComponent
          product={product}
          design={design}
          quantity={quantity}
          onQuantityChange={(value) => dispatch(setWizardQuantity(value))}
          sizeQuantities={sizeQuantities}
          onSizeQuantitiesChange={(value) => dispatch(setWizardSizeQuantities(value))}
          configuredUnitPrice={configuredPrice}
          unitPrice={unitPrice}
          lineTotal={lineTotal}
          error={quantityError}
        />
      )}

      {step === WIZARD_STEP.SCHEDULE && (
        <div className="form-field">
          <label htmlFor="completion-date" className="form-label">
            Requested completion date
          </label>
          <input
            id="completion-date"
            type="date"
            min={minDate}
            value={completionDate}
            onChange={(event) => dispatch(setWizardCompletionDate(event.target.value))}
            className="form-input"
          />
          {scheduleError && <p className="form-error" role="alert">{scheduleError}</p>}
          {completionDate && isValidCompletionDate(completionDate) && (
            <p className="form-hint">Scheduled for {formatDateLabel(completionDate)}</p>
          )}
          <p className="form-hint">Please allow at least 5 business days for production.</p>
        </div>
      )}

      <div className="wizard-actions">
        {step !== WIZARD_STEP.DESIGN && (
          <button type="button" onClick={goBack} className="btn btn--secondary btn--md">
            Back
          </button>
        )}
        {step !== WIZARD_STEP.SCHEDULE ? (
          <button type="button" onClick={goNext} className="btn btn--primary btn--md">
            Continue
          </button>
        ) : (
          <button type="button" onClick={handleAddToCart} className="btn btn--primary btn--md">
            Add to cart
          </button>
        )}
      </div>
    </Stack>
  );
};

export default DesignerWizard;