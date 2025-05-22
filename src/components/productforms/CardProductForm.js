import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ChromePicker } from 'react-color';
import { cardFormValidation } from '../../utils/cardFormValidation';
import GoogleAddressApi from '../../utils/googleAddressApi';
import { CardDesignContext } from '../../providers/products/cardDesignProvider';
import DOMPurify from 'dompurify';
import debounce from 'lodash.debounce';
import '../../styles/components/products/products.scss';
import Spinner from '../../utils/Spinner';

const CardProductForm = () => {
  const [errors, setErrors] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const context = useContext(CardDesignContext);
  const { isLoading, errMsg } = useSelector((state) => state.cardDesign);
  const firstErrorRef = useRef(null);

  const sanitizeInput = useCallback(
    (value) => DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),
    []
  );

  const debouncedHandleInfo = useCallback(
    debounce((field, value) => {
      const sanitizedValue = sanitizeInput(value);
      context.handleInfo(field, sanitizedValue);
    }, 300),
    [context, sanitizeInput]
  );

  const handleValidation = async (field, value) => {
    try {
      await cardFormValidation.validateAt(field, { [field]: value });
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: error.message || 'Validation failed' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cardFormValidation.validate(context.info, { abortEarly: false });
      setErrors({});
      console.log('Form submitted:', {
        cardStock: context.cardStock,
        cardColor: context.cardColor,
        info: context.info,
        font: context.font,
      });
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (errors.businessName && firstErrorRef.current) {
      firstErrorRef.current.focus();
    } else if (errors.email && firstErrorRef.current) {
      firstErrorRef.current.focus();
    } else if (errors.phone && firstErrorRef.current) {
      firstErrorRef.current.focus();
    } else if (errors.address && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  if (!context) {
    return (
      <div
        className="error-message bg-danger-subtle p-3 rounded d-flex align-items-center"
        role="alert"
        aria-live="assertive"
        data-testid="context-error"
      >
        <span className="text-danger me-2">⚠️</span>
        <span>Form context is unavailable. Please try again later.</span>
        <Button
          variant="link"
          className="ms-2 p-0"
          onClick={() => window.location.reload()}
          aria-label="Reload page"
        >
          Reload
        </Button>
      </div>
    );
  }

  const { cardStock, cardColor, info, font, fonts, handleCardStock, handleCardColor, handleSelectedFont } = context;

  const MemoizedChromePicker = React.memo(() => (
    <ChromePicker
      color={cardColor}
      onChangeComplete={(color) => handleCardColor(color.hex)}
      disableAlpha
    />
  ));

  return (
    <Form onSubmit={handleSubmit} data-testid="card-design-form" className="card-design-form">
      {errMsg && (
        <div
          className="error-message bg-danger-subtle p-3 rounded mb-3 d-flex align-items-center"
          role="alert"
          aria-live="assertive"
        >
          <span className="text-danger me-2">⚠️</span>
          <span>{errMsg}</span>
        </div>
      )}
      {errors.general && (
        <div
          className="error-message bg-danger-subtle p-3 rounded mb-3 d-flex align-items-center"
          role="alert"
          aria-live="assertive"
        >
          <span className="text-danger me-2">⚠️</span>
          <span>{errors.general}</span>
        </div>
      )}

      <Form.Group controlId="cardStock" className="mb-3">
        <Form.Label>Card Stock</Form.Label>
        <Form.Select
          aria-label="Card stock selection"
          value={cardStock}
          onChange={(e) => handleCardStock(e.target.value)}
          data-testid="card-stock-select"
        >
          <option value="default">Select Card Stock</option>
          <option value="gloss">Gloss</option>
          <option value="matte">Matte</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="businessName" className="mb-3">
        <Form.Label>
          Business Name <span className="text-danger" aria-label="required">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Business Name"
          value={info.businessName}
          onChange={(e) => debouncedHandleInfo('businessName', e.target.value)}
          onBlur={() => handleValidation('businessName', info.businessName)}
          isInvalid={!!errors.businessName}
          aria-label="Business name input"
          aria-describedby={errors.businessName ? 'businessName-error' : undefined}
          aria-required="true"
          ref={errors.businessName ? firstErrorRef : null}
        />
        <Form.Control.Feedback type="invalid" id="businessName-error" role="alert">
          {errors.businessName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email" className="mb-3">
        <Form.Label>
          Email Address <span className="text-danger" aria-label="required">*</span>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Email Address"
          value={info.email}
          onChange={(e) => debouncedHandleInfo('email', e.target.value)}
          onBlur={() => handleValidation('email', info.email)}
          isInvalid={!!errors.email}
          aria-label="Email input"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-required="true"
          ref={errors.email && !errors.businessName ? firstErrorRef : null}
        />
        <Form.Control.Feedback type="invalid" id="email-error" role="alert">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phone" className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Phone Number"
          value={info.phone}
          onChange={(e) => debouncedHandleInfo('phone', e.target.value)}
          onBlur={() => handleValidation('phone', info.phone)}
          isInvalid={!!errors.phone}
          aria-label="Phone number input"
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          ref={errors.phone && !errors.businessName && !errors.email ? firstErrorRef : null}
        />
        <Form.Control.Feedback type="invalid" id="phone-error" role="alert">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="address" className="mb-3">
        <Form.Label>
          Address <span className="text-danger" aria-label="required">*</span>
        </Form.Label>
        <GoogleAddressApi
          initialAddress={info.address}
          onAddressSelect={(address) => debouncedHandleInfo('address', address)}
          onBlur={() => handleValidation('address', info.address)}
          isInvalid={!!errors.address}
          feedback={<Form.Control.Feedback type="invalid" id="address-error" role="alert">{errors.address}</Form.Control.Feedback>}
          ref={errors.address && !errors.businessName && !errors.email && !errors.phone ? firstErrorRef : null}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Card Color</Form.Label>
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => setShowColorPicker(!showColorPicker)}
            aria-label="Toggle color picker"
            aria-expanded={showColorPicker}
          >
            {showColorPicker ? 'Close Color Picker' : 'Open Color Picker'}
          </Button>
          {showColorPicker && (
            <div className="color-picker-container">
              <MemoizedChromePicker />
            </div>
          )}
        </div>
      </Form.Group>

      <Form.Group controlId="font" className="mb-3">
        <Form.Label>
          Font{' '}
          {isLoading && (
            <Spinner
              size="sm"
              color="primary"
              ariaLabel="Loading fonts"
              className="ms-2"
              role="status"
            />
          )}
        </Form.Label>
        <Form.Select
          aria-label="Font selection"
          value={font}
          onChange={(e) => handleSelectedFont(e.target.value)}
          data-testid="font-select"
          disabled={isLoading || !fonts.length}
          aria-describedby={fonts.length || isLoading ? undefined : 'font-error'}
        >
          <option value="">Select Font</option>
          {fonts.map((fontOption) => (
            <option key={fontOption.family} value={fontOption.family}>
              {fontOption.family}
            </option>
          ))}
        </Form.Select>
        {!fonts.length && !isLoading && (
          <div className="text-danger mt-1" id="font-error" role="alert">
            No fonts available. Please try again later.
          </div>
        )}
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={isLoading}
        className="d-flex align-items-center"
      >
        {isLoading && (
          <Spinner
            size="sm"
            color="primary"
            ariaLabel="Submitting form"
            className="me-2"
            role="status"
          />
        )}
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
  );
};

export default CardProductForm;