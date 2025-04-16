import { Container, Card } from 'react-bootstrap';
import NamerrsLogo from '../../app/assets/images/namerrs-black.png';
import '../../styles/components/about/about.scss';

const About = () => {
  return (
    <Container fluid className="about-container">
      <Card className="about-card">
        <Card.Img src={NamerrsLogo} alt="Namerrs Logo" className="card-logo" />
        <Card.Body>
          <Card.Title className="section-title">About Namerrs</Card.Title>
          <Card.Text className="about-text">
            Since 2008, we've been San Jacinto’s best local sign, printing, and t-shirt business. Get top-quality custom T-shirts, business cards, stickers, and so much more. Call, text, or email anytime and feel free to browse our site to explore all the other services we offer.
          </Card.Text>
          <Card.Title className="section-subtitle">Our Mission</Card.Title>
          <Card.Text className="about-text">
            Our journey started in 2008, and it's been a long one. We never thought that we would ever have the opportunity to own our own business. At that time, my wife was in Austin, Texas, training to work for the Federal Department of Transportation, but God had other plans for us. An excellent opportunity came our way to purchase our equipment, and we took the chance without knowing anything about the printing world! And here we are, 12 years later, serving our community and you!
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;