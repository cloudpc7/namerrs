/**
 * FaqSection.jsx — Expandable FAQ accordion from Redux content with fallbacks.
 */

import { useSelector } from 'react-redux';
import { selectPageContent } from '../../redux/slices/content.slice';
import { DEFAULT_FAQ } from '../../constants/business.constants';
import { Section, SectionHeading, Accordion, Surface, Button, Stack } from './primitives';

const FaqSection = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const faqItems = home?.faq?.length ? home.faq : DEFAULT_FAQ;

  return (
    <Section id="faq" ariaLabel="FAQ" variant="dark">
      <Stack gap="xl" className="faq-section__stack">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before you order?"
          subtitle="Tips and answers for design, products, and turnaround."
          align="center"
          className="faq-section__heading"
        />

        <Accordion items={faqItems} className="faq-section__content" />

        <Surface padding="md" className="faq-section__cta faq-section__content">
          <div className="faq-section__cta-text">
            <p className="faq-section__cta-lead">Still have questions?</p>
            <p className="faq-section__cta-sub">
              We&apos;re happy to help before you place an order.
            </p>
          </div>
          <Button href="/#contact" className="faq-section__cta-button">
            Contact Namerrs
          </Button>
        </Surface>
      </Stack>
    </Section>
  );
};

export default FaqSection;