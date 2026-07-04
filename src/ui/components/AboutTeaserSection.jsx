/**
 * AboutTeaserSection.jsx — About teaser with imagery and CTA.
 */

import { useSelector } from 'react-redux';
import { selectPageContent } from '../../redux/slices/content.slice';
import { ABOUT_IMAGE_PATH } from '../../constants/assets.constants';
import { DEFAULT_ABOUT_TEASER } from '../../constants/business.constants';
import {
  Section,
  SectionHeading,
  Button,
  MediaFrame,
  Stack,
} from './primitives';

const AboutTeaserSection = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const teaser = home?.aboutTeaser || DEFAULT_ABOUT_TEASER;

  return (
    <Section ariaLabel="About teaser">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <MediaFrame
          src={ABOUT_IMAGE_PATH}
          alt="Namerrs Signs and Printing storefront"
        />

        <Stack gap="lg">
          <SectionHeading
            eyebrow="Our story"
            title={teaser.title}
            subtitle={teaser.body}
          />
          <div className="cluster">
            <Button to={teaser.ctaHref || '/about'}>
              {teaser.ctaLabel || 'Learn more'}
            </Button>
            <Button href="/#contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </Stack>
      </div>
    </Section>
  );
};

export default AboutTeaserSection;