import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Button } from "react-bootstrap";
import Header from '../Header';
import '../../styles/components/hero/hero.scss';
import NamerrsLogo from '../../app/assets/images/NamerrsLogo';

const Hero = () => {
    const [toggleNav, setToggleNav] = useState(false);

    const handleShow = () => {
        setToggleNav(true);
    };

    const handleClose = () => {
        setToggleNav(false);
    }

    return (
        <Row className="hero-container flex-column p-0 m-0">
            <Col className="hero-col d-flex align-items-start justify-content-between p-0 w-100">
                <NamerrsLogo />
                <Header handleShow={handleShow} toggleNav={toggleNav} handleClose={handleClose} />
            </Col>
            <Col className="d-flex justify-content-center align-items-center p-0 m-0">
                <Button as={Link} to="/products" className="hero-btn py-3 px-5 border-0 rounded-2 text-center">shop</Button>
            </Col>
        </Row>
    );
};

export default Hero;