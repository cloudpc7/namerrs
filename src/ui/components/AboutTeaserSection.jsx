/**
 * AboutTeaserSection.jsx — About teaser with CTA (no duplicate hero imagery).
 */

import { useSelector } from 'react-redux';
import { selectPageContent } from '../../redux/slices/content.slice';
import { DEFAULT_ABOUT_TEASER } from '../../constants/business.constants';
import { Section, SectionHeading, Button, Stack } from './primitives';

const AboutTeaserSection = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const teaser = home?.aboutTeaser || DEFAULT_ABOUT_TEASER;

  return (
    <Section ariaLabel="About teaser">
      <Stack gap="lg" className="about-teaser">
        <SectionHeading
          eyebrow="Our story"
          title={teaser.title}
          subtitle={teaser.body}
          align="center"
        />
        <div className="cluster about-teaser__actions">
          <Button to={teaser.ctaHref || '/about'}>
            {teaser.ctaLabel || 'Learn more'}
          </Button>
          <Button href="/#contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Stack>
    </Section>
  );
};

export default AboutTeaserSection;