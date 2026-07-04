/**
 * ProductOptionsForm.jsx — Interactive product options driven by RTDB config.
 */

import { useDispatch, useSelector } from 'react-redux';
import {
  selectProductDetailOptions,
  setProductOption,
} from '../../redux/slices/productDetail.slice';

const ProductOptionsForm = ({ options = [] }) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector(selectProductDetailOptions);

  if (!options.length) {
    return null;
  }

  return (
    <div className="product-options">
      {options.map((option) => {
        const value = selectedOptions[option.id] ?? option.defaultValue ?? '';

        if (option.type === 'radio') {
          return (
            <fieldset key={option.id} className="product-options__group">
              <legend className="product-options__label">{option.label}</legend>
              <div className="product-options__choices">
                {option.choices.map((choice) => (
                  <label key={choice.value} className="product-options__choice">
                    <input
                      type="radio"
                      name={`product-option-${option.id}`}
                      value={choice.value}
                      checked={value === choice.value}
                      onChange={() =>
                        dispatch(
                          setProductOption({ optionId: option.id, value: choice.value })
                        )
                      }
                    />
                    <span>{choice.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        }

        return (
          <div key={option.id} className="product-options__group">
            <label htmlFor={`product-option-${option.id}`} className="product-options__label">
              {option.label}
            </label>
            <select
              id={`product-option-${option.id}`}
              className="product-options__select"
              value={value}
              onChange={(event) =>
                dispatch(
                  setProductOption({ optionId: option.id, value: event.target.value })
                )
              }
            >
              {option.choices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptionsForm;