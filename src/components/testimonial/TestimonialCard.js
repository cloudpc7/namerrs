import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';
import '../../styles/components/testimonies/testimony.scss';

const TestimonialCard = ({ name, quote, date, facebookLink, instagramLink }) => {
  return (
    <Card className="testimonial-card">
      <Card.Body>
        <Card.Text className="card-text">"{quote}"</Card.Text>
        <Card.Title className="card-title">{name}</Card.Title>
        <Card.Text className="card-date">{date}</Card.Text>
        <div className="social-links">
          <a href={facebookLink} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className="" size="1x" icon={faInstagram}/>
          </a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="" size="1x" icon={faFacebook}/>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TestimonialCard;