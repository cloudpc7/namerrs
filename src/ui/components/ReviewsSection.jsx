/**
 * ReviewsSection.jsx — Landing page reviews with modal submission via Redux.
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReviews,
  selectReviews,
  selectReviewsAverageRating,
  selectReviewsError,
  selectReviewsFetchStatus,
} from '../../redux/slices/reviews.slice';
import {
  closeReviewModal,
  openReviewModal,
  selectIsReviewModalOpen,
} from '../../redux/slices/ui.slice';
import { ASYNC_STATUS } from '../../redux/constants/async.constants';
import {
  Section,
  SectionHeading,
  Button,
  Card,
  EmptyState,
  Skeleton,
  Stack,
} from './primitives';
import ReviewModal from './ReviewModal';

const StarRating = ({ rating }) => (
  <span aria-label={`${rating} out of 5 stars`} className="review-stars">
    {'★'.repeat(rating)}
    {'☆'.repeat(5 - rating)}
  </span>
);

const ReviewsSection = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const fetchStatus = useSelector(selectReviewsFetchStatus);
  const error = useSelector(selectReviewsError);
  const averageRating = useSelector(selectReviewsAverageRating);
  const isModalOpen = useSelector(selectIsReviewModalOpen);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <Section id="reviews" ariaLabel="Reviews" variant="surface">
      <div className="reviews-section__header">
        <div>
          <SectionHeading eyebrow="Customer reviews" title="What our customers say" />
          <p className="section-heading__subtitle reviews-section__subtitle">
            Real feedback from
            <br className="reviews-section__subtitle-break" aria-hidden="true" />
            local businesses and families in San Jacinto.
          </p>
          {averageRating && (
            <p className="reviews-section__average">
              <span className="review-stars">★</span> {averageRating} average from {reviews.length}{' '}
              review{reviews.length === 1 ? '' : 's'}
            </p>
          )}
        </div>
        <Button onClick={() => dispatch(openReviewModal())}>Leave a review</Button>
      </div>

      <div className="reviews-grid">
        {fetchStatus === ASYNC_STATUS.LOADING &&
          Array.from({ length: 2 }, (_, index) => (
            <Card key={`review-skeleton-${index}`} padding="md">
              <Stack gap="sm">
                <Skeleton variant="text" style={{ width: '6rem' }} />
                <Skeleton variant="text" />
                <Skeleton variant="text" style={{ width: '80%' }} />
              </Stack>
            </Card>
          ))}

        {fetchStatus === ASYNC_STATUS.FAILED && (
          <Card padding="md" className="reviews-grid__full">
            <EmptyState
              title="Reviews temporarily unavailable"
              description={error || "You can still leave one — we'll publish it shortly."}
            >
              <Button className="mt-4" onClick={() => dispatch(openReviewModal())}>
                Leave a review
              </Button>
            </EmptyState>
          </Card>
        )}

        {fetchStatus === ASYNC_STATUS.SUCCEEDED && reviews.length === 0 && (
          <Card padding="lg" className="reviews-grid__full">
            <EmptyState
              title="Be the first to review Namerrs"
              description="Share your experience with our signs, printing, or custom apparel."
            >
              <Button className="mt-5" onClick={() => dispatch(openReviewModal())}>
                Leave a review
              </Button>
            </EmptyState>
          </Card>
        )}

        {reviews.map((review) => (
          <Card key={review.id} as="article" padding="md" variant="elevated">
            <StarRating rating={review.rating} />
            <p className="review-card__text">{review.text}</p>
            <p className="review-card__author">
              — {review.name || 'Namerrs customer'}
            </p>
          </Card>
        ))}
      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => dispatch(closeReviewModal())} />
    </Section>
  );
};

export default ReviewsSection;