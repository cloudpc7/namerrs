/**
 * FaqSection.jsx — Expandable FAQ accordion from Redux content with fallbacks.
 */

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { selectPageContent } from '../../redux/slices/content.slice';
import { DEFAULT_FAQ } from '../../constants/business.constants';
import Section from './primitives/Section';
import SectionHeading from './primitives/SectionHeading';
import Button from './primitives/Button';

const FaqSection = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const faqItems = home?.faq?.length ? home.faq : DEFAULT_FAQ;
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Section id="faq" ariaLabel="FAQ">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions before you order?"
        subtitle="Tips and answers for design, products, and turnaround."
        align="center"
        className="mb-10"
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const headerId = `faq-header-${index}`;

          return (
            <article
              key={item.question}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[var(--color-border)]"
            >
              <h3 className="m-0">
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-focus-ring)]"
                >
                  {item.question}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 text-[var(--color-text-secondary)] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="border-t border-[var(--color-border)] px-5 py-4 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                >
                  {item.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-[var(--color-surface)] p-6 text-center ring-1 ring-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Still have questions? We&apos;re happy to help before you place an order.
        </p>
        <Button href="/#contact" className="mt-4">
          Contact Namerrs
        </Button>
      </div>
    </Section>
  );
};

export default FaqSection;