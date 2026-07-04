/**
 * HomePage.jsx — Landing page with all primary sections.
 */

import { useSeo } from '../hooks/useSeo';
import HeroSection from '../ui/components/HeroSection';
import HeroTrustSection from '../ui/components/HeroTrustSection';
import FeaturesSection from '../ui/components/FeaturesSection';
import ProductsSection from '../ui/components/ProductsSection';
import AboutTeaserSection from '../ui/components/AboutTeaserSection';
import FaqSection from '../ui/components/FaqSection';
import ReviewsSection from '../ui/components/ReviewsSection';
import ContactSection from '../ui/components/ContactSection';
import FaqJsonLd from '../ui/components/FaqJsonLd';
const HomePage = () => {
  useSeo('root');

  return (
    <main>
      <HeroSection />
      <HeroTrustSection />
      <ProductsSection />
      <FeaturesSection />
      <AboutTeaserSection />
      <FaqSection />
      <ReviewsSection />
      <ContactSection />
      <FaqJsonLd />
    </main>
  );
};

export default HomePage;