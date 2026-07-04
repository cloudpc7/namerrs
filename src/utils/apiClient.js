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

export const apiGet = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);
  return parseResponse(response);
};

export const apiPost = async (path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseResponse(response);
};

export { API_BASE_URL };