/**
 * AboutTeaserSection.jsx — Design-and-print story with capabilities on the home page.
 */

import { FileCheck, Layers, PenLine, Printer } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectPageContent } from '../../redux/slices/content.slice';
import { DEFAULT_ABOUT_CONTENT } from '../../constants/business.constants';
import { Section, SectionHeading, Button, Card } from './primitives';

const CAPABILITY_ICONS = [Layers, PenLine, Printer, FileCheck];

const AboutTeaserSection = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const teaser = home?.aboutTeaser;
  const about = {
    ...DEFAULT_ABOUT_CONTENT,
    title: teaser?.title || DEFAULT_ABOUT_CONTENT.title,
  };

  const capabilities = about.capabilities || DEFAULT_ABOUT_CONTENT.capabilities;

  return (
    <Section id="about" ariaLabel="About Namerrs" variant="surface" className="about-section">
      <div className="about-section__intro">
        <div className="about-section__intro-copy">
          <SectionHeading
            className="about-section__heading"
            eyebrow={about.eyebrow}
            title={about.title}
          />
          <p className="about-section__since">{about.since}</p>
          <p className="about-section__intro">{about.intro}</p>
          <p className="about-section__support">{about.support}</p>
        </div>

        <div className="about-section__capabilities">
          {capabilities.map((item, index) => {
            const Icon = CAPABILITY_ICONS[index % CAPABILITY_ICONS.length];

            return (
              <Card
                key={item.title}
                as="article"
                variant="elevated"
                padding="md"
                className="about-section__card"
              >
                <div className="about-section__card-icon" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <h3 className="about-section__card-title">{item.title}</h3>
                {item.descriptionMobile ? (
                  <>
                    <p className="about-section__card-desc about-section__card-desc--desktop">
                      {item.description}
                    </p>
                    <div className="about-section__card-desc-lines">
                      {item.descriptionMobile.map((line) => (
                        <p key={line} className="about-section__card-desc-line">
                          {line}
                        </p>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="about-section__card-desc">{item.description}</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      <div className="cluster about-section__actions">
        <Button href="/#products">Start your design</Button>
        <Button href="/#contact" variant="secondary">
          Talk with a designer
        </Button>
      </div>
    </Section>
  );
};

export default AboutTeaserSection;