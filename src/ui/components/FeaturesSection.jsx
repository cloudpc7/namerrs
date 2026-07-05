/**
 * FeaturesSection.jsx — Home page feature highlights with icons and fallbacks.
 */

import { Award, Palette, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectPageContent } from '../../redux/slices/content.slice';
import { DEFAULT_FEATURES } from '../../constants/business.constants';
import { Section, SectionHeading, Card } from './primitives';

const FEATURE_ICONS = [Award, Zap, Palette];

const FeaturesSection = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const features = home?.features?.length ? home.features : DEFAULT_FEATURES;

  return (
    <Section ariaLabel="Features" className="features-section">
      <SectionHeading
        className="features-section__heading"
        eyebrow="Why Namerrs"
        title="Everything you need for custom print & signs"
        subtitle={[
          'Local expertise, online convenience —',
          'Design your order and schedule completion from one place.',
        ]}
        align="center"
      />

      <div className="features-grid">
        {features.map((feature, index) => {
          const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];

          return (
            <Card key={feature.title} as="article" padding="md" className="feature-card">
              <div className="feature-card__icon">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default FeaturesSection;