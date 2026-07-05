/**
 * Accordion.jsx — Single-open accordion list for FAQ and expandable content.
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ id, question, answer, isOpen, onToggle }) => {
  const panelId = `accordion-panel-${id}`;
  const headerId = `accordion-header-${id}`;

  return (
    <article className="accordion__item">
      <h3 className="m-0">
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="accordion__trigger"
        >
          <span className="accordion__trigger-text">{question}</span>
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`accordion__trigger-icon${isOpen ? ' accordion__trigger-icon--open' : ''}`}
          />
        </button>
      </h3>
      {isOpen && (
        <div id={panelId} role="region" aria-labelledby={headerId} className="accordion__panel">
          {answer}
        </div>
      )}
    </article>
  );
};

const Accordion = ({ items = [], className = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={`accordion ${className}`.trim()}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          id={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default Accordion;