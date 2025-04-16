import {useState, usEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../components/hero/Hero';
import Header from '../../components/Header';
import ProductList from '../../components/products/ProductsList';
import Graphics from '../../components/graphic/Graphic';
import BusinessCards from '../../components/businesscards/BusinessCards';
import Signs from '../../components/signs/Signs';
import Faqs from '../../components/faqs/Faqs';
import Testimony from '../../components/testimonial/TestimonialList';
import About from '../../components/about/About';
import Contact from '../../components/contact/Contact';
import Footer from '../../components/Footer';
const HomePage = () => {
    
    return (
        <Container fluid className="p-0 m-0">
            <Row className="flex-column p-0 m-0">
                <Col className="p-0 m-0">
                    <Hero />
                </Col>
                <Col className="p-0 m-0">
                    <ProductList />
                </Col>
                <Col className="p-0 m-0">
                    <Graphics />
                    <BusinessCards />
                    <Signs />
                </Col>
                <Col className="p-0 m-0">
                    <Faqs />
                </Col>
                <Col className="p-0 m-0">
                    <Testimony />
                </Col>
                <Col className="p-0 m-0">
                    <About />
                </Col>
                <Col className="p-0 m-0">
                    <Contact />
                </Col>
                <Col className="p-0 m-0">
                    <Footer />
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;