import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import signImage from '../../app/assets/images/billboard.png'; 
import '../../styles/components/signs/signs.scss';

const Signs = () => {
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
      <Container fluid className="signs-container">
        <Row className="signs-row">
          <Col xs={12} md={4} className="signs-col">
            <h3 className="signs-title">Design Custom Signs for Any Occasion</h3>
            <p className="signs-subtitle">Make an Impact with Eye-Catching Signs</p>
            <ul className="signs-features">
              <li>Vinyl Banners</li>
              <li>Yard Signs</li>
              <li>Window Graphics</li>
            </ul>
          </Col>
          <Col xs={12} md={4} className="signs-col">
            <animated.div style={imageProps}>
              <Image className="signs-image" src={signImage} alt="custom signs" />
            </animated.div>
          </Col>
          <Col xs={12} md={4} className="signs-col">
            <Link to="/signs-design">
              <Button className="signs-btn">Shop Signs</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default Signs;