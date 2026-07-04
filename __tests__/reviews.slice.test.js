/**
 * reviews.slice.test.js — Customer reviews async state tests.
 */

import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer, {
  fetchReviews,
  submitReview,
  selectReviews,
  selectReviewsFetchStatus,
  selectReviewsAverageRating,
} from '../src/redux/slices/reviews.slice';

jest.mock('../src/utils/apiClient', () => ({
  apiGet: jest.fn(),
  apiPost: jest.fn(),
}));

import { apiGet, apiPost } from '../src/utils/apiClient';

const createTestStore = () =>
  configureStore({
    reducer: { reviews: reviewsReducer },
  });

describe('reviews slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchReviews.fulfilled stores review list', async () => {
    apiGet.mockResolvedValue({
      reviews: [{ id: 'r1', rating: 5, text: 'Great work', name: 'Alex' }],
    });
    const store = createTestStore();

    await store.dispatch(fetchReviews());

    expect(selectReviewsFetchStatus(store.getState())).toBe('succeeded');
    expect(selectReviews(store.getState())).toHaveLength(1);
    expect(selectReviewsAverageRating(store.getState())).toBe('5.0');
  });

  it('fetchReviews.rejected stores error message', async () => {
    apiGet.mockRejectedValue({
      message: 'Too many requests. Wait a moment and try again.',
      status: 429,
      retryable: true,
    });
    const store = createTestStore();

    await store.dispatch(fetchReviews());

    const state = store.getState().reviews;
    expect(state.fetchStatus).toBe('failed');
    expect(state.httpStatus).toBe(429);
    expect(state.retryable).toBe(true);
  });

  it('submitReview.fulfilled prepends new review', async () => {
    apiPost.mockResolvedValue({
      review: { id: 'r2', rating: 4, text: 'Fast turnaround', name: 'Sam' },
    });
    const store = createTestStore();

    await store.dispatch(submitReview({ rating: 4, text: 'Fast turnaround', name: 'Sam' }));

    expect(store.getState().reviews.submitStatus).toBe('succeeded');
    expect(selectReviews(store.getState())[0].id).toBe('r2');
  });
});