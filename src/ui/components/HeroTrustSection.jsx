/**
 * HeroTrustSection.jsx — Trust highlights shown below the hero.
 */

import { Section } from './primitives';
import TrustBadges from './TrustBadges';

const HeroTrustSection = () => (
  <Section ariaLabel="Why customers trust Namerrs" variant="white" className="trust-strip-panel">
    <TrustBadges />
  </Section>
);

export default HeroTrustSection;