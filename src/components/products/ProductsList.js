import { useSpringCarousel } from 'react-spring-carousel';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productDB from './productDb.json';

import {Container, Row, Col} from 'react-bootstrap';
import '../../styles/components/products/products.scss';

const ProductList = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1200) setItemsPerSlide(6);
      else if (width >= 992) setItemsPerSlide(4);
      else if (width >= 768) setItemsPerSlide(3);
      else if (width >= 576) setItemsPerSlide(2);
      else setItemsPerSlide(1);
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const { carouselFragment } = useSpringCarousel({
    itemsPerSlide: 3,
    withLoop: true,
    gutter: 8,
    items: productDB.map(product => ({
      id: product.id,
      renderItem: (
        <ProductCard 
          product={product} 
          image={product.image}
          name={product.name}
          id={product.id}
          key={product.id} 

        /> 
      )
    }))
  });

  return (
    <Container fluid className="product-list-container">
      <Row className="product-list-row">
        <Col className="product-list-col">
          <h3 className="product-list-title h3 m-0 p-3">From Custom T-Shirts to Business Cards</h3>
        </Col>
        <Col className="product-list-col">
          {carouselFragment}    
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;