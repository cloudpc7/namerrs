import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import '../../styles/components/graphics/graphics.scss';

const Graphics = () => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={animationProps}>
      <Container fluid className="graphic-container">
        <Row className="graphic-row p-3">
          <Col className="graphic-col p-3">
            <h3 className="graphic-title p-2">Custom Graphic Design Solutions</h3>
            <h4 className="graphic-subtitle p-4">Bring Your Vision to Life with Unique Designs</h4>
            <p>From logos to branding, we create stunning graphics tailored to your needs.</p>
          </Col>
          <Col className="graphic-col">
            <ListGroup className="graphic-list">
              <ListGroup.Item className="design-item">Logo Design</ListGroup.Item>
              <ListGroup.Item className="design-item">Branding</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col className="graphic-col">
            <Link to="/form">
              <Button className="graphic-btn">Get a Quote</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default Graphics;