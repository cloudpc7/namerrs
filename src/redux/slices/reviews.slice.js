/**
 * reviews.slice.js — Customer reviews list and submission state.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../../utils/apiClient';
import { toRejectValue } from '../../utils/apiThunk';
import { ASYNC_STATUS } from '../constants/async.constants';
import { REVIEWS_SLICE_NAME } from '../constants/reviews.constants';

export const fetchReviews = createAsyncThunk(
  `${REVIEWS_SLICE_NAME}/fetchReviews`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiGet('/reviews');
      return data.reviews || [];
    } catch (error) {
      return rejectWithValue(toRejectValue(error));
    }
  }
);

export const submitReview = createAsyncThunk(
  `${REVIEWS_SLICE_NAME}/submitReview`,
  async (payload, { rejectWithValue }) => {
    try {
      const data = await apiPost('/reviews', payload);
      return data.review || payload;
    } catch (error) {
      return rejectWithValue(toRejectValue(error));
    }
  }
);

const initialState = {
  fetchStatus: ASYNC_STATUS.IDLE,
  submitStatus: ASYNC_STATUS.IDLE,
  items: [],
  error: null,
  submitError: null,
  httpStatus: null,
  retryable: false,
};

const reviewsSlice = createSlice({
  name: REVIEWS_SLICE_NAME,
  initialState,
  reducers: {
    resetReviewSubmit: (state) => {
      state.submitStatus = ASYNC_STATUS.IDLE;
      state.submitError = null;
    },
    clearReviews: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.fetchStatus = ASYNC_STATUS.LOADING;
        state.error = null;
        state.httpStatus = null;
        state.retryable = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.fetchStatus = ASYNC_STATUS.SUCCEEDED;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.fetchStatus = ASYNC_STATUS.FAILED;
        state.error = action.payload?.message || 'Reviews are temporarily unavailable.';
        state.httpStatus = action.payload?.status || null;
        state.retryable = Boolean(action.payload?.retryable);
      })
      .addCase(submitReview.pending, (state) => {
        state.submitStatus = ASYNC_STATUS.SUBMITTING;
        state.submitError = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.submitStatus = ASYNC_STATUS.SUCCEEDED;
        state.submitError = null;
        if (action.payload?.id) {
          state.items = [action.payload, ...state.items];
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.submitStatus = ASYNC_STATUS.FAILED;
        state.submitError = action.payload?.message || 'Could not submit review.';
      });
  },
});

export const { resetReviewSubmit, clearReviews } = reviewsSlice.actions;

export const selectReviewsFetchStatus = (state) => state.reviews.fetchStatus;
export const selectReviewsSubmitStatus = (state) => state.reviews.submitStatus;
export const selectReviews = (state) => state.reviews.items;
export const selectReviewsError = (state) => state.reviews.error;
export const selectReviewSubmitError = (state) => state.reviews.submitError;
export const selectReviewsAverageRating = (state) => {
  const items = state.reviews.items;
  if (!items.length) {
    return null;
  }
  const total = items.reduce((sum, review) => sum + review.rating, 0);
  return (total / items.length).toFixed(1);
};

export default reviewsSlice.reducer;