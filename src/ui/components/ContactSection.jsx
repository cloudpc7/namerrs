/**
 * ContactSection.jsx — Contact form with business details and social links.
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Clock, Send } from 'lucide-react';
import SocialIcons from './SocialIcons';
import {
  resetContactForm,
  selectContactError,
  selectContactSubmitStatus,
  submitContactMessage,
} from '../../redux/slices/contact.slice';
import { selectSocialLinks } from '../../redux/slices/content.slice';
import { showToast } from '../../redux/slices/ui.slice';
import { ASYNC_STATUS } from '../../redux/constants/async.constants';
import { TOAST_TYPE } from '../../redux/constants/ui.constants';
import { DEFAULT_SOCIAL_LINKS } from '../../constants/social.constants';
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  BUSINESS_LOCATION_LABEL,
} from '../../constants/business.constants';
import {
  Section,
  SectionHeading,
  TextField,
  Button,
  Card,
  Stack,
  Alert,
} from './primitives';

const formatPhoneHref = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
};

const ContactSection = () => {
  const dispatch = useDispatch();
  const socialFromStore = useSelector(selectSocialLinks);
  const submitStatus = useSelector(selectContactSubmitStatus);
  const error = useSelector(selectContactError);
  const socialLinks = Object.keys(socialFromStore || {}).length
    ? socialFromStore
    : DEFAULT_SOCIAL_LINKS;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (submitStatus === ASYNC_STATUS.SUCCEEDED) {
      dispatch(
        showToast({
          message: "Message sent — we'll get back to you soon.",
          type: TOAST_TYPE.SUCCESS,
        })
      );
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      dispatch(resetContactForm());
    }
  }, [submitStatus, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitContactMessage({ name, email, phone, message }));
  };

  return (
    <Section id="contact" ariaLabel="Contact">
      <div className="contact-grid">
        <Card padding="lg" className="contact-grid__info">
          <SectionHeading
            eyebrow="Visit or call"
            title="Namerrs Signs & Printing"
            subtitle="Questions about an order or a custom project? Reach out — we typically respond within one business day."
          />

          <Stack gap="md" className="contact-grid__details">
            <div className="contact-detail">
              <MapPin size={18} className="contact-detail__icon" aria-hidden="true" />
              <div>
                <p className="contact-detail__label">{BUSINESS_LOCATION_LABEL}</p>
                <p className="contact-detail__value">
                  {BUSINESS_ADDRESS.street}
                  <br />
                  {BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.state} {BUSINESS_ADDRESS.zip}
                </p>
              </div>
            </div>

            <div className="contact-detail">
              <Clock size={18} className="contact-detail__icon" aria-hidden="true" />
              <p className="contact-detail__value">{BUSINESS_HOURS}</p>
            </div>

            {socialLinks.phone && (
              <p className="contact-detail__value">
                <a href={formatPhoneHref(socialLinks.phone)} className="contact-detail__link">
                  {socialLinks.phone}
                </a>
              </p>
            )}

            {socialLinks.email && (
              <p className="contact-detail__value">
                <a href={`mailto:${socialLinks.email}`} className="contact-detail__link">
                  {socialLinks.email}
                </a>
              </p>
            )}
          </Stack>

          <div className="contact-grid__social">
            <p className="form-label">Connect with us</p>
            <SocialIcons links={socialLinks} />
          </div>
        </Card>

        <Card padding="lg" variant="elevated">
          <h3 className="panel-header__title">Send a message</h3>
          <p className="form-hint" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            Tell us what you need — quotes, design help, or order questions.
          </p>

          <form onSubmit={handleSubmit} className="stack stack--lg" style={{ marginTop: '1.5rem' }}>
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

            {error && <Alert variant="error">{error}</Alert>}

            <Button
              type="submit"
              disabled={submitStatus === ASYNC_STATUS.SUBMITTING}
              className="min-h-11"
            >
              <Send size={16} aria-hidden="true" />
              {submitStatus === ASYNC_STATUS.SUBMITTING ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  );
};

export default ContactSection;