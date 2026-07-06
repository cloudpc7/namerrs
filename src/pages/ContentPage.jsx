/**
 * ContentPage.jsx — Shared layout for CMS-driven static pages.
 */

import { useSelector } from 'react-redux';
import { selectContentStatus, selectPageContent } from '../redux/slices/content.slice';
import { CONTENT_STATUS } from '../redux/constants/content.constants';
import { useSeo } from '../hooks/useSeo';
import Section from '../ui/components/primitives/Section';
import Button from '../ui/components/primitives/Button';

const ContentPage = ({ slug, seoKey, fallbackTitle }) => {
  const status = useSelector(selectContentStatus);
  const page = useSelector((state) => selectPageContent(state, slug));

  useSeo(seoKey, { title: fallbackTitle, description: page?.body?.slice(0, 160) });

  if (status === CONTENT_STATUS.LOADING) {
    return (
      <main>
        <Section ariaLabel="Loading page content" ariaBusy>
          <p className="sr-only" aria-live="polite">
            Loading page content
          </p>
          <div className="mx-auto max-w-3xl animate-pulse space-y-4">
            <div className="h-8 w-1/2 rounded bg-[var(--color-border)]" />
            <div className="h-4 w-full rounded bg-[var(--color-border)]" />
            <div className="h-4 w-5/6 rounded bg-[var(--color-border)]" />
          </div>
        </Section>
      </main>
    );
  }

  const paragraphs = String(page?.body || '').split('\n').filter(Boolean);

  return (
    <main>
      <Section ariaLabel={page?.title || fallbackTitle}>
        <article className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Namerrs Signs & Printing
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
          {page?.title || fallbackTitle}
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/#products">Browse products</Button>
          <Button href="/#contact" variant="secondary">
            Contact us
          </Button>
        </div>
        </article>
      </Section>
    </main>
  );
};

export default ContentPage;