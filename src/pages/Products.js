import { useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas, Form } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/pages/products.scss';

const Products = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const handleShow = (product) => {
    setActiveProduct(product);
    setShowOffcanvas(true);
  };

  const handleClose = () => {
    setShowOffcanvas(false);
    setActiveProduct(null);
  };

  return (
    <div className="products-page">
      <div className="mini-navbar">
        <Header /> 
        <h1 className="products-title">Shop Namerrs</h1>
      </div>
      <Container fluid className="products-container">
          <Row key="" className="product-section">
          </Row>
      </Container>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleClose}
        placement="end"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Customize {activeProduct?.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {activeProduct?.id === 'business-cards' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Font</Form.Label>
                <Form.Select>
                  <option>Bebas Neue</option>
                  <option>Open Sans</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Select>
                  <option value="#1E90FF">Dodger Blue</option>
                  <option value="#00CED1">Dark Turquoise</option>
                </Form.Select>
              </Form.Group>
              <Button className="save-btn">Save Design</Button>
            </>
          )}
          {activeProduct?.id === 'tshirts-hats' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Shirt Color</Form.Label>
                <Form.Select>
                  <option>Black</option>
                  <option>White</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Select>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" placeholder="Add text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Graphic</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
              <Button className="save-btn">Save Design</Button>
            </>
          )}
          {['banners', 'flyers', 'signs', 'stickers', 'memorials'].includes(activeProduct?.id) && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" placeholder="Enter text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Control type="text" placeholder="e.g., 4x6 ft" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
              <Button className="save-btn">Save Design</Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Products;