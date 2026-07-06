/**
 * NotFoundPage.jsx — Friendly 404 for unknown routes.
 */

import { Section, Button } from '../ui/components/primitives';

const NotFoundPage = () => (
  <Section ariaLabel="Page not found" variant="surface">
    <h1 className="section-heading__title">Page not found</h1>
    <p className="section-heading__subtitle">
      We couldn&apos;t find that page. Head back to the home page to browse products or contact us.
    </p>
    <Button href="/" className="mt-6">
      Back to home
    </Button>
  </Section>
);

export default NotFoundPage;