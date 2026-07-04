/**
 * contact.slice.js — Contact form submission state.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPost } from '../../utils/apiClient';
import { toRejectValue } from '../../utils/apiThunk';
import { ASYNC_STATUS } from '../constants/async.constants';
import { CONTACT_SLICE_NAME } from '../constants/contact.constants';

export const submitContactMessage = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/submitContactMessage`,
  async (payload, { rejectWithValue }) => {
    try {
      await apiPost('/contact', payload);
      return { sentAt: Date.now() };
    } catch (error) {
      return rejectWithValue(toRejectValue(error));
    }
  }
);

const initialState = {
  submitStatus: ASYNC_STATUS.IDLE,
  error: null,
  lastSentAt: null,
};

const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    resetContactForm: (state) => {
      state.submitStatus = ASYNC_STATUS.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactMessage.pending, (state) => {
        state.submitStatus = ASYNC_STATUS.SUBMITTING;
        state.error = null;
      })
      .addCase(submitContactMessage.fulfilled, (state, action) => {
        state.submitStatus = ASYNC_STATUS.SUCCEEDED;
        state.lastSentAt = action.payload.sentAt;
        state.error = null;
      })
      .addCase(submitContactMessage.rejected, (state, action) => {
        state.submitStatus = ASYNC_STATUS.FAILED;
        state.error = action.payload?.message || 'Could not send message.';
      });
  },
});

export const { resetContactForm } = contactSlice.actions;

export const selectContactSubmitStatus = (state) => state.contact.submitStatus;
export const selectContactError = (state) => state.contact.error;
export const selectContactLastSentAt = (state) => state.contact.lastSentAt;

export default contactSlice.reducer;