/**
 * ReviewsSection.jsx — Landing page reviews with modal submission.
 */

import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../../utils/apiClient';
import ReviewModal from './ReviewModal';
import Section from './primitives/Section';
import SectionHeading from './primitives/SectionHeading';
import Button from './primitives/Button';

const StarRating = ({ rating }) => (
  <span aria-label={`${rating} out of 5 stars`} className="text-[#f59e0b]">
    {'★'.repeat(rating)}
    {'☆'.repeat(5 - rating)}
  </span>
);

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('loading');

  const loadReviews = async () => {
    setStatus('loading');
    try {
      const data = await apiGet('/reviews');
      setReviews(data.reviews || []);
      setStatus('succeeded');
    } catch {
      setStatus('failed');
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return null;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <Section id="reviews" ariaLabel="Reviews" variant="surface">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionHeading
            eyebrow="Customer reviews"
            title="What our customers say"
            subtitle="Real feedback from local businesses and families in San Jacinto."
          />
          {averageRating && (
            <p className="mt-3 text-sm font-medium text-[var(--color-text-secondary)]">
              <span className="text-[#f59e0b]">★</span> {averageRating} average from {reviews.length}{' '}
              review{reviews.length === 1 ? '' : 's'}
            </p>
          )}
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Leave a review</Button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {status === 'loading' &&
          Array.from({ length: 2 }, (_, index) => (
            <div
              key={`review-skeleton-${index}`}
              className="animate-pulse rounded-2xl bg-white p-6 ring-1 ring-[var(--color-border)]"
            >
              <div className="h-4 w-24 rounded bg-[var(--color-border)]" />
              <div className="mt-4 h-4 w-full rounded bg-[var(--color-border)]" />
              <div className="mt-2 h-4 w-5/6 rounded bg-[var(--color-border)]" />
            </div>
          ))}

        {status === 'failed' && (
          <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--color-border)] md:col-span-2">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Reviews are temporarily unavailable. You can still leave one — we&apos;ll publish it shortly.
            </p>
            <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
              Leave a review
            </Button>
          </div>
        )}

        {status === 'succeeded' && reviews.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-[var(--color-border)] md:col-span-2">
            <p className="text-lg font-semibold text-[var(--color-text-primary)]">
              Be the first to review Namerrs
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Share your experience with our signs, printing, or custom apparel.
            </p>
            <Button className="mt-5" onClick={() => setIsModalOpen(true)}>
              Leave a review
            </Button>
          </div>
        )}

        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--color-border)]"
          >
            <StarRating rating={review.rating} />
            <p className="mt-3 leading-relaxed text-[var(--color-text-primary)]">{review.text}</p>
            <p className="mt-4 text-sm font-medium text-[var(--color-text-secondary)]">
              — {review.name || 'Namerrs customer'}
            </p>
          </article>
        ))}
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={() => {
          setIsModalOpen(false);
          loadReviews();
        }}
      />
    </Section>
  );
};

export default ReviewsSection;