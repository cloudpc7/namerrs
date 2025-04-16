import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import '../styles/components/footer/footer.scss';

const Footer = () => {
  return (
    <footer className="footer-container">
      <Container>
        <Row className="footer-content">
          <Col xs={12} md={4} className="footer-section mb-4">
            <h3 className="footer-title">Namerrs</h3>
            <p className="footer-text">
              San Jacinto’s premier sign, printing, and t-shirt business since 2008. Bold designs, top quality.
            </p>
            <div className="social-links">
              <a href="https://facebook.com/namerrs" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://instagram.com/namerrs" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://x.com/namerrs" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </Col>
          <Col xs={12} md={2} className="footer-section mb-4">
            <h4 className="footer-subtitle">Explore</h4>
            <ul className="footer-list">
              <li><a href="/products" className="footer-link">Products</a></li>
              <li><a href="/services" className="footer-link">Services</a></li>
              <li><a href="/portfolio" className="footer-link">Portfolio</a></li>
            </ul>
          </Col>
          <Col xs={12} md={2} className="footer-section mb-4">
            <h4 className="footer-subtitle">Policies</h4>
            <ul className="footer-list">
              <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="/terms" className="footer-link">Terms of Service</a></li>
              <li><a href="/returns" className="footer-link">Returns</a></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className="footer-section mb-4">
            <h4 className="footer-subtitle">Address & Contact</h4>
            <p className="footer-text">
              <strong>Address:</strong> 123 Print St, San Jacinto, CA 92583<br />
              <strong>Email:</strong> <a href="mailto:info@namerrs.com" className="footer-link">info@namerrs.com</a><br />
              <strong>Phone:</strong> <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a>
            </p>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col xs={12} className="text-center">
            <p className="footer-copyright">
              © 2024 Clouddropdesigns LLC. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;