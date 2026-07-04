/**
 * apiClient.js — Central HTTP client for Express API with status code handling.
 */

import { API_BASE_URL } from '../config/api';

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload?.message
        ? payload.message
        : 'Something went wrong. Please try again.';

    const error = new Error(message);
    error.status = response.status;
    error.code = typeof payload === 'object' ? payload.code : 'HTTP_ERROR';
    error.retryable = typeof payload === 'object' ? Boolean(payload.retryable) : false;
    error.payload = payload;
    throw error;
  }

  return payload;
};

const request = async (path, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch (error) {
    const networkError = new Error(
      'Unable to reach the Namerrs API. If you are developing locally, start the Firebase emulator.'
    );
    networkError.status = null;
    networkError.code = 'NETWORK_ERROR';
    networkError.retryable = true;
    networkError.cause = error;
    throw networkError;
  }

  return parseResponse(response);
};

export const apiGet = async (path) => request(path);

export const apiPost = async (path, body) =>
  request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export { API_BASE_URL };