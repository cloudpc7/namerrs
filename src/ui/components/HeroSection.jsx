/**
 * HeroSection.jsx — Hero banner with backend-driven copy and CTAs.
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectContentStatus,
  selectPageContent,
} from '../../redux/slices/content.slice';
import { CONTENT_STATUS } from '../../redux/constants/content.constants';
import { HERO_SLOGAN_LINES, SITE_NAME, SITE_TAGLINE } from '../../constants/navigation.constants';
import { HERO_IMAGE_PATH } from '../../constants/assets.constants';
import {
  HERO_CAPTION_DESC_LEAD,
  HERO_CAPTION_DESC_TAIL,
  HERO_CAPTION_TITLE,
  HERO_CAPTION_TITLE_LINES,
} from '../../constants/business.constants';
import { Section, Button, MediaFrame, Skeleton, Stack } from './primitives';

const formatSloganLines = (slogan) => {
  if (Array.isArray(slogan)) {
    return slogan;
  }

  if (typeof slogan === 'string' && slogan.trim()) {
    const sentences = slogan
      .split(/\.(?=\s|$)/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (line.endsWith('.') ? line : `${line}.`));

    if (sentences.length) {
      return sentences;
    }
  }

  return HERO_SLOGAN_LINES;
};

const HeroSection = () => {
  const status = useSelector(selectContentStatus);
  const homeContent = useSelector((state) => selectPageContent(state, 'home'));
  const hero = homeContent?.hero;

  const title = hero?.title || SITE_NAME;
  const slogan = hero?.slogan || SITE_TAGLINE;
  const heroImage = hero?.imageUrl || HERO_IMAGE_PATH;
  const sloganLines = useMemo(() => formatSloganLines(slogan), [slogan]);

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
        <div className="hero__visual">
          <div className="hero__media">
            <MediaFrame
              src={heroImage}
              alt={`${title} storefront and signage showcase`}
              loading="eager"
              aspectRatio="auto"
              className="hero__frame"
            />
          </div>

          <div className="hero__caption">
            <p className="hero__caption-title hero__caption-title--wide">{HERO_CAPTION_TITLE}</p>
            <div className="hero__caption-title-lines" aria-hidden="true">
              {HERO_CAPTION_TITLE_LINES.map((line) => (
                <span key={line} className="hero__caption-title-line">
                  {line}
                </span>
              ))}
            </div>
            <p className="hero__caption-desc">
              {HERO_CAPTION_DESC_LEAD}{' '}
              <span className="hero__caption-desc-tail">{HERO_CAPTION_DESC_TAIL}</span>
            </p>
          </div>
        </div>

        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          <div className="hero__slogan-group">
            {sloganLines.map((line) => (
              <p key={line} className="hero__slogan-line">
                {line}
              </p>
            ))}
          </div>

          <div className="hero__ctas">
            <Button href="/#products" size="lg">
              Start your order
            </Button>
            <Button href="/#contact" variant="secondary" size="lg">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;