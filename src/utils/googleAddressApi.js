import { useState, useRef, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import DOMPurify from 'dompurify';
import Spinner from './Spinner';

const libraries = ['places'];

const GoogleAddressApi = ({ initialAddress = '', onAddressSelect, onBlur, isInvalid }) => {
  const [address, setAddress] = useState(initialAddress);
  const searchBoxRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    libraries,
  });

  useEffect(() => {
    setAddress(initialAddress);
  }, [initialAddress]);

  const sanitizeInput = useCallback(
    (value) => DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),
    []
  );

  const handlePlaceChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const selectedAddress = sanitizeInput(places[0].formatted_address);
      setAddress(selectedAddress);
      onAddressSelect(selectedAddress);
    }
  }, [sanitizeInput, onAddressSelect]);

  const handleInputChange = useCallback(
    (e) => {
      const newAddress = sanitizeInput(e.target.value);
      setAddress(newAddress);
      onAddressSelect(newAddress);
    },
    [sanitizeInput, onAddressSelect]
  );

  const handleBlur = useCallback(() => {
    onAddressSelect(address);
    onBlur?.();
  }, [address, onBlur]);

  if (!process.env.REACT_APP_GOOGLE_API_KEY) {
    return (
      <div>
        <Form.Control
          type="text"
          id="address"
          placeholder="Enter address"
          value={address}
          onChange={handleInputChange}
          onBlur={handleBlur}
          isInvalid={isInvalid}
          className="address"
          aria-label="Address input"
          data-testid="address-input"
          aria-describedby={isInvalid ? 'address-error' : 'address-api-error'}
          aria-required="true"
        />
        <div className="text-danger mt-1" id="address-api-error" role="alert">
          Address autocomplete unavailable. Please enter manually.
        </div>
        {isInvalid && (
          <Form.Control.Feedback type="invalid" id="address-error" role="alert">
            Address is required
          </Form.Control.Feedback>
        )}
      </div>
    );
  }

  if (loadError) {
    return (
      <div>
        <Form.Control
          type="text"
          id="address"
          placeholder="Enter address"
          value={address}
          onChange={handleInputChange}
          onBlur={handleBlur}
          isInvalid={isInvalid}
          className="address"
          aria-label="Address input"
          data-testid="address-input"
          aria-describedby={isInvalid ? 'address-error' : 'address-api-error'}
          aria-required="true"
        />
        <div className="text-danger mt-1" id="address-api-error" role="alert">
          Failed to load address autocomplete. Please enter manually.
        </div>
        {isInvalid && (
          <Form.Control.Feedback type="invalid" id="address-error" role="alert">
            Address is required
          </Form.Control.Feedback>
        )}
      </div>
    );
  }

  return isLoaded ? (
    <div className="autocomplete-container">
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <Form.Control
          type="text"
          id="address"
          placeholder="Enter address"
          value={address}
          onChange={handleInputChange}
          onBlur={handleBlur}
          isInvalid={isInvalid}
          className="address"
          aria-label="Address input with autocomplete"
          data-testid="address-input"
          aria-describedby={isInvalid ? 'address-error' : undefined}
          aria-required="true"
        />
      </StandaloneSearchBox>
      {isInvalid && (
        <Form.Control.Feedback type="invalid" id="address-error" role="alert">
          Address is required
        </Form.Control.Feedback>
      )}
    </div>
  ) : (
    <div>
      <Form.Control
        type="text"
        id="address"
        placeholder="Enter address"
        value={address}
        onChange={handleInputChange}
        onBlur={handleBlur}
        isInvalid={isInvalid}
        className="address"
        aria-label="Address input"
        data-testid="address-input"
        aria-describedby={isInvalid ? 'address-error' : 'address-loading'}
        aria-required="true"
      />
      <div className="text-muted mt-1" id="address-loading" role="status">
        <Spinner
          size="sm"
          color="secondary"
          ariaLabel="Loading address autocomplete"
          className="me-2"
          role="status"
        />
        Loading address autocomplete...
      </div>
      {isInvalid && (
        <Form.Control.Feedback type="invalid" id="address-error" role="alert">
          Address is required
        </Form.Control.Feedback>
      )}
    </div>
  );
};

export default GoogleAddressApi;