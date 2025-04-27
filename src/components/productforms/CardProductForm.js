import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import '../../styles/components/forms/forms.scss';
import { ChromePicker } from 'react-color';
import { cardDesignContext } from '../../providers/products/cardDesignProvider';

const CardProductForm = () => {
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
  } = useContext(cardDesignContext);
  return (
    <>
      {isLoading ? (
        <div>
          <h3 className="h3">Loading...</h3>
        </div>
      ) : errMsg ? (
        <div>
          <h3 className="h3">Error: {errMsg}</h3>
        </div>
      ) : (
        <Form className="card-design-form">
          <h3 className="h3">Choose your Card Stock</h3>
          <Form.Select
            value={cardStock}
            onChange={(e) => handleCardStock(e.target.value)}
            aria-label="card stock selection"
            className="card-stock-select"
          >
            <option value="default">Standard</option>
            <option value="gloss">Gloss</option>
            <option value="matte">Matte</option>
            <option value="uncoated">Uncoated</option>
          </Form.Select>
          <Form.Group className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              type="text"
              value={info.businessName}
              placeholder="Business Name"
              className="business-name"
              onChange={(e) => handleInfo('businessName', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={info.email}
              className="email-address"
              onChange={(e) => handleInfo('email', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Phone Number"
              value={info.phone}
              className="phone-number"
              onChange={(e) => handleInfo('phone', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              value={info.address}
              className="address"
              onChange={(e) => handleInfo('address', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Card Color</Form.Label>
            <div className="color-picker-container">
              <ChromePicker
                color={cardColor}
                onChangeComplete={handleCardColor}
                className="color-picker"
              />
              <div
                className="color-preview"
                style={{ backgroundColor: cardColor }}
              ></div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Font</Form.Label>
            <Form.Select
              value={font}
              onChange={(e) => handleSelectedFont(e.target.value)}
              aria-label="font selection"
              className="font-select"
            >
              {fonts.map((font) => (
                <option key={font.family} value={font.family}>
                  {font.family}
                </option>
              ))}
            </Form.Select>
            <div
              className="font-preview"
              style={{ fontFamily: font, color: cardColor }}
            >
              Sample Text
            </div>
          </Form.Group>
        </Form>
      )}
    </>
  );
};

export default CardProductForm;