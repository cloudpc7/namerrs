import { useContext, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import '../../styles/components/forms/forms.scss';
import { ChromePicker } from 'react-color';
import { cardDesignContext } from '../../providers/products/cardDesignProvider';
import { useLoadScript } from '@react-google-maps/api';
import GoogleAddressApi from '../../utils/googleAddressApi';
import { cardFormValidation } from '../../utils/cardFormValidation';
import DOMPurify from 'dompurify';

const CardProductForm = () => {
  const context = useContext(cardDesignContext);

  const {
    cardStock,
    cardColor,
    info,
    font,
    fonts,
    isLoading,
    errMsg,
    handleInfo,
    handleSelectedFont,
    handleCardStock,
    handleCardColor,
  } = context || {};

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    libraries: ['places'],
  });

  const [addressError, setAddressError] = useState(null);

  let addressApi;
  try {
    addressApi = GoogleAddressApi({
      onAddressSelect: (selectedAddress) => handleInfo && handleInfo('address', selectedAddress),
      initialAddress: info && info.address,
      isLoaded,
    });
  } catch (error) {
    console.error('GoogleAddressApi error:', error);
    setAddressError(error.message);
  }

  const { address, renderAutocomplete } = addressApi || { 
    address: '', 
    renderAutocomplete: (
      <Form.Control
        type="text"
        placeholder="Enter address"
        className="address"
        value={info && info.address || ''}
        onChange={(e) => handleInputChange('address', e.target.value)}
      />
    )
  };

  useEffect(() => {
    if (info && info.businessName) {
      cardFormValidation.validateAt('businessName', info).catch((err) => console.error(err));
    }
  }, [info && info.businessName]);

  if (!context) {
    console.error('cardDesignContext is undefined');
    return <div>Error: Context not available</div>;
  }

  const handleInputChange = (field, value) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    handleInfo && handleInfo(field, sanitizedValue);
  };

  const handleBlur = async (field, value) => {
    try {
      await cardFormValidation.validateAt(field, { [field]: value });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {loadError && <div>Google Maps Error: {loadError.message}</div>}
      {!isLoaded && <div>Loading Google Maps...</div>}
      {errMsg && <div className="error-message">Warning: {errMsg}</div>}
      {addressError && <div className="error-message">Address Error: {addressError}</div>}
      <Form className="card-design-form">
        <Form.Group controlId="cardStock">
          <Form.Label>Card Stock</Form.Label>
          <Form.Select
            aria-label="card stock selection"
            value={cardStock || 'default'}
            onChange={(e) => handleCardStock && handleCardStock(e.target.value)}
          >
            <option value="default">Select Card Stock</option>
            <option value="gloss">Gloss</option>
            <option value="matte">Matte</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="businessName">
          <Form.Label>Business Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Business Name"
            value={info && info.businessName || ''}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            onBlur={(e) => handleBlur('businessName', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={info && info.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={(e) => handleBlur('email', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone Number"
            value={info && info.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={(e) => handleBlur('phone', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          {renderAutocomplete}
        </Form.Group>

        <Form.Group controlId="cardColor">
          <Form.Label>Card Color</Form.Label>
          <ChromePicker
            color={cardColor || '#000000'}
            onChangeComplete={(color) => handleCardColor && handleCardColor(color)}
            className="color-picker"
          />
        </Form.Group>

        <Form.Group controlId="font">
          <Form.Label>Font</Form.Label>
          <Form.Select
            aria-label="font selection"
            value={font || ''}
            onChange={(e) => handleSelectedFont && handleSelectedFont(e.target.value)}
          >
            <option value="">Select Font</option>
            {fonts && fonts.map((f) => (
              <option key={f.family} value={f.family}>
                {f.family}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CardProductForm;