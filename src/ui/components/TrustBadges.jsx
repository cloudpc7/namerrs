/**
 * TrustBadges.jsx — Shared trust highlights (since, turnaround, services).
 */

import { MapPin, Clock, ShieldCheck } from 'lucide-react';
import { TRUST_BADGES } from '../../constants/business.constants';

const TRUST_ICONS = [ShieldCheck, Clock, MapPin];

const TrustBadges = ({ className = '' }) => (
  <ul className={`hero__trust ${className}`.trim()}>
    {TRUST_BADGES.map((item, index) => {
      const Icon = TRUST_ICONS[index % TRUST_ICONS.length];

      return (
        <li key={item.title} className="hero__trust-item">
          <Icon size={20} className="hero__trust-icon" aria-hidden="true" />
          <div>
            <p className="hero__trust-title">{item.title}</p>
            <p className="hero__trust-desc hero__trust-desc--wide">{item.description}</p>
            <div className="hero__trust-desc-lines">
              {item.descriptionLines.map((line) => (
                <p key={line} className="hero__trust-desc-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);

export default TrustBadges;