import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useSpringCarousel } from 'react-spring-carousel';
import NamerrsLogo from '../../app/assets/images/namerrs-black.png';
import '../../styles/components/faqs/faqs.scss';
import faqs from './FaqsDB.json';

const Faqs = () => {
  const marketingTips = faqs.marketingTips;
  const productFaqs = faqs.faqs;

  const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
    items: [
      ...marketingTips.map((tip) => ({
        id: `tip-${tip.title}`,
        renderItem: (
          <Card className="marketing-card">
            <Card.Img src={NamerrsLogo} alt="Namerrs Logo" className="card-img" />
            <Card.Body>
              <Card.Title className="card-title">{tip.title}</Card.Title>
              <Card.Text className="card-text">{tip.tip}</Card.Text>
            </Card.Body>
          </Card>
        ),
      })),
      ...productFaqs.map((faq) => ({
        id: `faq-${faq.question}`,
        renderItem: (
          <Card className="faq-card">
            <Card.Img src={NamerrsLogo} alt="Namerrs Logo" className="card-img" />
            <Card.Body>
              <Card.Title className="card-title">{faq.question}</Card.Title>
              <Card.Text className="card-text">{faq.answer}</Card.Text>
            </Card.Body>
          </Card>
        ),
      })),
    ],
    withLoop: true,
    itemsPerView: 1,
    dragging: true,
    gutter: 20,
  });

  return (
    <Container fluid className="faqs-container">
      <h2 className="section-title">Marketing Tips & FAQs</h2>
      <Row className="marketing-tips-row">
        <Col xs={12} className="mb-4 text-center position-relative">
          <Button className="carousel-nav prev" onClick={slideToPrevItem}>
            ←
          </Button>
          {carouselFragment}
          <Button className="carousel-nav next" onClick={slideToNextItem}>
            →
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Faqs;