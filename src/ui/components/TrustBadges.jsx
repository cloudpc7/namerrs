/**
 * TrustBadges.jsx — Shared trust highlights (since, turnaround, services).
 */

import { MapPin, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_SINCE } from '../../constants/business.constants';

const TrustBadges = ({ className = '' }) => (
  <ul className={`hero__trust ${className}`.trim()}>
    <li className="hero__trust-item">
      <ShieldCheck size={20} className="hero__trust-icon" aria-hidden="true" />
      <div>
        <p className="hero__trust-title">Since {BUSINESS_SINCE}</p>
        <p className="hero__trust-desc">Trusted local print shop</p>
      </div>
    </li>
    <li className="hero__trust-item">
      <Clock size={20} className="hero__trust-icon" aria-hidden="true" />
      <div>
        <p className="hero__trust-title">Fast turnaround</p>
        <p className="hero__trust-desc">Schedule your completion date</p>
      </div>
    </li>
    <li className="hero__trust-item">
      <MapPin size={20} className="hero__trust-icon" aria-hidden="true" />
      <div>
        <p className="hero__trust-title">Custom design</p>
        <p className="hero__trust-desc">Cards, shirts, signs & more</p>
      </div>
    </li>
  </ul>
);

export default TrustBadges;