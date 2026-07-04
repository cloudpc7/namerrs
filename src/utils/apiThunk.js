/**
 * apiThunk.js — Shared helpers for Redux async thunks using apiClient errors.
 */

export const toRejectValue = (error) => ({
  message: error.message || 'Something went wrong. Please try again.',
  status: error.status || null,
  code: error.code || 'HTTP_ERROR',
  retryable: Boolean(error.retryable),
});