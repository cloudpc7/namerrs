/**
 * apiClient.test.js — HTTP client status code and error parsing tests.
 */

import { apiGet, apiPost } from '../src/utils/apiClient';

const API_BASE_URL = 'http://test-api.local/api';

jest.mock('../src/config/api', () => ({
  API_BASE_URL: 'http://test-api.local/api',
}));

describe('apiClient', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('apiGet returns JSON payload on 200', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ content: { pages: {} }, pricing: {} }),
    });

    const result = await apiGet('/content');

    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/content`);
    expect(result).toEqual({ content: { pages: {} }, pricing: {} });
  });

  it('apiGet throws parsed error on 404', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      headers: { get: () => 'application/json' },
      json: async () => ({
        error: true,
        status: 404,
        code: 'NOT_FOUND',
        message: "We couldn't find what you're looking for.",
        retryable: false,
      }),
    });

    await expect(apiGet('/content/pages/missing')).rejects.toMatchObject({
      message: "We couldn't find what you're looking for.",
      status: 404,
      code: 'NOT_FOUND',
      retryable: false,
    });
  });

  it('apiGet throws parsed error on 500 with retryable flag', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      headers: { get: () => 'application/json' },
      json: async () => ({
        error: true,
        status: 500,
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong on our end.',
        retryable: true,
      }),
    });

    await expect(apiGet('/content')).rejects.toMatchObject({
      status: 500,
      code: 'INTERNAL_ERROR',
      retryable: true,
    });
  });

  it('apiPost sends JSON body on POST', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ clientSecret: 'secret_test' }),
    });

    const body = { amount: 0, currency: 'usd' };
    const result = await apiPost('/create-payment-intent', body);

    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    expect(result).toEqual({ clientSecret: 'secret_test' });
  });
});