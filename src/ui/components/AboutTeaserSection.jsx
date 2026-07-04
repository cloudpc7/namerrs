/**
 * AboutTeaserSection.jsx — About teaser with imagery and CTA.
 */

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPageContent } from '../../redux/slices/content.slice';
import { ABOUT_IMAGE_PATH } from '../../constants/assets.constants';
import { DEFAULT_ABOUT_TEASER } from '../../constants/business.constants';
import Section from './primitives/Section';
import SectionHeading from './primitives/SectionHeading';
import Button from './primitives/Button';

const AboutTeaserSection = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const teaser = home?.aboutTeaser || DEFAULT_ABOUT_TEASER;

  return (
    <Section ariaLabel="About teaser">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-[var(--color-border)]">
          <img
            src={ABOUT_IMAGE_PATH}
            alt="Namerrs Signs and Printing storefront"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Our story"
            title={teaser.title}
            subtitle={teaser.body}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={teaser.ctaHref || '/about'}>
              {teaser.ctaLabel || 'Learn more'}
            </Button>
            <Button href="/#contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutTeaserSection;