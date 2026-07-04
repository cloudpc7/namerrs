/**
 * FaqJsonLd.jsx — FAQ structured data for SEO.
 */

import { useSelector } from 'react-redux';
import { selectPageContent } from '../../redux/slices/content.slice';
import { DEFAULT_FAQ } from '../../constants/business.constants';

const FaqJsonLd = () => {
  const home = useSelector((state) => selectPageContent(state, 'home'));
  const faqItems = home?.faq?.length ? home.faq : DEFAULT_FAQ;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FaqJsonLd;