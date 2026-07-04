/**
 * HomePage.jsx — Landing page with all primary sections.
 */

import { useDispatch } from 'react-redux';
import { useSeo } from '../hooks/useSeo';
import HeroSection from '../ui/components/HeroSection';
import FeaturesSection from '../ui/components/FeaturesSection';
import ProductsSection from '../ui/components/ProductsSection';
import AboutTeaserSection from '../ui/components/AboutTeaserSection';
import FaqSection from '../ui/components/FaqSection';
import ReviewsSection from '../ui/components/ReviewsSection';
import ContactSection from '../ui/components/ContactSection';
import FaqJsonLd from '../ui/components/FaqJsonLd';
import { openDesigner } from '../redux/slices/design.slice';

const HomePage = () => {
  const dispatch = useDispatch();
  useSeo('root');

  const handleDesignerOpen = (productId, mode) => {
    dispatch(openDesigner({ productId, mode }));
  };

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection onDesignerOpen={handleDesignerOpen} />
      <AboutTeaserSection />
      <FaqSection />
      <ReviewsSection />
      <ContactSection />
      <FaqJsonLd />
    </main>
  );
};

export default HomePage;