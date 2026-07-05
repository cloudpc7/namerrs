/**
 * ContactSection.jsx — Contact form with marketing value props beside the message form.
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, MessageSquareQuote, Palette, Send } from 'lucide-react';
import {
  resetContactForm,
  selectContactError,
  selectContactSubmitStatus,
  submitContactMessage,
} from '../../redux/slices/contact.slice';
import { showToast } from '../../redux/slices/ui.slice';
import { ASYNC_STATUS } from '../../redux/constants/async.constants';
import { TOAST_TYPE } from '../../redux/constants/ui.constants';
import { CONTACT_SECTION_SUBTITLE, CONTACT_VALUE_PROPS } from '../../constants/business.constants';
import {
  Section,
  SectionHeading,
  TextField,
  Button,
  Card,
  Stack,
  Alert,
} from './primitives';

const VALUE_PROP_ICONS = [MessageSquareQuote, Palette, Clock];

const ContactSection = () => {
  const dispatch = useDispatch();
  const submitStatus = useSelector(selectContactSubmitStatus);
  const error = useSelector(selectContactError);

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
            className="contact-section__heading"
            eyebrow="Get in touch"
            title="Tell us what you're printing"
            subtitle={CONTACT_SECTION_SUBTITLE}
          />

          <ul className="contact-value-list">
            {CONTACT_VALUE_PROPS.map((item, index) => {
              const Icon = VALUE_PROP_ICONS[index % VALUE_PROP_ICONS.length];

              return (
                <li key={item.title} className="contact-value-list__item">
                  <div className="contact-value-list__icon" aria-hidden="true">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="contact-value-list__title">{item.title}</p>
                    {item.descriptionLines ? (
                      <>
                        <p className="contact-value-list__desc contact-value-list__desc--wide">
                          {item.description}
                        </p>
                        <div className="contact-value-list__desc-lines">
                          {item.descriptionLines.map((line) => (
                            <p key={line} className="contact-value-list__desc-line">
                              {line}
                            </p>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="contact-value-list__desc">{item.description}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <article className="contact-form-panel" aria-labelledby="contact-form-title">
          <header className="contact-form-panel__header">
            <div className="contact-form-panel__header-icon" aria-hidden="true">
              <Send size={22} />
            </div>
            <div className="contact-form-panel__header-copy">
              <p className="contact-form-panel__eyebrow">Get in touch</p>
              <h3 id="contact-form-title" className="contact-form-panel__title">
                Send a message
              </h3>
              <p className="contact-form-panel__subtitle">
                Quotes, design help, or order questions — tell us what you need.
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="contact-form-panel__form" noValidate>
            <div className="contact-form-panel__fields">
              <div className="contact-form-panel__row">
                <TextField
                  id="contact-name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={80}
                  autoComplete="name"
                />
                <TextField
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <TextField
                id="contact-phone"
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                hint="Optional — we’ll call back if you prefer."
                autoComplete="tel"
              />
              <TextField
                id="contact-message"
                label="How can we help?"
                as="textarea"
                rows={5}
                required
                minLength={5}
                maxLength={500}
                placeholder="e.g. I need a quote for 500 business cards"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                hint="Up to 500 characters"
              />
            </div>

            {error && (
              <div className="contact-form-panel__alert">
                <Alert variant="error">{error}</Alert>
              </div>
            )}

            <div className="contact-form-panel__footer">
              <Button
                type="submit"
                size="lg"
                disabled={submitStatus === ASYNC_STATUS.SUBMITTING}
                className="contact-form-panel__submit"
              >
                <Send size={18} aria-hidden="true" />
                {submitStatus === ASYNC_STATUS.SUBMITTING ? 'Sending…' : 'Send message'}
              </Button>
              <p className="form-hint contact-form-panel__note">
                We typically respond within one business day.
              </p>
            </div>
          </form>
        </article>
      </div>
    </Section>
  );
};

export default ContactSection;