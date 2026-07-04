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
    <Section id="faq" ariaLabel="FAQ">
      <Stack gap="xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before you order?"
          subtitle="Tips and answers for design, products, and turnaround."
          align="center"
        />

        <Accordion items={faqItems} className="mx-auto max-w-3xl" />

        <Surface padding="md" className="mx-auto max-w-3xl text-center">
          <p className="form-hint" style={{ fontSize: '0.875rem' }}>
            Still have questions? We&apos;re happy to help before you place an order.
          </p>
          <Button href="/#contact" className="mt-4">
            Contact Namerrs
          </Button>
        </Surface>
      </Stack>
    </Section>
  );
};

export default FaqSection;