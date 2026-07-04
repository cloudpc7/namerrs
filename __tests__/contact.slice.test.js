/**
 * contact.slice.test.js — Contact form submission state tests.
 */

import { configureStore } from '@reduxjs/toolkit';
import contactReducer, {
  submitContactMessage,
  selectContactSubmitStatus,
  selectContactError,
} from '../src/redux/slices/contact.slice';

jest.mock('../src/utils/apiClient', () => ({
  apiPost: jest.fn(),
}));

import { apiPost } from '../src/utils/apiClient';

const createTestStore = () =>
  configureStore({
    reducer: { contact: contactReducer },
  });

describe('contact slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submitContactMessage.fulfilled marks success', async () => {
    apiPost.mockResolvedValue({ ok: true });
    const store = createTestStore();

    await store.dispatch(
      submitContactMessage({
        name: 'Jane',
        email: 'jane@example.com',
        message: 'Need a quote for banners',
      })
    );

    expect(selectContactSubmitStatus(store.getState())).toBe('succeeded');
    expect(selectContactError(store.getState())).toBeNull();
    expect(store.getState().contact.lastSentAt).toBeTruthy();
  });

  it('submitContactMessage.rejected stores error', async () => {
    apiPost.mockRejectedValue({
      message: 'Could not send message.',
      status: 500,
    });
    const store = createTestStore();

    await store.dispatch(submitContactMessage({ message: 'Hello' }));

    expect(selectContactSubmitStatus(store.getState())).toBe('failed');
    expect(selectContactError(store.getState())).toBe('Could not send message.');
  });
});