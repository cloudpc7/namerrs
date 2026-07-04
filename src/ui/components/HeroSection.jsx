/**
 * HeroSection.jsx — Hero banner with backend-driven copy and CTAs.
 */

import { useSelector } from 'react-redux';
import {
  selectContentStatus,
  selectPageContent,
} from '../../redux/slices/content.slice';
import { CONTENT_STATUS } from '../../redux/constants/content.constants';
import { SITE_NAME, SITE_TAGLINE } from '../../constants/navigation.constants';
import { HERO_IMAGE_PATH } from '../../constants/assets.constants';
import { HERO_CAPTION_DESC, HERO_CAPTION_TITLE } from '../../constants/business.constants';
import { Section, Button, MediaFrame, Skeleton, Stack } from './primitives';

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
        <Stack gap="lg">
          <Skeleton variant="text" style={{ width: '8rem' }} />
          <Skeleton variant="title" style={{ width: '66%', maxWidth: '32rem' }} />
          <Skeleton variant="text" style={{ width: '50%', maxWidth: '24rem' }} />
          <Skeleton variant="block" />
        </Stack>
      </Section>
    );
  }

  return (
    <Section ariaLabel="Hero" variant="surface" className="hero-panel">
      <div className="hero__grid">
        <div className="hero__media">
          <MediaFrame
            src={heroImage}
            alt={`${title} storefront and signage showcase`}
            loading="eager"
            aspectRatio="auto"
            className="hero__frame"
          />
        </div>

        <div className="hero__content">
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
        </div>

        <div className="hero__caption">
          <p className="hero__caption-title">{HERO_CAPTION_TITLE}</p>
          <p className="hero__caption-desc">{HERO_CAPTION_DESC}</p>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;