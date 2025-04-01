import {  Navbar, Nav, Offcanvas, Container, Button } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar expand="lg" className="p-0 m-0">
            <Container className="p-0 m-0">
                <Navbar.Toggle 
                     aria-controls="offcanvasNavbar-expand-lg"
                     className="me-auto p-3"
                />
                <Navbar.Offcanvas
                    placement="end"
                    show=""
                    onHide=""
                    aria-labelledby="offcanvasnavbar-expand-lg"
                >
                    <Offcanvas.Header></Offcanvas.Header>
                    <Offcanvas.Body></Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;