/**
 * ContactSection.jsx — Contact form with business details and social links.
 */

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MapPin, Clock, Send } from 'lucide-react';
import SocialIcons from './SocialIcons';
import { apiPost } from '../../utils/apiClient';
import { selectSocialLinks } from '../../redux/slices/content.slice';
import { DEFAULT_SOCIAL_LINKS } from '../../constants/social.constants';
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  BUSINESS_LOCATION_LABEL,
} from '../../constants/business.constants';
import Section from './primitives/Section';
import SectionHeading from './primitives/SectionHeading';
import TextField from './primitives/TextField';
import Button from './primitives/Button';

const formatPhoneHref = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
};

const ContactSection = () => {
  const socialFromStore = useSelector(selectSocialLinks);
  const socialLinks = Object.keys(socialFromStore || {}).length
    ? socialFromStore
    : DEFAULT_SOCIAL_LINKS;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('submitting');

    try {
      await apiPost('/contact', {
        name,
        email,
        phone,
        message,
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setStatus('success');
    } catch (submitError) {
      setStatus('error');
      setError(submitError.message || 'Could not send message.');
    }
  };

  return (
    <Section id="contact" ariaLabel="Contact">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="rounded-2xl bg-[var(--color-surface)] p-6 ring-1 ring-[var(--color-border)] md:p-8">
          <SectionHeading
            eyebrow="Visit or call"
            title="Namerrs Signs & Printing"
            subtitle="Questions about an order or a custom project? Reach out — we typically respond within one business day."
          />

          <div className="mt-8 space-y-5 text-sm text-[var(--color-text-secondary)]">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">{BUSINESS_LOCATION_LABEL}</p>
                <p className="mt-1">
                  {BUSINESS_ADDRESS.street}
                  <br />
                  {BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.state} {BUSINESS_ADDRESS.zip}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
              <p>{BUSINESS_HOURS}</p>
            </div>

            {socialLinks.phone && (
              <p>
                <a
                  href={formatPhoneHref(socialLinks.phone)}
                  className="font-semibold text-[var(--color-accent)] hover:underline"
                >
                  {socialLinks.phone}
                </a>
              </p>
            )}

            {socialLinks.email && (
              <p>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="font-semibold text-[var(--color-accent)] hover:underline"
                >
                  {socialLinks.email}
                </a>
              </p>
            )}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">Connect with us</p>
            <SocialIcons links={socialLinks} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--color-border)] md:p-8">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Send a message</h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Tell us what you need — quotes, design help, or order questions.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <TextField
              id="contact-name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={80}
            />
            <TextField
              id="contact-email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="contact-phone"
              label="Phone (optional)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              id="contact-message"
              label="How can we help?"
              as="textarea"
              rows={4}
              required
              minLength={5}
              maxLength={500}
              placeholder="e.g. I need a quote for 500 business cards"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {error && (
              <p className="text-sm text-[var(--color-error)]" role="alert">
                {error}
              </p>
            )}
            {status === 'success' && (
              <p className="text-sm text-[var(--color-success)]" role="status">
                Message sent — we&apos;ll get back to you soon.
              </p>
            )}

            <Button type="submit" disabled={status === 'submitting'} className="min-h-11">
              <Send size={16} aria-hidden="true" />
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;