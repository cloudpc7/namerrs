import { Navbar, Nav, Offcanvas, Container, Col, Image, Button, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart, faPhone,faLocationDot, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import namerrsLogo from '../app/assets/images/namerrsOriginal.svg';
import '../styles/components/header/header.scss';
const Header = ({toggleNav, handleShow, handleClose}) => {
    return (
        <Navbar expand="lg" className="p-0 m-0">
            <Container className="p-0 m-0">
                <Navbar.Toggle 
                        aria-controls="offcanvasNavbar-expand-lg"
                        className="toggle-button"
                        onClick={handleShow}
                />
                <Navbar.Offcanvas
                    placement="end"
                    show={toggleNav}
                    onHide={handleClose}
                    aria-labelledby="offcanvasnavbar-expand-lg"
                >
                    <Offcanvas.Header className="" closeButton>
                        <Col className="d-flex justify-content-evenly align-items-center">
                            <Navbar.Brand className="d-flex">
                                <Image src={namerrsLogo} className="namerrsLogo" alt="bear with ribbon"/>
                            </Navbar.Brand>
                            <Offcanvas.Title className="header-title">
                                Namerrs
                            </Offcanvas.Title>
                        </Col>
                        <FontAwesomeIcon className="d-flex me-4" size="1x" icon={faShoppingCart}/>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="d-flex flex-column gap-2">
                        <Nav.Link to="/" className=""><FontAwesomeIcon className="" size="1x" icon={faHome} /></Nav.Link>
                        <Nav.Link to="/products" className="">Products</Nav.Link>
                        <Nav.Link to="/graphics" className="">Graphic Design</Nav.Link>
                        <Nav.Link href="tel:+19513500270" className=""><FontAwesomeIcon className="" size="1x" icon={faPhone}/></Nav.Link>
                        <Nav.Link href="mailto:Namerrs@gmail.com" className=""><FontAwesomeIcon className="" size="1x" icon={faEnvelope}/></Nav.Link>
                        <Nav.Link href="https://www.google.com/maps/dir/?api=1&destination=33.7839,-116.9586" target="_blank" className="" ><FontAwesomeIcon className="" size="1x" icon={faLocationDot}/></Nav.Link>
                        <Nav.Link href="https://x.com" className=""><FontAwesomeIcon className="" size="1x" icon={faXTwitter}/></Nav.Link>
                        <Nav.Link to="https://instagram.com" className=""><FontAwesomeIcon className="" size="1x" icon={faInstagram}/></Nav.Link>
                        <Nav.Link to="https://facebook.com" className=""><FontAwesomeIcon className="" size="1x" icon={faFacebook}/></Nav.Link>

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;