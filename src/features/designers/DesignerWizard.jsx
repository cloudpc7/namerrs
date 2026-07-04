/**
 * DesignerWizard.jsx — Multi-step designer flow: design → quantity → schedule → cart.
 */

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/slices/cart.slice';
import { closePanel, openCart } from '../../redux/slices/design.slice';
import { selectPricing, selectProductContent } from '../../redux/slices/content.slice';
import {
  formatDateLabel,
  getMinimumCompletionDate,
  isValidCompletionDate,
} from '../../utils/businessDays';
import { getTshirtLineTotal, sumSizeQuantities } from '../../utils/tshirtPricing';
import { getDesignerComponent } from './registry';
import { getQuantityStepComponent } from './quantity/registry';
import { validateDesignStep } from './validationRegistry';

const STEPS = ['design', 'quantity', 'schedule'];

const buildInitialSizeQuantities = (design) => {
  const sizes = design?.selectedSizes || ['M'];
  return sizes.reduce((acc, size) => ({ ...acc, [size]: 1 }), {});
};

const DesignerWizard = ({ productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProductContent(state, productId));
  const pricing = useSelector(selectPricing);
  const DesignerComponent = getDesignerComponent(productId);
  const QuantityStepComponent = getQuantityStepComponent(productId);

  const [step, setStep] = useState('design');
  const [design, setDesign] = useState({});
  const [quantity, setQuantity] = useState(product?.minQuantity || 1);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [completionDate, setCompletionDate] = useState('');
  const [designErrors, setDesignErrors] = useState([]);
  const [quantityError, setQuantityError] = useState('');
  const [scheduleError, setScheduleError] = useState('');

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
    setDesign((current) => {
      const next = { ...current, ...updates };
      if (productId === 'tshirts' && updates.selectedSizes) {
        setSizeQuantities((prev) => {
          const nextQty = {};
          updates.selectedSizes.forEach((size) => {
            nextQty[size] = prev[size] ?? 1;
          });
          return nextQty;
        });
      }
      return next;
    });
    setDesignErrors([]);
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
    const index = STEPS.indexOf(step);

    if (step === 'design') {
      const errors = validateDesignStep(productId, design);
      if (errors.length) {
        setDesignErrors(errors);
        return;
      }
      setDesignErrors([]);
      if (productId === 'tshirts' && !Object.keys(sizeQuantities).length) {
        setSizeQuantities(buildInitialSizeQuantities(design));
      }
    }

    if (step === 'quantity') {
      const error = validateQuantityStep();
      if (error) {
        setQuantityError(error);
        return;
      }
      setQuantityError('');
    }

    if (index < STEPS.length - 1) {
      setStep(STEPS[index + 1]);
    }
  };

  const goBack = () => {
    const index = STEPS.indexOf(step);
    if (index > 0) {
      setStep(STEPS[index - 1]);
    }
  };

  const handleAddToCart = () => {
    if (!isValidCompletionDate(completionDate)) {
      setScheduleError('Please allow at least 5 business days for production.');
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
    return <p className="text-[#6b7280]">Designer not available for this product.</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2 text-xs font-medium uppercase tracking-wide text-[#6b7280]">
        {STEPS.map((stepName) => (
          <span key={stepName} className={step === stepName ? 'text-[#1d4ed8]' : ''}>
            {stepName}
          </span>
        ))}
      </div>

      {step === 'design' && (
        <>
          <DesignerComponent design={design} onChange={handleDesignChange} product={product} />
          {designErrors.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3" role="alert">
              <p className="text-sm font-medium text-red-900">Fix these before continuing:</p>
              <ul className="mt-1 list-inside list-disc text-sm text-red-800">
                {designErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {step === 'quantity' && (
        <QuantityStepComponent
          product={product}
          design={design}
          quantity={quantity}
          onQuantityChange={setQuantity}
          sizeQuantities={sizeQuantities}
          onSizeQuantitiesChange={setSizeQuantities}
          configuredUnitPrice={configuredPrice}
          unitPrice={unitPrice}
          lineTotal={lineTotal}
          error={quantityError}
        />
      )}

      {step === 'schedule' && (
        <div className="space-y-3">
          <label htmlFor="completion-date" className="block text-sm font-medium text-[#374151]">
            Requested completion date
          </label>
          <input
            id="completion-date"
            type="date"
            min={minDate}
            value={completionDate}
            onChange={(event) => {
              setCompletionDate(event.target.value);
              setScheduleError('');
            }}
            className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm focus:border-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd]"
          />
          {scheduleError && (
            <p className="text-sm text-red-600" role="alert">
              {scheduleError}
            </p>
          )}
          {completionDate && isValidCompletionDate(completionDate) && (
            <p className="text-sm text-[#6b7280]">
              Scheduled for {formatDateLabel(completionDate)}
            </p>
          )}
          <p className="text-xs text-[#9ca3af]">
            Please allow at least 5 business days for production.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 border-t border-[#e5e7eb] pt-4">
        {step !== 'design' && (
          <button
            type="button"
            onClick={goBack}
            className="rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd]"
          >
            Back
          </button>
        )}
        {step !== 'schedule' ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg bg-[#1d4ed8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[#93c5fd]"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-lg bg-[#1d4ed8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[#93c5fd]"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default DesignerWizard;