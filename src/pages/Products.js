import { useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas } from 'react-bootstrap';
import Header from '../components/Header';
import cardstock from '../app/assets/images/businesscards.png'
import '../styles/pages/products.scss';
import CardProductForm from '../components/productforms/CardProductForm';
const Products = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const handleShow = (product) => {
    setActiveProduct(product);
    setShowOffcanvas(true);
  };

  const handleClose = () => {
    setShowOffcanvas(false);
  };

  const handleSideBar = () => {
    setShowSideBar(prev => !prev);
  }

  return (
   <Container fluid className="products-page">
   {
    showSideBar && (
      <Offcanvas show={showSideBar} onHide={handleSideBar} placement="end" className="offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create your personal business cards</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          <CardProductForm />
        </Offcanvas.Body>
      </Offcanvas>
    )
   }
    <Row className="products-row">
      <Col className="products-nav">
        <Col className="header-col">
          <Header toggleNav={showOffcanvas} handleShow={handleShow} handleClose={handleClose} />
        </Col>
        <Col className="title-col">
          <h1 className="h1 m-0 title">Shop Namerrs</h1>
        </Col>
      </Col>
      <Col className="card-products-col">
        <h2 className="card-products-title">Business Cards</h2>
        <Card className="business-card">
          <Card.Img className="card-img" src={cardstock} alt="business cards with namerrs logo"/>
          <Card.ImgOverlay className="card-selector">
            <Button onClick={() => setShowSideBar(prev => true)} className="custom-card-btn">Personalize Now</Button>
          </Card.ImgOverlay>
        </Card>
      </Col>   
    </Row>
   </Container>
  );
};

export default Products;