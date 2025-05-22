import { Container, Row, Col } from 'react-bootstrap';
import TestimonialCard from './TestimonialCard';
import testimonials from './testimonyDB.json';
import '../../styles/components/testimonies/testimony.scss';

const TestimonialList = () => {
  return (
    <Container fluid className="testimonials-container">
      <h2 className="section-title">What Our Customers Say</h2>
      <Row className="testimonials-row">
        {testimonials.map((testimonial) => (
          <Col xs={12} md={4} key={testimonial.id} className="mb-4">
            <TestimonialCard
              name={testimonial.name}
              quote={testimonial.quote}
              date={testimonial.date}
              facebookLink={testimonial.facebookLink}
              instagramLink={testimonial.instagramLink}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestimonialList;