/**
 * HttpErrorBanner.jsx — Global friendly HTTP error banner from Redux UI state.
 */

import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../../redux/slices/content.slice';
import { clearHttpError, selectHttpError } from '../../redux/slices/ui.slice';

const HttpErrorBanner = () => {
  const dispatch = useDispatch();
  const { errorMessage, retryable } = useSelector(selectHttpError);

  if (!errorMessage) {
    return null;
  }

  const handleAction = () => {
    if (retryable) {
      dispatch(fetchContent());
    }

    dispatch(clearHttpError());
  };

  return (
    <div
      role="alert"
      className="border-b border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p>{errorMessage}</p>
        <button
          type="button"
          onClick={handleAction}
          className="rounded px-3 py-1 text-[#111111] hover:bg-[#fee2e2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          {retryable ? 'Try again' : 'Close'}
        </button>
      </div>
    </div>
  );
};

export default HttpErrorBanner;