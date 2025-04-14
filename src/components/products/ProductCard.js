import { Card } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import '../../styles/components/products/products.scss';

const ProductCard = ({ image, name, id }) => {
  const [isActive, setIsActive] = useState(false);

  // Card animation (width, shadow, content)
  const [cardProps, cardApi] = useSpring(() => ({
    width: 120,
    boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)',
    contentOpacity: 0,
    contentTransform: 'translateY(100%)',
    config: { tension: 280, friction: 25 },
  }));

  // Title animation (spring up)
  const [titleProps, titleApi] = useSpring(() => ({
    transform: 'translateY(20px)', // Start slightly below
    opacity: 0,
    config: { tension: 300, friction: 20 },
  }));

  const handleToggle = () => {
    setIsActive(true);
    cardApi.start({
      width: 325,
      boxShadow: '1px 3px 15px rgba(0, 0, 0, 0.4)',
      contentOpacity: 1,
      contentTransform: 'translateY(0%)',
    });
    titleApi.start({
      transform: 'translateY(0px)', // Spring up to position
      opacity: 1,
    });
  };

  const handleLeave = () => {
    setIsActive(false);
    cardApi.start({
      width: 120,
      boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)',
      contentOpacity: 0,
      contentTransform: 'translateY(100%)',
    });
    titleApi.start({
      transform: 'translateY(20px)', // Return below
      opacity: 0,
    });
  };

  return (
    <animated.div
      className="product-card-wrapper"
      style={{
        width: cardProps.width,
        boxShadow: cardProps.boxShadow,
        background: `url(${image}) no-repeat center / cover`,
      }}
      onMouseEnter={handleToggle}
      onMouseLeave={handleLeave}
    >
      <Card
        className="product-card"
        style={{ background: `url(${image}) no-repeat center / cover` }}
      >
        <animated.div
          className="product-content"
          style={{
            opacity: cardProps.contentOpacity,
            transform: cardProps.contentTransform,
            background: 'linear-gradient(0deg, rgba(2, 2, 46, 0.68) 0%, rgba(255, 255, 255, 0) 100%)',
          }}
        />
        <Card.ImgOverlay className="title-overlay">
          <animated.div
            className="product-title"
            style={{
              transform: titleProps.transform,
              opacity: titleProps.opacity,
              fontFamily: "Bebas Neue",
              letterSpacing: "0.2em"
            }}
          >
            {name}
          </animated.div>
        </Card.ImgOverlay>
      </Card>
    </animated.div>
  );
};

export default ProductCard;