/**
 * ui.slice.test.js — Global HTTP error UI state tests.
 */

import uiReducer, {
  setHttpError,
  clearHttpError,
  selectHttpError,
} from '../src/redux/slices/ui.slice';

describe('ui slice', () => {
  const initialState = {
    httpStatus: null,
    errorMessage: null,
    code: null,
    retryable: false,
    productSearch: '',
  };

  it('setHttpError stores status, message, code, and retryable', () => {
    const nextState = uiReducer(
      initialState,
      setHttpError({
        httpStatus: 503,
        errorMessage: 'Service temporarily unavailable.',
        code: 'SERVICE_UNAVAILABLE',
        retryable: true,
      })
    );

    expect(nextState).toEqual({
      httpStatus: 503,
      errorMessage: 'Service temporarily unavailable.',
      code: 'SERVICE_UNAVAILABLE',
      retryable: true,
      productSearch: '',
    });
  });

  it('clearHttpError resets error state', () => {
    const populatedState = {
      httpStatus: 404,
      errorMessage: 'Not found',
      code: 'NOT_FOUND',
      retryable: false,
      productSearch: 'shirts',
    };

    const nextState = uiReducer(populatedState, clearHttpError());

    expect(nextState).toEqual({
      ...initialState,
      productSearch: 'shirts',
    });
  });

  it('selectHttpError returns ui error state', () => {
    const state = {
      ui: {
        httpStatus: 429,
        errorMessage: 'Too many requests.',
        code: 'RATE_LIMITED',
        retryable: true,
      },
    };

    expect(selectHttpError(state)).toEqual(state.ui);
  });
});