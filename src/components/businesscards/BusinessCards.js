import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import cards from '../../app/assets/images/businesscards.png';
import '../../styles/components/businesscards/cards.scss';

const BusinessCards = () => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
  });

  const imageProps = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.05)' },
    config: { tension: 300, friction: 10 },
    reset: true,
    reverse: true,
    loop: true,
  });

  return (
    <animated.div style={animationProps}>
      <Container fluid className="cards-container">
        <Row className="cards-row">
          <Col xs={12} md={4} className="cards-col">
            <h3 className="cards-title">Shop, Design, and Personalize Your Business Cards</h3>
            <p className="cards-subtitle">Create Professional Cards That Stand Out</p>
          </Col>
          <Col xs={12} md={4} className="cards-col">
            <animated.div style={imageProps}>
              <Image className="business-cards-image" src={cards} alt="business cards" />
            </animated.div>
          </Col>
          <Col xs={12} md={4} className="cards-col">
            <Link to="/business-cards-design">
              <Button className="business-card-btn">Shop Business Cards</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default BusinessCards;