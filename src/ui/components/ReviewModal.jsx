/**
 * ReviewModal.jsx — Modal form for submitting customer reviews.
 */

import { useState } from 'react';
import Modal from './Modal';
import StarRatingInput from './StarRatingInput';
import TextField from './primitives/TextField';
import Button from './primitives/Button';
import { apiPost } from '../../utils/apiClient';

const ReviewModal = ({ isOpen, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await apiPost('/reviews', { rating, text, name });
      setText('');
      setName('');
      setRating(5);
      onSubmitted();
    } catch (submitError) {
      setError(submitError.message || 'Could not submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Leave a review" ariaLabel="Review form">
      <form onSubmit={handleSubmit} className="space-y-4">
        <StarRatingInput id="review-rating" value={rating} onChange={setRating} />
        <TextField
          id="review-text"
          label="Your review"
          as="textarea"
          rows={4}
          required
          minLength={10}
          maxLength={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          id="review-name"
          label="Name (optional)"
          maxLength={40}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting…' : 'Submit review'}
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewModal;