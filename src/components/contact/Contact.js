import { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/contact/contact.scss';

const Contact = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Add logic to send message (e.g., API call)
    alert('Message sent!');
    setMessage('');
    setShowMessage(false);
  };

  return (
    <Container fluid className="contact-container">
      <h2 className="section-title">Contact Us</h2>
      <Row className="contact-icons">
        <Col xs={12} className="d-flex justify-content-center text-center mb-3">
          <a href="https://facebook.com/namerrs" target="_blank" rel="noopener noreferrer" className="contact-icon">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </Col>
        <Col xs={6} className="text-end">
          <a href="https://instagram.com/namerrs" target="_blank" rel="noopener noreferrer" className="contact-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </Col>
        <Col xs={6} className="text-start">
          <button onClick={() => setShowMessage(!showMessage)} className="contact-icon message-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </button>
        </Col>
      </Row>
      {showMessage && (
        <Row className="message-box">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <InputGroup>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="message-input"
              />
              <Button onClick={handleSend} className="send-button">
                <FontAwesomeIcon icon={faPaperPlane} /> Send
              </Button>
            </InputGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Contact;