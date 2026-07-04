/**
 * HeroSection.jsx — Hero banner with backend-driven copy, CTAs, and trust strip.
 */

import { useSelector } from 'react-redux';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';
import {
  selectContentStatus,
  selectPageContent,
} from '../../redux/slices/content.slice';
import { CONTENT_STATUS } from '../../redux/constants/content.constants';
import { SITE_NAME, SITE_TAGLINE } from '../../constants/navigation.constants';
import { HERO_IMAGE_PATH } from '../../constants/assets.constants';
import {
  BUSINESS_LOCATION_LABEL,
  BUSINESS_SINCE,
} from '../../constants/business.constants';
import Section from './primitives/Section';
import Button from './primitives/Button';

const HeroSection = () => {
  const status = useSelector(selectContentStatus);
  const homeContent = useSelector((state) => selectPageContent(state, 'home'));
  const hero = homeContent?.hero;

  const title = hero?.title || SITE_NAME;
  const slogan = hero?.slogan || SITE_TAGLINE;
  const heroImage = hero?.imageUrl || HERO_IMAGE_PATH;

  if (status === CONTENT_STATUS.LOADING) {
    return (
      <Section ariaLabel="Loading hero content" variant="surface">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 rounded bg-[var(--color-border)]" />
          <div className="h-12 w-2/3 max-w-xl rounded bg-[var(--color-border)]" />
          <div className="h-6 w-1/2 max-w-md rounded bg-[var(--color-border)]" />
          <div className="h-64 rounded-2xl bg-[var(--color-border)]" />
        </div>
      </Section>
    );
  }

  return (
    <Section ariaLabel="Hero" variant="surface" className="hero-panel">
      <div className="hero__grid">
        <div className="hero__content">
          <p className="hero__badge">
            <MapPin size={16} aria-hidden="true" />
            {BUSINESS_LOCATION_LABEL}
          </p>

          <h1 className="hero__title">{title}</h1>
          <p className="hero__slogan">{slogan}</p>

          <div className="hero__ctas">
            <Button href="/#products" size="lg">
              Start your order
            </Button>
            <Button href="/#contact" variant="secondary" size="lg">
              Get in touch
            </Button>
          </div>

          <ul className="hero__trust">
            <li className="hero__trust-item">
              <ShieldCheck size={20} className="hero__trust-icon" aria-hidden="true" />
              <div>
                <p className="hero__trust-title">Since {BUSINESS_SINCE}</p>
                <p className="hero__trust-desc">Trusted local print shop</p>
              </div>
            </li>
            <li className="hero__trust-item">
              <Clock size={20} className="hero__trust-icon" aria-hidden="true" />
              <div>
                <p className="hero__trust-title">Fast turnaround</p>
                <p className="hero__trust-desc">Schedule your completion date</p>
              </div>
            </li>
            <li className="hero__trust-item">
              <MapPin size={20} className="hero__trust-icon" aria-hidden="true" />
              <div>
                <p className="hero__trust-title">Custom design</p>
                <p className="hero__trust-desc">Cards, shirts, signs & more</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="hero__media">
          <div className="hero-image-frame">
            <img
              src={heroImage}
              alt={`${title} storefront and signage showcase`}
              className="hero__image"
              loading="eager"
            />
          </div>
          <div className="hero__caption">
            <p className="hero__caption-title">Quality products. Best prices around.</p>
            <p className="hero__caption-desc">Design online, pick up in San Jacinto.</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;