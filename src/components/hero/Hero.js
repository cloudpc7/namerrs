// Hero.jsx
import { Card, Button } from "react-bootstrap";
import Header from '../Header';
import '../../styles/components/hero/hero.scss';
import NamerrsLogo from '../../app/assets/images/NamerrsLogo';
import NamerrsHero from '../../app/assets/images/namerrsHero.png';

const Hero = () => {
  return (
    <Card className="hero-card flex-column justify-content-center align-items-start p-0 m-0 rounded-0 border-0">
      <Card.ImgOverlay className="d-flex flex-column w-100  p-0 m-0">
        <Card.Body className="d-flex w-100 p-0 align-items-start h-100 justify-content-between hero-body">
            <NamerrsLogo />
            <Header />
        </Card.Body> 
      </Card.ImgOverlay>
      <Button className="hero-btn m-2 py-2 px-4 border-0 rounded-2 text-center">shop</Button>
    </Card>
  );
};

export default Hero;