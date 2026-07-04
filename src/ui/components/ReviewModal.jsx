/**
 * ReviewModal.jsx — Modal form for submitting customer reviews via Redux.
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetReviewSubmit,
  selectReviewSubmitError,
  selectReviewsSubmitStatus,
  submitReview,
} from '../../redux/slices/reviews.slice';
import { closeReviewModal, showToast } from '../../redux/slices/ui.slice';
import { ASYNC_STATUS } from '../../redux/constants/async.constants';
import { TOAST_TYPE } from '../../redux/constants/ui.constants';
import Modal from './Modal';
import StarRatingInput from './StarRatingInput';
import { Alert, Button, Stack, TextField } from './primitives';

const ReviewModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const submitStatus = useSelector(selectReviewsSubmitStatus);
  const submitError = useSelector(selectReviewSubmitError);

  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (submitStatus === ASYNC_STATUS.SUCCEEDED) {
      dispatch(
        showToast({
          message: 'Thank you — your review has been submitted.',
          type: TOAST_TYPE.SUCCESS,
        })
      );
      setText('');
      setName('');
      setRating(5);
      dispatch(resetReviewSubmit());
      dispatch(closeReviewModal());
    }
  }, [submitStatus, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitReview({ rating, text, name }));
  };

  const handleClose = () => {
    dispatch(resetReviewSubmit());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Leave a review" ariaLabel="Review form">
      <form onSubmit={handleSubmit} className="stack">
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
        {submitError && <Alert variant="error">{submitError}</Alert>}
        <Button
          type="submit"
          disabled={submitStatus === ASYNC_STATUS.SUBMITTING}
          className="w-full"
        >
          {submitStatus === ASYNC_STATUS.SUBMITTING ? 'Submitting…' : 'Submit review'}
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewModal;